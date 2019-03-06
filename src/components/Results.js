import React, { Component } from 'react';
import axios from 'axios';
import apiKey from './../config.js';

//result components
import NotFound from './gallery/NotFound';
import Photo from './gallery/Photo';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  componentDidMount() {
    this.getPhotos(this.props.query);
  }

  componentWillUpdate() {
    this.getPhotos(this.props.query);
  }

  render() {
    if (this.state.photos.length > 0) {
      return (
        <div className="photo-container">
          <h2>{this.props.query}</h2>
          <ul>
            <Photo photos={this.state.photos} />
          </ul>
        </div>
      );
    } else {
      return (
        <div className="photo-container">
          <ul>
            <NotFound />
          </ul>
        </div>
      );
    }
  }
}
export default Results;
