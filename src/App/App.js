import React from 'react';
import Private from './private/Private';
import Public from './public/Public';
import { Login, Logout, IsLoggedIn, RegisterLogoutTrigger } from '../logic/AuthenticationService.js'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: IsLoggedIn()
    }

    RegisterLogoutTrigger(this.logoutAlert.bind(this));
  }

  async login(username, password) {
    let isSuccess = await Login(username, password);
    if(isSuccess){
      this.setState({ loggedIn: IsLoggedIn() });
    }
    
    return isSuccess;
  }

  logoutAlert() {
    this.setState({ loggedIn: false });
  }

  logout() {
    Logout();
    this.setState({ loggedIn: false });
  }

  render() {
    if (this.state.loggedIn) {
      return <div className="app-body"><Private logout={this.logout.bind(this)} /></div>
    }
    else {
      return <div className="app-body"><Public login={this.login.bind(this)} /></div>
    }
  }
}
export default App; 
