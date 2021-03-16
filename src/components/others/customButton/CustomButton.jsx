import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './customButton.scss';

const CustomButton = ({ icon, title }) => {
    return (
        <div className="button-wrapper">
            <div className="button-items">
                <FontAwesomeIcon
                    icon={icon}
                    className="button-items--icon"
                />
                <p>{title}</p>
            </div>
        </div>
    );
};

export default CustomButton;