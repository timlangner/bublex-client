import React, {useState} from "react";
import './generalPage.scss';

const GeneralPage = () => {
    const [hideHats, setHideHats] = useState(false);
    const [showMass, setShowMass] = useState(true);
    const [hideNames, setHideNames] = useState(false);
    const [showSkins, setShowSkins] = useState(true);

    return (
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
    );
};

export default GeneralPage;