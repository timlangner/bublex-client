import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faEye, faCogs} from "@fortawesome/free-solid-svg-icons";
import Settings from "../modals/settings/Settings";
import './main.scss';

const Main = () => {
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        console.log(showSettings);
    }, [showSettings]);

    return (
        <>
            {
                showSettings ? (
                    <Settings show={true} onHide={() => setShowSettings(false)}/>
                ) : null
            }
            <div className="main-container">
                <input
                    className="player-input"
                    placeholder="Nickname"
                    maxLength={20}
                />
                <div className="duo-buttons">
                    <button
                        className="settings-button"
                        onClick={() => setShowSettings(true)}
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
                <div className="play-button--wrapper">
                    <button
                        className="play-button"
                        onClick={console.log}
                    >
                        <FontAwesomeIcon icon={faPlay} />
                    </button>
                </div>
                <div className="ad-wrapper">
                    <div className="center">
                        <p>Advertisement</p>
                    </div>
                    <div className="ad-container" />
                </div>
            </div>
        </>
    );
};

export default Main;
