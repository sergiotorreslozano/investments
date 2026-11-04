# Ethereum & Layer 2 Investigation Summary

**Date:** November 2026  
**Purpose:** Structured overview of Ethereum fundamentals, Layer 2 technology, institutional adoption, market outlook, and business models that can capture transaction-related growth.

---

## 1. Ethereum Basics

**What it is**  
Ethereum is a public, decentralized blockchain that functions as a global shared computer. It supports programmable applications (smart contracts) and has its own native currency, ETH.

**How new ETH is created**  
After The Merge (September 2022), Ethereum moved from Proof-of-Work mining to Proof-of-Stake. New ETH is issued only as staking rewards to validators. A fee-burning mechanism (EIP-1559) permanently removes a portion of transaction fees, so net supply can shrink during high activity.

**Brief history**  
- Proposed 2013–2014 by Vitalik Buterin.  
- Mainnet launched July 2015.  
- 2016: The DAO hack and subsequent hard fork.  
- 2022: The Merge completed the transition to Proof-of-Stake.  
- Subsequent upgrades improved data availability, staking withdrawals, and scalability.

**Key differences from Bitcoin**

| Aspect              | Bitcoin                          | Ethereum                              |
|---------------------|----------------------------------|---------------------------------------|
| Primary purpose     | Scarce digital money             | Programmable platform + money         |
| Consensus           | Proof-of-Work                    | Proof-of-Stake                        |
| Supply policy       | Hard-capped at 21 million        | No hard cap; issuance + burn          |
| Block time          | ~10 minutes                      | ~12 seconds                           |
| Scripting           | Very limited                     | Turing-complete (smart contracts)     |
| Energy use          | High                             | Low (post-Merge)                      |

**Smart contracts**  
A smart contract is code permanently stored on the blockchain that executes automatically when predefined conditions are met. Once deployed, the code cannot be altered. Anyone can interact with it by sending a transaction and paying gas. The result is public, verifiable, and irreversible without another on-chain transaction.

---

## 2. Technical Foundations

**Primary language**  
Solidity is the dominant language for writing Ethereum smart contracts. Alternatives (Vyper, Yul) exist but are far less common.

**“Hello World” concept**  
On Ethereum there is no console print. The simplest equivalent is a contract that stores a message and allows anyone to read or update it.

**Real-world examples of smart contracts**  
- **Uniswap** – Automated market maker; liquidity pools enable token swaps without a central order book.  
- **Aave** – Lending and borrowing protocol; deposits earn interest, loans are over-collateralized, liquidations are automated.  
- **MakerDAO / DAI** – Collateralized stablecoin system.  
- **Ethereum Name Service (ENS)** – Maps human-readable names to addresses.  
- **NFTs** – Unique digital ownership recorded on-chain (e.g., CryptoPunks).  
- **ERC-20 tokens** – Standard for fungible tokens (USDC, LINK, UNI, etc.).

**Useful GitHub repositories for code study**  
- OpenZeppelin Contracts – Standard, audited library for common patterns.  
- Uniswap V2 Core – Clean, readable automated market maker.  
- Uniswap V3 Core – More advanced concentrated-liquidity version.  
- Aave V3 Core – Production lending protocol.  
- ENS Contracts – Naming/registry system.  
- MakerDAO DSS – Core contracts behind DAI.

---

## 3. Layer 2 (L2) Technology

**Problem solved**  
Ethereum mainnet (Layer 1) is secure but limited in throughput. High demand causes high fees and slower confirmations.

**What Layer 2 is**  
Separate networks built on top of Ethereum that process most transactions off the main chain, then post compressed data or cryptographic proofs back to Ethereum for security and final settlement.

**How it works (high level)**  
1. Users send transactions to the L2.  
2. The L2 processes them quickly and cheaply.  
3. Periodically the L2 posts a summary or proof to Ethereum.  
4. Ethereum verifies and finalizes the state.

**Main types**

| Type                  | Security model                          | Examples                          | Trade-offs                          |
|-----------------------|-----------------------------------------|-----------------------------------|-------------------------------------|
| Optimistic Rollups    | Assume valid; challenge with fraud proof | Arbitrum, Optimism, Base         | Simpler; longer withdrawal times (~7 days) |
| ZK-Rollups            | Mathematical zero-knowledge proof       | zkSync Era, Starknet, Scroll     | Faster finality; more complex cryptography |

**Current leading L2s (as of late 2026)**  
Arbitrum, Base (Coinbase), Optimism, and several ZK-based networks. Activity and value secured are concentrated among a small number of leading chains.

---

## 4. Institutional Activity on Layer 2

Major traditional institutions have begun deploying real products on Ethereum L2s, primarily through tokenized assets and deposit tokens rather than pure speculation.

**Notable examples**  
- **BlackRock BUIDL** – Tokenized U.S. Treasury money-market fund launched on Ethereum mainnet (2024) and later expanded to Arbitrum, Optimism, and other chains. Institutional capital sits on these L2s.  
- **JPMorgan** – Deposit token (JPM Coin / JPMD) made available on Base (Coinbase’s L2) for institutional clients; also launched tokenized money-market funds on Ethereum.  
- **Robinhood** – Built its own L2 (Robinhood Chain) using Arbitrum technology for tokenized assets and trading.  

**Who makes money in the BlackRock BUIDL example**  
- **BlackRock** – Management fee on assets under management (traditional asset-management model).  
- **Securitize** – Tokenization platform fees.  
- **BNY Mellon** – Fund administration and custody fees.  
- **L2 operators** – Transaction (gas) fees generated by transfers and interactions with the tokens. The L2 does not take a share of the underlying Treasury yield.

---

## 5. Market Outlook and TAM

There is no single official “L2 TAM” published by central banks. The most direct and widely cited forecast for the L2 space itself comes from VanEck (2024):

- Base-case fully diluted valuation of L2 tokens: approximately **$1 trillion by 2030**.  
- Based on estimated ~$41 billion in net annual revenue to tokenholders, valued at a 25× free-cash-flow multiple.  
- Assumes Ethereum ecosystem captures a large share of public smart-contract activity and L2s handle the majority of transactions.

More recent and larger projections from major banks focus on the **tokenized real-world asset (RWA)** market that L2s help serve:

- Citi: ~$5.5 trillion base case by 2030 (range $2.7–8.2T).  
- Morgan Stanley / Oliver Wyman: ~$2.3 trillion base case by 2030.  
- Other estimates range from ~$2T (McKinsey) to higher mid-teens of trillions depending on methodology.

A significant portion of institutional tokenization activity is already landing on Ethereum L2s because of lower costs and better user experience. L2s therefore sit inside a multi-trillion-dollar growth opportunity even if pure L2-token valuations remain more modest.

---

## 6. Business Models That Can Leverage L2 Growth

The most relevant traditional analogy is **Visa or Mastercard**: they do not hold customer deposits or own the underlying goods; they provide the high-volume, low-friction rails that move value and earn a small take-rate on transactions.

**Desired profile**  
A company that enables others to run transactions on L2s (or operates a leading L2) without becoming the long-term custodian of the assets.

**Key capabilities required**  
- Reliable, low-cost transaction processing (sequencing or shared sequencing).  
- Strong distribution and network effects.  
- Abstraction of technical complexity (gas, bridging, chain switching).  
- Institutional-grade features (compliance hooks, predictable fees, auditability) without taking balance-sheet custody risk.  
- Sustainable fee capture on volume rather than on asset prices.  
- Resilience through multi-year periods of low speculative activity.

**Relevant business archetypes**

| Archetype                        | Role                                      | Revenue model                  |
|----------------------------------|-------------------------------------------|--------------------------------|
| L2 operator / sequencer          | Processes transactions on a major L2      | Transaction / sequencer fees   |
| Shared sequencer service         | Provides ordering across multiple L2s     | Sequencing-as-a-service fees   |
| Interoperability / messaging layer | Moves value and messages between chains | Messaging / bridging fees      |
| On-chain payment network         | Enables merchants and institutions to settle payments | Payment processing take-rate |
| Account-abstraction / UX infrastructure | Makes transactions seamless for users and apps | Fees on abstracted transactions |

These models focus on facilitating activity rather than holding the underlying monetary assets or tokenized products.

---

## Closing Note

This summary is limited to the topics discussed in the investigation: Ethereum fundamentals, smart contracts, Layer 2 technology, observed institutional deployments, available market forecasts, and the type of transaction-oriented business model that can participate in the growth without taking custodial risk on the assets themselves.
