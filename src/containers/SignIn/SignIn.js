import React, { useCallback, useContext } from 'react';
import classes from '../SignUp/SignUp.css';
import { withRouter, Redirect } from "react-router";
import app from "../../base.js";
import { AuthContext } from "../../Auth.js";

const SignIn = ({ history }) => {
    const handleSignIn = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await app
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                history.push("/");
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/" />;
    }



    return (
        <div className={classes.Container}>
            <div className={classes.AppWrapper}>
                <div className={classes.Title}>
                    <h2>
                        Sign In
                    </h2>
                </div>
                <form onSubmit={handleSignIn} className={classes.FormWrapper}>
                    <div className={classes.Email}>
                        <label className={classes.Label}>Email</label>
                        <input className={classes.Input}
                            type="email"
                            name="email"                            
                        />
                    </div>
                    <div className={classes.Password}>
                        <label className={classes.Label}>Password</label>
                        <input className={classes.Input}
                            type="password"
                            name="password"
                        />
                    </div>
                    <div>
                        <button className={classes.Submit} type="submit">Sign In</button>
                    </div>
                    <div className={classes.Paragraph}>
                        <p>Don't have an account? <a href="/SignUp" >Sign Up</a></p>
                    </div>
                </form>
            </div>

        </div>);


}
export default withRouter(SignIn);