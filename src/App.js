import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import axios from 'axios';

//Get App Components
import Results from './components/Results';
import Search from './components/Search';
import Nav from './components/Nav';

class App extends Component {

  constructor() {
    super();
    this.state = {
      photos: []
    };
  }
  
  componentDidMount() {
    axios.get('http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC')
      .then(response => {
        this.setState({
          gifs: response.data.data
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="container">
            <Search />
            <Nav />
            <Route path="/:query" component={Results} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
