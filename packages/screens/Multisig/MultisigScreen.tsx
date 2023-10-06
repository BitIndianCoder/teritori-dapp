import React from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { GetStartedOption } from "./components/GetStartedOption";
import multisigWalletSVG from "../../../assets/icons/organization/multisig-wallet.svg";
import postJobSVG from "../../../assets/icons/organization/post-job.svg";
import { JoinState } from "../../api/multisig/v1/multisig";
import { BrandText } from "../../components/BrandText";
import { ScreenContainer } from "../../components/ScreenContainer";
import { Separator } from "../../components/Separator";
import { AnimationFadeIn } from "../../components/animations/AnimationFadeIn";
import { LoginButton } from "../../components/multisig/LoginButton";
import { MultisigTransactions } from "../../components/multisig/MultisigTransactions";
import { SpacerColumn } from "../../components/spacer";
import { useMultisigAuthToken } from "../../hooks/multisig/useMultisigAuthToken";
import { useUserMultisigs } from "../../hooks/multisig/useUserMultisigs";
import useSelectedWallet from "../../hooks/useSelectedWallet";
import { getUserId, NetworkKind } from "../../networks";
import { ScreenFC, useAppNavigation } from "../../utils/navigation";
import { neutral33, neutral77, secondaryColor } from "../../utils/style/colors";
import { fontSemibold16, fontSemibold28 } from "../../utils/style/fonts";
import { layout } from "../../utils/style/layout";
import { tinyAddress } from "../../utils/text";

export const MultisigScreen: ScreenFC<"Multisig"> = () => {
  const navigation = useAppNavigation();
  const selectedWallet = useSelectedWallet();
  const authToken = useMultisigAuthToken(selectedWallet?.userId);

  const {
    multisigs: data,
    isLoading: isMultisigLoading,
    isFetching: isMultisigFetching,
  } = useUserMultisigs(selectedWallet?.userId, JoinState.JOIN_STATE_IN);

  const { multisigs: invitations } = useUserMultisigs(
    selectedWallet?.userId,
    JoinState.JOIN_STATE_OUT
  );

  return (
    <ScreenContainer
      headerChildren={<BrandText>Multisig Wallets</BrandText>}
      footerChildren={<></>}
      noMargin
      fullWidth
      onBackPress={() => navigation.navigate("Multisig")}
      noScroll
      forceNetworkKind={NetworkKind.Cosmos}
    >
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.horizontalContentPadding}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <BrandText style={fontSemibold28}>My Multisigs</BrandText>
              <LoginButton userId={selectedWallet?.userId} />
            </View>
            <SpacerColumn size={1.5} />
            <BrandText style={[fontSemibold16, { color: neutral77 }]}>
              Overview of your Multisignatures Wallets
            </BrandText>
            <SpacerColumn size={2.5} />
            <FlatList
              data={data}
              horizontal
              keyExtractor={(item) => item.address}
              renderItem={({ item, index }) => (
                <AnimationFadeIn delay={index * 50}>
                  <GetStartedOption
                    variant="small"
                    title={
                      item.name || `Multisig #${(data?.length || 0) - index}`
                    }
                    icon={multisigWalletSVG}
                    isBetaVersion
                    onPress={() =>
                      navigation.navigate("MultisigWalletDashboard", {
                        id: getUserId(selectedWallet?.networkId, item.address),
                      })
                    }
                    subtitle={tinyAddress(item.address, 21)}
                    titleStyle={{ color: secondaryColor }}
                  />
                </AnimationFadeIn>
              )}
              ListHeaderComponent={() => (
                <GetStartedOption
                  variant="small"
                  title="Create new"
                  icon={postJobSVG}
                  isBetaVersion
                  disabled={!authToken}
                  onPress={() => navigation.navigate("MultisigCreate")}
                />
              )}
              ListFooterComponent={() =>
                isMultisigLoading && isMultisigFetching ? (
                  <View style={styles.contentCenter}>
                    <ActivityIndicator color={secondaryColor} />
                  </View>
                ) : null
              }
            />
          </View>
          <SpacerColumn size={3} />
          {!!invitations?.length && (
            <>
              <View style={styles.horizontalContentPadding}>
                <BrandText style={fontSemibold28}>Invitations</BrandText>
                <SpacerColumn size={1.5} />
                <BrandText style={[fontSemibold16, { color: neutral77 }]}>
                  Multisignatures Wallets you did not join yet
                </BrandText>
                <SpacerColumn size={2.5} />
                <FlatList
                  data={invitations}
                  horizontal
                  keyExtractor={(item) => item.address}
                  renderItem={({ item, index }) => (
                    <AnimationFadeIn delay={index * 50}>
                      <GetStartedOption
                        variant="small"
                        title={
                          item.name ||
                          `Multisig #${(invitations?.length || 0) - index}`
                        }
                        icon={multisigWalletSVG}
                        isBetaVersion
                        onPress={() =>
                          navigation.navigate("MultisigWalletDashboard", {
                            id: getUserId(
                              selectedWallet?.networkId,
                              item.address
                            ),
                          })
                        }
                        subtitle={tinyAddress(item.address, 21)}
                        titleStyle={{ color: secondaryColor }}
                      />
                    </AnimationFadeIn>
                  )}
                  ListFooterComponent={() =>
                    isMultisigLoading && isMultisigFetching ? (
                      <View style={styles.contentCenter}>
                        <ActivityIndicator color={secondaryColor} />
                      </View>
                    ) : null
                  }
                />
              </View>
              <SpacerColumn size={3} />
            </>
          )}
          {!!authToken && (
            <View style={styles.horizontalContentPadding}>
              <Separator color={neutral33} />
              <SpacerColumn size={3} />
              <MultisigTransactions
                title="Multisig Transactions Overview"
                userId={selectedWallet?.userId}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

// FIXME: remove StyleSheet.create
// eslint-disable-next-line no-restricted-syntax
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: layout.topContentSpacingWithHeading,
  },
  horizontalContentPadding: {
    paddingHorizontal: layout.contentSpacing,
  },
  optionsScrollContent: {
    paddingHorizontal: layout.contentSpacing - layout.spacing_x2,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -layout.spacing_x2,
    marginVertical: -layout.spacing_x2,
  },
  contentCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 135,
  },
  transactionListContent: {
    marginTop: layout.spacing_x2_5,
  },
});
