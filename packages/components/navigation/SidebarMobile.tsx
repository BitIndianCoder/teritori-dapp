import React, { FC } from "react";
import { FlatList, useWindowDimensions, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  WithSpringConfig,
} from "react-native-reanimated";

import { SidebarButton } from "./components/SidebarButton";
import { SidebarType } from "./types";
import addSVG from "../../../assets/icons/add-circle.svg";
import { useSidebar } from "../../context/SidebarProvider";
import { useSelectedNetworkKind } from "../../hooks/useSelectedNetwork";
import { NetworkKind } from "../../networks";
import { RouteName, useAppNavigation } from "../../utils/navigation";
import { neutral00, neutral33 } from "../../utils/style/colors";
import {
  MOBILE_HEADER_HEIGHT,
  MOBILE_SIDEBAR_MAX_WIDTH,
} from "../../utils/style/layout";
import { SpacerColumn } from "../spacer";

const SpringConfig: WithSpringConfig = {
  stiffness: 100,
  mass: 0.5,
  restDisplacementThreshold: 0.2,
};

export const SidebarMobile: FC = () => {
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const selectedNetworkKind = useSelectedNetworkKind();
  const navigation = useAppNavigation();
  const { isSidebarExpanded, toggleSidebar, dynamicSidebar } = useSidebar();

  const layoutStyle = useAnimatedStyle(
    () => ({
      width: isSidebarExpanded
        ? withSpring(
            windowWidth < MOBILE_SIDEBAR_MAX_WIDTH
              ? windowWidth
              : MOBILE_SIDEBAR_MAX_WIDTH,
            SpringConfig
          )
        : withSpring(0, SpringConfig),
    }),
    [isSidebarExpanded, windowWidth]
  );

  const onRouteChange = (name: SidebarType["route"]) => {
    // @ts-expect-error
    navigation.navigate(name);
  };

  return (
    <Animated.View
      style={[
        containerStyle,
        layoutStyle,
        { height: windowHeight - MOBILE_HEADER_HEIGHT },
        !isSidebarExpanded && { borderRightWidth: 0 },
      ]}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        data={Object.values(dynamicSidebar)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          let { route } = item;
          if (
            item.disabledOn?.includes(
              selectedNetworkKind || NetworkKind.Unknown
            )
          ) {
            route = "ComingSoon";
          }

          return (
            <SidebarButton
              key={item.id}
              onPress={(routeName: RouteName) => {
                isSidebarExpanded && toggleSidebar();
                onRouteChange(routeName);
              }}
              {...item}
              route={route}
            />
          );
        }}
        ListHeaderComponent={<SpacerColumn size={1} />}
        ListFooterComponent={
          <>
            <SidebarButton
              icon={addSVG}
              iconSize={36}
              route="ComingSoon"
              key="ComingSoon2"
              id="ComingSoon2"
              title=""
              onPress={() => navigation.navigate("ComingSoon")}
            />
            <SpacerColumn size={1} />
          </>
        }
      />
    </Animated.View>
  );
};

const containerStyle: ViewStyle = {
  borderRightWidth: 1,
  borderColor: neutral33,
  backgroundColor: neutral00,
  position: "absolute",
  top: MOBILE_HEADER_HEIGHT,
  zIndex: 9999,
};
