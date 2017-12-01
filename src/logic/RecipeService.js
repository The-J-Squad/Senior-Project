import {Logout, GetAuthHeader} from './AuthenticationService';

async function GetAll() {
    let response = await fetch('/api/recipes', {
        method: 'get',
        headers: {
            'Authorization': GetAuthHeader()
        }
    });

    if(response.status===401){
        Logout();
    }

    return await response.json();
}

async function Get(id) {
    let response = await fetch(`/api/recipes/${id}`, {
        method: 'get',
        headers: {
            'Authorization': GetAuthHeader()
        }
    });

    if(response.status===401){
        Logout();
    }

    return await response.json();
}

async function GetSpecificRecipes(searchterms){
	let response = await fetch(`/api/recipes/search/${searchterms}`, {
		method: 'get',
        headers: {
            'Authorization': GetAuthHeader()
        }
	});

    if(response.status===401){
        Logout();
    }

	return await response.json();
}

async function Update(recipe) {
    let response = await fetch(`/api/recipes/${recipe.id}`, {
        method: 'put',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': GetAuthHeader()
        },
        body: JSON.stringify(recipe)
    });

    if(response.status===401){
        Logout();
    }

    return await response.json();
}

async function Add(recipe) {
    let response = await fetch(`/api/recipes`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': GetAuthHeader()
        },
        body: JSON.stringify(recipe)
    });

    if(response.status===401){
        Logout();
    }

    return await response.json();
}

async function Delete(id) {
    let response = await fetch(`/api/recipes/${id}`, {
        method: 'delete',
        headers: {
            'Authorization': GetAuthHeader()
        }
    });

    if(response.status===401){
        Logout();
    }

    return await response.json();
}

export { GetAll, Get, Update, GetSpecificRecipes, Add, Delete };