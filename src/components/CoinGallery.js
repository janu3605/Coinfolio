import React from 'react';
import CoinCard from './CoinCard';

const CoinGallery = ({ coins, onCoinSelect, selectedCountry }) => {
  if (!coins.length) {
    return <div style={{marginTop: '2rem', color: '#94a3b8'}}>No coins found matching your criteria.</div>;
  }

  // If a specific country is selected, render a simple grid
  if (selectedCountry) {
    return (
      <div className="coin-gallery">
        {coins.map(coin => (
          <CoinCard key={coin.id} coin={coin} onClick={() => onCoinSelect(coin)} />
        ))}
      </div>
    );
  }

  // Otherwise, group coins by country for the full collection view
  const groupedCoins = coins.reduce((acc, coin) => {
    (acc[coin.country] = acc[coin.country] || []).push(coin);
    return acc;
  }, {});

  return (
    <div className="gallery-grouped-view">
      {Object.entries(groupedCoins).map(([country, countryCoins]) => (
        <div key={country} className="country-group">
          <h3 className="country-header">{country}</h3>
          <div className="coin-gallery">
            {countryCoins.map(coin => (
              <CoinCard key={coin.id} coin={coin} onClick={() => onCoinSelect(coin)} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoinGallery;

