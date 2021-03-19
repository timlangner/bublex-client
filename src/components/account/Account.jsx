import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faCoins, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import './account.scss';

const Account = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    return (
        <div className="account-container">
            {
                isLoggedIn ? (
                    <div className="profile-wrapper">
                        <div style={{ display: 'flex' }}>
                            <div className="current-skin" />
                            <div className="profile-information">
                                <p className="username">Pake</p>
                                <div className="coins-wrapper">
                                    <FontAwesomeIcon icon={faCoins} className="coins-icon" />
                                    <p>480</p>
                                </div>
                            </div>
                            <div className="logout-wrapper">
                                <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" />
                            </div>
                        </div>
                        <div className="level-bar-wrapper">
                            <div className="level-wrapper">
                                <p>Level 3</p>
                                <p>Level 4</p>
                            </div>
                            <div className="level-bar">
                                <div className="fill-bar" />
                                <p>33 / 150 XP</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="login-wrapper">
                        <button className="login-button">
                            <FontAwesomeIcon icon={faDiscord} /> Login with Discord
                        </button>
                        <p> Login to save your in-game process, level up and get exclusive rewards!</p>
                    </div>
                )
            }
        </div>
    );
};

export default Account;