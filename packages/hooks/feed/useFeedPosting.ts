import { coin } from "@cosmjs/proto-signing";
import { GnoJSONRPCProvider } from "@gnolang/gno-js-client";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { useCreatePost } from "./useCreatePost";
import { useFeedPostFee } from "./useFeedPostFee";
import { useFreePostsCount } from "./useFreePostsCount";
import { Coin } from "../../api/teritori-chain/cosmos/base/v1beta1/coin";
import { signingSocialFeedClient } from "../../client-creators/socialFeedClient";
import {
  NewArticleFormValues,
  NewPostFormValues,
  PostCategory,
  SocialFeedTrackMetadata,
  SocialFeedVideoMetadata,
} from "../../components/socialFeed/NewsFeed/NewsFeed.type";
import {
  generateArticleMetadata,
  generatePostMetadata,
} from "../../components/socialFeed/NewsFeed/NewsFeedQueries";
import { RichTextPublishValues } from "../../components/socialFeed/RichText/RichText.type";
import { TERITORI_FEED_ID } from "../../components/socialFeed/const";
import { useFeedbacks } from "../../context/FeedbacksProvider";
import {
  ControlledWalletAction,
  useWalletControl,
} from "../../context/WalletControlProvider";
import {
  parseUserId,
  getStakingCurrency,
  mustGetCosmosNetwork,
  NetworkKind,
  NetworkFeature,
} from "../../networks";
import { selectNFTStorageAPI } from "../../store/slices/settings";
import { prettyPrice } from "../../utils/coins";
import { defaultSocialFeedFee } from "../../utils/fee";
import { adenaDoContract } from "../../utils/gno";
import {
  generateIpfsKey,
  ipfsURLToHTTPURL,
  uploadFilesToPinata,
} from "../../utils/ipfs";
import { LocalFileData, RemoteFileData } from "../../utils/types/files";
import { useIsDAO } from "../cosmwasm/useCosmWasmContractInfo";
import { useDAOMakeProposal } from "../dao/useDAOMakeProposal";
import { useBalances } from "../useBalances";

interface MakePostParams {
  formValues: NewPostFormValues;
  parentPostIdentifier?: string;
}
interface MakeArticleParams {
  formValues: NewArticleFormValues;
  richTextPublishValues: RichTextPublishValues;
}
interface MakeTrackParams {
  title: string;
  description: string;
  localAudioFile: LocalFileData;
}
interface MakeVideoParams {
  title: string;
  description: string;
  localVideoFile: LocalFileData;
  localThumbnailImageFile?: LocalFileData;
}

export const useFeedPosting = (
  networkId: string | undefined,
  userId: string | undefined,
  category: PostCategory,
  onSuccess?: () => void,
) => {
  const { controlWalletFunds } = useWalletControl();
  const [network, userAddress] = parseUserId(userId);
  if (network) {
    networkId = network.id;
  }
  const userIPFSKey = useSelector(selectNFTStorageAPI);
  const { setToastError } = useFeedbacks();
  const [isLoading, setLoading] = useState(false);

  const balances = useBalances(networkId, userAddress);
  const { postFee } = useFeedPostFee(networkId, category);
  const { freePostCount } = useFreePostsCount(userId, category);
  const { isDAO } = useIsDAO(userId);
  const makeProposal = useDAOMakeProposal(isDAO ? userId : undefined);
  const { mutateAsync, isLoading: isProcessing } = useCreatePost({
    onSuccess,
  });
  const feeCurrency = getStakingCurrency(networkId);
  const feeBalance = balances.find((bal) => bal.denom === feeCurrency?.denom);
  const canPayForPost =
    freePostCount > 0 ||
    (!!feeBalance?.amount &&
      Number(feeBalance.amount) > 0 &&
      postFee <= Number(feeBalance.amount));
  const cost: Coin = {
    amount: postFee.toString(),
    denom: feeCurrency?.denom || "",
  };

  const processFeedPosting = useCallback(
    async (metadata: string, parentPostIdentifier?: string) => {
      if (!canPayForPost) {
        throw new Error("Not enough funds");
      }
      const networkId = network?.id;
      if (!networkId) {
        throw new Error("Invalid network");
      }

      const identifier = uuidv4();
      const msg = {
        category,
        identifier,
        metadata,
        parentPostIdentifier,
      };

      if (isDAO) {
        const network = mustGetCosmosNetwork(networkId);

        if (!network.socialFeedContractAddress) {
          throw new Error("Social feed contract address not found");
        }
        if (!userAddress) {
          throw new Error("Invalid sender");
        }
        await makeProposal(userAddress, {
          title: "Post on feed",
          description: "",
          msgs: [
            {
              wasm: {
                execute: {
                  contract_addr: network.socialFeedContractAddress,
                  msg: Buffer.from(
                    JSON.stringify({ create_post: msg }),
                  ).toString("base64"),
                  funds: [{ amount: postFee.toString(), denom: "utori" }],
                },
              },
            },
          ],
        });
      } else {
        if (network?.kind === NetworkKind.Gno) {
          const vmCall = {
            caller: userAddress,
            send: "",
            pkg_path: network.socialFeedsPkgPath,
            func: "CreatePost",
            args: [
              TERITORI_FEED_ID,
              "0",
              msg.category.toString(),
              msg.metadata,
            ],
          };

          const txHash = await adenaDoContract(
            network.id,
            [{ type: "/vm.m_call", value: vmCall }],
            { gasWanted: 2_000_000 },
          );

          const provider = new GnoJSONRPCProvider(network.endpoint);
          await provider.waitForTransaction(txHash);
        } else {
          const client = await signingSocialFeedClient({
            networkId: network?.id,
            walletAddress: userAddress,
          });
          await mutateAsync({
            client,
            msg,
            args: {
              fee: defaultSocialFeedFee,
              memo: "",
              funds: [coin(postFee, "utori")],
            },
          });
        }
      }
    },
    [
      canPayForPost,
      category,
      isDAO,
      makeProposal,
      mutateAsync,
      network,
      postFee,
      userAddress,
    ],
  );

  const makePost = async ({
    formValues,
    parentPostIdentifier,
  }: MakePostParams) => {
    setLoading(true);
    try {
      let remoteFiles: RemoteFileData[] = [];

      if (formValues.files?.length) {
        const pinataJWTKey =
          userIPFSKey || (await generateIpfsKey(networkId || "", userId));
        if (pinataJWTKey) {
          remoteFiles = await uploadFilesToPinata({
            files: formValues.files,
            pinataJWTKey,
          });
        }
      }
      if (formValues.files?.length && !remoteFiles.find((file) => file.url)) {
        console.error("upload file err : Fail to pin to IPFS");
        setToastError({
          title: "File upload failed",
          message: "Fail to pin to IPFS, please try to Publish again",
        });
        return;
      }

      const metadata = generatePostMetadata({
        title: formValues.title || "",
        message: formValues.message,
        files: remoteFiles,
        hashtags: formValues.hashtags,
        mentions: formValues.mentions,
        gifs: formValues?.gifs || [],
      });

      await processFeedPosting(JSON.stringify(metadata), parentPostIdentifier);
    } catch (err) {
      console.error("post submit err", err);
      setToastError({
        title: "Post creation failed",
        message: err instanceof Error ? err.message : `${err}`,
      });
    }
    setLoading(false);
  };

  const makeArticle = async ({
    formValues,
    richTextPublishValues,
  }: MakeArticleParams) => {
    setLoading(true);
    try {
      const localFiles = [
        ...(formValues.files || []),
        ...richTextPublishValues.images,
        ...richTextPublishValues.audios,
        ...richTextPublishValues.videos,
      ];

      let pinataJWTKey = undefined;
      if (localFiles?.length || formValues.thumbnailImage) {
        pinataJWTKey =
          userIPFSKey || (await generateIpfsKey(networkId || "", userId));
      }

      // Upload thumbnail to IPFS
      let thumbnailImageRemoteFile: RemoteFileData | undefined;
      if (formValues.thumbnailImage && pinataJWTKey) {
        const remoteFiles = await uploadFilesToPinata({
          files: [formValues.thumbnailImage],
          pinataJWTKey,
        });
        thumbnailImageRemoteFile = remoteFiles[0];
      }

      // Upload other files to IPFS
      let remoteFiles: RemoteFileData[] = [];
      if (localFiles?.length && pinataJWTKey) {
        remoteFiles = await uploadFilesToPinata({
          files: localFiles,
          pinataJWTKey,
        });
      }

      // If the user uploaded files, but they are not pinned to IPFS, it returns files with empty url, so this is an error.
      if (
        (localFiles?.length && !remoteFiles.find((file) => file.url)) ||
        (formValues.thumbnailImage && !thumbnailImageRemoteFile)
      ) {
        console.error("upload file err : Fail to pin to IPFS");
        setToastError({
          title: "File upload failed",
          message: "Fail to pin to IPFS, please try to Publish again",
        });
        setLoading(false);
        return;
      }

      let message = formValues.message || "";

      if (remoteFiles.length) {
        localFiles?.map((file, index) => {
          // Audio are not in the HTML for now
          if (remoteFiles[index]?.fileType !== "audio") {
            message = message.replace(
              file.url,
              ipfsURLToHTTPURL(remoteFiles[index].url),
            );
          }
        });
      }

      const metadata = generateArticleMetadata({
        ...formValues,
        thumbnailImage: thumbnailImageRemoteFile,
        gifs: richTextPublishValues.gifs,
        files: remoteFiles,
        mentions: richTextPublishValues.mentions,
        hashtags: richTextPublishValues.hashtags,
        message: richTextPublishValues.html,
      });

      await processFeedPosting(JSON.stringify(metadata));
    } catch (err) {
      console.error("post submit err", err);
      setToastError({
        title: "Post creation failed",
        message: err instanceof Error ? err.message : `${err}`,
      });
    }

    setLoading(false);
  };

  const makeTrack = async ({
    title,
    description,
    localAudioFile,
  }: MakeTrackParams) => {
    setLoading(true);

    try {
      const pinataJWTKey =
        userIPFSKey || (await generateIpfsKey(networkId || "", userId));
      if (!pinataJWTKey) {
        console.error("upload file err : No Pinata JWT");
        setToastError({
          title: "File upload failed",
          message: "No Pinata JWT",
        });
        return;
      }
      const uploadedFiles = await uploadFilesToPinata({
        pinataJWTKey,
        files: [localAudioFile],
      });
      if (!uploadedFiles.find((file) => file.url)) {
        console.error("upload file err : Fail to pin to IPFS");
        setToastError({
          title: "File upload failed",
          message: "Fail to pin to IPFS, please try to Publish again",
        });
        return;
      }

      const track: SocialFeedTrackMetadata = {
        title,
        description,
        audioFile: uploadedFiles[0],
      };

      // we need this hack until the createdAt field is properly provided by the contract
      const trackWithCreationDate = {
        ...track,
        createdAt: new Date().toISOString(),
      };

      await processFeedPosting(JSON.stringify(trackWithCreationDate));
    } catch (err) {
      console.error("post submit err", err);
      setToastError({
        title: "Post creation failed",
        message: err instanceof Error ? err.message : `${err}`,
      });
    }
    setLoading(false);
  };

  const makeVideo = async ({
    title,
    description,
    localVideoFile,
    localThumbnailImageFile,
  }: MakeVideoParams) => {
    setLoading(true);

    try {
      const pinataJWTKey =
        userIPFSKey || (await generateIpfsKey(networkId || "", userId));
      if (!pinataJWTKey) {
        console.error("upload file err : No Pinata JWT");
        setToastError({
          title: "File upload failed",
          message: "No Pinata JWT",
        });
        return;
      }

      const uploadedFiles = await uploadFilesToPinata({
        pinataJWTKey,
        files: [
          {
            ...localVideoFile,
            thumbnailFileData: localThumbnailImageFile,
          },
        ],
      });
      if (!uploadedFiles.find((file) => file.url)) {
        console.error("upload file err : Fail to pin to IPFS");
        setToastError({
          title: "File upload failed",
          message: "Fail to pin to IPFS, please try to Publish again",
        });
        return;
      }

      const video: SocialFeedVideoMetadata = {
        title,
        description,
        videoFile: uploadedFiles[0],
      };

      // we need this hack until the createdAt field is properly provided by the contract
      const videoWithCreationDate = {
        ...video,
        createdAt: new Date(),
      };

      await processFeedPosting(JSON.stringify(videoWithCreationDate));
    } catch (err) {
      console.error("post submit err", err);
      setToastError({
        title: "Post creation failed",
        message: err instanceof Error ? err.message : `${err}`,
      });
    }

    setLoading(false);
  };

  return {
    canPayForPost,
    makePost: ({ formValues, parentPostIdentifier }: MakePostParams) =>
      controlWalletFunds({
        callback: () => makePost({ formValues, parentPostIdentifier }),
        canPay: canPayForPost,
        action: ControlledWalletAction.POST,
        forceNetworkFeature: NetworkFeature.SocialFeed,
        currency: feeCurrency,
        network,
        cost,
      }),
    makeArticle: ({ formValues, richTextPublishValues }: MakeArticleParams) =>
      controlWalletFunds({
        callback: () => makeArticle({ formValues, richTextPublishValues }),
        canPay: canPayForPost,
        action: ControlledWalletAction.PUBLISH_ARTICLE,
        forceNetworkFeature: NetworkFeature.SocialFeed,
        currency: feeCurrency,
        network,
        cost,
      }),
    makeTrack: ({ title, description, localAudioFile }: MakeTrackParams) =>
      controlWalletFunds({
        callback: () => makeTrack({ title, description, localAudioFile }),
        canPay: canPayForPost,
        action: ControlledWalletAction.PUBLISH_TRACK,
        forceNetworkFeature: NetworkFeature.SocialFeed,
        currency: feeCurrency,
        network,
        cost,
      }),
    makeVideo: ({
      title,
      description,
      localVideoFile,
      localThumbnailImageFile,
    }: MakeVideoParams) =>
      controlWalletFunds({
        callback: () =>
          makeVideo({
            title,
            description,
            localVideoFile,
            localThumbnailImageFile,
          }),
        canPay: canPayForPost,
        action: ControlledWalletAction.PUBLISH_VIDEO,
        forceNetworkFeature: NetworkFeature.SocialFeed,
        currency: feeCurrency,
        network,
        cost,
      }),
    isProcessing,
    isLoading,
    prettyPublishingFee: prettyPrice(
      networkId,
      postFee.toString(),
      feeCurrency?.denom,
    ),
    freePostCount,
    prettyFeeBalance: prettyPrice(
      networkId,
      feeBalance?.amount || "0",
      feeCurrency?.denom,
    ),
  };
};
