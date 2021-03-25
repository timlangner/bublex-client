import React, {useState} from "react";
import './restoreDefaults.scss';

const RestoreDefaults = () => {
    return (
        <div className="restore-defaults--container">
            <hr />
            <p className="restore-defaults--header">RESTORE DEFAULTS</p>
            <p className="restore-defaults--text">Press the button below if you wish to restore the settings to their default value.</p>
            <button className="restore-defaults--button">Restore Defaults</button>
        </div>
    );
};

export default RestoreDefaults;