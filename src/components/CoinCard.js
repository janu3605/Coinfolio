import React from 'react';

const handleImageError = (e) => {
  e.target.onerror = null; 
  e.target.src = `https://placehold.co/200x200/e0e7ff/2a2a2a?text=Coin`;
};

const CoinCard = ({ coin, onClick }) => {
  const imageUrl = process.env.PUBLIC_URL + coin.frontImage;

  return (
    <div className="coin-card" onClick={onClick}>
      <img 
        src={imageUrl} 
        alt={coin.denomination} 
        onError={handleImageError} 
      />
      <div className="coin-card-denom">{coin.denomination}</div>
      <div className="coin-card-year">{coin.year}</div>
    </div>
  );
};

export default React.memo(CoinCard);
