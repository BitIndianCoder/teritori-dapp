import React from "react";
import { StyleProp, TextInput, ViewStyle } from "react-native";

import searchSVG from "../../../assets/icons/search.svg";
import { fontMedium14 } from "../../utils/style/fonts";
import { layout } from "../../utils/style/layout";
import { SVG } from "../SVG";
import { TertiaryBox } from "../boxes/TertiaryBox";

export const SearchInput: React.FC<{
  style?: StyleProp<ViewStyle>;
}> = ({ style }) => {
  const handleChangeText = () => {};

  return (
    <TertiaryBox
      style={style}
      height={48}
      mainContainerStyle={{
        padding: 12,
        flexDirection: "row",
        alignItems: "center",
      }}
      fullWidth
    >
      <SVG style={{ marginRight: layout.padding_x1 }} source={searchSVG} />
      <TextInput
        placeholder="Search..."
        onChangeText={handleChangeText}
        placeholderTextColor="#FFFFFF"
        style={[
          fontMedium14,
          { color: "#FFFFFF", outlineStyle: "none", width: "100%" },
        ]}
      />
    </TertiaryBox>
  );
};
