async function GetAll() {
    let response = await fetch('/api/recipes', {
        method: 'get'
    });
    return await response.json();
}

async function Get(id) {
    let response = await fetch(`/api/recipes/${id}`, {
        method: 'get'
    });
    return await response.json();
}

async function Update(recipe) {
    let response = await fetch(`/api/recipes/${recipe.id}`, {
        method: 'put',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
    });

    return await response.json();
}

async function Add(recipe) {
    let response = await fetch(`/api/recipes`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
    });

    return await response.json();
}

async function Delete(id) {
    let response = await fetch(`/api/recipes/${id}`, {
        method: 'delete'
    });
    return await response.json();
}

export { GetAll, Get, Update, Add, Delete };