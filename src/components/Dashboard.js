import React from 'react';
import CoinGallery from './CoinGallery';
import SearchBar from './SearchBar';
import AnimatedNumber from './AnimatedNumber';
import GlobeButton from './GlobeButton'; // Import the new button

const Dashboard = ({ stats, coins, onCoinSelect, search, setSearch, onBack, setSortOrder }) => {
  return (
    <div className="dashboard-view">
      <GlobeButton onClick={onBack} />
      
      <div className="dashboard-stats">
        <div className="stat-box">
          <div className="stat-box-value"><AnimatedNumber value={stats.totalCoins} /></div>
          <div className="stat-box-label">Total Coins</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-value"><AnimatedNumber value={stats.uniqueCountries} /></div>
          <div className="stat-box-label">Unique Countries</div>
        </div>
      </div>

      <SearchBar search={search} setSearch={setSearch} />
      
      <CoinGallery coins={coins} onCoinSelect={onCoinSelect} />
    </div>
  );
};

export default Dashboard;

