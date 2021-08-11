import React, { useState, useEffect } from 'react';
import axios from '../../axios-albums';
import classes from '../CardView/CardView.css';
import { Spinner } from 'react-bootstrap';


const fullCard = props => {

    const [loadedCard, setLoadedCard] = useState(null);


    useEffect(() => {
        console.log(props);
        if (props.match.params.id) {
            if (!loadedCard || (loadedCard && loadedCard.id !== props.id)) {
                axios.get('/photos/' + props.match.params.id)
                    .then(response => {
                        console.log(response);
                        setLoadedCard(response.data);
                    });
            }
        }
    }, [])


    let card = <Spinner animation="border" variant="primary" />;

    if (loadedCard) {
        card = (
            <div className={classes.Card}>
                <div className={classes.CardImg}> <img src={loadedCard.url} alt="img" /> </div>
                <h2>{loadedCard.title}</h2>
                <p>{loadedCard.title}</p>
                <p>{loadedCard.albumId}</p>
            </div>

        );
    }
    return card;




}
export default fullCard;