import React from 'react';
import RecipePreview from './preview/RecipePreview.js';
import { Redirect } from 'react-router-dom';
import { Get } from '../logic/RecipeService.js';
import {
    Link
} from 'react-router-dom';

class Recipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: () => { },
            loading: true
        }

        try {
            Get(props.match.params.id).then((recipe) => {
                console.log(recipe);
                this.setState({
                    recipe: () => { return recipe },
                    loading: false
                });
            }).catch((e) => {
                console.log("Redirecting... Error:", e);
                this.setState({
                    redirect: true
                });
            });
        }
        catch (e) {
            console.log("Redirecting... Error:", e);
            this.setState({
                redirect: true
            });
        }
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
        if (this.state.redirect) {
            return <Redirect to={`/`} />
        }
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
                <Link to={`${this.props.match.params.id}/edit`}>
                    Edit
                </Link>
            </div>
        );
    }
}

export default Recipe;
