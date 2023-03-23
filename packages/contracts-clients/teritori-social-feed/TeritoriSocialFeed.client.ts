//@ts-nocheck

/**
 * This file was automatically generated by @cosmwasm/ts-codegen@0.25.0.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run the @cosmwasm/ts-codegen generate command to regenerate this file.
 */

import {
  CosmWasmClient,
  SigningCosmWasmClient,
  ExecuteResult,
} from "@cosmjs/cosmwasm-stargate";
import { Coin, StdFee } from "@cosmjs/amino";
import {
  Addr,
  Config,
  ExecuteMsg,
  Uint128,
  InstantiateMsg,
  PostCategory,
  PostResult,
  Reaction,
  Post,
  QueryMsg,
} from "./TeritoriSocialFeed.types";
export interface TeritoriSocialFeedReadOnlyInterface {
  contractAddress: string;
  config: () => Promise<ConfigResponse>;
  queryFeeByCategory: ({
    category,
  }: {
    category: number;
  }) => Promise<QueryFeeByCategoryResponse>;
  queryLockedTokens: ({
    wallet,
  }: {
    wallet: string;
  }) => Promise<QueryLockedTokensResponse>;
  queryAvailableFreePosts: ({
    wallet,
  }: {
    wallet: string;
  }) => Promise<QueryAvailableFreePostsResponse>;
  queryPost: ({
    identifier,
    user,
  }: {
    identifier: string;
    user?: string;
  }) => Promise<QueryPostResponse>;
  querySubPost: ({
    identifier,
    index,
    user,
  }: {
    identifier: string;
    index: number;
    user?: string;
  }) => Promise<QuerySubPostResponse>;
  querySubPosts: ({
    count,
    from,
    identifier,
    sort,
    user,
  }: {
    count: number;
    from: number;
    identifier: string;
    sort: string;
    user?: string;
  }) => Promise<QuerySubPostsResponse>;
  queryMainPosts: ({
    count,
    from,
    sort,
    user,
  }: {
    count: number;
    from: number;
    sort: string;
    user?: string;
  }) => Promise<QueryMainPostsResponse>;
  queryMainPostsCount: () => Promise<QueryMainPostsCountResponse>;
}
export class TeritoriSocialFeedQueryClient
  implements TeritoriSocialFeedReadOnlyInterface
{
  client: CosmWasmClient;
  contractAddress: string;

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client;
    this.contractAddress = contractAddress;
    this.config = this.config.bind(this);
    this.queryFeeByCategory = this.queryFeeByCategory.bind(this);
    this.queryLockedTokens = this.queryLockedTokens.bind(this);
    this.queryAvailableFreePosts = this.queryAvailableFreePosts.bind(this);
    this.queryPost = this.queryPost.bind(this);
    this.querySubPost = this.querySubPost.bind(this);
    this.querySubPosts = this.querySubPosts.bind(this);
    this.queryMainPosts = this.queryMainPosts.bind(this);
    this.queryMainPostsCount = this.queryMainPostsCount.bind(this);
  }

  config = async (): Promise<ConfigResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      config: {},
    });
  };
  queryFeeByCategory = async ({
    category,
  }: {
    category: number;
  }): Promise<QueryFeeByCategoryResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      query_fee_by_category: {
        category,
      },
    });
  };
  queryLockedTokens = async ({
    wallet,
  }: {
    wallet: string;
  }): Promise<QueryLockedTokensResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      query_locked_tokens: {
        wallet,
      },
    });
  };
  queryAvailableFreePosts = async ({
    wallet,
  }: {
    wallet: string;
  }): Promise<QueryAvailableFreePostsResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      query_available_free_posts: {
        wallet,
      },
    });
  };
  queryPost = async ({
    identifier,
    user,
  }: {
    identifier: string;
    user?: string;
  }): Promise<QueryPostResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      query_post: {
        identifier,
        user,
      },
    });
  };
  querySubPost = async ({
    identifier,
    index,
    user,
  }: {
    identifier: string;
    index: number;
    user?: string;
  }): Promise<QuerySubPostResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      query_sub_post: {
        identifier,
        index,
        user,
      },
    });
  };
  querySubPosts = async ({
    count,
    from,
    identifier,
    sort,
    user,
  }: {
    count: number;
    from: number;
    identifier: string;
    sort: string;
    user?: string;
  }): Promise<QuerySubPostsResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      query_sub_posts: {
        count,
        from,
        identifier,
        sort,
        user,
      },
    });
  };
  queryMainPosts = async ({
    count,
    from,
    sort,
    user,
  }: {
    count: number;
    from: number;
    sort: string;
    user?: string;
  }): Promise<QueryMainPostsResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      query_main_posts: {
        count,
        from,
        sort,
        user,
      },
    });
  };
  queryMainPostsCount = async (): Promise<QueryMainPostsCountResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      query_main_posts_count: {},
    });
  };
}
export interface TeritoriSocialFeedInterface
  extends TeritoriSocialFeedReadOnlyInterface {
  contractAddress: string;
  sender: string;
  updateConfig: (
    {
      owner,
    }: {
      owner?: string;
    },
    fee?: number | StdFee | "auto",
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>;
  updateFeeByCategory: (
    {
      category,
      fee,
    }: {
      category: number;
      fee: Uint128;
    },
    fee?: number | StdFee | "auto",
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>;
  addFreePosts: (
    {
      freeCount,
      wallets,
    }: {
      freeCount: Uint128;
      wallets: string[];
    },
    fee?: number | StdFee | "auto",
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>;
  createPost: (
    {
      category,
      identifier,
      metadata,
      parentPostIdentifier,
    }: {
      category: number;
      identifier: string;
      metadata: string;
      parentPostIdentifier?: string;
    },
    fee?: number | StdFee | "auto",
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>;
  updatePost: (
    {
      category,
      identifier,
      metadata,
    }: {
      category: number;
      identifier: string;
      metadata: string;
    },
    fee?: number | StdFee | "auto",
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>;
  reactPost: (
    {
      icon,
      identifier,
      up,
    }: {
      icon: string;
      identifier: string;
      up: boolean;
    },
    fee?: number | StdFee | "auto",
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>;
  deletePost: (
    {
      identifier,
    }: {
      identifier: string;
    },
    fee?: number | StdFee | "auto",
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>;
  lockTokens: (
    fee?: number | StdFee | "auto",
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>;
  unlockTokens: (
    {
      amount,
    }: {
      amount: Uint128;
    },
    fee?: number | StdFee | "auto",
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>;
  withdrawFund: (
    fee?: number | StdFee | "auto",
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>;
  addAIBot: (
    {
      addr,
      name,
      postLimit,
    }: {
      addr: Addr;
      name: string;
      postLimit: number;
    },
    fee?: number | StdFee | "auto",
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>;
  createPostByBot: (
    {
      category,
      identifier,
      metadata,
      parentPostIdentifier,
    }: {
      category: number;
      identifier: string;
      metadata: string;
      parentPostIdentifier?: string;
    },
    fee?: number | StdFee | "auto",
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>;
}
export class TeritoriSocialFeedClient
  extends TeritoriSocialFeedQueryClient
  implements TeritoriSocialFeedInterface
{
  client: SigningCosmWasmClient;
  sender: string;
  contractAddress: string;

  constructor(
    client: SigningCosmWasmClient,
    sender: string,
    contractAddress: string
  ) {
    super(client, contractAddress);
    this.client = client;
    this.sender = sender;
    this.contractAddress = contractAddress;
    this.updateConfig = this.updateConfig.bind(this);
    this.updateFeeByCategory = this.updateFeeByCategory.bind(this);
    this.addFreePosts = this.addFreePosts.bind(this);
    this.createPost = this.createPost.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.reactPost = this.reactPost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.lockTokens = this.lockTokens.bind(this);
    this.unlockTokens = this.unlockTokens.bind(this);
    this.withdrawFund = this.withdrawFund.bind(this);
    this.addAIBot = this.addAIBot.bind(this);
    this.createPostByBot = this.createPostByBot.bind(this);
  }

  updateConfig = async (
    {
      owner,
    }: {
      owner?: string;
    },
    fee: number | StdFee | "auto" = "auto",
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_config: {
          owner,
        },
      },
      fee,
      memo,
      funds
    );
  };
  updateFeeByCategory = async (
    {
      category,
      fee,
    }: {
      category: number;
      fee: Uint128;
    },
    _fee: number | StdFee | "auto" = "auto",
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_fee_by_category: {
          category,
          fee,
        },
      },
      _fee,
      memo,
      funds
    );
  };
  addFreePosts = async (
    {
      freeCount,
      wallets,
    }: {
      freeCount: Uint128;
      wallets: string[];
    },
    fee: number | StdFee | "auto" = "auto",
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        add_free_posts: {
          free_count: freeCount,
          wallets,
        },
      },
      fee,
      memo,
      funds
    );
  };
  createPost = async (
    {
      category,
      identifier,
      metadata,
      parentPostIdentifier,
    }: {
      category: number;
      identifier: string;
      metadata: string;
      parentPostIdentifier?: string;
    },
    fee: number | StdFee | "auto" = "auto",
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        create_post: {
          category,
          identifier,
          metadata,
          parent_post_identifier: parentPostIdentifier,
        },
      },
      fee,
      memo,
      funds
    );
  };
  updatePost = async (
    {
      category,
      identifier,
      metadata,
    }: {
      category: number;
      identifier: string;
      metadata: string;
    },
    fee: number | StdFee | "auto" = "auto",
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_post: {
          category,
          identifier,
          metadata,
        },
      },
      fee,
      memo,
      funds
    );
  };
  reactPost = async (
    {
      icon,
      identifier,
      up,
    }: {
      icon: string;
      identifier: string;
      up: boolean;
    },
    fee: number | StdFee | "auto" = "auto",
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        react_post: {
          icon,
          identifier,
          up,
        },
      },
      fee,
      memo,
      funds
    );
  };
  deletePost = async (
    {
      identifier,
    }: {
      identifier: string;
    },
    fee: number | StdFee | "auto" = "auto",
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        delete_post: {
          identifier,
        },
      },
      fee,
      memo,
      funds
    );
  };
  lockTokens = async (
    fee: number | StdFee | "auto" = "auto",
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        lock_tokens: {},
      },
      fee,
      memo,
      funds
    );
  };
  unlockTokens = async (
    {
      amount,
    }: {
      amount: Uint128;
    },
    fee: number | StdFee | "auto" = "auto",
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        unlock_tokens: {
          amount,
        },
      },
      fee,
      memo,
      funds
    );
  };
  withdrawFund = async (
    fee: number | StdFee | "auto" = "auto",
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        withdraw_fund: {},
      },
      fee,
      memo,
      funds
    );
  };
  addAIBot = async (
    {
      addr,
      name,
      postLimit,
    }: {
      addr: Addr;
      name: string;
      postLimit: number;
    },
    fee: number | StdFee | "auto" = "auto",
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        add_a_i_bot: {
          addr,
          name,
          post_limit: postLimit,
        },
      },
      fee,
      memo,
      funds
    );
  };
  createPostByBot = async (
    {
      category,
      identifier,
      metadata,
      parentPostIdentifier,
    }: {
      category: number;
      identifier: string;
      metadata: string;
      parentPostIdentifier?: string;
    },
    fee: number | StdFee | "auto" = "auto",
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        create_post_by_bot: {
          category,
          identifier,
          metadata,
          parent_post_identifier: parentPostIdentifier,
        },
      },
      fee,
      memo,
      funds
    );
  };
}
