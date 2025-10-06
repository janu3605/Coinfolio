import React, { useState, useEffect } from 'react';
import AnimatedNumber from './AnimatedNumber';
import './CurrencyBreakdown.css';

// Data for the currencies you want to feature in the ticker
const currencyData = [
  { currency: 'INR', name: 'Indian Rupee', flag: '🇮🇳', rate: 1.00 },
  { currency: 'USD', name: 'US Dollar', flag: '🇺🇸', rate: 83.51 },
  { currency: 'EUR', name: 'Euro', flag: '🇪🇺', rate: 90.82 },
  { currency: 'GBP', name: 'British Pound', flag: '🇬🇧', rate: 105.25 },
  { currency: 'AED', name: 'UAE Dirham', flag: '🇦🇪', rate: 22.73 },
];

const CurrencyBreakdown = ({ coinCountsByCurrency }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % currencyData.length);
    }, 4000); // Cycle every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const currentCurrency = currencyData[currentIndex];
  const coinCount = coinCountsByCurrency[currentCurrency.currency] || 0;

  return (
    <div className="currency-breakdown-overlay" key={currentIndex}>
      <div className="currency-breakdown-header">
        <span className="currency-flag">{currentCurrency.flag}</span>
        <div className="currency-info">
          <span className="currency-name">{currentCurrency.name}</span>
          <span className="currency-rate">₹{currentCurrency.rate.toFixed(2)} / {currentCurrency.currency}</span>
        </div>
      </div>
      <div className="currency-breakdown-body">
        <div className="collection-count-value">
          <AnimatedNumber value={coinCount} duration={1000} />
        </div>
        <div className="collection-count-label">Coins in Collection</div>
      </div>
    </div>
  );
};

export default CurrencyBreakdown;
