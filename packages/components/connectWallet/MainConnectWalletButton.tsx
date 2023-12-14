import React, { useState } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

import { ConnectWalletModal } from "./ConnectWalletModal";
import { NetworkFeature, NetworkInfo } from "../../networks";
import { ButtonsSize } from "../../utils/style/buttons";
import { PrimaryButton } from "../buttons/PrimaryButton";

export const MainConnectWalletButton: React.FC<{
  network?: NetworkInfo;
  style?: StyleProp<ViewStyle>;
  size?: ButtonsSize;
  forceNetworkFeature?: NetworkFeature;
}> = ({ network, style, forceNetworkFeature, size = "XL" }) => {
  const [isConnectWalletVisible, setIsConnectWalletVisible] = useState(false);

  return (
    <View style={style}>
      <PrimaryButton
        size={size}
        text="Connect wallet"
        onPress={() => setIsConnectWalletVisible(true)}
      />
      <ConnectWalletModal
        network={network}
        forceNetworkFeature={forceNetworkFeature}
        visible={isConnectWalletVisible}
        onClose={() => setIsConnectWalletVisible(false)}
      />
    </View>
  );
};
