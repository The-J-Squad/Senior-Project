import React from 'react';
import PropTypes from 'prop-types';
import {
    Row,
    Col
} from 'react-bootstrap';
import {
    NavLink
} from 'react-router-dom';
import Prep from '../../images/ico_prep.png';
import Cook from '../../images/ico_cook.png';
import Serve from '../../images/ico_serving.png';
import './RecipePreview.css';

class RecipePreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: props.recipe
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
            <Row className={this.props.isLink? "recipe-preview" : "recipe-header"}>
                <Col className="xsFix" sm={3} md={2} xsHidden>
                    <div className="recipe-icon" style={{ "backgroundImage": `url(${recipe.images[0]})` }} />
                </Col>
                <Col sm={9} md={10}>
                    <div className="recipe-name">
                        {recipe.name}
                    </div>
                    <Row>
                        <Col xs={4} smHidden mdHidden lgHidden>
                            <div className="recipe-icon" style={{ "backgroundImage": `url(${recipe.images[0]})` }} />
                        </Col>
                        <Col xs={8} sm={12}>
                            <div className="recipe-description outter">
                                <div className="icon" style={{ "backgroundImage": `url(${Prep})` }} /> <strong> Prep Time: </strong>{this.time(recipe.prepTime)}
                            </div>
                            <div className="recipe-description">
                                <div className="icon" style={{ "backgroundImage": `url(${Cook})` }} /> <strong> Cook Time: </strong>{this.time(recipe.cookTime)}
                            </div>
                            <div className="recipe-description">
                                <div className="icon" style={{ "backgroundImage": `url(${Serve})` }} /> <strong> Serves: </strong>{recipe.servings}
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
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
