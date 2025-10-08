import React from 'react';
import CoinCard from './CoinCard';

const CoinGallery = ({ coins, onCoinSelect }) => {
  if (!coins.length) {
    return <div style={{marginTop: '2rem', color: '#94a3b8'}}>No coins found matching your criteria.</div>;
  }
  return (
    <div className="coin-gallery">
      {coins.map(coin => (
        <CoinCard key={coin.id} coin={coin} onClick={() => onCoinSelect(coin)} />
      ))}
    </div>
  );
};

export default CoinGallery;
