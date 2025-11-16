import { ethers } from 'ethers';

const contractABI = []; // replace
const contractAddress = ""; // replace 

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      return signer; 
    } catch (err) {
      console.error("Error connecting wallet:", err);
      alert("Please connect your wallet.");
    }
  } else {
    alert("MetaMask is required to connect.");
  }
};

export const mintNFT = async (signer, toAddress, tokenURI) => {
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  try {
    const tx = await contract.createNFT(toAddress, tokenURI);
    console.log('Transaction Sent:', tx);

    await tx.wait();
    console.log('Transaction Confirmed:', tx);
    alert('NFT minted successfully!');
  } catch (err) {
    console.error("Error minting NFT:", err);
    alert('Failed to mint NFT.');
  }
};
