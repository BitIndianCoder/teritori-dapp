import React, { useMemo } from "react";

import { ArticlesFeed } from "./components/ArticlesFeed";
import { FeedHeader } from "./components/FeedHeader";
import { MapFeed } from "./components/MapFeed";
import { ModerationFeed } from "./components/ModerationFeed";
import { MusicFeed } from "./components/MusicFeed";
import { PicsFeed } from "./components/PicsFeed";
import { VideosFeed } from "./components/VideosFeed";

import { PostsRequest } from "@/api/feed/v1/feed";
import { BrandText } from "@/components/BrandText";
import { ScreenContainer } from "@/components/ScreenContainer";
import { MobileTitle } from "@/components/ScreenContainer/ScreenContainerMobile";
import { NewsFeed } from "@/components/socialFeed/NewsFeed/NewsFeed";
import { useDeveloperMode } from "@/hooks/useDeveloperMode";
import { useForceNetworkSelection } from "@/hooks/useForceNetworkSelection";
import { useIsMobile } from "@/hooks/useIsMobile";
import { NetworkFeature } from "@/networks";
import { ScreenFC } from "@/utils/navigation";

export const FeedScreen: ScreenFC<"Feed"> = ({ route: { params } }) => {
  useForceNetworkSelection(params?.network);
  const isMobile = useIsMobile();
  const [developerMode] = useDeveloperMode();

  const feedContent = useMemo(() => {
    switch (params?.tab) {
      case "music":
        return <MusicFeed />;
      case "map":
        return developerMode === true ? <MapFeed /> : null;
      case "pics":
        return <PicsFeed />;
      case "videos":
        return <VideosFeed />;
      case "articles":
        return <ArticlesFeed />;
      case "moderationDAO":
        return <ModerationFeed />;
      default:
        return (
          <NewsFeed
            req={defaultFeedRequest}
            isFlagged={params?.tab === "moderationDAO"}
            disablePosting={params?.tab === "moderationDAO"}
            Header={() => (
              <>
                {/* ScreenContainer in FeedScreen has noScroll, so we need to add MobileTitle here */}
                {isMobile && <MobileTitle title="SOCIAL FEED" />}
                <FeedHeader selectedTab="" />
              </>
            )}
          />
        );
    }
  }, [params?.tab, isMobile, developerMode]);

  return (
    <ScreenContainer
      fullWidth
      responsive
      noMargin
      noScroll
      footerChildren={<></>}
      forceNetworkFeatures={[NetworkFeature.SocialFeed]}
      headerChildren={<BrandText>Social Feed</BrandText>}
    >
      {feedContent}
    </ScreenContainer>
  );
};

const defaultFeedRequest: Partial<PostsRequest> = {
  filter: {
    categories: [],
    user: "",
    mentions: [],
    hashtags: [],
    premiumLevelMin: 0,
    premiumLevelMax: -1,
  },
  limit: 10,
  offset: 0,
};
