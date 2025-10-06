import React from 'react';
import CoinGallery from './CoinGallery';
import SearchBar from './SearchBar';
import AnimatedNumber from './AnimatedNumber';

const dashboardStyle = {
  padding: '2rem',
  textAlign: 'center',
};

const statsContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '2rem',
  marginBottom: '2rem',
};

const statBoxStyle = {
  background: '#fff',
  padding: '1rem 2rem',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
};

const statValueStyle = {
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#222',
};

const statLabelStyle = {
  fontSize: '1rem',
  color: '#777',
};

const Dashboard = ({ stats, coins, onCoinSelect, search, setSearch, onBack }) => {
  return (
    <div style={dashboardStyle}>
      <button onClick={onBack} style={{ marginBottom: '1rem' }}>Back to Globe</button>

      <div style={statsContainerStyle}>
        <div style={statBoxStyle}>
          <div style={statValueStyle}>
            <AnimatedNumber value={stats.totalCoins} />
          </div>
          <div style={statLabelStyle}>Total Coins</div>
        </div>
        <div style={statBoxStyle}>
          <div style={statValueStyle}>
            <AnimatedNumber value={stats.uniqueCountries}/>
          </div>
          <div style={statLabelStyle}>Unique Countries</div>
        </div>
      </div>

      <SearchBar search={search} setSearch={setSearch} />
      <CoinGallery coins={coins} onCoinSelect={onCoinSelect} />
    </div>
  );
};

export default Dashboard;