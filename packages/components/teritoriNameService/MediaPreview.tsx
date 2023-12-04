import * as DocumentPicker from "expo-document-picker";
import React from "react";
import { View, ViewStyle } from "react-native";
import { useSelector } from "react-redux";

import tnsProfileAvatar from "../../../assets/default-images/default-name-nft.png";
import tnsProfileCover from "../../../assets/default-images/tns-profile-cover.png";
import uploadCloudIcon from "../../../assets/icons/upload-cloud.svg";
import {
  PinataFileProps,
  pinataPinFileToIPFS,
} from "../../candymachine/pinata-upload";
import { useFeedbacks } from "../../context/FeedbacksProvider";
import { Metadata } from "../../contracts-clients/teritori-name-service/TeritoriNameService.types";
import { useSelectedNetworkInfo } from "../../hooks/useSelectedNetwork";
import useSelectedWallet from "../../hooks/useSelectedWallet";
import { selectNFTStorageAPI } from "../../store/slices/settings";
import { generateIpfsKey } from "../../utils/ipfs";
import { neutral17, neutral33 } from "../../utils/style/colors";
import { layout } from "../../utils/style/layout";
import { OptimizedImage } from "../OptimizedImage";
import { TextInputCustom } from "../inputs/TextInputCustom";

export const MediaPreview: React.FC<{
  style: ViewStyle;
  image: string;
  setImageUrl: (value: ((prevState: string) => string) | string) => void;
  bannerImage: string;
  setBannerImage: (value: ((prevState: string) => string) | string) => void;
}> = ({ style, image, setImageUrl, bannerImage, setBannerImage }) => {
  const selectedNetwork = useSelectedNetworkInfo();
  const selectedWallet = useSelectedWallet();
  const { setToastError } = useFeedbacks();
  const userId = selectedWallet?.userId;

  const userIPFSKey = useSelector(selectNFTStorageAPI);

  const pickDocumentAndUpload = async (callback: (value: string) => void) => {
    const result = await DocumentPicker.getDocumentAsync({ multiple: false });

    const pinataJWTKey =
      userIPFSKey || (await generateIpfsKey(selectedNetwork?.id || "", userId));
    if (!pinataJWTKey) {
      console.error("upload file err : No Pinata JWT");
      setToastError({
        title: "File upload failed",
        message: "No Pinata JWT",
      });
      return;
    }

    if (result.output) {
      const uploadedFiles = await pinataPinFileToIPFS({
        pinataJWTKey,
        file: { file: result.output[0] },
      } as PinataFileProps);
      callback(`ipfs://${uploadedFiles.IpfsHash}`);
    }
  };

  return (
    <View
      style={{
        borderRadius: layout.borderRadius,
        borderWidth: 1,
        marginBottom: layout.spacing_x1,
        padding: layout.spacing_x1_5,
        backgroundColor: neutral17,
      }}
    >
      <TextInputCustom<Metadata>
        name="image"
        style={style}
        label="Avatar URL"
        noBrokenCorners
        variant="labelOutside"
        placeHolder="https://website.com/avatar.jpg"
        postIconSVG={uploadCloudIcon}
        postIconSVGonPress={() => pickDocumentAndUpload(setImageUrl)}
        value={image}
        onChangeText={setImageUrl}
        squaresBackgroundColor={neutral17}
      />
      <TextInputCustom<Metadata>
        name="public_profile_header"
        style={style}
        label="Cover Image URL"
        noBrokenCorners
        postIconSVG={uploadCloudIcon}
        postIconSVGonPress={() => pickDocumentAndUpload(setBannerImage)}
        variant="labelOutside"
        placeHolder="https://website.com/coverimage.jpg"
        value={bannerImage}
        onChangeText={setBannerImage}
        squaresBackgroundColor={neutral17}
      />
      <View
        style={{
          marginTop: layout.spacing_x1,
          marginBottom: layout.spacing_x3,
        }}
      >
        <OptimizedImage
          sourceURI={bannerImage || tnsProfileCover}
          width={1388}
          height={1100}
          style={{
            width: 388,
            minWidth: 388,
            height: 100,
            minHeight: 100,
            borderRadius: layout.borderRadius,
            borderWidth: 1,
            borderColor: neutral33,
          }}
        />
        <OptimizedImage
          sourceURI={image || tnsProfileAvatar}
          resizeMode="cover"
          width={250}
          height={250}
          style={{
            width: 50,
            minWidth: 50,
            height: 50,
            minHeight: 50,
            position: "absolute",
            bottom: -24,
            left: 16,
            borderRadius: 25,
            borderWidth: 1,
            borderColor: neutral33,
          }}
        />
      </View>
    </View>
  );
};
