# NFT Minter

A production-ready application for minting NFTs on Ethereum-compatible networks. Built with React, this tool provides a clean interface for interacting with ERC-721 smart contracts through MetaMask.

## What It Does

Simplifies the process of minting non-fungible tokens by abstracting away the complexity of direct blockchain interactions. The application runs as a browser-based web application, making it accessible across different platforms and use cases.

The core functionality centers around a single-click minting interface that handles wallet connection, transaction signing, and confirmation feedback automatically. All blockchain interactions are managed through the ethers.js library, ensuring compatibility with standard Ethereum tooling.

**Features:**
- Seamless MetaMask connection with automatic account detection
- Network validation and chain ID verification
- Transaction status tracking with detailed error handling
- Minimalist design focused on the minting action
- Real-time feedback for transaction states
- Accessible components with proper ARIA labels
- Comprehensive error handling with custom error classes
- Configuration validation before transaction attempts
- Browser-based application via Vite dev server

## Installation

**Requirements:** Node.js 20+, MetaMask extension, deployed ERC-721 smart contract

```bash
git clone https://github.com/toov00/NFT_MINTER.git
cd NFT_MINTER
npm install
```

Configure your smart contract by editing `src/config.js`:

```js
export const ABI = [
  // Paste your contract's ABI array here
];

export const ADDRESS = "0xYourContractAddressHere";
```

The ABI should include at minimum the `mint` function signature. See `src/config_example.js` for a complete ERC-721 ABI example.

## Usage

### Quick Start

```bash
npm run dev
```

Open `http://localhost:5173` in your browser. Ensure MetaMask is installed and unlocked, then click the mint button. MetaMask will prompt you to connect your wallet, approve the transaction, and confirm the gas fee. After confirmation, the transaction will be submitted and you'll receive visual feedback with the transaction hash.

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory and can be deployed to any static hosting service.

## Configuration

The contract address must be a valid Ethereum address (42 characters starting with 0x). The ABI should be a JavaScript array containing function, event, and error definitions following the standard Solidity ABI JSON format. The `mint` function must be present and callable.

The application works with any Ethereum-compatible network that MetaMask supports, including Ethereum Mainnet, Sepolia, Polygon, Arbitrum, Optimism, and Base. Ensure your MetaMask is connected to the same network where your contract is deployed.

## Error Handling

The application includes comprehensive error handling for common scenarios:

- **Wallet Not Installed:** Clear message prompting MetaMask installation with graceful UI degradation
- **Connection Rejected:** User-friendly message when wallet connection is declined, no automatic retry
- **Transaction Failures:** Specific error messages for insufficient funds, contract errors, and network issues
- **Configuration Errors:** Validation of contract address format and ABI structure with helpful error messages

All errors are displayed in the UI with appropriate styling, and detailed information is logged to the browser console for debugging.

## Project Structure

```
NFT_MINTER/
├── src/
│   ├── components/
│   │   ├── Minter.jsx
│   │   ├── Minter.css
│   │   └── ErrorBoundary.jsx
│   ├── interactions/
│   │   └── Wallet.js
│   ├── constants.js
│   ├── config.js
│   ├── config_example.js
│   ├── App.jsx
│   └── main.jsx
├── dist/
├── eslint.config.js
├── vite.config.js
└── package.json
```

## Examples

**Basic Minting Flow:**
1. User clicks mint button
2. Application validates configuration
3. MetaMask connection request
4. Transaction approval
5. Transaction submission
6. Confirmation and feedback

The application catches and displays errors at each step, providing clear feedback about what went wrong and how to fix it.

## Troubleshooting

**MetaMask Not Detected**
- Ensure the extension is installed and enabled
- Check that you're accessing the site over HTTP/HTTPS (not file://)
- Try refreshing the page after installing MetaMask

**Transaction Fails Immediately**
- Verify your contract address is correct
- Check that the ABI includes the `mint` function
- Ensure you're on the correct network
- Verify the contract is deployed and the `mint` function is public

**Build Errors**
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version matches requirements
- Verify all dependencies are compatible

## Contributing

Contributions are welcome and encouraged. To contribute:

1. Fork the repository
2. Create a feature branch from `main`: `git checkout -b feature/your-feature-name`
3. Make your changes following the existing code style
4. Add tests if applicable
5. Run the linter and fix any issues: `npm run lint:fix`
6. Commit with clear messages: `git commit -m 'Add feature: description'`
7. Push to your fork: `git push origin feature/your-feature-name`
8. Open a pull request with a detailed description

Please ensure all code follows the project's ESLint configuration and includes appropriate error handling for blockchain interactions.

## License

MIT License

## Disclaimer

This tool is for minting NFTs on networks you own or have explicit permission to interact with. Always verify contract addresses and test on testnets before mainnet deployment. Use responsibly and ensure you understand the gas costs and network fees associated with transactions.

## Resources

- [Ethers.js Documentation](https://docs.ethers.org/)
- [MetaMask Documentation](https://docs.metamask.io/)
- [ERC-721 Standard](https://eips.ethereum.org/EIPS/eip-721)
- [React Documentation](https://react.dev/)

## Acknowledgments

The minting interface design is based on components from Uiverse.io by Pradeepsaranbishnoi.
