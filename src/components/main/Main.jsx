import React from 'react';
import './main.scss';

const Main = () => {
    return (
        <div className="main-container">
            <div className="player-container">
                <input
                    className="player-input"
                    placeholder="Nickname"
                    maxLength={20}
                />
                <button
                    className="play-button"
                    onClick={console.log}
                >
                    Play
                </button>
            </div>
        </div>
    );
};

export default Main;