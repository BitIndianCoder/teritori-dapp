import { IBCCurrencyInfo } from "./ibc";

export enum NetworkKind {
  Unknown = "Unknown",
  Ethereum = "Ethereum",
  Cosmos = "Cosmos",
  Solana = "Solana",
  Gno = "Gno",
}

interface NetworkInfoBase {
  id: string;
  displayName: string;
  kind: NetworkKind;
  icon?: string;
  currencies: CurrencyInfo[];
  features: NetworkFeature[];
  idPrefix: string;
  txExplorer: string;
  accountExplorer: string;
  contractExplorer: string;
  testnet: boolean;
  backendEndpoint: string;
  secondaryDuringMintList?: string[];
  excludeFromLaunchpadList?: string[];

  // p2e
  distributorContractAddress?: string;
  riotContractAddressGen0?: string;
  riotContractAddressGen1?: string;
  overrides?: string;
}

export type CosmosNetworkInfo = NetworkInfoBase & {
  kind: NetworkKind.Cosmos;
  chainId: string;
  addressPrefix: string;
  restEndpoint: string;
  rpcEndpoint: string;
  stakeCurrency: string;
  registryName: string;
  gasPriceStep: {
    low: number;
    average: number;
    high: number;
  };
  cosmosFeatures: string[];
  walletUrlForStaking?: string;
  nameServiceCodeId?: number;
  nameServiceContractAddress?: string;
  nameServiceDefaultImage?: string;
  nameServiceTLD?: string;
  marketplaceVaultCodeId?: number;
  vaultContractAddress?: string;
  riotSquadStakingContractAddressV1?: string;
  riotSquadStakingContractAddressV2?: string;
  riotersFooterContractAddress?: string;
  socialFeedCodeId?: number;
  socialFeedContractAddress?: string;
  daoCw20CodeId?: number;
  daoFactoryCodeId?: number;
  daoCoreCodeId?: number;
  daoPreProposeSingleCodeId?: number;
  daoProposalSingleCodeId?: number;
  daoVotingCw20StakedCodeId?: number;
  daoCw20StakeCodeId?: number;
  daoCw4GroupCodeId?: number;
  daoVotingCw4CodeId?: number;
  daoFactoryContractAddress?: string;
  coreDAOAddress?: string;
};

export type EthereumNetworkInfo = NetworkInfoBase & {
  kind: NetworkKind.Ethereum;
  endpoint: string;
  chainId: number;
  alchemyApiKey: string;
  vaultContractAddress: string;
  riotSquadStakingContractAddress: string;
  firehoseEndpoint?: string;
  indexStartBlock?: string;
  indexStopBlock?: string;
  substreamsManifest?: string;
  toriBridgedTokenAddress?: string;

  riotContractAddressGen0: string;
  riotOriginalCollectionIdGen0?: string;
  riotBridgeAddressGen0?: string;
  riotNFTAddressGen0?: string;
  riotBridgedNFTAddressGen0?: string;

  riotContractAddressGen1?: string;
  riotOriginalCollectionIdGen1?: string;
  riotBridgeAddressGen1?: string;
  riotNFTAddressGen1?: string;
  riotBridgedNFTAddressGen1?: string;
};

export type GnoNetworkInfo = NetworkInfoBase & {
  kind: NetworkKind.Gno;
  chainId: string;
  endpoint: string;
  stakeCurrency: string;
  vaultContractAddress: string;
  nameServiceContractAddress: string;
  nameServiceDefaultImage: string;
  gnowebURL: string;
  daoRegistryPkgPath?: string;
  modboardsPkgPath?: string;
  socialFeedsPkgPath?: string;
  socialFeedsDAOPkgPath?: string;
  votingGroupPkgPath?: string;
  daoProposalSinglePkgPath?: string;
  daoInterfacesPkgPath?: string;
  daoCorePkgPath?: string;
  groupsPkgPath?: string;
  faucetURL?: string;
};

export type NetworkInfo =
  | CosmosNetworkInfo
  | EthereumNetworkInfo
  | GnoNetworkInfo;

export type NativeCurrencyInfo = {
  kind: "native";
  denom: string;
  displayName: string;
  decimals: number;
  coingeckoId: string;
  icon: string;
  color: string;
};

export type CurrencyInfo = NativeCurrencyInfo | IBCCurrencyInfo;

export enum NetworkFeature {
  NFTMarketplace = "NFTMarketplace",
  NFTLaunchpad = "NFTLaunchpad",
  NameService = "NameService",
  Swap = "Swap",
  BurnTokens = "BurnTokens",
  Organizations = "Organizations",
  P2E = "P2E",
  SocialFeed = "SocialFeed",
  UPP = "UPP",
  RiotP2E = "RiotP2E",
  NFTBridge = "NFTBridge",
}

export enum UserKind {
  Single = "Single",
  Multisig = "Multisig",
  Organization = "Organization",
}
