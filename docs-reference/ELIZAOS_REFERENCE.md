# ElizaOS Documentation Reference & Index

> **Source Repo:** `c:\Users\DELL\sol-blitz\docs\eliza-docs`
> **What it is:** The most popular open-source TypeScript framework for building autonomous AI agents with persistent memory, actions, and a web interface. 90+ plugins, deploys anywhere.

---

## 1. Getting Started
| Topic | File | Key Content |
| :--- | :--- | :--- |
| Overview | [index.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/index.mdx) | Framework introduction. `bun i -g @elizaos/cli`, `elizaos create`, `elizaos start`. |
| Installation | [installation.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/installation.mdx) | System requirements, node/bun setup, detailed install steps. |
| Quickstart | [quickstart.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/quickstart.mdx) | 3-minute tutorial: `elizaos create` → configure DB (pglite) & LLM (OpenAI) → `elizaos start` → chat at `localhost:3000`. |
| What You Can Build | [what-you-can-build.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/what-you-can-build.mdx) | Use cases: trading agents, social media bots, content creators, data analysts. |

## 2. Agents (Core Concepts)
| Topic | File | Key Content |
| :--- | :--- | :--- |
| Character Interface | [character-interface.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/agents/character-interface.mdx) | `Character` type definition: `name`, `bio`, `topics`, `adjectives`, `messageExamples`, `style`, `plugins`, `settings`, `secrets`. |
| Memory & State | [memory-and-state.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/agents/memory-and-state.mdx) | Persistent memory system, state composition from providers, conversation history. |
| Personality & Behavior | [personality-and-behavior.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/agents/personality-and-behavior.mdx) | Configuring agent personality, behavior patterns, style rules. |
| **Runtime & Lifecycle** | [runtime-and-lifecycle.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/agents/runtime-and-lifecycle.mdx) | **CRITICAL:** `AgentRuntime` class, init lifecycle (DB → plugins → services → providers), action selection/execution orchestration, provider composition, evaluator execution, service management, multi-agent coordination. |

## 3. Guides
| Topic | File | Key Content |
| :--- | :--- | :--- |
| Customize an Agent | [customize-an-agent.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/guides/customize-an-agent.mdx) | Modifying character files, adding knowledge, configuring behavior. |
| Create a Plugin | [create-a-plugin.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/guides/create-a-plugin.mdx) | Step-by-step plugin creation with actions, providers, services. |
| Deploy a Project | [deploy-a-project.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/guides/deploy-a-project.mdx) | Deployment options: local, Docker, Eliza Cloud. |
| Deploy to Cloud | [deploy-to-cloud.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/guides/deploy-to-cloud.mdx) | Eliza Cloud deployment. |
| **TEE Integration** | [tee-integration.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/guides/tee-integration.mdx) | **CRITICAL FOR SPECTRE:** `@elizaos/plugin-tee`, `TEEMode` enum (OFF/LOCAL/DOCKER/PRODUCTION), Phala Network as primary TEE provider (Intel TDX), `TeeAgent` interface (id, publicKey, attestation), `RemoteAttestationQuote`, secure key derivation (`deriveEcdsaKeypair`, `deriveEd25519Keypair`). Env vars: `TEE_MODE`, `TEE_VENDOR=phala`, `WALLET_SECRET_SALT`. |
| Action Planning | [action-planning.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/guides/action-planning.mdx) | How agents plan and chain actions. |
| Add Multiple Agents | [add-multiple-agents.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/guides/add-multiple-agents.mdx) | Running multiple agents simultaneously. |
| Background Tasks | [background-tasks.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/guides/background-tasks.mdx) | Long-running background tasks for agents. |
| Streaming Responses | [streaming-responses.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/guides/streaming-responses.mdx) | Real-time response streaming. |
| Publish a Plugin | [publish-a-plugin.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/guides/publish-a-plugin.mdx) | Publishing to the ElizaOS plugin registry. |
| Testing | [test-a-project.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/guides/test-a-project.mdx) | Testing agents and plugins. |

## 4. Plugins System
| Topic | File | Key Content |
| :--- | :--- | :--- |
| **Architecture** | [architecture.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/plugins/architecture.mdx) | **CRITICAL:** Plugin interface (`name`, `actions[]`, `providers[]`, `services[]`), initialization lifecycle (adapter → actions → evaluators → providers → models → routes → events → services), route definitions, event system (world/entity/room/message/voice/run/action events), database adapter plugins, priority system, dependency management, conditional loading. |
| Components | [components.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/plugins/components.mdx) | Actions (what agents DO), Providers (what agents SEE), Services (what agents CONNECT TO), Evaluators (post-processing). |
| Development | [development.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/plugins/development.mdx) | Building plugins step by step. |
| Patterns | [patterns.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/plugins/patterns.mdx) | Common plugin patterns and best practices. |
| Reference | [reference.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/plugins/reference.mdx) | Complete API reference for plugin interfaces. |
| Schemas | [schemas.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/plugins/schemas.mdx) | Plugin configuration schemas. |
| Webhooks & Routes | [webhooks-and-routes.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/plugins/webhooks-and-routes.mdx) | Exposing HTTP endpoints from plugins. |
| Migration | [migration.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/plugins/migration.mdx) | Migrating plugins from v1 to v2. |

## 5. Runtime Internals
| Topic | File | Key Content |
| :--- | :--- | :--- |
| Core | [core.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/runtime/core.mdx) | Core runtime types and interfaces. |
| Events | [events.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/runtime/events.mdx) | Event system details. |
| Memory | [memory.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/runtime/memory.mdx) | Memory storage and retrieval. |
| Messaging | [messaging.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/runtime/messaging.mdx) | Message processing pipeline. |
| Models | [models.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/runtime/models.mdx) | LLM model integration. |
| Providers | [providers.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/runtime/providers.mdx) | Provider system details. |
| Services | [services.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/runtime/services.mdx) | Service lifecycle management. |
| Sessions API | [sessions-api.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/runtime/sessions-api.mdx) | Session management API. |
| Types Reference | [types-reference.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/runtime/types-reference.mdx) | TypeScript type definitions. |

## 6. Plugin Registry (Key Plugins)

### 6.1 DeFi / Solana
| Topic | File | Key Content |
| :--- | :--- | :--- |
| **Solana Plugin Overview** | [solana.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/plugin-registry/defi/solana.mdx) | **CRITICAL:** `@elizaos/plugin-solana`. Install: `elizaos plugins add solana`. Env: `SOLANA_PRIVATE_KEY`, `SOLANA_RPC_URL`, `BIRDEYE_API_KEY`. Actions: `TRANSFER_SOLANA`, `SWAP_SOLANA`. Wallet provider with portfolio tracking. |
| **Solana Developer Guide** | [complete-documentation.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/plugin-registry/defi/solana/complete-documentation.mdx) | **CRITICAL:** Full `SolanaService` implementation, Jupiter swap integration, wallet provider, WebSocket subscriptions, transaction building with priority fees, token resolution, connection pooling, batch operations, error handling with retry. |
| DeFi Operations Flow | [defi-operations-flow.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/plugin-registry/defi/solana/defi-operations-flow.mdx) | DeFi operation sequence diagrams. |
| Examples | [examples.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/plugin-registry/defi/solana/examples.mdx) | Code examples for Solana operations. |
| Testing | [testing-guide.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/plugin-registry/defi/solana/testing-guide.mdx) | Testing Solana plugin. |
| EVM Overview | [evm.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/plugin-registry/defi/evm.mdx) | EVM chain integration. |

### 6.2 LLM Providers
| Topic | File |
| :--- | :--- |
| LLM Overview | [llm.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/plugin-registry/llm.mdx) |
| Individual providers | `llm/` directory (OpenAI, Anthropic, Google, etc.) |

### 6.3 Platforms
| Platform | Directory |
| :--- | :--- |
| Discord | `plugin-registry/platform/discord/` |
| Twitter | `plugin-registry/platform/twitter/` |
| Telegram | `plugin-registry/platform/telegram/` |
| Farcaster | `plugin-registry/platform/farcaster/` |

### 6.4 Other
| Topic | File |
| :--- | :--- |
| Bootstrap | [bootstrap.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/plugin-registry/bootstrap.mdx) |
| Knowledge | [knowledge.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/plugin-registry/knowledge.mdx) |
| SQL/Database | [sql.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/plugin-registry/sql.mdx) |
| Registry Overview | [overview.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/plugin-registry/overview.mdx) |

## 7. REST API Reference
| Topic | Directory |
| :--- | :--- |
| Agents | `rest-reference/agents/` |
| Memory | `rest-reference/memory/` |
| Rooms | `rest-reference/rooms/` |
| Messaging | `rest-reference/messaging/` |
| WebSocket | `rest-reference/websocket/` |
| Jobs | `rest-reference/jobs/` |
| Logs | `rest-reference/logs/` |
| Runs | `rest-reference/runs/` |
| Audio | `rest-reference/audio/` |
| Media | `rest-reference/media/` |
| System | `rest-reference/system/` |

## 8. Projects & Resources
| Topic | File |
| :--- | :--- |
| Projects Overview | [overview.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/projects/overview.mdx) |
| Environment Variables | [environment-variables.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/projects/environment-variables.mdx) |
| Launch Resources | [launch-resources/index.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/launch-resources/index.mdx) |
| Tokenomics | [tokenomics.mdx](file:///c:/Users/DELL/sol-blitz/docs/eliza-docs/tokenomics.mdx) |

---

## Key Takeaways for Spectre
1. **`@elizaos/plugin-tee`** is the direct integration point. It uses Phala Network (Intel TDX) for remote attestation and secure key derivation inside enclaves. This aligns perfectly with MagicBlock's PER (also Intel TDX).
2. **`@elizaos/plugin-solana`** provides the `SolanaService` with `TRANSFER_SOLANA` and `SWAP_SOLANA` actions, Jupiter integration, and wallet management. This is the "hands" of the Spectre agent.
3. The **Plugin Architecture** (actions + providers + services) is the correct abstraction layer. Spectre will be built as a custom ElizaOS plugin (`@spectre/plugin-per`) that wraps MagicBlock PER delegation/undelegation into ElizaOS actions.
4. The **Character Interface** defines the agent's personality and decision-making style. Spectre agents will have characters configured for specific trading strategies.
