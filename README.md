**🌍 Available in English | [Disponible en Español](README.es.md)**

# <img src="./packages/nextjs/public/logo2.png" alt="Logo" height="30">SimpleDEX: A Basic AMM Based on the Constant Product Formula

<h4 align="center">
   <a href="https://marioparodi.vercel.app/">Website</a>
</h4>

### 🗂️ Contents

1. [Description](#-what-is-simpldex)
2. [Key Features](#-key-features)
3. [Screenshots](#-screenshots)
4. [Tools and Technologies](#️-tools-and-technologies)
5. [Requirements](#️-requirements)
6. [Quick Start](#-quick-start)
7. [How It Works](#️-how-it-works)
8. [Acknowledgments](#-acknowledgments)
9. [License](#-license)

### 📖 What is SimpleDEX? {#-what-is-simpldex}


**SimpleDEX** is a decentralized exchange (DEX) based on an *Automated Market Maker (AMM)* model using the constant product formula: 

\[ 
x * y = k 
\]

Where:
- \( x \): The quantity of Token A.
- \( y \): The quantity of Token B.
- \( k \): A constant that ensures prices dynamically adjust according to supply and demand.

This mechanism allows users to swap tokens without the need for an order book, using a smart contract to manage transactions and maintain liquidity.


### Complete Constant Product Formula

The relationship between changes in Token A (\(dx\)) and Token B (\(dy\)) is defined as:

$$
(x + dx) \cdot (y - dy) = k
$$

Where:
- \(x\): Initial quantity of Token A in the pool.
- \(y\): Initial quantity of Token B in the pool.
- \(dx\): Increment of Token A added to the pool (swap input).
- \(dy\): Decrement of Token B removed from the pool (swap output).
- \(k\): Constant value that ensures the product of quantities remains unchanged.

Rearranging to solve for \(dy\):

$$
dy = \frac{y \cdot dx}{x + dx}
$$

This formula ensures the pool maintains its constant product while dynamically adjusting prices during swaps.

### Pricing Formula

The price of Token A in terms of Token B can be calculated using:

$$
\text{Price of Token A} = \frac{\Delta y}{\Delta x}
$$

Where:
- $\Delta x$: Change in the quantity of Token A.
- $\Delta y$: Change in the quantity of Token B.

### 📈Price Curve and Liquidity

The constant product curve describes how token prices change based on their quantities in the liquidity pool. Below is a graphical representation of how this curve works:

![Constant Product Curve](./packages/nextjs/public/images/Curve%20amm.png)

### 📌 Key Features

- **Provide liquidity**: Users can add tokens to the pool.
- **Token swaps**: Enables direct swaps between two tokens.
- **Withdraw liquidity**: Recovers the tokens provided.

### 📸 Screenshots {#-screenshots}

Here are some screenshots of the DApp in action:

1. **Main Interface Swap**  
   ![Screenshot 1](./packages/nextjs/public/images/Main%20Interface%20Swap.jpg)

2. **Add & Remove Liquidity**  
   ![Screenshot 2](./packages/nextjs/public/images/Add%20and%20remove%20Liquidity.jpg)

3. **Mint Tokens**  
   ![Screenshot 3](./packages/nextjs/public/images/Mint%20Tokens.jpg)

### 🛠️ Tools and Technologies

![Scaffold-ETH](https://img.shields.io/badge/Scaffold--ETH-gray?style=plastic&logo=ethereum) ![Next.js](https://img.shields.io/badge/Next.js-black?style=plastic&logo=next.js) ![React](https://img.shields.io/badge/React-blue?style=plastic&logo=react) ![Solidity](https://img.shields.io/badge/Solidity-darkblue?style=plastic&logo=solidity) ![Hardhat](https://img.shields.io/badge/Hardhat-lightgray?style=plastic&logo=ethereum) ![Wagmi](https://img.shields.io/badge/Wagmi-orange?style=plastic&logo=react) ![Viem](https://img.shields.io/badge/Viem-purple?style=plastic&logo=ethereum) ![DaisyUI](https://img.shields.io/badge/DaisyUI-green?style=plastic&logo=tailwindcss) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-cyan?style=plastic&logo=tailwindcss) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=plastic&logo=vercel&logoColor=white)

### 📝 Requirements {#️-requirements}

Before you start, make sure to install the following tools:

- [Node (>= v18.18)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

### 🚀 Quick Start {#-quick-start}

To get started with **SimpleDEX**, follow these steps:

1. Install dependencies if skipped in CLI:

```
cd my-dapp-example
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `packages/hardhat/hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys the smart contracts to the local network. The contracts are located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deployment scripts located in `packages/hardhat/deploy` to deploy the contracts to the network. You can also customize these deployment scripts.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your application at: `http://localhost:3000`. Now you can interact with your **SimpleDEX** Dapp.

### ⚙️ How It Works {#️-how-it-works}

Follow these steps to use the DApp:

1. **Connect your wallet**:  
   Open the DApp and connect your wallet using MetaMask or another Web3 wallet.

2. **Mint Token A and Token B**:  
   Use the "Mint" functionality to generate both tokens required for providing liquidity.

3. **Provide Liquidity**:  
   Add both Token A and Token B to the liquidity pool.

4. **Perform Swaps**:  
   Swap between Token A and Token B directly using the swap interface.

5. **Withdraw Liquidity**:  
   Retrieve your liquidity along.

---
### 🙏 Acknowledgments {#-acknowledgments}

This project was developed as part of the **[Ethereum Developer Pack](https://www.ethkipu.org/es#edp)** offered by **[ETH-Kipu](https://www.ethkipu.org/es)**. 

A special thanks to my instructors:
- [Cristian Marchese](https://www.linkedin.com/in/cristian-marchese-576034148/?originalSubdomain=ar)
- [Juan David Reyes](https://www.linkedin.com/in/jdreyespaez/)

Their mentorship has been instrumental in my journey into blockchain development and Solidity programming.


### 📝 License {#-}

This project is licensed under the **MIT License**. 

You are free to use, modify, and distribute this software as long as the original license and copyright notice are included in all copies or substantial portions of the software.

See the [LICENSE](./LICENCE) file for more details.