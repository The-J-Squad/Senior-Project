import React from 'react';
import RecipePreview from './preview/RecipePreview.js';
import {
    NavLink
} from 'react-router-dom'

class Recipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: () => { },
            loading: true
        }

        console.log(props.match.params.id);

        fetch(`/api/recipes/${props.match.params.id}`, {
            method: 'get'
        }).then((response) => response.json().then((json) => {
            console.log(json);
            this.setState({
                recipe: () => { return json },
                loading: false
            });
        }));
    }

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

    render() {
        if (this.state.loading) {
            return (
                <div> Loading... </div>
            )
        }
        return (
            <div>
                <RecipePreview recipe={this.state.recipe} />
                {this.Ingredients()}
                {this.Directions()}
                <NavLink to={`${this.props.match.params.id}/edit`}>
                    Edit
                </NavLink>
            </div>
        );
    }
}

export default Recipe;
