import React from 'react';

const handleImageError = (e) => {
  e.target.onerror = null; 
  e.target.src = `https://placehold.co/200x200/e0e7ff/2a2a2a?text=Coin`;
};

const CoinCard = ({ coin, onClick }) => {
  // Helper to get the correct image URL
  const getImageUrl = (path) => {
    if (!path) return '';

    // Check if it's a Google Drive link
    if (path.includes('drive.google.com')) {
      // Extract the file ID
      // Matches both /file/d/FILE_ID/view and id=FILE_ID patterns
      const idMatch = path.match(/\/d\/([^/]+)/) || path.match(/id=([^&]+)/);
      if (idMatch && idMatch[1]) {
        // Use the Googleusercontent domain which is more reliable for direct embedding
        return `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
      }
    }

    // If it's another full URL, return as is
    if (path.startsWith('https') || path.startsWith('//')) {
      return path;
    }

    // Otherwise, treat as local asset
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${process.env.PUBLIC_URL}/${cleanPath}`;
  };

  // Check for both casing conventions
  const imagePath = coin.frontImage || coin.FrontImage;
  const imageUrl = getImageUrl(imagePath);

  return (
    <div className="coin-card" onClick={onClick}>
      <img 
        src={imageUrl} 
        alt={coin.denomination} 
        onError={handleImageError}
        loading="lazy"
      />
      <div className="coin-card-denom">{coin.denomination}</div>
      <div className="coin-card-year">{coin.year}</div>
    </div>
  );
};

export default React.memo(CoinCard);