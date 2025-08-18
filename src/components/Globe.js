import React, { useRef, useEffect, useState } from 'react';
import GlobeGL from 'react-globe.gl';

const WORLD_GEOJSON_URL = 'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson';

function getCountryMarkers(coins) {
  const seen = {};
  return coins.reduce((arr, coin) => {
    if (!seen[coin.country] && coin.coordinates) {
      arr.push({
        country: coin.country,
        lat: coin.coordinates[0],
        lng: coin.coordinates[1]
      });
      seen[coin.country] = true;
    }
    return arr;
  }, []);
}

const Globe = ({ coins, onCountrySelect }) => {
  const globeEl = useRef();
  const markers = getCountryMarkers(coins);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch(WORLD_GEOJSON_URL)
      .then(res => res.json())
      .then(data => setCountries(data.features));
  }, []);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <GlobeGL
        ref={globeEl}
        globeImageUrl={null}
        backgroundColor="rgba(0,0,0,0)"
        showGlobe={true}
        showAtmosphere={false}
        polygonsData={countries}
        polygonCapColor={() => 'rgba(255,255,255,0.05)'}
        polygonSideColor={() => 'rgba(0,0,0,0)'}
        polygonStrokeColor={() => '#fff'}
        polygonStrokeWidth={0.7}
        pointsData={markers}
        pointLat={d => d.lat}
        pointLng={d => d.lng}
        pointAltitude={0.01}
        pointColor={() => '#222'}
        pointRadius={0.35}
        pointsMerge={true}
        onPointClick={d => onCountrySelect(d.country)}
      />
    </div>
  );
};

export default Globe;