import React from 'react';
import classes from './SignUp.css';

const SignUpFormSuccess = () => {
    return (
        <div className={classes.Container}>
            <div className={classes.AppWrapper}>
                <h1 className={classes.FormSuccess}> Account Created </h1>
            </div>
        </div>
    )
}
export default SignUpFormSuccess;