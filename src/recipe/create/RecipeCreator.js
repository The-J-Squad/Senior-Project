import React from 'react';
import RecipeEditor from '../edit/RecipeEditor';
import './RecipeCreator.css';

class RecipeCreator extends React.Component {
    render() {
        return (
            <div>
                <h2> Add a Recipe </h2>
                <RecipeEditor/>
            </div>
        );
    }
}

export default RecipeCreator;
