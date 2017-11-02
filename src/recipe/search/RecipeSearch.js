import React from 'react';
import RecipeList from '../list/RecipeList.js';
import { GetSpecificRecipes } from '../../logic/RecipeService.js';

class RecipeSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: () => { },
            loading: true
        }

        GetSpecificRecipes(props.match.params.searchterms).then((recipes) => {
            this.setState({
                recipes: () => { return recipes },
                loading: false
            });
        });
    }

    render() {
        if (this.state.loading) {
            return (
                <div> Loading... </div>
            )
        }
        return <RecipeList recipes={this.state.recipes()} />
    }
}

export default RecipeSearch;
