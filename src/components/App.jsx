import React from "react";
import Main from "./main/Main";
import './App.scss';
import Account from "./account/Account";
import Serverlist from "./serverlist/Serverlist";
import Others from "./others/Others";
import Featured from "./featured/Featured";

const App = () => {
    return (
        <div className="app">
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
  );
}

export default App;
