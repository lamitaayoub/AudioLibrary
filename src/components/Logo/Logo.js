import React from 'react';

import musicLogo from '../../assets/images/music.png';
import classes from './Logo.css'


const logo = () => (
    <div className={classes.Logo} >
        <img src={musicLogo} alt="MyMusic" />
    </div>
);

export default logo;