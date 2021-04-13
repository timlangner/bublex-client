import React, {useEffect} from "react";
import Main from "./main/Main";
import './App.scss';
import Account from "./account/Account";
import Serverlist from "./serverlist/Serverlist";
import Others from "./others/Others";
import Featured from "./featured/Featured";
import { init } from './init';

const App = () => {
    useEffect(() => {
        init();
    }, []);

    const logoUrl = "https://cdn.discordapp.com/attachments/684020121760432169/820415570549276713/bublex.io_logo_original.png";

    return (
        <div className="app">
            <canvas id="mycanvas"/>
            <div className="interface-container">
                <div className="interface">
                    <div className="header">
                        <img src={logoUrl} className="logo" alt="bublex-logo" />
                        <p><span>76</span> players online</p>
                    </div>
                    <div className="panels">
                        <div className="left-panel">
                            <Account />
                            <Others />
                            <Featured />
                        </div>
                        <Main />
                        <div className="right-panel">
                            <Serverlist />
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default App;
