import React from 'react';
import {
    Jumbotron,
    Button,
    Grid,
    Row,
    Col
} from 'react-bootstrap'
import ImageMapper from 'react-image-mapper';
import Center from 'react-center';
import loginImage from '../../images/login_buttons.jpg';

var MAP = {
    name: "signIn-Up",
    areas: [
        { shape: "rect", coords: [75, 99, 181, 150], href: "/login" },    //Sign In
        { shape: "rect", coords: [71, 229, 191, 276], href: "/SignUp" },   //Sign Up
    ]
};

class Home extends React.Component {
    render() {
        return (
            <Grid>
                <Row>
                    <Col>
                        <Jumbotron>
                            <h1>Reciprocity</h1>
                            <p>Where sharing recipes is simple.</p>
                            <p><Button bsStyle="success" href="/about">Learn more</Button></p>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Center>
                            <ImageMapper src={loginImage} map={MAP}/>
                        </Center>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default Home;
