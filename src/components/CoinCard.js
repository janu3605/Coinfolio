import React from 'react';

const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '1rem',
  background: '#fff',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  cursor: 'pointer',
  textAlign: 'center',
  transition: 'box-shadow 0.2s',
};
const imgStyle = {
  width: '80%',
  height: '120px',
  objectFit: 'contain',
  marginBottom: '0.5rem',
};

const CoinCard = ({ coin, onClick }) => (
  <div style={cardStyle} onClick={onClick} title={coin.denomination}>
    <img src={coin.frontImage} alt={coin.denomination} style={imgStyle} />
    <div style={{ fontWeight: 'bold' }}>{coin.denomination}</div>
    <div style={{ color: '#888' }}>{coin.year}</div>
  </div>
);

export default CoinCard;
