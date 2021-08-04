import React from "react";
import classes from "./CardView.css"



const cardView = (props) => {
    return (
        <div className={classes.Card}>
            <div className={classes.CardImg}>
                <img src={props.imageUrl} alt='img' />
            </div>
            <div><h2>{props.name}</h2></div>
            <div><p>{props.description}</p></div>
            {props.nbOfTracks && <div><p>{props.nbOfTracks}</p></div>}
        </div>
    );
}

export default cardView;
