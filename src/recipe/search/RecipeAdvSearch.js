import React from 'react';
import { Link } from 'react-router-dom';

class RecipeAdvSearch extends React.Component{
	constructor(props) {
        super(props);
        this.state = {
            searchValue: "",
			foodToMake: "",
			ingredientsHad: "",
			ingredientsToIgnore: ""
        }
    }

	
	updateStateFoodWantToMake(event) {
			this.setState({ foodToMake: event.target.value});
			this.updateState(this.state.foodToMake, this.state.ingredientsHad, this.state.ingredientsToIgnore);
	}
	
	updateStateIngredientsHad(event){
			this.setState({ ingredientsHad: event.target.value});
			this.updateState(this.state.foodToMake, this.state.ingredientsHad, this.state.ingredientsToIgnore);
	}
	
	updateStateIngredientsToIgnore(event){
			this.setState({ ingredientsToIgnore: event.target.value});
			this.updateState(this.state.foodToMake, this.state.ingredientsHad, this.state.ingredientsToIgnore);
	}
	
	updateState(foodToMake, ingredientsHad, ingredientsToIgnore){
		var ignoredIngredients = ingredientsToIgnore;
		var ignoredIngredientsUpdated = "";
		var wordPlaceholder = 0;
		var isTriggered = false;

		for(var i = 0; i < ignoredIngredients.length; i++){
			if(ignoredIngredients.charAt(i) === ","){
				ignoredIngredientsUpdated = ignoredIngredientsUpdated + "-" + ignoredIngredients.slice(wordPlaceholder, i) + " ";
				wordPlaceholder = i+1;
				isTriggered = true;
			}
		}
			if(!isTriggered && ingredientsToIgnore !== ""){
			ignoredIngredientsUpdated = "-" + ignoredIngredients;
		}
			
		this.setState({ searchValue: "\"" + foodToMake + "\" " +
		ingredientsHad + " " + ignoredIngredientsUpdated});
		//Gives an exact search for whatever they put in for the first spot, then gives the general search for all ingredients, and then gives the ignore ingredients search a run.
	}
	
	render() {
        return(
		
            <form>
				<div>
                    <label>
						What kind of food do you want to make?
						<br/>
						<input type="text" onChange = {(event) => this.updateStateFoodWantToMake(event)} onBlur = {(event) => this.updateStateFoodWantToMake(event)} placeholder="example) chocolate cake" />
						<br/>
						<br/>
						What ingredients do you have right now? Separate multiple items with commas.
						<br/>
                        <input type="text" onChange ={ (event) => this.updateStateIngredientsHad(event)} onBlur ={ (event) => this.updateStateIngredientsHad(event)} placeholder="Ingredient(s)" />
						<br/>
						<br/>
						What ingredients do you want us to ignore in recipes? Separate multiple items with commas.
						<br/>
						<input type="text" onChange = { (event) => this.updateStateIngredientsToIgnore(event)} onBlur = { (event) => this.updateStateIngredientsToIgnore(event)} placeholder="Ingredient(s) to Ignore" />
						<br/>
						<br/>
						
                    </label>
                </div>
				<Link className="btn btn-default" to={`/recipes/search/${this.state.searchValue}`} >Search!</Link>
            </form>
        );
    }

}

export default RecipeAdvSearch;
