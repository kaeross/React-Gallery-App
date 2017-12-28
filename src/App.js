import React, { Component } from 'react';

//Get App Components
import Results from './components/Results';
import Search from './components/Search';
import Nav from './components/Nav';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <div className="container">
          <Search />
          <Nav />
          <Results />
        </div>
      </div>
    );
  }
}

export default App;
