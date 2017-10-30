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
import './Home.css';
import Calculator from '../calculator/component/Calculator'
import Header from '../header/Header'
import RecipeEditor from '../recipe/edit/RecipeEditor.js'
import RecipePreview from '../recipe/preview/RecipePreview.js'
import Recipe from '../recipe/Recipe.js'
import {GetAll} from '../logic/RecipeService.js'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          recipes: []
        }
    
        GetAll().then((json)=>{
          let recipes = [];
          json.forEach((recipe) => {
            recipes.push(() => recipe);
          });
    
          this.setState({ recipes });
        })
    }

    Home = () => (
      <Row>
      {
        this.state.recipes.map((recipe) => {
          return <Col xs={12} sm={6} md={4} lg={3}>
            <RecipePreview key={recipe().id} recipe={recipe} isLink={true} />
          </Col>
        })
      }
      </Row>
    )
    
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
    
    renderHeader() {
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
                  <Route exact path="/" component={this.Home} />
                  <Route path="/about" component={this.About} />
                  <Route path="/topics" component={this.Topics} />
                  <Route path="/calculator" component={Calculator} />
                  <Route exact path="/recipes/:id" component={Recipe} />
                  <Route path="/recipes/:id/edit" component={RecipeEditor} />
                </Col>
              </Row>
            </Grid>
          </Router>
        );
    }

    render() {
        return (
            <div id="header">
                {this.renderHeader()}
            </div>
        )
    }
}

export default Home;