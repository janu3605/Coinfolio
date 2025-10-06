import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import GlobeGL from 'react-globe.gl';
import { MeshPhongMaterial, CanvasTexture, SpriteMaterial, Sprite } from 'three';

const WORLD_GEOJSON_URL =
  'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson';

const countryColors = {
  'India': '#FF9933', // Saffron
  'UAE': '#00732F',   // Green
  'Uganda': '#FCDC04', // Yellow
  'Kenya': '#000000',   // Black
  'Zambia': '#198A46', // Green
  'Botswana': '#75AADB', // Light Blue
  'South Africa': '#007749', // Green
  'Malawi': '#CE1126', // Red
  'Tanzania': '#1EB53A', // Green
  'Mozambique': '#000000', // Black
  'USA': '#3C3B6E',   // Old Glory Blue
  'United Kingdom': '#CF142B', // Red
  'Spain': '#FABD00', // Yellow
  'Kuwait': '#007A3D', // Green
  'Malaysia': '#FCBF1E', // Yellow
  'Sri Lanka': '#FFD700', // Gold
  'Nepal': '#DC143C', // Crimson
  'Thailand': '#2E2A4D', // Blue
  'Pakistan': '#006643', // Green
  'default': '#6c757d' // A default gray color
};

function createGradientCanvas() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  g.addColorStop(0, 'rgba(204, 89, 194, 0.7)');
  g.addColorStop(1, 'rgba(109, 231, 255, 0.7)');

  ctx.fillStyle = g;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  return canvas;
}

/* ---- BLACK DOT SPRITE (pointer) ---- */
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
  return coins.reduce((arr, coin) => {
    if (coin.coordinates) {
      arr.push({
        country: coin.country,
        lat: coin.coordinates[0],
        lng: coin.coordinates[1]
      });
    }
    return arr;
  }, []);
}

const Globe = ({ coins, onCountrySelect }) => {
  const globeEl = useRef();
  const markers = getCountryMarkers(coins);
  const [countries, setCountries] = useState([]);

  const globeTexture = useMemo(() => new CanvasTexture(createGradientCanvas()), []);

  // Reusable material for the sprite markers
  const circleMaterial = useMemo(() => {
    const texture = new CanvasTexture(createCircleCanvas());
    return new SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
  }, []);

  // Factory for the point sprite; scales relative to globe radius to stay small
  const pointSpriteFactory = useCallback(() => {
    const sprite = new Sprite(circleMaterial);
    const r = globeEl.current ? globeEl.current.getGlobeRadius() : 100;
    const px = Math.max(1.2, r * 0.015); // small dot; tweak if needed
    sprite.scale.set(px, px, 1);
    return sprite;
  }, [circleMaterial]);

  useEffect(() => {
    fetch(WORLD_GEOJSON_URL)
      .then(res => res.json())
      .then(data => setCountries(data.features));
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
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
        polygonCapColor={() => 'rgba(255, 255, 255, 1)'}
        polygonSideColor={() => 'rgba(180, 193, 195, 0.37)'}
        polygonStrokeColor={() => '#d6d6d6ff'}
        polygonStrokeWidth={0}

        /* ---- POINTERS (overrides to kill defaults) ---- */
        pointsData={markers}
        pointLat={d => d.lat}
        pointLng={d => d.lng}
        pointAltitude={() => 0.01}
        pointColor={() => '#d7631fff'}
        pointThreeObject={pointSpriteFactory}

        onPointClick={d => onCountrySelect(d.country)}
      />
    </div>
  );
};

export default Globe;
