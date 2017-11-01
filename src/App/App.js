import React from 'react';
//import Initial from '../initial/Initial'
import Home from '../root/Home.js'
import './App.css'

class App extends React.Component {

  render() {
    return (
      <div className="app-body">

        {/* pre-login home screen */}
          {/* <div id="initial">
            <Initial />
          </div>  */}

        {/* post-login home screen */}
          <div id="home">
            <Home />
          </div> 
      </div>
		)
	}
}
export default App; 
