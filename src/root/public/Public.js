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
    Grid,
    ButtonToolbar,
    OverlayTrigger,
    Button
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Header from '../../header/Header';
import LoginPage from './LoginPage.js';

class Public extends React.Component {

    About = () => (
        <ButtonToolbar>
            <OverlayTrigger trigger="click" placement="left" overlay={this.CalculatorPopover}>
                <Button>Holy guacamole!</Button>
            </OverlayTrigger>
            <OverlayTrigger trigger="click" placement="top" overlay={this.CalculatorPopover}>
                <Button>Holy guacamole!</Button>
            </OverlayTrigger>
            <OverlayTrigger trigger="click" placement="bottom" overlay={this.CalculatorPopover}>
                <Button>Holy guacamole!</Button>
            </OverlayTrigger>
            <OverlayTrigger trigger="click" placement="right" overlay={this.CalculatorPopover}>
                <Button>Holy guacamole!</Button>
            </OverlayTrigger>
        </ButtonToolbar>
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