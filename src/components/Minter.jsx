import React, { useState, useCallback } from 'react';
import { mintNFT } from '../interactions/Wallet.js';
import { MESSAGE_TYPES, TX_HASH_DISPLAY_LENGTH } from '../constants.js';
import './Minter.css';

/**
 * Minter component - Provides UI for minting NFTs
 * @returns {JSX.Element} The minting interface
 */
function Minter() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: null, type: null });

  const formatTransactionHash = (txHash) => {
    if (!txHash || typeof txHash !== 'string') return '';
    return `${txHash.slice(0, TX_HASH_DISPLAY_LENGTH)}...`;
  };

  const handleMint = useCallback(async (event) => {
    // Prevent checkbox from toggling
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    if (loading) {
      return;
    }
    
    setLoading(true);
    setMessage({ text: null, type: null });
    
    try {
      const result = await mintNFT();
      
      if (result.success) {
        const txHashDisplay = formatTransactionHash(result.txHash);
        setMessage({
          text: `NFT minted successfully. Transaction: ${txHashDisplay}`,
          type: MESSAGE_TYPES.SUCCESS,
        });
      } else {
        setMessage({
          text: result.error || 'Failed to mint NFT',
          type: MESSAGE_TYPES.ERROR,
        });
      }
    } catch (error) {
      setMessage({
        text: error.message || 'An unexpected error occurred',
        type: MESSAGE_TYPES.ERROR,
      });
    } finally {
      setLoading(false);
    }
  }, [loading]);

  /* From Uiverse.io by Pradeepsaranbishnoi */ 
  return (
    <div className="container">
        <div className="toggle">
            <input 
              type="checkbox" 
              onChange={handleMint}
              onClick={handleMint}
              disabled={loading}
              checked={false}
              aria-label="Mint NFT"
              aria-busy={loading}
            />
            <span className="button"></span>
            <span className="label" aria-hidden="true">☁️</span>
        </div>
        {message.text && (
          <div className={`message ${message.type}`} role="alert">
            {message.text}
          </div>
        )}
    </div>
  );
}

export default Minter;
