import React from 'react';
import RecipePreview from '../preview/RecipePreview.js';

class RecipeSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: () => { },
            loading: true
        }

        fetch(`/api/recipes/search/${props.match.params.searchterms}`, {
            method: 'get'
        }).then((response) => response.json().then((json) => {
            console.log(json);
            this.setState({
                recipes: () => { return json },
                loading: false
            }); 
        }));
    }
/*
    Ingredients() {
        return (
            <div>
                <div>
                    Ingredients:
                </div>
                <ul>
                    {
                        this.state.recipe().ingredients.map((ingredient, index) => {
                            return (
                                <li key={index}>
                                    {ingredient.name}: {ingredient.quantity} {ingredient.unit} {this.Comment(ingredient.comment)}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }

    Comment(str) {
        if (str !== undefined && str !== null && str.match(/^ *$/) === null) {
            return (
                <span>
                    ({str})
                </span>
            );
        }
    }

    Directions() {
        return (
            <div>
                <div>
                    Directions:
                </div>
                <ol>
                    {
                        this.state.recipe().directions.map((direction, index) => {
                            return (
                                <li key={index}>
                                    {direction}
                                </li>
                            )
                        })
                    }
                </ol>
            </div>
        )
    }
*/
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
			  return <RecipePreview key={recipe.id} recipe={() => {return recipe}} isLink={true}/>
			})
		  }
		</span>
        );
    }
}

export default RecipeSearch	;
