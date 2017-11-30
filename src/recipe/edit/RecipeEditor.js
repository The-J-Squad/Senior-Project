import React from 'react';
import PropTypes from 'prop-types';
import ImageCarousel from '../imageCarousel/ImageCarousel.js';
import { Glyphicon } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { Update, Add, Get, Delete } from '../../logic/RecipeService.js';
import './RecipeEditor.css';

class RecipeEditor extends React.Component {
    constructor(props) {
        super(props);

        if (props.match && props.match.params && props.match.params.id) {
            this.state = {
                loading: true,
                isDone: false
            }
            Get(props.match.params.id).then((json) => {
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
            }).catch((e) => {
                console.log("Redirecting... Error:", e);
                this.setState({
                    redirect: true
                });
            });;
        }
        else {
            this.recipe = { ingredients: [{}] };
            this.state = {
                loading: false,
                isDone: false,
                name: this.recipe.name,
                prepMin: "",
                cookMin: "",
                prepHr: "",
                cookHr: "",
                isVegetarian: false,
                isVegan: false,
                isGlutenFree: false,
                isKosher: false,
                ingredientQuantity: 1,
                directions: [""],
                images: [],
                servings: ""
            }
        }
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
        this.recipe.ingredients.splice(index, 1);

        if (this.recipe.ingredients.length === 0) {
            this.recipe.ingredients = [{}];
        }

        this.setState((prevState) => {
            return {
                ingredientQuantity: this.recipe.ingredients.length
            }
        })
    }

    addDirection(index) {
        let directions = this.state.directions.slice();
        directions.splice(index + 1, 0, "");
        this.setState({ directions });
    }

    removeDirection(index) {
        let directions = this.state.directions.slice();
        directions.splice(index, 1);
        if (directions.length === 0) {
            directions = [""];
        }
        this.setState({ directions });
    }

    updateIngredient(index, field, value) {
        this.recipe.ingredients[index][field] = value;
        this.setState((prevState) => { return { ingredientQuantity: prevState.ingredientQuantity } });
    }

    updateDirection(index, value) {
        let directions = this.state.directions.slice();
        directions[index] = value;
        this.setState({ directions });
    }

    submit() {
        let recipe = {
            name: this.state.name,
            id: this.recipe.id,
            servings: this.state.servings,
            prepTime: parseFloat(this.state.prepHr) * 60 + parseFloat(this.state.prepMin),
            cookTime: parseFloat(this.state.cookHr) * 60 + parseFloat(this.state.cookMin),
            ingredients: this.recipe.ingredients,
            directions: this.state.directions,
            isVegan: this.state.isVegan,
            isVegetarian: this.state.isVegetarian,
            isKosher: this.state.isKosher,
            isGlutenFree: this.state.isGlutenFree,
            images: this.state.images
        }

        if (recipe.id) {
            Update(recipe).then(() => {
                this.setState({ isDone: true });
            });
        }
        else {
            Add(recipe).then((recipe) => {
                this.recipe = recipe;
                this.setState({ isDone: true });
            });
        }
    }

    delete() {
        if (this.recipe && this.recipe.id) {
            Delete(this.recipe.id).then(() => {
                this.setState({ redirect: true });
            });
        }
        else {
            this.setState({ redirect: true });
        }
    }

    removeImage(index) {
        let images = this.state.images.slice();
        images.splice(index, 1);
        this.setState({ images });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={'/'} />
        }
        if (this.state.isDone) {
            return <Redirect to={`/recipes/${this.recipe.id}`} />
        }
        if (this.state.loading) {
            return <div> Loading... </div>;
        }
        return (
            <form>
                <div id="col">
                    <div className="format">
                        <label>
                            Name of Recipe:
                            <div>
                                <input id="name" type="text" value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} placeholder="Recipe Name" />
                            </div>
                        </label>
                    </div>
                    <div id="image">
                        <label className="image-input-label">
                            Upload image(s):
                            <input className="image-input" type="file" multiple accept="image/*" onChange={this.loadFile.bind(this)} />
                        </label>
                        <div className="image-carousel-preview">
                            <ImageCarousel images={this.state.images} deleteFunction={this.removeImage.bind(this)} />
                        </div>
                    </div>
                    <div className="format">
                        <label>
                            Prep Time:
                            <div>
                                <input className="time" type="number" value={this.state.prepHr} onChange={(event) => this.setState({ prepHr: event.target.value })} placeholder="hours" /> hours
                            </div>
                            <div className="pad"></div>
                            <div>
                                <input className="time" type="number" value={this.state.prepMin} onChange={(event) => this.setState({ prepMin: event.target.value })} placeholder="minutes" /> minutes
                            </div>
                        </label>
                    </div>
                    <div className="pad"></div>
                    <div className="format">
                        <label>
                            Cook Time:
                            <div>
                                <input className="time" type="number" value={this.state.cookHr} onChange={(event) => this.setState({ cookHr: event.target.value })} placeholder="hours" /> hours
                            </div>
                            <div className="pad"></div>
                            <div>
                                <input className="time" type="number" value={this.state.cookMin} onChange={(event) => this.setState({ cookMin: event.target.value })} placeholder="minutes" /> minutes
                            </div>
                        </label>
                    </div>
                    <div className="pad"></div>
                    <div className="format">
                        <label>
                            Servings:
                            <div>
                                <input id="servings" type="text" value={this.state.servings} onChange={(event) => this.setState({ servings: event.target.value })} placeholder="Servings" />
                            </div>
                        </label>
                    </div>
                    <div className="pad"></div>
                    <div className="format">
                        <div>
                            <label> 
                                <input type="checkbox" value={true} checked={this.state.isVegetarian} onChange={(event) => { console.log(event); this.setState({ isVegetarian: event.target.checked }); }} />
                                Vegetarian?
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" value={true} checked={this.state.isVegan} onChange={(event) => this.setState({ isVegan: event.target.checked, isVegetarian: event.target.checked || this.state.isVegetarian })} />
                                Vegan?
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" value={true} checked={this.state.isKosher} onChange={(event) => this.setState({ isKosher: event.target.checked })} />
                                Kosher?
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" value={true} checked={this.state.isGlutenFree} onChange={(event) => this.setState({ isGlutenFree: event.target.checked })} />
                                Gluten Free?
                            </label>
                        </div>
                    </div>
                    <div className="pad"></div>
                    <div className="format">
                        Ingredients:
                            <ul>
                            {
                                this.recipe.ingredients.map((ingredient, index) => {
                                    return (
                                        <li key={index}>
                                            <button type="button" className="add" onClick={() => this.addIngredient(index)}>
                                                <Glyphicon glyph="plus" />
                                            </button>
                                            <button type="button" className="remove" onClick={() => this.removeIngredient(index)}>
                                                <Glyphicon glyph="remove" />
                                            </button>
                                            <label>
                                                Name:
                                                <div>
                                                    <input type="text" value={ingredient.name} onChange={(event) => this.updateIngredient(index, "name", event.target.value)} placeholder="Name" />
                                                </div>
                                                Amount (with units):
                                                <div>
                                                    <input id="quantity" type="number" value={ingredient.quantity} onChange={(event) => this.updateIngredient(index, "quantity", event.target.value)} placeholder="Amount" />
                                                    <input id="quantity" type="text" value={ingredient.unit} onChange={(event) => this.updateIngredient(index, "unit", event.target.value)} placeholder="Units" />
                                                </div>
                                                Comment(s):
                                                <div>
                                                    <input type="text" value={ingredient.comment} onChange={(event) => this.updateIngredient(index, "comment", event.target.value)} placeholder="Comment (optional)" />
                                                </div>
                                            </label>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                    <div className="pad"></div>
                    <div className="format">
                        Directions:
                    <ol>
                            {
                                this.state.directions.map((direction, index) => {
                                    return (
                                        <li key={index}>
                                            <button type="button" className="add" onClick={() => this.addDirection(index)}>
                                                <Glyphicon glyph="plus" />
                                            </button>
                                            <button type="button" className="remove" onClick={() => this.removeDirection(index)}>
                                                <Glyphicon glyph="remove" />
                                            </button>
                                            <input type="text" value={direction} onChange={(event) => this.updateDirection(index, event.target.value)} placeholder="Direction" />
                                        </li>
                                    );
                                })
                            }
                        </ol>
                    </div>
                    <div className="pad"></div>
                    <button id="button" type="button" onClick={this.submit.bind(this)}> Submit </button>
                    <button id="button" type="button" onClick={this.delete.bind(this)}> Delete </button>
                </div>
            </form>
        );
    }
}

RecipeEditor.propTypes = {
    recipe: PropTypes.object,
    isLink: PropTypes.bool
};
export default RecipeEditor;
