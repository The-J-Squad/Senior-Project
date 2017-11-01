import React from 'react';
import RecipeList from '../../recipe/list/RecipeList.js'
import { GetAll } from '../../logic/RecipeService.js'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }

        this.loadRecipes();
    }

    async loadRecipes() {
        this.recipes = await GetAll();
        this.setState({ loading: false });
    }

    render() {
        if (this.state.loading) {
            return <span>Loading...</span>
        }
        else {
            return <RecipeList recipes={this.recipes} />
        }
    }
}

export default Home;