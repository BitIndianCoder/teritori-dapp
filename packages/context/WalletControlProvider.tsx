import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { Linking, View } from "react-native";

import walletConnectSVG from "../../assets/icons/wallet-connect.svg";
import { Coin } from "../api/teritori-chain/cosmos/base/v1beta1/coin";
import { BrandText } from "../components/BrandText";
import { DisclaimerPopup } from "../components/PopupDisclaimer/DisclaimerPopup";
import { WalletStatusBox } from "../components/WalletStatusBox";
import { SecondaryButton } from "../components/buttons/SecondaryButton";
import { TertiaryButton } from "../components/buttons/TertiaryButton";
import { ConnectAdenaButton } from "../components/connectWallet/ConnectAdenaButton";
import { ConnectKeplrButton } from "../components/connectWallet/ConnectKeplrButton";
import { ConnectLeapButton } from "../components/connectWallet/ConnectLeapButton";
import { ConnectMetamaskButton } from "../components/connectWallet/ConnectMetamaskButton";
import { ConnectWalletButton } from "../components/connectWallet/components/ConnectWalletButton";
import ModalBase from "../components/modals/ModalBase";
import { SeparatorGradient } from "../components/separators/SeparatorGradient";
import { SpacerColumn } from "../components/spacer";
import { useBalances } from "../hooks/useBalances";
import { useSelectedNetworkInfo } from "../hooks/useSelectedNetwork";
import useSelectedWallet from "../hooks/useSelectedWallet";
import {
  CurrencyInfo,
  getNativeCurrency,
  NetworkFeature,
  NetworkInfo,
  NetworkKind,
} from "../networks";
import { teritoriCurrencies } from "../networks/teritori/currencies";
import { DepositWithdrawModal } from "../screens/WalletManager/components/DepositWithdrawModal";
import { prettyPrice } from "../utils/coins";
import { useAppNavigation } from "../utils/navigation";
import { neutral77, secondaryColor } from "../utils/style/colors";
import { fontSemibold14, fontSemibold20 } from "../utils/style/fonts";
import { layout } from "../utils/style/layout";

export enum ControlledWalletAction {
  POST = "Publish a Post",
  PUBLISH_ARTICLE = "Publish an Article",
  PUBLISH_TRACK = "Publish a Track",
  PUBLISH_VIDEO = "Publish a Video",
  COMMENT = "Comment",
  REACT = "React",
  LIKE = "Like",
  DISLIKE = "Dislike",
  TIP = "Tip",
  MINT_COLLECTION = "Mint this Collection",
  MINT_NAME = "Mint this Name",
  REGISTER_NAME = "Register a Name",
  DEPOSIT = "Deposit tokens",
  WITHDRAW = "Withdraw tokens",
}

interface DoSomethingButton {
  text: string;
  onPress: () => void;
}

interface ControlledWalletFundsParams {
  callback: (() => Promise<void>) | (() => void);
  canPay: boolean;
  cost: Coin;
  action: ControlledWalletAction;
  forceNetworkFeature?: NetworkFeature;
  currency?: CurrencyInfo;
  network?: NetworkInfo;
}

interface ControlledWalletConnectedParams {
  callback: (() => Promise<void>) | (() => void);
  action: ControlledWalletAction;
  forceNetworkFeature?: NetworkFeature;
}

interface WalletControlProviderValue {
  controlWalletFunds: (params: ControlledWalletFundsParams) => Promise<void>;
  controlWalletConnected: (
    params: ControlledWalletConnectedParams,
  ) => Promise<void>;
}

const defaultValue: WalletControlProviderValue = {
  controlWalletFunds: async () => {},
  controlWalletConnected: async () => {},
};

const WalletControlContext = createContext(defaultValue);

export const WalletControlContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const selectedNetwork = useSelectedNetworkInfo();
  const selectedWallet = useSelectedWallet();
  const navigation = useAppNavigation();
  const [forceNetworkFeature, setForceNetworkFeature] =
    useState<NetworkFeature>();
  const [currency, setCurrency] = useState<CurrencyInfo>();
  const [network, setNetwork] = useState<NetworkInfo>();
  const [action, setAction] = useState<ControlledWalletAction>(
    ControlledWalletAction.POST,
  );
  const [isNotEnoughFundModalVisible, setNotEnoughFundModalVisible] =
    useState(false);
  const [cost, setCost] = useState<Coin>();
  const [callback1, setCallback1] = useState<
    (() => Promise<void>) | (() => void)
  >();
  const [connectWalletVisible, setConnectWalletVisible] = useState(false);
  const [isDepositModalVisible, setDepositModalVisible] = useState(false);
  const [isDisclaimerVisible, setIsDisclaimerVisible] = useState(false);

  const networkToUse = network || selectedNetwork;
  const balances = useBalances(networkToUse?.id, selectedWallet?.address);
  const costBalance = balances.find((bal) => bal.denom === cost?.denom);
  const nativeCurrency = getNativeCurrency(networkToUse?.id, currency?.denom);

  const modalLabel =
    !selectedWallet?.connected || !selectedWallet?.address
      ? `Connect wallet to ${action}`
      : `Insufficient funds to ${action}`;

  const doSomethingButtons: DoSomethingButton[] =
    currency?.kind === "ibc"
      ? [
          {
            text: `Deposit ${nativeCurrency?.displayName}`,
            onPress: () => setDepositModalVisible(true),
          },
        ]
      : [
          {
            text: "Mint an NFT on the marketplace",
            onPress: () => {
              navigation.navigate("Launchpad");
              setNotEnoughFundModalVisible(false);
            },
          },
          {
            text: "Sell an NFT on the marketplace",
            onPress: () => {
              navigation.navigate("Marketplace");
              setNotEnoughFundModalVisible(false);
            },
          },
          {
            text: "Add funds with card",
            onPress: () => Linking.openURL("https://app.kado.money/"),
          },
        ];

  const toggleDisclaimer = () =>
    setIsDisclaimerVisible((isDisclaimerVisible) => !isDisclaimerVisible);
  const reset = () => {
    setNotEnoughFundModalVisible(false);
    setCallback1(undefined);
    setCost(undefined);
    setForceNetworkFeature(undefined);
    setCurrency(undefined);
    setNetwork(undefined);
  };

  const canConnectWallet = useCallback(
    (networkKind: NetworkKind) =>
      networkToUse &&
      (!forceNetworkFeature ||
        (networkToUse.features.includes(forceNetworkFeature) &&
          networkToUse.kind === networkKind)),
    [forceNetworkFeature, networkToUse],
  );

  const controlWalletConnected = useCallback(
    async ({
      callback,
      forceNetworkFeature,
      action,
    }: ControlledWalletConnectedParams) => {
      setCallback1(() => callback);
      setForceNetworkFeature(forceNetworkFeature);
      setAction(action);

      if (!selectedWallet?.address || !selectedWallet.connected) {
        setNotEnoughFundModalVisible(true);
        setConnectWalletVisible(true);
      } else {
        reset();
        await callback();
      }
    },
    [selectedWallet],
  );

  const controlWalletFunds = useCallback(
    async ({
      callback,
      canPay,
      cost,
      currency,
      network,
      action,
      forceNetworkFeature,
    }: ControlledWalletFundsParams) => {
      const toriCurrency = teritoriCurrencies.find(
        (currency) => currency.denom === "utori",
      );
      setCost(cost);
      setForceNetworkFeature(forceNetworkFeature);
      setCurrency(currency || toriCurrency);
      setNetwork(network);
      setAction(action);

      if (!selectedWallet?.address || !selectedWallet.connected) {
        setNotEnoughFundModalVisible(true);
        setConnectWalletVisible(true);
      } else if (!canPay) {
        setNotEnoughFundModalVisible(true);
        setConnectWalletVisible(false);
      } else {
        reset();
        await callback();
      }
    },
    [selectedWallet],
  );

  const onConnectDone = async () => {
    await callback1?.();
    setNotEnoughFundModalVisible(false);
  };

  return (
    <WalletControlContext.Provider
      value={{
        controlWalletConnected,
        controlWalletFunds,
      }}
    >
      {isDepositModalVisible && networkToUse && currency && (
        <DepositWithdrawModal
          variation="deposit"
          networkId={networkToUse.id}
          targetCurrency={currency.denom}
          onClose={() => setDepositModalVisible(false)}
          isVisible
        />
      )}

      <ModalBase
        visible={isNotEnoughFundModalVisible}
        onClose={() => setNotEnoughFundModalVisible(false)}
        width={457}
        label={modalLabel}
      >
        {connectWalletVisible ? (
          <>
            {canConnectWallet(NetworkKind.Cosmos) && (
              <>
                <ConnectKeplrButton onDone={onConnectDone} />
                <SpacerColumn size={1.5} />
                <ConnectLeapButton onDone={onConnectDone} />
                <SpacerColumn size={1.5} />
              </>
            )}
            {canConnectWallet(NetworkKind.Ethereum) && (
              <>
                <ConnectMetamaskButton onDone={onConnectDone} />
                <SpacerColumn size={1.5} />
              </>
            )}
            {canConnectWallet(NetworkKind.Gno) && (
              <>
                <ConnectAdenaButton onDone={onConnectDone} />
                <SpacerColumn size={1.5} />
              </>
            )}

            <ConnectWalletButton
              text="Wallet Connect"
              isComingSoon
              icon={walletConnectSVG}
            />
            <View style={{ paddingVertical: layout.spacing_x2_5 }}>
              <SeparatorGradient />
              <SpacerColumn size={2.5} />

              <BrandText
                style={[
                  fontSemibold14,
                  {
                    color: neutral77,
                    lineHeight: 20,
                  },
                ]}
              >
                By connecting a wallet, you acknowledge that you have read and
                understand the{" "}
                <BrandText
                  style={[
                    fontSemibold14,
                    {
                      color: secondaryColor,
                    },
                  ]}
                >
                  Teritori Protocol Disclaimer.
                </BrandText>
              </BrandText>
              <SpacerColumn size={2.5} />

              <TertiaryButton
                size="M"
                fullWidth
                // disabled
                text="Read the full Disclaimer & Privacy Policy"
                onPress={toggleDisclaimer}
              />
            </View>
            <DisclaimerPopup
              visible={isDisclaimerVisible}
              onClose={toggleDisclaimer}
            />
          </>
        ) : (
          <>
            <WalletStatusBox />
            <SpacerColumn size={2} />
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <BrandText style={[fontSemibold14, { color: neutral77 }]}>
                  Balance
                </BrandText>
                <BrandText style={fontSemibold14}>
                  {!costBalance
                    ? `0 ${nativeCurrency?.displayName}`
                    : prettyPrice(
                        networkToUse?.id,
                        costBalance.amount,
                        costBalance.denom,
                      )}
                </BrandText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <BrandText style={[fontSemibold14, { color: neutral77 }]}>
                  Transaction cost
                </BrandText>
                <BrandText style={fontSemibold14}>
                  {prettyPrice(networkToUse?.id, cost?.amount, cost?.denom)}
                </BrandText>
              </View>
            </View>

            <SpacerColumn size={2.5} />
            <SeparatorGradient />
            <SpacerColumn size={2.5} />
            <BrandText style={fontSemibold20}>
              Do something to get {nativeCurrency?.displayName}
            </BrandText>
            <SpacerColumn size={2.5} />

            <View style={{ flex: 1, alignItems: "center" }}>
              {doSomethingButtons.map((item) => (
                <SecondaryButton
                  key={item.text}
                  text={item.text}
                  onPress={item.onPress}
                  size="XL"
                  style={{
                    marginBottom: 20,
                  }}
                  fullWidth
                />
              ))}
            </View>
          </>
        )}
      </ModalBase>

      {children}
    </WalletControlContext.Provider>
  );
};

export const useWalletControl = () => useContext(WalletControlContext);
