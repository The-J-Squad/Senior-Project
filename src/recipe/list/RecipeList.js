import React from 'react';
import {
    Row,
    Col
} from 'react-bootstrap'
import PropTypes from 'prop-types';
import RecipePreview from '../preview/RecipePreview.js'

class RecipeList extends React.Component {
    render() {
        return (
            <Row>
                {
                    this.props.recipes.map((recipe) => {
                        return <Col xs={12} sm={6} md={4} lg={3} key={recipe.id}>
                            <RecipePreview recipe={() => recipe} isLink={true} />
                        </Col>
                    })
                }
            </Row>
        )
    }
}

RecipeList.propTypes = {
    recipes: PropTypes.arrayOf(PropTypes.object)
};

export default RecipeList;