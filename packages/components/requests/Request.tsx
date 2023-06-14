import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar, Badge } from "react-native-paper";

import { Separator } from "../../components/Separator";
import { useFeedbacks } from "../../context/FeedbacksProvider";
import {
  neutral22,
  neutral30,
  neutralA3,
  primaryColor,
  primaryTextColor,
  secondaryColor,
} from "../../utils/style/colors";
import {
  fontSemibold11,
  fontSemibold13,
  fontSemibold14,
} from "../../utils/style/fonts";
import { GroupMetadataEvent } from "../../weshnet";
import { weshClient } from "../../weshnet/client";
import {
  acceptFriendRequest,
  activateGroup,
} from "../../weshnet/client/services";
import {
  bytesFromString,
  decode,
  decodeJSON,
  stringFromBytes,
} from "../../weshnet/client/utils";
import { BrandText } from "../BrandText";
import FlexRow from "../FlexRow";
import { TertiaryBox } from "../boxes/TertiaryBox";
import { PrimaryButton } from "../buttons/PrimaryButton";
import { SecondaryButton } from "../buttons/SecondaryButton";
import { SpacerColumn, SpacerRow } from "../spacer";
type Props = {
  name: string;
  isOnline: boolean;
  avatar: any;
  data: GroupMetadataEvent;
};

const RequestList = ({ isOnline, data }: Props) => {
  const { setToastSuccess, setToastError } = useFeedbacks();
  const [addLoading, setAddLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [metadata, setMetadata] = useState({
    name: "Anon",
    avatar: "",
    contactPk: "",
  });

  useEffect(() => {
    if (data?.metadata?.payload) {
      console.log(new TextDecoder().decode(data.metadata.payload));
      try {
        setMetadata(JSON.parse(decodeJSON(data.metadata.payload)));
        // const match = decode(data.metadata.payload).match(/{".+"}/gm);

        // if (!match?.[0]) {
        //   setToastError({
        //     title: "Invalid data",
        //     message: "Failed to process the data",
        //   });
        // } else {
        //   setMetadata(JSON.parse(match[0]));
        // }
      } catch (err) {
        console.log("decode", err);
      }
    }
  }, [data]);

  const onlineStatusBadgeColor = isOnline ? "green" : "yellow";

  const handleAddFriend = async () => {
    console.log(metadata);
    setAddLoading(true);
    try {
      await acceptFriendRequest(
        bytesFromString("YWEdA4W5D2CDKyXTMaF+waYmkjoNwvnyhc8hw8rvb20=")
      );
    } catch (err) {
      console.log("add friend err", err);
      setToastError({
        title: "Failed",
        message: "Failed to accept contact. Please try again later.",
      });
    }
    setAddLoading(false);
  };

  const handleCancelFriend = async () => {
    setRejectLoading(true);
    try {
      await weshClient.ContactRequestDiscard({
        contactPk: bytesFromString(metadata.contactPk),
      });
    } catch (err) {
      setToastError({
        title: "Failed",
        message: "Failed to reject contact. Please try again later.",
      });
    }
    setRejectLoading(false);
  };

  return (
    <View>
      <FlexRow justifyContent="space-between">
        <View>
          <FlexRow>
            <Avatar.Image size={40} source={metadata.avatar} />
            <Badge
              style={{
                position: "absolute",
                top: 30,
                left: 30,

                backgroundColor: onlineStatusBadgeColor,
              }}
              size={12}
            />
            <SpacerRow size={1.5} />
            <View>
              <BrandText style={[fontSemibold13, { color: secondaryColor }]}>
                {metadata.name}
              </BrandText>
              <SpacerColumn size={0.4} />
              <BrandText style={[fontSemibold11, { color: neutralA3 }]}>
                {isOnline ? "Online" : "Offline"}
              </BrandText>
            </View>
          </FlexRow>
        </View>
        <View>
          <FlexRow>
            <PrimaryButton
              onPress={handleAddFriend}
              isLoading={addLoading}
              text="Add"
              size="SM"
            />
            <SpacerRow size={1.5} />
            <SecondaryButton
              onPress={handleCancelFriend}
              isLoading={rejectLoading}
              text="Reject"
              size="SM"
            />
          </FlexRow>
        </View>
      </FlexRow>
      <SpacerColumn size={1.3} />
      <Separator color={neutral22} />
      <SpacerColumn size={1.3} />
    </View>
  );
};

export default RequestList;
