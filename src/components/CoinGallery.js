import React from 'react';
import CoinCard from './CoinCard';

const galleryStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '1rem',
  margin: '2rem',
};

const CoinGallery = ({ coins, onCoinSelect }) => {
  if (!coins.length) return <div>No coins found for this country.</div>;
  return (
    <div style={galleryStyle}>
      {coins.map(coin => (
        <CoinCard key={coin.id} coin={coin} onClick={() => onCoinSelect(coin)} />
      ))}
    </div>
  );
};

export default CoinGallery;