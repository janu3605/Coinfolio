import React, { useMemo } from 'react';
import CoinGallery from './CoinGallery';
import SearchBar from './SearchBar';
import AnimatedNumber from './AnimatedNumber';
import GlobeButton from './GlobeButton';

const Dashboard = ({ stats, coins, onCoinSelect, search, setSearch, onBack, selectedCountry }) => {
  // Calculate stats based on the coins passed to the dashboard.
  // This is simpler and more direct.
  const displayedStats = useMemo(() => {
    const total = coins.reduce((sum, coin) => sum + (coin.count || 0), 0);
    const countries = selectedCountry ? 1 : stats.uniqueCountries;
    return { totalCoins: total, uniqueCountries: countries };
  }, [coins, selectedCountry, stats.uniqueCountries]);

  return (
    <div className="dashboard-view">
      <GlobeButton onClick={onBack} />
      
      <h2>{selectedCountry ? `Coins from ${selectedCountry}` : 'Full Collection'}</h2>
      
      <div className="dashboard-stats">
        <div className="stat-box">
          <div className="stat-box-value"><AnimatedNumber value={displayedStats.totalCoins} /></div>
          <div className="stat-box-label">Total Coins</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-value"><AnimatedNumber value={displayedStats.uniqueCountries} /></div>
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

