import { FC } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";

import { HeaderMobile } from "./HeaderMobile";
import { useMaxResolution } from "../../hooks/useMaxResolution";
import { NetworkInfo, NetworkKind } from "../../networks";
import { DAppStoreData } from "../../screens/DAppStore/components/DAppStoreData";
import { neutral33, neutral77 } from "../../utils/style/colors";
import { fontBold12 } from "../../utils/style/fonts";
import { layout, MOBILE_HEADER_HEIGHT } from "../../utils/style/layout";
import { BrandText } from "../BrandText";
import { SelectedNetworkGate } from "../SelectedNetworkGate";
import { SidebarMobile } from "../navigation/SidebarMobile";

export const MobileTitle: FC<{ title: string }> = ({ title }) => {
  const { width: windowWidth } = useWindowDimensions();

  return (
    <View
      style={{
        height: 48,
        borderBottomWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: neutral33,
        width: windowWidth,
        paddingHorizontal: layout.padding_x2,
      }}
    >
      <BrandText style={[fontBold12, { color: neutral77 }]}>{title}</BrandText>
    </View>
  );
};

export const ScreenContainerMobile: FC<{
  networkFilter: (n: NetworkInfo) => boolean;
  // hasScroll: Pages like Home, !hasScroll: Pages like Feed
  hasScroll: boolean;
  forceNetworkId?: string;
  forceNetworkKind?: NetworkKind;
  mobileTitle?: string;
}> = ({
  children,
  networkFilter,
  hasScroll,
  forceNetworkId,
  forceNetworkKind,
  mobileTitle,
}) => {
  const { height: windowHeight } = useWindowDimensions();
  const { width } = useMaxResolution();

  return (
    <SafeAreaView style={styles.container}>
      <DAppStoreData />
      <HeaderMobile
        forceNetworkId={forceNetworkId}
        forceNetworkKind={forceNetworkKind}
      />
      <SidebarMobile />

      {/*==== Scrollable screen content*/}
      <View style={{ flex: 1, width: "100%", height: windowHeight }}>
        <SelectedNetworkGate filter={networkFilter}>
          {hasScroll ? (
            <ScrollView
              contentContainerStyle={[
                {
                  minHeight: windowHeight - MOBILE_HEADER_HEIGHT,
                },
              ]}
            >
              {mobileTitle ? <MobileTitle title={mobileTitle} /> : null}
              <View style={[styles.childrenContainer, { flex: 1, width }]}>
                {children}
              </View>
              {/*TODO: Put here Riotters Footer ?*/}
            </ScrollView>
          ) : (
            <>
              <View style={[styles.childrenContainer, { flex: 1 }]}>
                {children}
              </View>
            </>
            // TODO: Put here Riotters Footer ?
          )}
        </SelectedNetworkGate>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#000000",
    paddingTop: MOBILE_HEADER_HEIGHT,
  },
  childrenContainer: {
    height: "100%",
    alignSelf: "center",
  },
});
