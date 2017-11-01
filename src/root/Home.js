import React from 'react';
import './Home.css';
import Private from './private/Private';
import Public from './public/Public';
import { Login, Logout, IsLoggedIn } from '../logic/AuthenticationService.js'

class Home extends React.Component {
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
      return <Private logout={this.logout.bind(this)} />
    }
    else {
      return <Public login={this.login.bind(this)}/>
    }
  }
}

export default Home;