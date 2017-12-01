import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import {
    Row,
    Col,
    Grid
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Header from '../../header/Header';
import { SignUp } from '../../logic/AuthenticationService.js'
import Home from './Home.js';
import LoginPage from './LoginPage';
import './Public.css';

class Public extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }

    About = () => (
        <div>
            <p>Reciprocity</p>
        </div>
    )

    async login(username, password) {
        let success = await this.props.login(username, password);
        if (!success) {
            //this.setState({ redirect: true });
            return "Invalid username and/or password";
        }

        return null;
    }

    loginPage() {
        return <LoginPage onSubmit={this.login.bind(this)}></LoginPage>
    }

    async signUp(username, password) {
        let success = await SignUp(username, password);
        if (!success) {
            //this.setState({ redirect: true });
            return "Username is already in use";
        }

        this.setState({ redirect: true });
        return null;
    }

    signupPage = () => {
        return <LoginPage onSubmit={this.signUp.bind(this)}></LoginPage>
    }

    redirect = () => <Redirect to={`/home`} />;

    render() {
        if (this.state.redirect) {
            this.setState({ redirect: false });
            return <Router className="app-component">{this.redirect()}</Router>
        }

        return (
            <Router className="app-component">
                <Grid>
                    <Row>
                        <Col>
                            <Header isLoggedIn={false} />
                        </Col>
                    </Row>
                    <Row className="app-body">
                        <Col>
                            <Switch>
                                <Route path="/about" component={this.About} />
                                <Route path="/login" component={this.loginPage.bind(this)} />
                                <Route path="/SignUp" component={this.signupPage.bind(this)} />
                                <Route path="/home" component={Home} />
                                <Route path="/" component={this.redirect} />
                            </Switch>
                        </Col>
                    </Row>
                </Grid>
            </Router>
        )
    }
}

Public.propTypes = {
    login: PropTypes.func
};
export default Public;