import React, { Component } from 'react';
import CardViewData from '../../CardViewData';
import CardView from '../../components/CardView/CardView';
import classes from '../../components/CardView/CardView.css'


class CardViewLibrary extends Component {

    state = {
        CardViewData,
        showNbOfTracks: true,
        selectedCardId: null

    }
    toggleDataHandler = () => {
        this.setState((prevState) => {
            return { ...prevState, showNbOfTracks: !prevState.showNbOfTracks }
        })
    }

    render() {

        return (
            <div>
                <div>
                    <button className={classes.togggleBtn} onClick={this.toggleDataHandler}>Toggle Tracks</button>
                </div>
                <div>
                    {CardViewData.map((album) => {
                        return (
                            <CardView
                                key={album._id}
                                imageUrl={album.imageUrl}
                                name={album.name}
                                description={album.description}
                                nbOfTracks={this.state.showNbOfTracks ? album.nbOfTracks : null}
                            />
                        );
                    })}
                </div>
                <div>
                </div>
            </div>
        )
    }
}
export default CardViewLibrary;