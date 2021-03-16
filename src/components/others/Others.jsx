import React from 'react';
import { faShoppingCart, faChartBar, faTrophy, faUsers} from "@fortawesome/free-solid-svg-icons";
import CustomButton from "./customButton/CustomButton";
import './others.scss';

const Others = () => {
    return (
        <div className="others-container">
            <CustomButton icon={faShoppingCart} title="Shop" />
            <CustomButton icon={faChartBar} title="Stats" />
            <CustomButton icon={faTrophy} title="Top 100" />
            <CustomButton icon={faUsers} title="Friends" />
        </div>
    );
};

export default Others;