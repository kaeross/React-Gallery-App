import React, { Component } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';

//Get App Components
import Results from './components/Results';
import Search from './components/Search';
import Nav from './components/Nav';
import apiKey from './config.js';

const SearchWithRouter = withRouter(Search);

class App extends Component {
  constructor() {
    super();
    this.state = {
      defaultSearchTerm: 'Cat',
      perPage: 16,
      photos: []
    };
  }

  getPhotos = searchTerm => {
    axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&per_page=${
          this.state.perPage
        }&tags=${searchTerm}&format=json&nojsoncallback=1`
      )
      .then(response => {
        var photoData = response.data.photos.photo;
        this.setState({
          photos: photoData.map(photo => {
            var farmId = photo.farm;
            var serverId = photo.server;
            var id = photo.id;
            var secret = photo.secret;

            return {
              id: id,
              url: `https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg`
            };
          })
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <SearchWithRouter getPhotos={this.getPhotos} />
            <Nav />

            <Switch>
              <Route
                exact
                path={'/'}
                render={({ match }) => (
                  <Results
                    query={this.state.defaultSearchTerm}
                    photos={this.state.photos}
                    getPhotos={this.getPhotos}
                  />
                )}
              />

              <Route
                path={'/:query'}
                render={({ match }) => (
                  <Results
                    query={match.params.query}
                    photos={this.state.photos}
                    getPhotos={this.getPhotos}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
