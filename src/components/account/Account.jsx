import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import './account.scss';

const Account = () => {
    return (
        <div className="account-container">
            <div className="login-wrapper">
                <button className="login-button">
                    <FontAwesomeIcon icon={faDiscord} /> Login with Discord
                </button>
                <p> Login to save your in-game process, level up and get exclusive rewards!</p>
            </div>
        </div>
    );
};

export default Account;