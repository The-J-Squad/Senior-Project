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
import LoginPage from './LoginPage.js';
import './Public.css';

class Public extends React.Component {

    About = () => (
        <div>
            <p>Reciprocity</p>
        </div>
    )

    login = () => {
        this.props.login("anything", "for now");
        return <span>Loading...</span>
    }

    render() {
            let redirect = () => <Redirect to={`/home`} />;

        return (
            <Router className="app-component">
                <Grid>
                    <Row>
                        <Col>
                            <Header isLoggedIn={false}/>
                        </Col>
                    </Row>
                    <Row className="app-body">
                        <Col>
                        <Switch>
                            <Route path="/about" component={this.About} />
                            <Route path="/login" component={this.login} />
                            <Route path="/home" component={LoginPage} />
                            <Route path="/" component={redirect} />
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