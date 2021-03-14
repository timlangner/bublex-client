import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faEye, faCogs} from "@fortawesome/free-solid-svg-icons";
import './main.scss';
import {faDiscord} from "@fortawesome/free-brands-svg-icons";

const Main = () => {
    return (
        <div className="main-container">
            <input
                className="player-input"
                placeholder="Nickname"
                maxLength={20}
            />
            <div className="duo-buttons">
                <button
                    className="settings-button"
                    onClick={console.log}
                >
                    <FontAwesomeIcon icon={faCogs} />
                </button>
                <button
                    className="spectate-button"
                    onClick={console.log}
                >
                    <FontAwesomeIcon icon={faEye} />
                </button>
            </div>
            <button
                className="play-button"
                onClick={console.log}
            >
                <FontAwesomeIcon icon={faPlay} />
            </button>
            <div className="ad-wrapper">
                <div className="center">
                    <p>Advertisement</p>
                </div>
                <div className="ad-container" />
            </div>
        </div>
    );
};

export default Main;