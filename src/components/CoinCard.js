import React from 'react';

const cardStyle = {
  border: '1px solid #e1e4e8',
  borderRadius: '10px',
  padding: '1.5rem',
  background: '#fff',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  cursor: 'pointer',
  textAlign: 'center',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
};

const imgStyle = {
  width: '100%',
  height: '140px',
  objectFit: 'contain',
  marginBottom: '1rem',
};

const handleImageError = (e) => {
  e.target.onerror = null; 
  e.target.src = `https://placehold.co/200x200/e0e7ff/2a2a2a?text=Coin`;
};

const CoinCard = ({ coin, onClick }) => {
  const imageUrl = process.env.PUBLIC_URL + coin.frontImage;

  return (
    <div 
      style={cardStyle} 
      onClick={onClick} 
      title={coin.denomination}
      onMouseOver={e => e.currentTarget.style.transform = 'scale(1.03)'}
      onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
    >
      <img 
        src={imageUrl} 
        alt={coin.denomination} 
        style={imgStyle}
        onError={handleImageError} 
      />
      <div style={{ fontWeight: '600', color: '#333' }}>{coin.denomination}</div>
      <div style={{ color: '#777', fontSize: '0.9rem' }}>{coin.year}</div>
    </div>
  );
};

// Memoize the component to prevent re-renders if props haven't changed
export default React.memo(CoinCard);