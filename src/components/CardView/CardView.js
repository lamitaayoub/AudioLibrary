import React from "react";
import classes from "./CardView.css"



const cardView = ({imageUrl, name, description, nbOfTracks, clicked}) => {
    return (
        <div className={classes.Card} onClick={clicked}>
            <div className={classes.CardImg}>
                <img src={imageUrl} alt='img' />
            </div>
            <div><h2>{name}</h2></div>
            <div><p>{description}</p></div>
            {nbOfTracks && <div><p>{nbOfTracks}</p></div>}
        </div>
    );
}

export default cardView;
