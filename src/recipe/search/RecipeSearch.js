import React from 'react';
import RecipePreview from '../preview/RecipePreview.js';
import { GetSpecificRecipes } from '../../logic/RecipeService.js';

class RecipeSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: () => { },
            loading: true
        }

        GetSpecificRecipes(props.match.params.id).then((recipes) => {
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
        return (
            <span>
                {
                    this.state.recipes().map((recipe) => {
                        return <RecipePreview key={recipe.id} recipe={() => { return recipe }} isLink={true} />
                    })
                }
            </span>
        );
    }
}

export default RecipeSearch;
