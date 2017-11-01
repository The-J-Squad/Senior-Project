var loggedIn = false;

async function Login(username, password) {
    let response = await fetch(`/api/authenticate`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    console.log("If a real response appears the backend is ready for authentication", response);
    //return await response.json();
    loggedIn = true;
    return true;
}

function Logout() {
    loggedIn = false;
    return true;
}

function IsLoggedIn() {
    return loggedIn;
}

export { Login, Logout, IsLoggedIn };