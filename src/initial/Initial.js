import React from 'react';
import './Initial.css';
import {
    Jumbotron,
    Button, 
    Grid,
    Row,
    Col
} from 'react-bootstrap'
import ImageMapper from 'react-image-mapper';
import Center from 'react-center';

var MAP = {
    name: "signIn-Up",
    areas: [
        { shape: "rect", coords: [75,99,181,150], href: "/Home" },    //Sign In
        { shape: "rect", coords: [71,229,191,276], href: "/Home" },   //Sign Up
    ]
};

class Initial extends React.Component {
    render() {
        return (
            <div>
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
                                <ImageMapper src="https://github.com/jenkov331/Senior-Project-Frontend/blob/master/src/images/login_buttons.jpg?raw=true" map={MAP} />
                            </Center>
                        </Col>
                        </Row>
                </Grid>
            </div>
        );
    }
}

export default Initial;
