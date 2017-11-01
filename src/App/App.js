import React from 'react';
import Private from './private/Private';
import Public from './public/Public';
import { Login, Logout, IsLoggedIn } from '../logic/AuthenticationService.js'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: IsLoggedIn()
    }
  }

  async login(username, password) {
    let isSuccess = await Login(username, password);
    this.setState({ loggedIn: IsLoggedIn() });
    return isSuccess;
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
