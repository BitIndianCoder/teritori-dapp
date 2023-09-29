import { Platform } from "react-native";

import { weshConfig } from "./config";
import { bootWeshnet } from "./services";
import { isElectron } from "../../utils/isElectron";
import { ProtocolServiceClientImpl, createWeshClient } from "../index";

const getAddress = (port) => {
  switch (Platform.OS) {
    case "android":
      return `10.0.2.2:${port}`;
    case "ios":
      return `http://127.0.0.1:${port}`;
    default:
      return `http://localhost:${port}`;
  }
};

class WeshClient {
  private _client: ProtocolServiceClientImpl;

  get client() {
    return this._client;
  }
  async createClient(port) {
    try {
      if (port === 0) {
        return;
      }

      const address = getAddress(port);
      console.log("url defined port", port, address);

      const client = createWeshClient(address);
      const config = await client.ServiceGetConfiguration({});
      weshConfig.config = config;
      this._client = client;
      console.log("done -->");
      await bootWeshnet();
    } catch (err) {
      console.log("create Client er", err);
    }
  }
}

const weshClient = new WeshClient();

if (Platform.OS === "web" && !isElectron()) {
  setTimeout(() => {
    weshClient.createClient(4242);
  }, 5 * 1000);
}

export { weshClient };
