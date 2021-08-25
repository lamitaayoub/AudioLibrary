import React from 'react';
import { Spinner } from 'react-bootstrap';

const Songs = ({ songs, loading }) => {
  if (loading) {
    return <React.Fragment>
      <h2>Loading...</h2>
      <Spinner animation="border" variant="primary" />
    </React.Fragment>
  }

  return (
    <ul className='list-group mb-4'>
      {songs.map(song => (
        <li key={song.id} className='list-group-item'>
          {song.title}
        </li>
      ))}
    </ul>
  );
};

export default Songs;