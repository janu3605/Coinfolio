import React, { useState } from 'react';
import Modal from 'react-modal';
import './CoinDetailModal.css';
import { SoundManager } from './SoundManager'; // Import the SoundManager

Modal.setAppElement('#root');

const handleImageError = (e) => {
  e.target.onerror = null;
  e.target.src = `https://placehold.co/200x200/e0e7ff/2a2a2a?text=Coin`;
};

const CoinDetailModal = ({ coin, onClose }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  if (!coin) {
    return null;
  }
  
  const getImagePath = (imagePath) => {
    if (!imagePath) return `https://placehold.co/200x200/e0e7ff/2a2a2a?text=No+Image`;
    return process.env.PUBLIC_URL + imagePath;
  };

  // Dedicated handler to ensure sound plays reliably
  const handleFlip = () => {
    setIsFlipped(prev => !prev);
    SoundManager.playCoinFlip();
  };

  const renderContext = () => {
    if (Array.isArray(coin.Context)) {
      return (
        <ul>
          {coin.Context.map((fact, index) => <li key={index}>{fact}</li>)}
        </ul>
      );
    }
    return <p>{coin.Context}</p>;
  };

  return (
    <Modal
      isOpen={!!coin}
      onRequestClose={onClose}
      contentLabel="Coin Details"
      className="coin-modal"
      overlayClassName="coin-modal-overlay"
    >
      <div className="modal-content">
        <button onClick={onClose} className="close-button">&times;</button>
        
        <h2>{coin.denomination} ({coin.year})</h2>

        <div className="coin-flipper" onClick={handleFlip}>
          <div className={`coin ${isFlipped ? 'flipped' : ''}`}>
            <div className="coin-face front">
              <img src={getImagePath(coin.frontImage)} alt={`${coin.denomination} - Front`} onError={handleImageError} />
            </div>
            <div className="coin-face back">
              <img src={getImagePath(coin.backImage)} alt={`${coin.denomination} - Back`} onError={handleImageError} />
            </div>
          </div>
        </div>
        <p className="flip-instruction">Click coin to flip</p>

        <div className="details-grid">
          <div className="detail-group-main">
            <p><strong>Country:</strong> {coin.country}</p>
            <div><strong>Context:</strong> {renderContext()}</div>
          </div>
          <div className="detail-group-specs">
            <p><strong>Material:</strong> {coin.material || 'N/A'}</p>
            <p><strong>Weight:</strong> {coin.weight || 'N/A'}</p>
            <p><strong>Diameter:</strong> {coin.diameter || 'N/A'}</p>
            <p><strong>Shape:</strong> {coin.shape || 'N/A'}</p>
            <p><strong>Mint:</strong> {coin.mint || 'N/A'}</p>
            <p><strong>Edge:</strong> {coin.edge || 'N/A'}</p>
          </div>
          <div className="detail-group-count">
            <p><strong>In Collection:</strong></p>
            <p className="count-number">{coin.count || 0}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CoinDetailModal;

