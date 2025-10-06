import React, { useEffect, useState, useMemo } from 'react';
import './App.css';
import Globe from './components/Globe';
import CoinGallery from './components/CoinGallery';
import CoinDetailModal from './components/CoinDetailModal';
import SearchBar from './components/SearchBar';
import Dashboard from './components/Dashboard';
import AnimatedNumber from './components/AnimatedNumber';
// import CurrencyTicker from './components/CurrencyBreakdown';
import CurrencyBreakdown from './components/CurrencyBreakdown';

const countryToContinent = {
  'India': 'Asia', 'UAE': 'Asia', 'Uganda': 'Africa', 'Kenya': 'Africa',
  'Zambia': 'Africa', 'Botswana': 'Africa', 'South Africa': 'Africa', 'Malawi': 'Africa',
  'Tanzania': 'Africa', 'Mozambique': 'Africa', 'USA': 'North America',
  'United Kingdom': 'Europe', 'Spain': 'Europe', 'Kuwait': 'Asia', 'Malaysia': 'Asia',
  'Sri Lanka': 'Asia', 'Nepal': 'Asia', 'Thailand': 'Asia', 'Pakistan': 'Asia',
};

const funFacts = [
  "The study of coins is called numismatics.",
  "The largest coin ever made was a 100kg Canadian gold coin worth $1 million.",
  "The first coins were minted in the ancient kingdom of Lydia, now part of Turkey, around 600 BC.",
  "The 'heads' side of a coin is technically called the 'obverse', and the 'tails' side is the 'reverse'.",
  "Roman emperors used coins for propaganda, often featuring their portraits to assert their power across the empire."
];

function App() {
  const [statsAnimationReady, setStatsAnimationReady] = useState(false);
  const [coins, setCoins] = useState([]);
  const [viewMode, setViewMode] = useState('globe');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [funFact, setFunFact] = useState('');

  useEffect(() => {
    fetch('/coins.json')
      .then(res => res.json())
      .then(data => {
        setCoins(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch coins:", error);
        setIsLoading(false);
      });

    // Pick a random fun fact on load
    setFunFact(funFacts[Math.floor(Math.random() * funFacts.length)]);
  }, []);

  // Delay stats animation until after loading is complete
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setStatsAnimationReady(true), 1000);
      return () => clearTimeout(timer);
    } else {
      setStatsAnimationReady(false);
    }
  }, [isLoading]);

  const filteredCoins = useMemo(() => {
    let sourceCoins = coins;
    if (viewMode === 'country' && selectedCountry) {
      sourceCoins = coins.filter(coin => coin.country === selectedCountry);
    }
    if (search) {
      const s = search.toLowerCase();
      return sourceCoins.filter(coin =>
        coin.country.toLowerCase().includes(s) ||
        String(coin.year).includes(s) ||
        coin.denomination.toLowerCase().includes(s)
      );
    }
    return sourceCoins;
  }, [search, selectedCountry, coins, viewMode]);

  const collectionStats = useMemo(() => {
    const totalCoins = coins.reduce((sum, coin) => sum + (coin.count || 0), 0);
    const uniqueCountries = new Set(coins.map(coin => coin.country)).size;

    const continentSet = new Set();
    coins.forEach(coin => {
      const continent = countryToContinent[coin.country];
      if (continent) continentSet.add(continent);
    });
    const uniqueContinents = continentSet.size;

    return { totalCoins, uniqueCountries, uniqueContinents };
  }, [coins]);

  const handleCountrySelect = country => {
    setSelectedCountry(country);
    setViewMode('country');
    setSearch('');
  };

  const handleCoinSelect = coin => {
    setSelectedCoin(coin);
  };

  const handleCloseModal = () => {
    setSelectedCoin(null);
  };

  const handleBackToGlobe = () => {
    setSelectedCountry(null);
    setViewMode('globe');
    setSearch('');
  };

  const handleShowDashboard = () => {
    setViewMode('dashboard');
    setSearch('');
  };

  if (isLoading) {
    return <div className="loading-screen"><h1>Loading Collection...</h1></div>;
  }

  const renderContent = () => {
    switch (viewMode) {
      case 'country':
        return (
          <>
            <h2>Coins from {selectedCountry}</h2>
            <button onClick={handleBackToGlobe} style={{ margin: '1rem' }}>Back to Globe</button>
            <SearchBar search={search} setSearch={setSearch} />
            <CoinGallery coins={filteredCoins} onCoinSelect={handleCoinSelect} />
          </>
        );
      case 'dashboard':
        return viewMode === 'country' ? (
          <>
            <h2>Coins from {selectedCountry}</h2>
            <button onClick={handleBackToGlobe} style={{ margin: '1rem' }}>Back to Globe</button>
            <SearchBar search={search} setSearch={setSearch} />
            <CoinGallery coins={filteredCoins} onCoinSelect={handleCoinSelect} />
          </>
        ) : (
          <Dashboard
            stats={collectionStats}
            coins={filteredCoins}
            onCoinSelect={handleCoinSelect}
            search={search}
            setSearch={setSearch}
            onBack={handleBackToGlobe}
          />
        );
      case 'globe':
      default:
        return (
          <div className="globe-view">
            <h1 className="background-title">COINFOLIO</h1>
            <div className="globe-ui-overlay">
              <h1>Coinfolio</h1>
              <p>A visual journey through your personal coin collection. Click a marker to explore a country or view the entire collection.</p>

              <div className="globe-stats">
                <div className="stat-item">
                  <i className="material-symbols-outlined">
                    ev_shadow
                  </i>
                  <div>
                    <div className="stat-item-value">
                      <AnimatedNumber value={statsAnimationReady ? collectionStats.totalCoins : 0} duration={1000} />
                    </div>
                    <div className="stat-item-label">Total Coins</div>
                  </div>
                </div>
                <div className="stat-item">
                  <i className="material-symbols-outlined">
                    flag
                  </i>
                  <div>
                    <div className="stat-item-value">
                      <AnimatedNumber value={statsAnimationReady ? collectionStats.uniqueCountries : 0} duration={1000} />
                    </div>
                    <div className="stat-item-label">Countries</div>
                  </div>
                </div>
                <div className="stat-item">
                  <i className="material-symbols-outlined">
                    globe
                  </i>
                  <div>
                    <div className="stat-item-value">
                      <AnimatedNumber value={statsAnimationReady ? collectionStats.uniqueContinents : 0} duration={1000} />
                    </div>
                    <div className="stat-item-label">Continents</div>
                  </div>
                </div>
              </div>

              <CurrencyBreakdown />

              <div className="did-you-know">
                <h3>Did you know?</h3>
                <p>{funFact}</p>
              </div>

              <button onClick={handleShowDashboard}>Explore Full Collection</button>
            </div>
            <Globe coins={coins} onCountrySelect={handleCountrySelect} />
          </div>
        );
    }
  };

  return (
    <div className="App">
      {viewMode !== 'globe' && <h1>Coinfolio</h1>}
      {renderContent()}
      <CoinDetailModal coin={selectedCoin} onClose={handleCloseModal} />
    </div>
  );
}

export default App;
