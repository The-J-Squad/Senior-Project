import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom'
import {
  Row,
  Col,
  Grid,
  ButtonToolbar,
  OverlayTrigger,
  Button,
  Popover
} from 'react-bootstrap'
import Calculator from '../calculator/component/Calculator'
import Header from '../header/Header'
import RecipeEditor from '../recipe/edit/RecipeEditor.js'
import RecipeCreator from '../recipe/create/RecipeCreator.js'
import Recipe from '../recipe/Recipe.js'
import Home from '../home/Home.js'
import './App.css';

class App extends React.Component {
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

  Topics = ({ match }) => (
    <div>
      <h2>Topics2</h2>
      <ul>
        <li>
          <NavLink to={`${match.url}/rendering`}>
            Rendering with React
        </NavLink>
        </li>
        <li>
          <NavLink to={`${match.url}/components`}>
            Components
        </NavLink>
        </li>
        <li>
          <NavLink to={`${match.url}/props-v-state`}>
            Props v. State
        </NavLink>
        </li>
      </ul>

      <Route path={`${match.url}/:topicId`} component={this.Topic} />
      <Route exact path={match.url} render={() => (
        <h3>Please select a topic.</h3>
      )} />
    </div>
  )

  Topic = ({ match }) => (
    <div>
      <h3>{match.params.topicId}</h3>
    </div>
  )

  CalculatorPopover = (
    <Popover title="Popover right" id="id">
      <Calculator miniature={true} />
    </Popover>
  )

  render() {
    return (
      <Router className="app-component">
        <Grid>
          <Row>
            <Col>
              <Header />
            </Col>
          </Row>
          <Row className="app-body">
            <Col>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={this.About} />
              <Route path="/topics" component={this.Topics} />
              <Route path="/calculator" component={Calculator} />
              <Route exact path="/recipes/:id" component={Recipe} />
              <Route path="/recipes/:id/edit" component={RecipeEditor} />
              <Route path="/create" component={RecipeCreator} />
            </Col>
          </Row>
        </Grid>
      </Router>
    );
  }
}
export default App;
