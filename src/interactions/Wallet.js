import { ethers } from 'ethers';
import { ADDRESS, ABI } from "../config.js";

/**
 * Custom error class for wallet-related errors
 */
class WalletError extends Error {
  constructor(message, code = null) {
    super(message);
    this.name = 'WalletError';
    this.code = code;
  }
}

/**
 * Validates that the contract configuration is present
 */
function validateConfig() {
  if (!ADDRESS || ADDRESS.trim() === '') {
    throw new WalletError('Contract address is not configured. Please set ADDRESS in config.js');
  }
  if (!ABI || !Array.isArray(ABI) || ABI.length === 0) {
    throw new WalletError('Contract ABI is not configured. Please set ABI in config.js');
  }
  if (!ethers.isAddress(ADDRESS)) {
    throw new WalletError(`Invalid contract address: ${ADDRESS}`);
  }
}

/**
 * Sets up Ethereum provider and signer
 * @returns {Promise<{provider: BrowserProvider, signer: JsonRpcSigner}>}
 * @throws {WalletError}
 */
async function setupEthereum() {
  if (typeof window.ethereum === 'undefined') {
    throw new WalletError('MetaMask is not installed. Please install the MetaMask extension.');
  }

  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    if (accounts.length === 0) {
      throw new WalletError('No accounts found. Please connect your wallet.');
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const userAddress = await signer.getAddress();
    console.log("Connected wallet address:", userAddress);

    const network = await provider.getNetwork();
    console.log("Network:", network.name, "Chain ID:", network.chainId);

    return { provider, signer };
  } catch (error) {
    if (error instanceof WalletError) {
      throw error;
    }
    
    console.error("Error setting up Ethereum:", error);
    
    if (error.code === 4001) {
      throw new WalletError('Connection rejected. Please connect your MetaMask wallet.', 4001);
    } else if (error.code === -32002) {
      throw new WalletError('A request is already pending. Please check MetaMask.', -32002);
    } else {
      throw new WalletError(`Failed to connect to MetaMask: ${error.message || 'Unknown error'}`);
    }
  }
}

/**
 * Mints an NFT to the connected wallet
 * @returns {Promise<{success: boolean, txHash?: string, error?: string}>}
 */
async function mintNFT() {
  try {
    // Validate configuration first
    validateConfig();

    // Setup Ethereum connection
    const { signer } = await setupEthereum();

    // Get user address
    const userAddress = await signer.getAddress();

    // Create contract instance
    const contract = new ethers.Contract(ADDRESS, ABI, signer);

    // Check if contract has mint function
    if (!contract.mint) {
      throw new WalletError('Contract does not have a mint function. Please check the ABI.');
    }

    console.log("Initiating mint transaction...");
    console.log("Contract address:", ADDRESS);
    console.log("Recipient address:", userAddress);

    // Execute mint transaction
    const tx = await contract.mint(userAddress);
    console.log("Transaction sent:", tx.hash);

    // Wait for transaction confirmation
    const receipt = await tx.wait();
    console.log("Transaction confirmed:", receipt.hash);
    console.log("Block number:", receipt.blockNumber);

    return {
      success: true,
      txHash: receipt.hash,
      blockNumber: receipt.blockNumber,
    };
  } catch (error) {
    console.error("Error minting NFT:", error);
    
    let errorMessage = 'Failed to mint NFT.';
    
    if (error instanceof WalletError) {
      errorMessage = error.message;
    } else if (error.code === 'ACTION_REJECTED' || error.code === 4001) {
      errorMessage = 'Transaction rejected. Please approve the transaction in MetaMask.';
    } else if (error.code === 'INSUFFICIENT_FUNDS') {
      errorMessage = 'Insufficient funds. Please ensure you have enough ETH for gas fees.';
    } else if (error.reason) {
      errorMessage = `Transaction failed: ${error.reason}`;
    } else if (error.message) {
      errorMessage = `Transaction failed: ${error.message}`;
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
}

export { mintNFT, WalletError };
