import React, { useState } from 'react';
import { mintNFT } from '../interactions/Wallet.js'; 
import './Minter.css';  

function Minter() {
  const [loading, setLoading] = useState(false);

  const handleMint = async () => {
    setLoading(true);
    await mintNFT(); 
    setLoading(false);
  };

  /* From Uiverse.io by Pradeepsaranbishnoi */ 
  return (
    <div class="container">
        <div class="toggle">
            <input type="checkbox" onClick={handleMint} />
            <span class="button"></span>
            <span class="label">☁️</span>
        </div>
    </div>
  );
}

export default Minter;
