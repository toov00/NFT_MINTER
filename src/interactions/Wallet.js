import { ethers } from 'ethers';
import { ADDRESS, ABI } from "../config.js";

async function setupEthereum() {
  if (typeof window.ethereum === 'undefined') {
    console.error("MetaMask is not installed!");
    alert("Please install MetaMask extension.");
    return null;
  }

  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    if (accounts.length === 0) {
      alert("Please connect your wallet.");
      return null;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const userAddress = await signer.getAddress();
    console.log("User address:", userAddress);

    const network = await provider.getNetwork();
    console.log("Network:", network);

    alert("Successfully connected to MetaMask!");

    return { provider, signer };
  } catch (error) {
    console.error("Error setting up Ethereum:", error);
    if (error.code === 4001) {
      alert("Please connect your MetaMask wallet.");
    } else {
      alert("Failed to connect to MetaMask. Please check the console.");
    }
    return null;
  }
}

async function mintNFT() {
  const { provider, signer } = await setupEthereum();

  if (!provider || !signer) {
    console.error("Ethereum provider or signer is undefined.");
    return;
  }

  try {
    const contract = new ethers.Contract(ADDRESS, ABI, signer);
    const tokenId = Math.floor(Math.random() * 10000);
    console.log("Minting token with ID:", tokenId);

    const tx = await contract.mint(await signer.getAddress()); 
    console.log("Minting transaction:", tx);

    await tx.wait();
    console.log("Minted successfully!");
    alert("🎉 NFT minted successfully!");
    
  } catch (error) {
    console.error("Error minting NFT:", error);
    alert("Error minting NFT. Check the console.");
  }
}

export { mintNFT };
