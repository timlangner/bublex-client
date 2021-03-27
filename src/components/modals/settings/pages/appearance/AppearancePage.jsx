import React, {useState} from "react";
import RestoreDefaults from "../../restoreDefaults/RestoreDefaults";
import { PrettoSlider } from "../../PrettoSlider";
import './appearancePage.scss';

const AppearancePage = () => {
    const [autoZoom, setAutoZoom] = useState(true);
    const [showPellets, setShowPellets] = useState(true);
    const [showChat, setShowChat] = useState(true);
    const [showMinimap, setShowMinimap] = useState(true);
    const [animationDelay, setAnimationDelay] = useState(100);

    return (
        <>
            <div className="checkbox-double">
                <div
                    className="label-group"
                    onClick={() => setAutoZoom(!autoZoom)}
                >
                    <input
                        type="checkbox"
                        checked={autoZoom}
                    />
                    <label
                        style={!autoZoom ? {color: 'darkgray'} : null}
                    >
                        Auto Zoom
                    </label>
                </div>
                <div
                    className="label-group"
                    onClick={() => setShowPellets(!showPellets)}
                >
                    <input
                        type="checkbox"
                        checked={showPellets}
                    />
                    <label
                        style={!showPellets ? {color: 'darkgray'} : null}
                    >
                        Show Pellets
                    </label>
                </div>
                <div
                    className="label-group"
                    onClick={() => setShowChat(!showChat)}
                >
                    <input
                        type="checkbox"
                        checked={showChat}
                    />
                    <label
                        style={!showChat ? {color: 'darkgray'} : null}
                    >
                        Show Chat
                    </label>
                </div>
                <div
                    className="label-group"
                    onClick={() => setShowMinimap(!showMinimap)}
                >
                    <input
                        type="checkbox"
                        checked={showMinimap}
                    />
                    <label
                        style={!showMinimap ? {color: 'darkgray'} : null}
                    >
                        Show Minimap
                    </label>
                </div>
            </div>
            <hr className="dividing-line" />
            <div className="slider-wrapper">
                <p>ANIMATION DELAY</p>
                <PrettoSlider
                    value={animationDelay}
                    min={0}
                    max={200}
                    step={5}
                    valueLabelDisplay="on"
                    aria-label="pretto slider"
                    onChange={
                        (event, newValue) => setAnimationDelay(newValue)
                    }
                />
            </div>
            <RestoreDefaults />
        </>
    );
};

export default AppearancePage;