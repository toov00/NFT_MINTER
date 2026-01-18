# NFT Minter

A production-ready application for minting NFTs on Ethereum-compatible networks. Built with React and Electron, this tool provides a clean interface for interacting with ERC-721 smart contracts through MetaMask.

## Overview

NFT Minter simplifies the process of minting non-fungible tokens by abstracting away the complexity of direct blockchain interactions. The application supports both browser-based and desktop deployments, making it accessible across different platforms and use cases.

The core functionality centers around a single-click minting interface that handles wallet connection, transaction signing, and confirmation feedback automatically. All blockchain interactions are managed through the ethers.js library, ensuring compatibility with standard Ethereum tooling.

## Features

**Wallet Integration**
- Seamless MetaMask connection with automatic account detection
- Network validation and chain ID verification
- Transaction status tracking with detailed error handling

**User Interface**
- Minimalist design focused on the minting action
- Real-time feedback for transaction states
- Accessible components with proper ARIA labels
- Responsive layout that works across screen sizes

**Developer Experience**
- Comprehensive error handling with custom error classes
- Configuration validation before transaction attempts
- Detailed logging for debugging web3 interactions
- ESLint configuration with React best practices

**Deployment Options**
- Browser-based application via Vite dev server
- Desktop application via Electron wrapper
- Chrome extension support (see Extension README)

## Prerequisites

Before getting started, ensure you have the following installed:

**Node.js Version 20 or Higher**

Install using nvm (Node Version Manager):

```sh
brew install nvm
nvm install 20
nvm use 20
```

**MetaMask Extension**

Install the MetaMask browser extension from the official website. Ensure it's unlocked and connected to your target network before using the application.

**Smart Contract**

You need a deployed ERC-721 compatible smart contract with a public `mint` function. The contract must be deployed to your target network, and you'll need:
- The contract's deployed address
- The complete Application Binary Interface (ABI)

## Installation

Clone the repository to your local machine:

```sh
git clone https://github.com/toov00/NFT_MINTER.git
cd NFT_MINTER
```

Install project dependencies:

```sh
npm install
```

Configure your smart contract by editing `src/config.js`. You can use `src/config_example.js` as a reference:

```js
export const ABI = [
  // Paste your contract's ABI array here
  // This should include all function signatures, events, and errors
];

export const ADDRESS = "0xYourContractAddressHere";
```

The ABI should include at minimum the `mint` function signature. For a complete example, see `src/config_example.js` which contains a full ERC-721 ABI.

## Usage

### Browser Mode

Start the development server:

```sh
npm run dev
```

The application will be available at `http://localhost:5173`. Open this URL in your browser and ensure MetaMask is installed and unlocked.

When you click the mint button, MetaMask will prompt you to:
1. Connect your wallet (if not already connected)
2. Approve the transaction
3. Confirm the gas fee

After confirmation, the transaction will be submitted to the network. You'll receive visual feedback indicating success or failure, along with the transaction hash for verification on a block explorer.

### Desktop Mode

Run both the Vite server and Electron application simultaneously:

```sh
npm run dev:electron
```

This command starts the development server and launches the Electron window automatically. The desktop application connects to the same localhost server, providing a native app experience.

### Building for Production

Create an optimized production build:

```sh
npm run build
```

The built files will be in the `dist` directory. For Electron packaging, use:

```sh
npm run package
```

This creates platform-specific executables in the `dist` folder.

## Project Structure

```
NFT_MINTER/
├── src/
│   ├── components/
│   │   ├── Minter.jsx       # Main minting component
│   │   └── Minter.css       # Component styles
│   ├── interactions/
│   │   └── Wallet.js        # Blockchain interaction logic
│   ├── config.js            # Contract configuration (user-edited)
│   ├── config_example.js    # Example configuration template
│   ├── App.jsx              # Root React component
│   ├── main.jsx             # React entry point
│   └── main.js              # Electron entry point
├── dist/                    # Build output directory
├── eslint.config.js         # ESLint configuration
├── vite.config.js           # Vite build configuration
└── package.json             # Project dependencies and scripts
```

## Configuration

### Contract Address

The contract address must be a valid Ethereum address (42 characters starting with 0x). The application validates this before attempting any transactions.

### ABI Format

The ABI should be a JavaScript array containing function, event, and error definitions. Each entry must follow the standard Solidity ABI JSON format. The `mint` function must be present and callable.

### Network Compatibility

The application works with any Ethereum-compatible network that MetaMask supports. Common networks include:
- Ethereum Mainnet
- Ethereum Sepolia (testnet)
- Polygon
- Arbitrum
- Optimism
- Base

Ensure your MetaMask is connected to the same network where your contract is deployed.

## Error Handling

The application includes comprehensive error handling for common scenarios:

**Wallet Not Installed**
- Clear message prompting MetaMask installation
- Graceful degradation without blocking the UI

**Connection Rejected**
- User-friendly message when wallet connection is declined
- No automatic retry to respect user choice

**Transaction Failures**
- Specific error messages for insufficient funds
- Contract interaction errors with readable messages
- Network error detection and reporting

**Configuration Errors**
- Validation of contract address format
- ABI presence and structure checking
- Helpful error messages pointing to configuration files

All errors are displayed in the UI with appropriate styling, and detailed information is logged to the browser console for debugging.

## Development

### Code Quality

The project uses ESLint with React-specific rules. Run the linter:

```sh
npm run lint
```

Auto-fix common issues:

```sh
npm run lint:fix
```

### Available Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run electron` - Launch Electron (requires dev server running)
- `npm run dev:electron` - Run both dev server and Electron together

### Adding Features

When extending the application:

1. Follow the existing error handling patterns in `Wallet.js`
2. Use the custom `WalletError` class for blockchain-related errors
3. Maintain accessibility standards in React components
4. Add JSDoc comments for new functions
5. Update this README with new configuration options

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

**Electron Window Blank**
- Ensure the dev server is running on port 5173
- Check the Electron console for connection errors
- Verify `src/main.js` has the correct localhost URL

**Build Errors**
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version matches requirements
- Verify all dependencies are compatible

## Security Considerations

**Private Keys**
- Never commit private keys or seed phrases to version control
- The application never requests or stores private keys
- All signing happens through MetaMask's secure environment

**Contract Interaction**
- Always verify contract addresses before use
- Review contract code for unexpected behavior
- Test on testnets before mainnet deployment

**Network Security**
- Use HTTPS in production environments
- Validate all user inputs before blockchain submission
- Implement rate limiting for production deployments

## Browser Extension

This project includes support for packaging as a Chrome extension. See the extension-specific documentation for installation and usage instructions. The extension manifest is located in `dist/manifest.json` after building.

## Roadmap

**Completed**
- Core minting functionality with transaction confirmation
- MetaMask wallet integration with error handling
- Browser-based web application
- Desktop application via Electron
- Comprehensive error handling and user feedback

**Planned**
- Support for additional wallet providers (WalletConnect, Coinbase Wallet)
- Batch minting functionality for multiple NFTs
- IPFS metadata upload and pinning integration
- Transaction history and receipt management
- Network switching interface
- Gas price estimation and optimization

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

This project is distributed under the MIT License. See the LICENSE file for details.

## Support

For issues, questions, or feature requests, please open an issue on the GitHub repository. Include:
- Your Node.js version
- Browser and MetaMask versions
- Network you're using
- Steps to reproduce any errors
- Relevant console logs (with sensitive data removed)

## Acknowledgments

The minting interface design is based on components from Uiverse.io by Pradeepsaranbishnoi.
