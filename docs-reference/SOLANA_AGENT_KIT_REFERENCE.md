# Solana Agent Kit v2 Documentation Reference & Index

> **Source Repo:** `c:\Users\DELL\sol-blitz\docs\solana-agent-kit-2`
> **What it is:** An open-source toolkit by SendAI (100k+ downloads) for building Solana-powered AI applications. v2 adds modular plugins, embedded wallet support (Turnkey, Privy), and adapters (MCP, N8N).

---

## 1. Core Docs (v2)
| Topic | File | Key Content |
| :--- | :--- | :--- |
| **Introduction** | [introduction.mdx](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/introduction.mdx) | **CRITICAL:** v2 overview. Plugin system (Token, NFT, DeFi, Misc, Blinks), embedded wallet support (Turnkey, Privy), adapters (MCP, N8N). Architecture diagram. Reduces LLM hallucinations by limiting tool exposure. |
| **Quickstart** | [quickstart.mdx](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/setup/quickstart.mdx) | **CRITICAL:** `npm install solana-agent-kit`. Init: `new SolanaAgentKit(wallet, rpcUrl, config).use(TokenPlugin).use(DefiPlugin)...`. `createVercelAITools(agent, agent.actions)` or `createLangchainTools()`. Embedded wallet adapter pattern. MCP adapter setup. |
| Keypair Setup | [keypair.mdx](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/setup/keypair.mdx) | `KeypairWallet` from `Keypair.fromSecretKey(bs58.decode(...))`. |
| Embedded Wallets | [embedded-wallets.mdx](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/setup/embedded-wallets.mdx) | Privy, Turnkey, Crossmint wallet adapters. |
| React Native | [react-native.mdx](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/setup/react-native.mdx) | Mobile setup. |

## 2. Plugins
| Plugin | Directory | Key Content |
| :--- | :--- | :--- |
| **Token Plugin** | [plugins/token/](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/plugins/token) | `@solana-agent-kit/plugin-token`: Transfer assets, swap tokens, bridge, rug checks. |
| **DeFi Plugin** | [plugins/defi/](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/plugins/defi) | `@solana-agent-kit/plugin-defi`: Stake, lend, borrow, trade on spot/perp markets. |
| NFT Plugin | [plugins/nft/](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/plugins/nft) | `@solana-agent-kit/plugin-nft`: Mint, list, manage Metaplex NFTs. |
| Misc Plugin | [plugins/misc/](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/plugins/misc) | `@solana-agent-kit/plugin-misc`: Airdrops, price feeds, token info, domain registration. |
| Blinks Plugin | [plugins/blinks/](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/plugins/blinks) | `@solana-agent-kit/plugin-blinks`: Arcade games, Solana Actions. |

## 3. Adapters
| Adapter | Directory | Key Content |
| :--- | :--- | :--- |
| **MCP Adapter** | [adapters/mcp/](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/adapters/mcp) | `@solana-agent-kit/adapter-mcp`: `startMcpServer(actions, agent, config)`. Exposes SAK actions as MCP tools for Claude Desktop or other MCP clients. |
| N8N Adapter | [adapters/n8n/](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/adapters/n8n) | N8N workflow automation adapter. |

## 4. DeFi Integrations (25+ Protocols)
| Protocol | File | Key Content |
| :--- | :--- | :--- |
| **Jupiter** | [jupiter_exchange_swaps.mdx](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/integrations/defi-integration/jupiter_exchange_swaps.mdx) | Token swaps via Jupiter aggregator. |
| **Pyth** | [pyth.mdx](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/integrations/defi-integration/pyth.mdx) | Price oracle integration. |
| Drift | [drift.mdx](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/integrations/defi-integration/drift.mdx) | Perpetual DEX integration (trade/lend/borrow). |
| Orca | [orca_whirlpool.mdx](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/integrations/defi-integration/orca_whirlpool.mdx) | Orca Whirlpool AMM. |
| Raydium | [raydium_pools.mdx](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/integrations/defi-integration/raydium_pools.mdx) | Raydium pool operations. |
| Meteora | [meteora.mdx](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/integrations/defi-integration/meteora.mdx) | Meteora DLMM pools. |
| FlashTrade | [flashtrade.mdx](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/integrations/defi-integration/flashtrade.mdx) | Flash Trade perps. |
| Adrena | [adrena.mdx](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/integrations/defi-integration/adrena.mdx) | Adrena perpetuals. |
| Allora | [allora.mdx](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/integrations/defi-integration/allora.mdx) | AI predictions. |
| deBridge | [debridge.mdx](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/integrations/defi-integration/debridge.mdx) | Cross-chain bridging. |
| DexScreener | [dexscreener.mdx](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/integrations/defi-integration/dexscreener.mdx) | Market data. |
| FluxBeam | [fluxbeam.mdx](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/integrations/defi-integration/fluxbeam.mdx) | FluxBeam integration. |
| Manifest | [manifest_market.mdx](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/integrations/defi-integration/manifest_market.mdx) | Manifest markets. |
| Mayan | [mayan.mdx](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/integrations/defi-integration/mayan.mdx) | Mayan cross-chain. |
| OKX | [okx.mdx](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/integrations/defi-integration/okx.mdx) | OKX DEX aggregator. |
| OpenBook | [openbook_market.mdx](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/integrations/defi-integration/openbook_market.mdx) | OpenBook CLOB. |
| PumpFun | [launch_pumpfun.mdx](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/integrations/defi-integration/launch_pumpfun.mdx) | Token launch. |
| Ranger | [ranger.mdx](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/integrations/defi-integration/ranger.mdx) | Ranger integration. |
| Sanctum | [sanctum.mdx](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/integrations/defi-integration/sanctum.mdx) | LST management. |
| SNS | [sns.mdx](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/integrations/defi-integration/sns.mdx) | Solana Name Service. |
| SolutioFi | [solutiofi.mdx](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/integrations/defi-integration/solutiofi.mdx) | Portfolio optimization. |
| Switchboard | [switchboard.mdx](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/integrations/defi-integration/switchboard.mdx) | Oracle feeds. |
| Voltr | [voltr.mdx](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/integrations/defi-integration/voltr.mdx) | Vault strategies. |
| Wormhole | [wormhole.mdx](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/integrations/defi-integration/wormhole.mdx) | Cross-chain messaging. |

## 5. Other Integrations
| Category | Directory | Key Content |
| :--- | :--- | :--- |
| Token Operations | [integrations/token-operations/](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/integrations/token-operations) | Token deploy, transfer, burn, freeze. |
| NFT Management | [integrations/nft-management/](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/integrations/nft-management) | Metaplex NFT operations. |
| Solana Blinks | [integrations/solana-blinks/](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/integrations/solana-blinks) | Solana Actions/Blinks. |
| Squads | [integrations/squads/](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/integrations/squads) | Multisig integration. |
| Utilities | [integrations/utilities/](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/integrations/utilities) | Utility functions. |
| Non-Financial | [integrations/non-financial/](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/integrations/non-financial) | Non-financial Solana operations. |
| Misc | [integrations/misc/](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/integrations/misc) | Airdrops, price feeds, etc. |

## 6. Using LLMs
| Topic | File | Key Content |
| :--- | :--- | :--- |
| LLM Overview | [using-llms/overview.mdx](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/using-llms/overview.mdx) | `createVercelAITools()` for Vercel AI SDK, `createLangchainTools()` for LangChain. |

## 7. Examples (Working Code)
| Example | Directory | Key Content |
| :--- | :--- | :--- |
| Examples Intro | [examples-intro.mdx](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/v2/examples/examples-intro.mdx) | Overview of all examples. |
| **Market Making Agent** | [examples/defi/market-making-agent/](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/examples/defi/market-making-agent) | **RELEVANT:** Full DeFi trading agent example. |
| OKX DEX Starter | [examples/defi/okx-dex-starter/](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/examples/defi/okx-dex-starter) | OKX DEX integration example. |
| Wormhole NextJS Agent | [examples/defi/wormhole-nextjs-agent/](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/examples/defi/wormhole-nextjs-agent) | Cross-chain agent with Next.js frontend. |
| Persistent Agent | [examples/misc/persistent-agent/](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/examples/misc/persistent-agent) | Agent with persistent memory. |
| LangGraph Agent | [examples/misc/agent-kit-langgraph/](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/examples/misc/agent-kit-langgraph) | LangGraph integration. |
| MCP Server | [examples/mcp/agent-kit-mcp-server/](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/examples/mcp/agent-kit-mcp-server) | MCP server example. |
| Telegram Bot | [examples/social/tg-bot-starter/](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/examples/social/tg-bot-starter) | Telegram bot agent. |
| Discord Bot | [examples/social/discord-bot-starter/](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/examples/social/discord-bot-starter) | Discord bot agent. |
| Crossmint Wallet | [examples/embedded-wallets/crossmint-sak-v2/](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/examples/embedded-wallets/crossmint-sak-v2) | Crossmint embedded wallet. |
| Phantom Starter | [examples/embedded-wallets/phantom-agent-starter/](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/examples/embedded-wallets/phantom-agent-starter) | Phantom wallet agent. |
| Turnkey Starter | [examples/embedded-wallets/turnkey-agent-starter/](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/examples/embedded-wallets/turnkey-agent-starter) | Turnkey wallet agent. |
| Para Plugin | [examples/embedded-wallets/para-plugin-example/](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/examples/embedded-wallets/para-plugin-example) | Para wallet plugin. |

## 8. API Reference (Generated TypeDoc)
| Topic | Directory | Key Content |
| :--- | :--- | :--- |
| **SolanaAgentKit Class** | [classes/](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/solana-agent-kit/classes) | Core class API reference. |
| Functions | [functions/](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/solana-agent-kit/functions) | All exported functions. |
| Interfaces | [interfaces/](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/solana-agent-kit/interfaces) | TypeScript interfaces. |
| Type Aliases | [type-aliases/](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/solana-agent-kit/type-aliases) | Type alias definitions. |
| Variables | [variables/](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/docs/solana-agent-kit/variables) | Exported variables/constants. |

## 9. Other Resources
| Topic | File | Key Content |
| :--- | :--- | :--- |
| README | [README.md](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/README.md) | Full project README with feature list. |
| CLAUDE.md | [CLAUDE.md](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/CLAUDE.md) | AI assistant instructions for the codebase. |
| Contributing | [CONTRIBUTING.md](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/CONTRIBUTING.md) | Contribution guidelines. |
| Migration Guide | [MIGRATING.md](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/MIGRATING.md) | v1 to v2 migration guide. |
| Guides | [guides/](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/guides) | Additional guides. |
| Scripts | [scripts/](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/scripts) | Build/utility scripts. |
| Tests | [test/](file:///c:/Users/DELL/sol-blitz/docs/solana-agent-kit-2/test) | Test suite. |

---

## Key Takeaways for Spectre
1. **SAK v2 is a lower-level toolkit** than ElizaOS. It provides the raw Solana transaction primitives (swap, transfer, stake, lend) but not an agent runtime or memory system.
2. **For Spectre, both are needed:** ElizaOS provides the autonomous agent brain (runtime, memory, personality, actions loop). SAK v2 provides the Solana DeFi "hands" (Jupiter swaps, Pyth oracles, token transfers).
3. The **DeFi Plugin** (`@solana-agent-kit/plugin-defi`) with Jupiter, Drift, and Pyth integrations is the primary SAK plugin for Spectre.
4. The **Embedded Wallet** pattern from SAK v2 maps perfectly to Spectre: the agent's wallet lives inside the MagicBlock PER, and the SAK wallet adapter interface (`signTransaction`, `sendTransaction`) will be wrapped to route through the TEE RPC.
