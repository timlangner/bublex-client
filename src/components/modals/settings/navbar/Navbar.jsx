import React, {useState} from "react";
import './navbar.scss';

const Navbar = ({ selectedPage, setSelectedPage }) => {
    return (
        <nav>
            <div>
                <button
                    style={selectedPage == 0 ? {backgroundColor: '#353535'} : null}
                    onClick={() => setSelectedPage(0)}
                >
                    General
                </button>
                <button
                    style={selectedPage == 1 ? {backgroundColor: '#353535'} : null}
                    onClick={() => setSelectedPage(1)}
                >
                    Appearance
                </button>
                <button
                    style={selectedPage == 2 ? {backgroundColor: '#353535'} : null}
                    onClick={() => setSelectedPage(2)}
                >
                    Keybinds
                </button>
            </div>
        </nav>
    );
};

export default Navbar;