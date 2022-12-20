import { useInfiniteQuery } from "@tanstack/react-query";

import { socialFeedClient } from "../client-creators/socialFeedClient";
import { useFeedbacks } from "../context/FeedbacksProvider";
import { PostResult } from "../contracts-clients/teritori-social-feed/TeritoriSocialFeed.types";
import useSelectedWallet from "./useSelectedWallet";

type FetchFeedResponse = {
  list: PostResult[];
  totalCount: number;
} | null;

export const combineFetchFeedPages = (pages: FetchFeedResponse[]) =>
  pages.reduce(
    (acc: PostResult[], page) => [...acc, ...(page?.list || [])],
    []
  );

export const useFetchFeed = () => {
  // variable
  const wallet = useSelectedWallet();
  const { setToastError } = useFeedbacks();

  // request
  const req = useInfiniteQuery<FetchFeedResponse>(
    ["FetchFeed", wallet?.address],
    async ({ pageParam }) => {
      if (!wallet?.address) {
        // setToastError({
        //   title: "Wallet not connected!",
        //   message: "Please connect your wallet first.",
        // });
        return null;
      }

      try {
        const client = await socialFeedClient({
          walletAddress: wallet.address,
        });

        const mainPosts = await client.queryMainPosts({
          count: 10,
          from: pageParam || 0,
          sort: "desc",
        });

        const mainPostCount = await client.queryMainPostsCount();
        return { list: mainPosts, totalCount: mainPostCount };
      } catch (err) {
        console.log("initData err", err);
        return null;
      }
    },
    {
      getNextPageParam: (lastPage, pages) => {
        const postsLength = combineFetchFeedPages(pages).length;

        if (lastPage?.totalCount && lastPage.totalCount > postsLength) {
          return postsLength;
        }
        return null;
      },
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );

  return req;
};
