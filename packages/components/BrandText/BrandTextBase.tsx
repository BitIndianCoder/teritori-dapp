import React from "react";
import { Text, TextProps, TextStyle } from "react-native";
import TextTicker from "react-native-text-ticker";

export const BrandTextBase: React.FC<TextProps & { isTicker?: boolean }> = (
  props
) => {
  const { style, isTicker, ...otherProps } = props;

  if (isTicker)
    return (
      <TextTicker
        style={[baseStyle, style]}
        duration={4000}
        loop
        repeatSpacer={16}
        marqueeDelay={1000}
        {...otherProps}
      />
    );
  else
    return (
      <Text style={[baseStyle, style]} {...otherProps}>
        {props.children}
      </Text>
    );
};

const baseStyle: TextStyle = {
  color: "white",
  fontSize: 20,
  fontWeight: "600",
};
