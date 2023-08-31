import React from "react";

import githubSVG from "../../../../assets/icons/github.svg";
import { BrandText } from "../../../components/BrandText";
import FlexRow from "../../../components/FlexRow";
import { SVG } from "../../../components/SVG";
import { TertiaryBox } from "../../../components/boxes/TertiaryBox";
import { SimpleButton } from "../../../components/buttons/SimpleButton";
import { neutral22 } from "../../../utils/style/colors";
import { fontSemibold12, fontSemibold13 } from "../../../utils/style/fonts";
import { layout } from "../../../utils/style/layout";

export const TaskItem: React.FC<{
  text: string;
  priority: "medium" | "hight";
}> = ({ text, priority }) => {
  return (
    <TertiaryBox
      fullWidth
      noBrokenCorners
      mainContainerStyle={{
        backgroundColor: neutral22,
        padding: layout.padding_x2,
        marginBottom: layout.padding_x2,
      }}
    >
      <BrandText
        style={[
          fontSemibold13,
          { alignSelf: "flex-start", alignItems: "center" },
        ]}
      >
        🔎 {text}
      </BrandText>

      <FlexRow
        style={{
          marginTop: layout.padding_x2,
          justifyContent: "space-between",
        }}
      >
        {priority === "hight" && (
          <SimpleButton
            bgColor="#673932"
            color="#ffffff"
            text="High 🔥"
            size="XS"
            style={fontSemibold12}
          />
        )}

        {priority === "medium" && (
          <SimpleButton
            bgColor="#705B38"
            color="#ffffff"
            text="Medium"
            size="XS"
            style={fontSemibold12}
          />
        )}

        <SVG source={githubSVG} width={24} height={24} />
      </FlexRow>
    </TertiaryBox>
  );
};
