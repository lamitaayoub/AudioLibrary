import React, { useState, useEffect } from 'react';
import axios from '../../axios-albums';
//import classes from '../CardView/CardView.css';
//import { Spinner } from 'react-bootstrap';
import Songs from '../Songs/Songs';
import Pagination from '../Pagination/Pagination';


const fullCard = props => {

    const [loadedCard, setLoadedCard] = useState(null);
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [songsPerPage] = useState(10);


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
    }, []);

    useEffect(() => {
        const fetchSongs = async () => {
            setLoading(true);
            const res = await axios.get('/Posts');
            setSongs(res.data);
            setLoading(false);
        };

        fetchSongs();
    }, []);


    // let card = <Spinner animation="border" variant="primary" />;

    // if (loadedCard) {
    //     card = (
    //         <div className={classes.Card}>
    //             <div className={classes.CardImg}> <img src={loadedCard.url} alt="img" /> </div>
    //             <h2>{loadedCard.title}</h2>
    //             <p>{loadedCard.title}</p>
    //             <p>{loadedCard.albumId}</p>
    //         </div>

    //     );
    // };


    // Get current songs
    const indexOfLastSong = currentPage * songsPerPage;
    const indexOfFirstSong = indexOfLastSong - songsPerPage;
    const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);



    return (
        <React.Fragment>
            {/* <div>{card}</div> */}
            <div>
                <div className='container mt-5'>
                    <h1 className='text-primary mb-3'>My Songs</h1>
                    <Songs songs={currentSongs} loading={loading} />
                    <Pagination
                        songsPerPage={songsPerPage}
                        totalSongs={songs.length}
                        paginate={paginate}
                    />
                </div>
            </div>
        </React.Fragment>
    );




}
export default fullCard;