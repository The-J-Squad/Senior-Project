import React from 'react';
import PropTypes from 'prop-types';
import ImageCarousel from '../imageCarousel/ImageCarousel.js';
import { Glyphicon } from 'react-bootstrap';
import './RecipeEditor.css';

class RecipeEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }

        fetch(`/api/recipes/${props.match.params.id}`, {
            method: 'get'
        }).then((response) => response.json().then((json) => {
            console.log(json);
            this.recipe = json;
            this.setState({
                loading: false,
                name: this.recipe.name,
                prepMin: this.recipe.prepTime % 60,
                cookMin: this.recipe.cookTime % 60,
                prepHr: (this.recipe.prepTime - this.recipe.prepTime % 60) / 60,
                cookHr: (this.recipe.cookTime - this.recipe.cookTime % 60) / 60,
                isVegetarian: this.recipe.isVegetarian,
                isVegan: this.recipe.isVegan,
                isGlutenFree: this.recipe.isGlutenFree,
                isKosher: this.recipe.isKosher,
                ingredientQuantity: this.recipe.ingredients.length,
                directions: this.recipe.directions,
                images: this.recipe.images,
                servings: this.recipe.servings
            });
        }));
    }

    handleSelect(selectedIndex, e) {
        this.setState({
            index: selectedIndex,
            direction: e.direction
        });
    }

    loadFile(event) {
        console.log(Array.from(event.target.files));
        Array.from(event.target.files).forEach((file) => {
            if (file) {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                let self = this;
                reader.onloadend = () => {
                    self.setState((prevState, props) => {
                        return {
                            images: prevState.images.concat(reader.result)
                        };
                    });
                };
            }
        })
    }

    addIngredient(index) {
        //TODO fix
        this.recipe.ingredients.splice(index + 1, 0,
            {
                name: "",
                quantity: "",
                unit: "",
                comment: ""
            });

        this.setState((prevState) => {
            return {
                ingredientQuantity: prevState.ingredientQuantity + 1
            }
        })
    }

    removeIngredient(index) {
        //TODO fix
        this.recipe.ingredients.splice(index, 1);

        this.setState((prevState) => {
            return {
                ingredientQuantity: prevState.ingredientQuantity - 1
            }
        })
    }

    addDirection(index) {
        //TODO fix
        let directions = this.state.directions.slice();
        directions.splice(index + 1, 0, "");
        this.setState({ directions });
    }

    removeDirection(index) {
        //TODO fix
        let directions = this.state.directions.slice();
        directions.splice(index, 1);
        this.setState({ directions });
    }

    updateIngredient(index, field, value) {
        //TODO fix
        this.recipe.ingredients[index][field] = value;
        this.setState({ loading: true }, () => this.setState({ loading: false }));
    }

    updateDirection(index, value) {
        //TODO fix
        let directions = this.state.directions.slice();
        directions[index] = value;
        this.setState({ directions });
    }

    submit() {
        let directions = {
            name: this.state.name,
            id: this.recipe.id,
            servings: this.state.servings,
            prepTime: this.state.prepHr * 60 + this.state.prepMin,
            cookTime: this.state.cookHr * 60 + this.state.cookMin,
            ingredients: this.recipe.ingredients,
            directions: this.state.directions,
            isVegan: this.state.isVegan,
            isVegetarian: this.state.isVegetarian,
            isKosher: this.state.isKosher,
            isGlutenFree: this.state.isGlutenFree,
            images: this.state.images
        }

        fetch(`/api/recipes/${this.recipe.id}`, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(directions)
        });
    }

    render() {
        if (this.state.loading) {
            return <div> Loading... </div>;
        }
        return (
            <form>
                <div>
                    <label>
                        Name of recipe:
                        <input type="text" value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} />
                    </label>
                </div>
                <div>
                    <label className="image-input-label">
                        Upload image(s):
                        <input className="image-input" type="file" multiple accept="image/*" onChange={this.loadFile.bind(this)} />
                    </label>
                    <div className="image-carousel-preview">
                        <ImageCarousel images={this.state.images} />
                    </div>
                </div>
                <div>
                    <label>
                        Prep time:
                        <input type="number" value={this.state.prepHr} onChange={(event) => this.setState({ prepHr: event.target.value })} />
                        hours
                        <input type="number" value={this.state.prepMin} onChange={(event) => this.setState({ prepMin: event.target.value })} />
                        minutes
                    </label>
                </div>
                <div>
                    <label>
                        Cook time:
                        <input type="number" value={this.state.cookHr} onChange={(event) => this.setState({ cookHr: event.target.value })} />
                        hours
                        <input type="number" value={this.state.cookMin} onChange={(event) => this.setState({ cookMin: event.target.value })} />
                        minutes
                    </label>
                </div>
                <div>
                    <label>
                        Servings:
                        <input type="text" value={this.state.servings} onChange={(event) => this.setState({ servings: event.target.value })} />
                    </label>
                </div>
                <div>
                    <label>
                        Vegetarian?
                        <input type="checkbox" value={true} checked={this.state.isVegetarian} onChange={(event) => this.setState({ isVegetarian: event.target.value })} />
                    </label>
                    <label>
                        Vegan?
                        <input type="checkbox" value={true} checked={this.state.isVegan} onChange={(event) => this.setState({ isVegan: event.target.value, isVegetarian: event.target.value || this.state.isVegetarian })} />
                    </label>
                    <label>
                        Kosher?
                        <input type="checkbox" value={true} checked={this.state.isKosher} onChange={(event) => this.setState({ isKosher: event.target.value })} />
                    </label>
                    <label>
                        Gluten Free?
                        <input type="checkbox" value={true} checked={this.state.isGlutenFree} onChange={(event) => this.setState({ isGlutenFree: event.target.value })} />
                    </label>
                </div>
                <div>
                    Ingredients:
                <ul>
                        {
                            this.recipe.ingredients.map((ingredient, index) => {
                                return (
                                    <li key={ingredient.name}>
                                        <button type="button" className="add" onClick={() => this.addIngredient(index)}>
                                            <Glyphicon glyph="plus" />
                                        </button>
                                        <button type="button" className="remove" onClick={() => this.removeIngredient(index)}>
                                            <Glyphicon glyph="remove" />
                                        </button>
                                        <label>
                                            Name:
                                            <input type="text" value={ingredient.name} onChange={(event) => this.updateIngredient(index, "name", event.target.value)} />
                                            :
                                            <input type="number" value={ingredient.quantity} onChange={(event) => this.updateIngredient(index, "quantity", event.target.value)} />
                                            <input type="text" value={ingredient.unit} onChange={(event) => this.updateIngredient(index, "unit", event.target.value)} />
                                            (<input type="text" value={ingredient.comment} onChange={(event) => this.updateIngredient(index, "comment", event.target.value)} />)
                                        </label>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
                <div>
                    Directions:
                <ol>
                        {
                            this.state.directions.map((direction, index) => {
                                return (
                                    <li key={`${index}. ${direction}`}>
                                        <button type="button" className="add" onClick={() => this.addDirection(index)}>
                                            <Glyphicon glyph="plus" />
                                        </button>
                                        <button type="button" className="remove" onClick={() => this.removeDirection(index)}>
                                            <Glyphicon glyph="remove" />
                                        </button>
                                        <input type="text" value={direction} onChange={(event) => this.updateDirection(index, event.target.value)} />
                                    </li>
                                );
                            })
                        }
                    </ol>
                </div>
                <button type="button" onClick={this.submit.bind(this)}> Submit </button>
            </form>
        );
    }
}

RecipeEditor.propTypes = {
    recipe: PropTypes.object,
    isLink: PropTypes.bool
};
export default RecipeEditor;