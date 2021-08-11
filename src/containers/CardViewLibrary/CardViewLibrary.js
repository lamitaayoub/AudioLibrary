import axios from '../../axios-albums';
import React, { useState, useEffect } from 'react';
import CardView from '../../components/CardView/CardView';
import classes from '../../components/CardView/CardView.css'
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const cardViewLibrary = (props) => {

    const [cardViewData, setCardViewData] = useState(null);
    const [showNbOfTracks, setShowNbOfTracks] = useState(true);
    const [selectedCardId, setSelectedCardId] = useState(null);


    const toggleDataHandler = () => {
        setShowNbOfTracks(!showNbOfTracks);
    }

    useEffect(() => {
        axios.get('/photos')
            .then(response => {
                setCardViewData(response.data)
            });
    }, []
    )
    const cardViewSelectHandler = (id) => {
        setSelectedCardId(id);
    }


    // const { cardViewData } = cardViewData
    return (
        <div>
            <div>
                <button className={classes.togggleBtn} onClick={toggleDataHandler}>Toggle Tracks</button>
            </div>
            <div>
                {cardViewData ? (
                    cardViewData.map((album) => (
                        (<Link to={'/' + album.id} key={album.id}>
                            <CardView

                                imageUrl={album.url}
                                name={album.title.slice(0, 10)}
                                description={album.title.slice(0, 30)}
                                nbOfTracks={showNbOfTracks ? album.albumId : null}
                                clicked={() => cardViewSelectHandler(album.id)}
                            />
                        </Link>))
                    )
                ) : (<Spinner animation="border" variant="primary" />)
                }
            </div>
            <div>
            </div>
        </div>
    )

}
export default cardViewLibrary;