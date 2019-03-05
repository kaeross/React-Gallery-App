import React, { Component } from 'react';

//result components
import NotFound from './gallery/NotFound';
import Photo from './gallery/Photo';

class Results extends Component {
  componentDidMount() {
    this.props.getPhotos(this.props.query);
  }

  componentWillUpdate() {
    this.props.getPhotos(this.props.query);
  }

  render() {
    if (this.props.photos.length > 0) {
      return (
        <div className="photo-container">
          <h2>{this.props.query}</h2>
          <ul>
            <Photo photos={this.props.photos} />
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
