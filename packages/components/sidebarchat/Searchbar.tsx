import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import farward from "../../../assets/icons/farward.svg";
import friends from "../../../assets/icons/friends.svg";
import { SVG } from "../../../packages/components/SVG";
import { neutral22, secondaryColor } from "../../utils/style/colors";
import { fontSemibold13 } from "../../utils/style/fonts";
import { BrandText } from "../BrandText";
import FlexRow from "../FlexRow";
import { SpacerRow } from "../spacer";
const Searchbar = () => {
  return (
    <View style={styles.friendBox}>
      <FlexRow justifyContent="space-between">
        <View>
          <FlexRow>
            <SpacerRow size={1.3} />
            <SVG source={friends} />
            <SpacerRow size={1} />
            <BrandText style={[fontSemibold13, { color: secondaryColor }]}>
              Friends
            </BrandText>
          </FlexRow>
        </View>
        <View>
          <FlexRow>
            <BrandText style={[fontSemibold13, { color: secondaryColor }]}>
              100
            </BrandText>
            <SpacerRow size={2} />
            <TouchableOpacity>
              <SVG source={farward} />
            </TouchableOpacity>
            <SpacerRow size={2} />
          </FlexRow>
        </View>
      </FlexRow>
    </View>
  );
};

const styles = StyleSheet.create({
  friendBox: {
    backgroundColor: neutral22,
    height: 40,
    borderRadius: 6,

    flexDirection: "row",
  },
});
export default Searchbar;
