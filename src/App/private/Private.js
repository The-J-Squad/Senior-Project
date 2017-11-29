import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
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
import PropTypes from 'prop-types';
import Calculator from '../../calculator/component/Calculator'
import Header from '../../header/Header'
import RecipeEditor from '../../recipe/edit/RecipeEditor.js'
import RecipeCreator from '../../recipe/create/RecipeCreator.js'
import RecipeSearch from '../../recipe/search/RecipeSearch.js'
import Home from './Home.js'
import Recipe from '../../recipe/Recipe.js'
import { GetAll } from '../../logic/RecipeService.js'
import { IsLoggedIn } from '../../logic/AuthenticationService.js'
import './Private.css';

class Private extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    }

    if (!IsLoggedIn) {
      this.props.logout();
    }

    GetAll().then((json) => {
      let recipes = [];
      json.forEach((recipe) => {
        recipes.push(() => recipe);
      });

      this.setState({ recipes });
    })
  }

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

  Account = () => (
    <div>
      <h2>Edit Account Information</h2>
      <form>
        <div>
          <label>
            Username: 
            <div>
              (display username)
            </div>
          </label>
        </div>
        <div className="pad"></div>
        <div>
          <label>
            Password:
            <div>
              <input type="text" placeholder="Password" />
            </div>
          </label>
        </div>
        <div className="pad"></div>
          <button id="button2" type="button"> Submit </button>
      </form>
    </div>
  )

  MyRecipes = () => (
    <div>
      <h2> My Recipes </h2>
    </div>
  )

  Favorites = () => (
    <div>
      <h2> Favorite Recipes </h2>
    </div>
  )

  SearchFilter = () => (
    <div>
      <h2> Search Recipes </h2>
    </div>
  )

  CalculatorPopover = (
    <Popover title="Popover right" id="id">
      <Calculator miniature={true} />
    </Popover>
  )

  logout = () => {
    this.props.logout();
    return <span>Loading...</span>
  }

  render() {
    let redirect = () => <Redirect to={`/home`} />;

    return (
      <Router className="app-component">
        <Grid>
          <Row>
            <Col>
              <Header isLoggedIn={true} />
            </Col>
          </Row>
          <Row className="app-body">
            <Col>
              <Switch>
                <Route path="/about" component={this.About} />
                <Route path="/account" component={this.Account} />
                <Route path="/username/recipes" component={this.MyRecipes} />
                <Route path="/favorites" component={this.Favorites} />
                <Route path="/recipes/search" component={this.SearchFilter} />
                <Route path="/calculator" component={Calculator} />
                <Route exact path="/recipes/search/:searchterms" component={RecipeSearch} />
                <Route path="/create" component={RecipeCreator} />
                <Route exact path="/recipes/:id" component={Recipe} />
                <Route path="/recipes/:id/edit" component={RecipeEditor} />
                <Route path="/logout" component={this.logout} />
                <Route path="/home" component={Home} />
                <Route path="/" component={redirect} />
              </Switch>
            </Col>
          </Row>
        </Grid>
      </Router>
    )
  }
}

Private.propTypes = {
  logout: PropTypes.func
};
export default Private;