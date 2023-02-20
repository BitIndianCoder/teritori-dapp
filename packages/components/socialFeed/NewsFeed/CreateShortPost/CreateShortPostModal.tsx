import React from "react";
import { MenuProvider } from "react-native-popup-menu";

import { useFetchFeed } from "../../../../hooks/useFetchFeed";
import { layout, NEWS_FEED_MAX_WIDTH } from "../../../../utils/style/layout";
import ModalBase from "../../../modals/ModalBase";
import { NewsFeedInput } from "../NewsFeedInput";

export const CreateShortPostModal: React.FC<{
  onClose: () => void;
  isVisible?: boolean;
}> = ({ onClose, isVisible }) => {
  const { refetch } = useFetchFeed();

  return (
    <ModalBase
      visible={isVisible}
      onClose={onClose}
      width={NEWS_FEED_MAX_WIDTH}
      label="Create a Post"
    >
      <MenuProvider>
        <NewsFeedInput
          onReachCharsLimit={onClose}
          type="post"
          onSubmitSuccess={() => {
            onClose();
            refetch();
          }}
          style={{ marginBottom: layout.padding_x2_5, paddingVertical: 70 }}
        />
      </MenuProvider>
    </ModalBase>
  );
};
