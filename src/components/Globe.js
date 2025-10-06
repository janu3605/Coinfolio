import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import GlobeGL from 'react-globe.gl';
import { MeshPhongMaterial, CanvasTexture, SpriteMaterial, Sprite } from 'three';

const WORLD_GEOJSON_URL =
  'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson';

const countryToContinent = {
  'India': 'Asia', 'UAE': 'Asia', 'Uganda': 'Africa', 'Kenya': 'Africa',
  'Zambia': 'Africa', 'Botswana': 'Africa', 'South Africa': 'Africa', 'Malawi': 'Africa',
  'Tanzania': 'Africa', 'Mozambique': 'Africa', 'USA': 'North America',
  'United Kingdom': 'Europe', 'Spain': 'Europe', 'Kuwait': 'Asia', 'Malaysia': 'Asia',
  'Sri Lanka': 'Asia', 'Nepal': 'Asia', 'Thailand': 'Asia', 'Pakistan': 'Asia',
};

const continentColors = {
  'Asia': '#FFC300', 'Africa': '#2ECC71', 'North America': '#3498DB',
  'Europe': '#E74C3C', 'default': '#95A5A6'
};


// function createGradientCanvas() {
//   const canvas = document.createElement('canvas');
//   canvas.width = 128;
//   canvas.height = 64;
//   const ctx = canvas.getContext('2d');
//   const g = ctx.createLinearGradient(0, 0, canvas.width, 0);
//   const color1 = 'rgba(109, 231, 255, 0.8)';
//   const color2 = 'rgba(204, 89, 194, 0.8)';
//   g.addColorStop(0, color1);
//   g.addColorStop(0.5, color2);
//   g.addColorStop(1, color1);
//   ctx.fillStyle = g;
//   ctx.fillRect(0, 0, canvas.width, canvas.height);
//   return canvas;
// }


function createGradientCanvas() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  // A single, solid color for the globe texture
  const globeColor = 'rgba(110, 100, 200, 0.6)';

  ctx.fillStyle = globeColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  return canvas;
}

function createCircleCanvas() {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = true;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2);
  ctx.fillStyle = '#000000';
  ctx.fill();
  return canvas;
}

function getCountryMarkers(coins) {
  const uniqueCountries = {};
  coins.forEach(coin => {
    if (coin.coordinates && !uniqueCountries[coin.country]) {
      uniqueCountries[coin.country] = {
        country: coin.country,
        lat: coin.coordinates[0],
        lng: coin.coordinates[1]
      };
    }
  });
  return Object.values(uniqueCountries);
}

const Globe = ({ coins, onCountrySelect }) => {
  const globeEl = useRef();
  const markers = useMemo(() => getCountryMarkers(coins), [coins]);
  const [countries, setCountries] = useState([]);
  const globeTexture = useMemo(() => new CanvasTexture(createGradientCanvas()), []);
  const circleMaterial = useMemo(() => {
    const texture = new CanvasTexture(createCircleCanvas());
    return new SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
  }, []);
  const pointSpriteFactory = useCallback(() => {
    const sprite = new Sprite(circleMaterial);
    const r = globeEl.current ? globeEl.current.getGlobeRadius() : 100;
    const px = Math.max(1.2, r * 0.015);
    sprite.scale.set(px, px, 1);
    return sprite;
  }, [circleMaterial]);
  
  const getPointColor = useCallback((d) => {
    const continent = countryToContinent[d.country];
    return continentColors[continent] || continentColors.default;
  }, []);

  useEffect(() => {
    fetch(WORLD_GEOJSON_URL)
      .then(res => res.json())
      .then(data => setCountries(data.features));
  }, []);

  useEffect(() => {
    const globe = globeEl.current;
    if (globe) {
      globe.pointOfView({ lat: 20, lng: 85, altitude: 1.7 });

      // Enable auto-rotation
      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.3; // Adjust speed as needed
      // globe.controls().enableZoom = false; // Optional: disable user zoom
    }
  }, []);

  return (
    <div className="globe-container">
      <GlobeGL
        ref={globeEl}
        globeImageUrl={null}
        backgroundColor="rgba(0,0,0,0)"
        showGlobe
        globeMaterial={
          new MeshPhongMaterial({
            map: globeTexture,
            color: '#ffffff',
            transparent: true
          })
        }
        showAtmosphere={false}
        polygonsData={countries}
        polygonCapColor={() => 'rgba(72, 53, 82, 1)'}
        polygonSideColor={() => 'rgba(188, 180, 195, 0.37)'}
        polygonStrokeColor={() => '#000000ff'}
        polygonStrokeWidth={0}
        pointsData={markers}
        pointLat={d => d.lat}
        pointLng={d => d.lng}
        pointAltitude={() => 0.02}
        pointColor={getPointColor}
        pointThreeObject={pointSpriteFactory}
        onPointClick={d => onCountrySelect(d.country)}
      />
    </div>
  );
};

export default Globe;