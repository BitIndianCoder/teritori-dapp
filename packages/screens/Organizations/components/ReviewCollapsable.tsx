// libraries
import React, { useEffect, useRef, useState } from "react";
import { Pressable, View, ViewStyle } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

// misc
import chevronDownSVG from "../../../../assets/icons/chevron-down.svg";
import { BrandText } from "../../../components/BrandText";
import { SVG } from "../../../components/SVG";
import {
  neutral33,
  primaryColor,
  secondaryColor,
} from "../../../utils/style/colors";
import { fontSemibold14 } from "../../../utils/style/fonts";
import { layout } from "../../../utils/style/layout";

type ReviewCollapsableProps = {
  title: string;
  isExpandedByDefault?: boolean;
};

export const ReviewCollapsable: React.FC<ReviewCollapsableProps> = ({
  title,
  children,
  isExpandedByDefault = false,
}) => {
  // variables
  const [isExpanded, setIsExpanded] = useState(false);
  const aref = useAnimatedRef<View>();
  const heightRef = useRef<number>(0);
  const style = useAnimatedStyle(
    () => ({
      height: isExpanded ? withTiming(heightRef.current) : withTiming(0),
      opacity: isExpanded ? withTiming(1) : withTiming(0),
    }),
    [isExpanded]
  );
  const rotateStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      isExpanded ? 1 : 0,
      [0, 1],
      [0, 180],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ rotate: `${rotate}deg` }],
    };
  }, [isExpanded]);

  // hooks
  useEffect(() => {
    setTimeout(() => {
      if (isExpandedByDefault) {
        setIsExpanded(true);
      }
    }, 1000);
  }, [isExpandedByDefault]);

  // functions
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  // returns
  return (
    <View style={containerStyle}>
      <Pressable onPress={toggleExpansion} style={headerStyle}>
        <View style={rowWithCenterStyle}>
          <BrandText style={[fontSemibold14, { lineHeight: 14 }]}>
            {title}
          </BrandText>
        </View>

        <Animated.View style={[chevronContainerStyle, rotateStyle]}>
          <SVG
            source={chevronDownSVG}
            width={16}
            height={16}
            color={isExpanded ? primaryColor : secondaryColor}
          />
        </Animated.View>
      </Pressable>
      <Animated.View style={[childrenContainerStyle, style]}>
        <View
          ref={aref}
          onLayout={({
            nativeEvent: {
              layout: { height: h },
            },
          }) => (heightRef.current = h)}
          style={[childrenContainerStyle, childInsideContainerStyle]}
        >
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

const containerStyle: ViewStyle = {
  borderRadius: 12,
  borderWidth: 1,
  borderColor: neutral33,
};
const headerStyle: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  padding: layout.padding_x2,
};
const rowWithCenterStyle: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
};
const chevronContainerStyle: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
};
const childrenContainerStyle: ViewStyle = {
  width: "100%",
};
const childInsideContainerStyle: ViewStyle = {
  padding: layout.padding_x1,
  borderTopWidth: 1,
  borderColor: neutral33,
};
