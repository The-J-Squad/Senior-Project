import React from 'react';
import PropTypes from 'prop-types';
import {
    NavLink
} from 'react-router-dom';
import Prep from '../../images/ico_prep.png';
import Cook from '../../images/ico_cook.png';
import Serve from '../../images/ico_serving.png';
import ImageCarousel from '../imageCarousel/ImageCarousel.js';
import './RecipePreview.css';

class RecipePreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: props.recipe,
            images: props.recipe().images
        }
    }
    time(time) {
        let minutes = time % 60;
        let hours = (time - minutes) / 60;

        let timeString = "";

        if (hours === 1) {
            timeString += `${hours} hour `;
        }
        else if (hours > 0) {
            timeString += `${hours} hours `;
        }

        if (minutes === 1) {
            timeString += `${minutes} minute`;
        }
        else if (minutes > 0) {
            timeString += `${minutes} minutes `;
        }

        if (hours === 0 && minutes === 0) {
            timeString += "???";
        }

        return timeString;
    }

    render() {
        let recipe = this.state.recipe();

        let content = (
            <div className={this.props.isLink ? "recipe-preview" : "recipe-header"}>
                <div className="recipe-name">
                    {recipe.name}
                </div>
                <div className="recipe-image-carousel-preview">
                    <ImageCarousel images={this.state.images} />
                </div>
                <div>
                    <div className="recipe-description outter">
                        <div className="icon" style={{ "backgroundImage": `url(${Prep})` }} /> <strong> Prep Time: </strong>{this.time(recipe.prepTime)}
                    </div>
                    <div className="recipe-description">
                        <div className="icon" style={{ "backgroundImage": `url(${Cook})` }} /> <strong> Cook Time: </strong>{this.time(recipe.cookTime)}
                    </div>
                    <div className="recipe-description">
                        <div className="icon" style={{ "backgroundImage": `url(${Serve})` }} /> <strong> Serves: </strong>{recipe.servings}
                    </div>
                </div>
            </div>
        );
        if (this.props.isLink) {
            return (
                <NavLink to={`/recipes/${recipe.id}`}>
                    {content}
                </NavLink>
            );
        }
        else {
            return content;
        }
    }
}

RecipePreview.propTypes = {
    recipe: PropTypes.func,
    isLink: PropTypes.bool
};
export default RecipePreview;
