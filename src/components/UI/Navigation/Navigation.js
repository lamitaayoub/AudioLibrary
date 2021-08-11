import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import CardViewLibrary from '../../../containers/CardViewLibrary/CardViewLibrary';
import Logo from '../../Logo/Logo';
import { Link, Switch, Route } from "react-router-dom";
import SignUp from '../../../containers/SignUp/SignUp';
import SignIn from '../../../containers/SignIn/SignIn';
import classes from './Navigation.css'


const navigation = () => {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" className={classes.Navbar} variant="dark">
                <Container>
                    <Link to="/">
                        <Logo />
                    </Link>
                    <Navbar.Brand href="/">
                        Audio Library
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="/SignIn">Sign in</Nav.Link>
                            <Nav.Link href="/SignUp" >Sign up</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Switch>
                <Route exact path="/">
                    <CardViewLibrary />
                </Route>
                <Route exact path="/SignUp">
                    <SignUp />
                </Route>
                <Route exact path="/SignIn">
                    <SignIn />
                </Route>
            </Switch>
        </div>
    )
}

export default navigation;