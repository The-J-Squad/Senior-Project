import React from 'react';
import RecipePreview from '../recipe/preview/RecipePreview.js'
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

  render() {
    return (
    <div>
      {
        this.state.recipes.map((recipe) => {
          return <RecipePreview key={recipe().id} recipe={recipe} isLink={true}/>
        })
      }
    </div>
    );
  }
}
export default Home;
