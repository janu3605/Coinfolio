import React, { useMemo } from 'react';
import CoinGallery from './CoinGallery';
import SearchBar from './SearchBar';
import AnimatedNumber from './AnimatedNumber';
import GlobeButton from './GlobeButton';
import { SoundManager } from './SoundManager'; // Import the SoundManager

const Dashboard = ({ title, stats, coins, onCoinSelect, search, setSearch, onBack, selectedCountry }) => {

  const displayedStats = useMemo(() => {
    const total = coins.reduce((sum, coin) => sum + (coin.count || 0), 0);
    const countries = selectedCountry ? 1 : stats.uniqueCountries;
    return { totalCoins: total, uniqueCountries: countries };
  }, [coins, selectedCountry, stats.uniqueCountries]);

  return (
    <div className="dashboard-view">
      <GlobeButton onClick={onBack} />
      
      <h1 className="dashboard-title">{title}</h1>
      
      <div className="dashboard-stats">
        <div className="stat-box">
          <div className="stat-box-value">
            <AnimatedNumber 
              value={displayedStats.totalCoins}
              onStart={SoundManager.playCountUp}
              onComplete={SoundManager.stopCountUp}
            />
          </div>
          <div className="stat-box-label">Total Coins</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-value">
            <AnimatedNumber 
              value={displayedStats.uniqueCountries}
              onStart={SoundManager.playCountUp}
              onComplete={SoundManager.stopCountUp}
            />
          </div>
          <div className="stat-box-label">{selectedCountry ? 'Country' : 'Unique Countries'}</div>
        </div>
      </div>

      <SearchBar 
        search={search} 
        setSearch={setSearch} 
        placeholder={selectedCountry ? `Search in ${selectedCountry}...` : "Search full collection..."} 
      />
      
      <CoinGallery coins={coins} selectedCountry={selectedCountry} onCoinSelect={onCoinSelect} />
    </div>
  );
};

export default Dashboard;

