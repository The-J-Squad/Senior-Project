import React from 'react';
//import Initial from '../initial/Initial'
import Home from '../home/Home'
import './App.css'

class App extends React.Component {

  render() {
    return (
      <body className="app-body">

        {/* pre-login home screen */}
          {/* <div id="initial">
            <Initial />
          </div>  */}

        {/* post-login home screen */}
          <div id="home">
            <Home />
          </div> 
      </body>
		)
	}
}
export default App; 
