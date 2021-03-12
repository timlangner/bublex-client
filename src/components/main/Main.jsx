import React from 'react';
import './main.scss';

const Main = () => {
    return (
        <div className="main-container">
            <input
                className="player-input"
                placeholder="Nickname"
                maxLength={20}
            />
            <div className="ad-wrapper">
                <div className="center">
                    <p>Advertisement</p>
                </div>
                <div className="ad-container" />
            </div>
            <div className="duo-buttons">
                <button
                    className="settings-button"
                    onClick={console.log}
                >
                    Settings
                </button>
                <button
                    className="spectate-button"
                    onClick={console.log}
                >
                    Spectate
                </button>
            </div>
            <button
                className="play-button"
                onClick={console.log}
            >
                Play
            </button>
        </div>
    );
};

export default Main;