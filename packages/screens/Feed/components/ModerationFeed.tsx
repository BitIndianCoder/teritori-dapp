import React, { FC } from "react";

import { FeedHeader } from "./FeedHeader";

import { PostsRequest } from "@/api/feed/v1/feed";
import { MobileTitle } from "@/components/ScreenContainer/ScreenContainerMobile";
import { NewsFeed } from "@/components/socialFeed/NewsFeed/NewsFeed";
import { useIsMobile } from "@/hooks/useIsMobile";
import { PostCategory } from "@/utils/types/feed";

export const ModerationFeed: FC = () => {
  const isMobile = useIsMobile();
  const feedRequest: Partial<PostsRequest> = {
    filter: {
      categories: [PostCategory.Flagged],
      user: "",
      mentions: [],
      hashtags: [],
      premiumLevelMin: 0,
      premiumLevelMax: -1,
    },
    limit: 10,
    offset: 0,
  };

  return (
    <NewsFeed
      req={feedRequest}
      disablePosting
      isFlagged
      Header={() => (
        <>
          {/* ScreenContainer in FeedScreen has noScroll, so we need to add MobileTitle here */}
          {isMobile && <MobileTitle title="SOCIAL FEED" />}
          <FeedHeader selectedTab="moderationDAO" />
        </>
      )}
    />
  );
};
