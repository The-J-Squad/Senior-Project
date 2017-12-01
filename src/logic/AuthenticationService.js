var logoutAlert, jwt;
var loggedIn = false;

async function Login(username, password) {
    let response = undefined;
    try {
        response = await fetch(`/api/authenticate`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
    }
    catch (ex) {
        console.log(ex);
        return false;
    }

    if (response.status === 200) {
        jwt = "Bearer " + await response.json();

        if (window.localStorage) {
            localStorage.setItem("ReciprocityAuth", jwt);
        }

        loggedIn = true;
        return true;
    }
    else {
        return false
    }
}

async function SignUp(username, password) {
    let response = undefined;
    try {
        response = await fetch(`/api/signup`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
    }
    catch (ex) {
        console.log(ex);
        return false;
    }

    console.log(response);
    return response.status === 200 && await response.json();
}

function Logout() {
    if (window.localStorage) {
        localStorage.removeItem("ReciprocityAuth");
    }

    loggedIn = false;
    if (logoutAlert) {
        logoutAlert();
    }
    return true;
}

function RegisterLogoutTrigger(alert) {
    logoutAlert = alert;
}

function IsLoggedIn() {
    if (window.localStorage) {
        jwt = GetAuthHeader();
    }
    if (jwt) {
        loggedIn = true;
    }
    else {
        loggedIn = false;
    }

    return loggedIn;
}

function GetAuthHeader() {
    if (window.localStorage) {
        jwt = localStorage.getItem("ReciprocityAuth");;
    }

    return jwt;
}

export { Login, Logout, IsLoggedIn, SignUp, RegisterLogoutTrigger, GetAuthHeader };