var logoutAlert;

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
        localStorage.setItem("ReciprocityAuth", "Bearer " + await response.json())
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
    localStorage.removeItem("ReciprocityAuth");
    if(logoutAlert){
        logoutAlert();
    }
    return true;
}

function RegisterLogoutTrigger(alert){
    logoutAlert = alert;
}

function IsLoggedIn() {
    let jwt = localStorage.getItem("ReciprocityAuth");

    if(jwt){
        return true;
    }
    else{
        return false;
    }
}

export { Login, Logout, IsLoggedIn, SignUp, RegisterLogoutTrigger };