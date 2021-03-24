import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import './settings.scss';

const Settings = (props) => {
    const [hideHats, setHideHats] = useState(false);
    const [showMass, setShowMass] = useState(true);
    const [hideNames, setHideNames] = useState(false);
    const [showSkins, setShowSkins] = useState(true);

    return (
        <Modal
            {...props}
            size="lg"
            contentClassName="settings-modal-content"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Settings
                </Modal.Title>
            </Modal.Header>
            <Modal.Body
                style={{minHeight: 'calc(100vh - 450px)', overflowY: 'auto'}}
            >
                <nav>
                    <div>
                        <button
                            className="general-settings"
                            onClick={console.log}
                        >
                            General
                        </button>
                        <button
                            className="appearance-settings"
                            onClick={console.log}
                        >
                            Appearance
                        </button>
                        <button
                            className="keybinds-settings"
                            onClick={console.log}
                        >
                            Keybinds
                        </button>
                    </div>
                </nav>
                <main>
                    <div className="checkbox-double">
                        <div
                            className="label-group"
                            onClick={() => setHideHats(!hideHats)}
                        >
                            <input
                                type="checkbox"
                                checked={hideHats}
                            />
                            <label
                                style={!hideHats ? {color: 'darkgray'} : null}
                            >
                                Hide Hats
                            </label>
                        </div>
                        <div
                            className="label-group"
                            onClick={() => setShowMass(!showMass)}
                        >
                            <input
                                type="checkbox"
                                checked={showMass}
                            />
                            <label
                                style={!showMass ? {color: 'darkgray'} : null}
                            >
                                Show Mass
                            </label>
                        </div>
                        <div
                            className="label-group"
                            onClick={() => setHideNames(!hideNames)}
                        >
                            <input
                                type="checkbox"
                                checked={hideNames}
                            />
                            <label
                                style={!hideNames ? {color: 'darkgray'} : null}
                            >
                                Hide Names
                            </label>
                        </div>
                        <div
                            className="label-group"
                            onClick={() => setShowSkins(!showSkins)}
                        >
                            <input
                                type="checkbox"
                                checked={showSkins}
                            />
                            <label
                                style={!showSkins ? {color: 'darkgray'} : null}
                            >
                                Show Skins
                            </label>
                        </div>
                    </div>
                </main>
            </Modal.Body>
        </Modal>
    );
};

export default Settings;
