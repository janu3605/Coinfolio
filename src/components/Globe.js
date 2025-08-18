import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import GlobeGL from 'react-globe.gl';
// import { MeshPhongMaterial, CanvasTexture, SpriteMaterial, Sprite } from 'three';
import { MeshPhongMaterial, CanvasTexture, SpriteMaterial, Sprite } from 'https://esm.sh/three';

const WORLD_GEOJSON_URL = 'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson';


function createGradientCanvas() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext('2d');

  const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);

  gradient.addColorStop(0, 'rgba(204, 89, 194, 0.7)'); // Start color
  gradient.addColorStop(1, 'rgba(109, 231, 255, 0.7)');  // End color

  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  return canvas;
}


function createCircleCanvas() {
  const canvas = document.createElement('canvas');
  const size = 64; // increased resolution for sharper circles
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');

  context.beginPath();
  context.arc(size / 2, size / 2, size / 2 - 2, 0, 2 * Math.PI);

  context.fillStyle = '#000000'; // solid black fill
  context.fill();

  return canvas;
}


function getCountryMarkers(coins) {
  const seen = {};
  return coins.reduce((arr, coin) => {
    if (coin.coordinates) {
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

  const globeTexture = useMemo(() => {
    const canvas = createGradientCanvas();
    return new CanvasTexture(canvas);
  }, []);

  const circleMaterial = useMemo(() => {
    const circleCanvas = createCircleCanvas();
    const texture = new CanvasTexture(circleCanvas);
    return new SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
  }, []);


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
        globeMaterial={new MeshPhongMaterial({
          map: globeTexture,
          color: '#ffffff',
          transparent: true
        })}
        showAtmosphere={false}
        polygonsData={countries}
        polygonCapColor={() => 'rgba(255, 255, 255, 1)'}
        polygonSideColor={() => 'rgba(180, 193, 195, 0.37)'}
        polygonStrokeColor={() => '#d6d6d6ff'}
        polygonStrokeWidth={0}
        pointThreeObject={useCallback(() => {
          const sprite = new Sprite(circleMaterial);
          sprite.scale.set(2.5, 2.5, 1); // adjust size here
          return sprite;
        }, [circleMaterial])}

        onPointClick={d => onCountrySelect(d.country)} pointsData={markers}
      // pointLat={d => d.lat}
      // pointLng={d => d.lng}
      // pointAltitude={0.03}
      // pointColor={() => '#2a2a2a'}
      // pointRadius={0.25}
      />
    </div>
  );
};
export default Globe;