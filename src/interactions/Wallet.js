import { ethers } from 'ethers';
import { ADDRESS, ABI } from "../config.js";
import { ETHEREUM_METHODS, ERROR_CODES } from "../constants.js";

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
 * Validates that the contract configuration is present and correct
 * @throws {WalletError} If configuration is invalid
 */
function validateConfig() {
  if (!ADDRESS || typeof ADDRESS !== 'string' || ADDRESS.trim() === '') {
    throw new WalletError('Contract address is not configured. Please set ADDRESS in config.js');
  }
  
  if (!ABI || !Array.isArray(ABI) || ABI.length === 0) {
    throw new WalletError('Contract ABI is not configured. Please set ABI in config.js');
  }
  
  if (!ethers.isAddress(ADDRESS)) {
    throw new WalletError(`Invalid contract address: ${ADDRESS}`);
  }

  // Validate that ABI contains a mint function
  const hasMintFunction = ABI.some(
    (item) => item.type === 'function' && 
              item.name === 'mint' && 
              item.stateMutability !== 'view' && 
              item.stateMutability !== 'pure'
  );

  if (!hasMintFunction) {
    throw new WalletError('Contract ABI does not contain a mint function. Please verify your ABI.');
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
    const accounts = await window.ethereum.request({ 
      method: ETHEREUM_METHODS.REQUEST_ACCOUNTS 
    });

    if (!Array.isArray(accounts) || accounts.length === 0) {
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
    
    if (error.code === ERROR_CODES.USER_REJECTED) {
      throw new WalletError(
        'Connection rejected. Please connect your MetaMask wallet.', 
        ERROR_CODES.USER_REJECTED
      );
    } else if (error.code === ERROR_CODES.REQUEST_PENDING) {
      throw new WalletError(
        'A request is already pending. Please check MetaMask.', 
        ERROR_CODES.REQUEST_PENDING
      );
    } else {
      throw new WalletError(
        `Failed to connect to MetaMask: ${error.message || 'Unknown error'}`
      );
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

    console.log("Initiating mint transaction...");
    console.log("Contract address:", ADDRESS);
    console.log("Recipient address:", userAddress);

    // Execute mint transaction
    const tx = await contract.mint(userAddress);
    
    if (!tx || !tx.hash) {
      throw new WalletError('Transaction was sent but no transaction hash was returned.');
    }
    
    console.log("Transaction sent:", tx.hash);

    // Wait for transaction confirmation with timeout handling
    const receipt = await tx.wait();
    
    if (!receipt || !receipt.hash) {
      throw new WalletError('Transaction was confirmed but no receipt hash was returned.');
    }
    
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
    } else if (
      error.code === ERROR_CODES.ACTION_REJECTED || 
      error.code === ERROR_CODES.USER_REJECTED
    ) {
      errorMessage = 'Transaction rejected. Please approve the transaction in MetaMask.';
    } else if (error.code === ERROR_CODES.INSUFFICIENT_FUNDS) {
      errorMessage = 'Insufficient funds. Please ensure you have enough ETH for gas fees.';
    } else if (error.reason && typeof error.reason === 'string') {
      errorMessage = `Transaction failed: ${error.reason}`;
    } else if (error.message && typeof error.message === 'string') {
      errorMessage = `Transaction failed: ${error.message}`;
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
}

export { mintNFT, WalletError };
