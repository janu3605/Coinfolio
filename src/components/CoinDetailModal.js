import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const imgStyle = {
  width: '45%',
  height: '180px',
  objectFit: 'contain',
  margin: '0 2%',
  border: '1px solid #eee',
  borderRadius: '6px',
  background: '#fafafa',
};

const CoinDetailModal = ({ coin, onClose }) => (
  <Modal
    isOpen={!!coin}
    onRequestClose={onClose}
    contentLabel="Coin Details"
    style={{
      content: {
        maxWidth: '500px',
        margin: 'auto',
        borderRadius: '10px',
        padding: '2rem',
        boxShadow: '0 4px 24px rgba(0,0,0,0.15)'
      },
      overlay: { zIndex: 1000, background: 'rgba(0,0,0,0.3)' }
    }}
  >
    {coin && (
      <>
        <h2 style={{marginBottom: '1rem'}}>{coin.denomination} ({coin.year})</h2>
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: '1rem'}}>
          <img src={coin.frontImage} alt="Front" style={imgStyle} />
          <img src={coin.backImage} alt="Back" style={imgStyle} />
        </div>
        <div style={{marginBottom: '1rem'}}><strong>Country:</strong> {coin.country}</div>
        <div style={{marginBottom: '1rem'}}><strong>Historical Context:</strong> {coin.Context || coin.historicalContext}</div>
        <button onClick={onClose} style={{marginTop: '1rem'}}>Close</button>
      </>
    )}
  </Modal>
);

export default CoinDetailModal;
