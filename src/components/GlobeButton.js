import React from 'react';

const GlobeButton = ({ onClick }) => {
    return (
        <div>
            <button className="globe-button" onClick={onClick}>
                <div className="globe-icon-wrapper">
                    <div className="globe-sphere" />
                </div>
            </button>
            <p className='gb'>Back to Globe</p>
        </div>
    );
};

export default GlobeButton;
