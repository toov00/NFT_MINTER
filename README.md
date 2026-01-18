# NFT Minter

A user-friendly desktop + browser application designed to seamlessly mint NFTs on Ethereum-compatible networks.

## Features

* One-click wallet connection via MetaMask
* Simple interface for minting NFTs
* Cross-platform support (desktop via Electron, browser via React)
* Custom smart contract integration

## Getting Started

### Prerequisites

* Node.js (v20+)
```sh
  brew install nvm
  nvm install 20
  nvm use 20
```
* MetaMask wallet extension or desktop app installed
* A deployed ERC-721 smart contract (you'll need the ABI and contract address)

### Installation

1. Clone the repo
```sh
   git clone https://github.com/toov00/NFT_MINTER.git
   cd NFT_MINTER
```
2. Install dependencies
```sh
   npm install
```
3. Configure your smart contract in `src/config.js`
```js
   const ABI = [
     // Paste your contract ABI here
   ];

   const ADDRESS = '0x...';  // Your contract address
```

## Usage

1. Start the development server
```sh
   npm run dev
```
2. Open your browser and navigate to `http://localhost:5173`
3. Make sure MetaMask extension is installed and unlocked
4. Connect your MetaMask wallet when prompted
5. Click the button to create your NFT!

## Tech Stack

* React
* Electron
* ethers.js / web3.js
* MetaMask SDK

## Roadmap

- [x] Core minting functionality
- [x] MetaMask wallet integration
- [x] Browser web app (localhost)
- [ ] Desktop app via Electron
- [ ] Support for multiple wallets (WalletConnect, Coinbase)
- [ ] Batch minting
- [ ] IPFS metadata upload

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## License

Distributed under the MIT License. 
