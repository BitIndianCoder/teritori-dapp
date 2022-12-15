import React, { useState } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

import { ButtonsSize } from "../../utils/style/buttons";
import { PrimaryButton } from "../buttons/PrimaryButton";
import { ConnectWalletModal } from "./ConnectWalletModal";

export const MainConnectWalletButton: React.FC<{
  style?: StyleProp<ViewStyle>;
  size?: ButtonsSize;
}> = ({ style, size = "XL" }) => {
  const [isConnectWalletVisible, setIsConnectWalletVisible] = useState(false);
  return (
    <View style={style}>
      <PrimaryButton
        size={size}
        text="Connect wallet"
        onPress={() => setIsConnectWalletVisible(true)}
      />
      <ConnectWalletModal
        visible={isConnectWalletVisible}
        onClose={() => setIsConnectWalletVisible(false)}
      />
    </View>
  );
};
