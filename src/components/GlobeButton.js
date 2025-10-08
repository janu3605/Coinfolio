import React from 'react';

const GlobeButton = ({ onClick }) => {
  return (
    <button className="globe-button" onClick={onClick} title="Back to Globe">
      <div className="globe-icon-wrapper">
        <div className="globe-sphere" />
      </div>
    </button>
  );
};

export default GlobeButton;
