import React, { useEffect, useState } from 'react';
import './App.css';
import Globe from './components/Globe';
import CoinGallery from './components/CoinGallery';
import CoinDetailModal from './components/CoinDetailModal';
import SearchBar from './components/SearchBar';

function App() {
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/coins.json')
      .then(res => res.json())
      .then(data => {
        setCoins(data);
        setFilteredCoins(data);
      });
  }, []);

  useEffect(() => {
    let filtered = coins;
    if (search) {
      const s = search.toLowerCase();
      filtered = coins.filter(coin =>
        coin.country.toLowerCase().includes(s) ||
        String(coin.year).includes(s) ||
        coin.denomination.toLowerCase().includes(s)
      );
    }
    if (selectedCountry) {
      filtered = filtered.filter(coin => coin.country === selectedCountry);
    }
    setFilteredCoins(filtered);
  }, [search, selectedCountry, coins]);

  const handleCountrySelect = country => {
    setSelectedCountry(country);
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
    setSearch('');
  };

  return (
    <div className="App">
      <h1>Coinfolio</h1>
      {!selectedCountry ? (
        <Globe coins={coins} onCountrySelect={handleCountrySelect} />
      ) : (
        <>
          <button onClick={handleBackToGlobe} style={{margin: '1rem'}}>Back to Globe</button>
          <SearchBar search={search} setSearch={setSearch} />
          <CoinGallery coins={filteredCoins} onCoinSelect={handleCoinSelect} />
        </>
      )}
      <CoinDetailModal coin={selectedCoin} onClose={handleCloseModal} />
    </div>
  );
}

export default App;
