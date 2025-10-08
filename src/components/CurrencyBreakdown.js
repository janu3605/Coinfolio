import React, { useState, useEffect } from 'react';
import './CurrencyBreakdown.css';
import AnimatedNumber from './AnimatedNumber';

const currencyData = {
    'INR': { name: 'Indian Rupee', rate: 1.00, flag: '🇮🇳' },
    'USD': { name: 'US Dollar', rate: 83.50, flag: '🇺🇸' },
    'EUR': { name: 'Euro', rate: 90.80, flag: '🇪🇺' },
    'GBP': { name: 'British Pound', rate: 105.20, flag: '🇬🇧' },
    'AED': { name: 'UAE Dirham', rate: 22.70, flag: '🇦🇪' },
    'UGX': { name: 'Ugandan Shilling', rate: 0.022, flag: '🇺🇬' },
    'KES': { name: 'Kenyan Shilling', rate: 0.64, flag: '🇰🇪' },
    'ZMW': { name: 'Zambian Kwacha', rate: 3.25, flag: '🇿🇲' },
    'BWP': { name: 'Botswana Pula', rate: 6.05, flag: '🇧🇼' },
    'ZAR': { name: 'South African Rand', rate: 4.50, flag: '🇿🇦' },
    'MWK': { name: 'Malawian Kwacha', rate: 0.048, flag: '🇲🇼' },
    'TZS': { name: 'Tanzanian Shilling', rate: 0.032, flag: '🇹🇿' },
    'MZN': { name: 'Mozambican Metical', rate: 1.30, flag: '🇲🇿' },
    'KWD': { name: 'Kuwaiti Dinar', rate: 272.50, flag: '🇰🇼' },
    'MYR': { name: 'Malaysian Ringgit', rate: 17.75, flag: '🇲🇾' },
    'LKR': { name: 'Sri Lankan Rupee', rate: 0.28, flag: '🇱🇰' },
    'NPR': { name: 'Nepalese Rupee', rate: 0.62, flag: '🇳🇵' },
    'THB': { name: 'Thai Baht', rate: 2.28, flag: '🇹🇭' },
    'PKR': { name: 'Pakistani Rupee', rate: 0.30, flag: '🇵🇰' }
};

const currencies = Object.keys(currencyData);

const CurrencyBreakdown = ({ coinCounts, isVisible }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % currencies.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isVisible]);

  // Safeguard: Don't render if data is not ready
  if (!isVisible || !coinCounts) {
    return null;
  }

  const currency = currencies[currentIndex];
  const data = currencyData[currency];
  // Safeguard: Default to 0 if the currency is not in the collection
  const count = coinCounts[currency] || 0;

  return (
    <div className="currency-breakdown" key={currentIndex}>
      <div className="breakdown-header">
        <span className="breakdown-flag">{data.flag}</span>
        <span className="breakdown-name">{data.name}</span>
      </div>
      <div className="breakdown-body">
        <div className="breakdown-item">
          <div className="breakdown-label">Value in INR</div>
          <div className="breakdown-value">₹<AnimatedNumber value={data.rate} duration={500} /></div>
        </div>
        <div className="breakdown-item">
          <div className="breakdown-label">Coins in Collection</div>
          <div className="breakdown-value"><AnimatedNumber value={count} duration={500} /></div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyBreakdown;

