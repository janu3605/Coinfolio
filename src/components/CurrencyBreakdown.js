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
  { currency: 'KES', name: 'Kenyan Shilling', flag: '🇰🇪', rate: 0.65 },
  { currency: 'UGX', name: 'Ugandan Shilling', flag: '🇺🇬', rate: 0.022 },
  { currency: 'ZAR', name: 'South African Rand', flag: '🇿🇦', rate: 4.50 },
  { currency: 'ZMW', name: 'Zambian Kwacha', flag: '🇿🇲', rate: 3.30 },
  { currency: 'BWP', name: 'Botswana Pula', flag: '🇧🇼', rate: 6.05 },
  { currency: 'MWK', name: 'Malawian Kwacha', flag: '🇲🇼', rate: 0.048 },
  { currency: 'TZS', name: 'Tanzanian Shilling', flag: '🇹🇿', rate: 0.032 },
  { currency: 'MZN', name: 'Mozambican Metical', flag: '🇲🇿', rate: 1.30 },
  { currency: 'KWD', name: 'Kuwaiti Dinar', flag: '🇰🇼', rate: 272.50 },
  { currency: 'MYR', name: 'Malaysian Ringgit', flag: '🇲🇾', rate: 17.75 },
  { currency: 'LKR', name: 'Sri Lankan Rupee', flag: '🇱🇰', rate: 0.28 },
  { currency: 'NPR', name: 'Nepalese Rupee', flag: '🇳🇵', rate: 0.62 },
  { currency: 'THB', name: 'Thai Baht', flag: '🇹🇭', rate: 2.28 },
  { currency: 'PKR', name: 'Pakistani Rupee', flag: '🇵🇰', rate: 0.30 },
];

const CurrencyBreakdown = ({ coinCountsByCurrency }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % currencyData.length);
    }, 4000); // Cycle every 4 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const currentCurrency = currencyData[currentIndex];
  // The || 0 here is a fallback in case a currency is in the ticker but not yet in the collection
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

