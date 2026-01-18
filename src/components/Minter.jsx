import React, { useState } from 'react';
import { mintNFT } from '../interactions/Wallet.js'; 
import './Minter.css';  

/**
 * Minter component - Provides UI for minting NFTs
 * @returns {JSX.Element} The minting interface
 */
function Minter() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null); // 'success' or 'error'

  const handleMint = async () => {
    setLoading(true);
    setMessage(null);
    setMessageType(null);
    
    try {
      const result = await mintNFT();
      
      if (result.success) {
        setMessage(`🎉 NFT minted successfully! Transaction: ${result.txHash.slice(0, 10)}...`);
        setMessageType('success');
      } else {
        setMessage(result.error || 'Failed to mint NFT');
        setMessageType('error');
      }
    } catch (error) {
      setMessage(error.message || 'An unexpected error occurred');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  /* From Uiverse.io by Pradeepsaranbishnoi */ 
  return (
    <div className="container">
        <div className="toggle">
            <input 
              type="checkbox" 
              onClick={handleMint} 
              disabled={loading}
              aria-label="Mint NFT"
              aria-busy={loading}
            />
            <span className="button"></span>
            <span className="label" aria-hidden="true">☁️</span>
        </div>
        {message && (
          <div className={`message ${messageType}`} role="alert">
            {message}
          </div>
        )}
    </div>
  );
}

export default Minter;
