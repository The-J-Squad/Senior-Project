import React from 'react';
import RecipePreview from '../recipe/preview/RecipePreview.js'
import { GetAll } from '../logic/RecipeService.js'
import {
  Row,
  Col
} from 'react-bootstrap';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    }

    GetAll().then((json) => {
      let recipes = [];
      json.forEach((recipe) => {
        recipes.push(() => recipe);
      });

      this.setState({ recipes });
    })
  }

  render() {
    return (
      <Row>
        {
          this.state.recipes.map((recipe) => {
            return <Col xs={12} sm={6} md={4} lg={3}>
              <RecipePreview key={recipe().id} recipe={recipe} isLink={true} />
            </Col>
          })
        }
      </Row>
    );
  }
}
export default Home;
