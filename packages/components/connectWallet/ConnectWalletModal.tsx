import React, { useCallback, useState } from "react";
import { View } from "react-native";

import { ConnectAdenaButton } from "./ConnectAdenaButton";
import { ConnectKeplrButton } from "./ConnectKeplrButton";
import { ConnectLeapButton } from "./ConnectLeapButton";
import { ConnectMetamaskButton } from "./ConnectMetamaskButton";
import { ConnectWalletButton } from "./components/ConnectWalletButton";
import walletConnectSVG from "../../../assets/icons/wallet-connect.svg";
import { useSelectedNetworkInfo } from "../../hooks/useSelectedNetwork";
import { NetworkFeature, NetworkInfo, NetworkKind } from "../../networks";
import { neutral77, secondaryColor } from "../../utils/style/colors";
import { fontSemibold14 } from "../../utils/style/fonts";
import { layout } from "../../utils/style/layout";
import { BrandText } from "../BrandText";
import { DisclaimerPopup } from "../PopupDisclaimer/DisclaimerPopup";
import { TertiaryButton } from "../buttons/TertiaryButton";
import ModalBase from "../modals/ModalBase";
import { SeparatorGradient } from "../separators/SeparatorGradient";
import { SpacerColumn } from "../spacer";

type ConnectWalletProps = {
  onClose: () => void;
  visible: boolean;
  forceNetworkFeature?: NetworkFeature;
  network?: NetworkInfo;
};

export const ConnectWalletModal: React.FC<ConnectWalletProps> = ({
  onClose,
  visible,
  forceNetworkFeature,
  network,
}) => {
  const selectedNetwork = useSelectedNetworkInfo();
  const networkToUse = network || selectedNetwork;

  const [isDisclaimerVisible, setIsDisclaimerVisible] = useState(false);

  const canConnectWallet = useCallback(
    (networkKind: NetworkKind) =>
      networkToUse &&
      (!forceNetworkFeature ||
        (networkToUse.features.includes(forceNetworkFeature) &&
          networkToUse.kind === networkKind)),
    [forceNetworkFeature, networkToUse],
  );

  // functions
  const toggleDisclaimer = () => setIsDisclaimerVisible(!isDisclaimerVisible);

  return (
    <ModalBase
      label="Connect Wallet"
      description="Choose Blockchain of the wallet that you want to add to your Multi-wallet profile"
      onClose={onClose}
      visible={visible}
      hideMainSeparator
      width={457}
    >
      {canConnectWallet(NetworkKind.Cosmos) && (
        <>
          <ConnectKeplrButton onDone={onClose} />
          <SpacerColumn size={1.5} />
          <ConnectLeapButton onDone={onClose} />
          <SpacerColumn size={1.5} />
        </>
      )}
      {canConnectWallet(NetworkKind.Ethereum) && (
        <>
          <ConnectMetamaskButton onDone={onClose} />
          <SpacerColumn size={1.5} />
        </>
      )}
      {canConnectWallet(NetworkKind.Gno) && (
        <>
          <ConnectAdenaButton onDone={onClose} />
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
    </ModalBase>
  );
};
