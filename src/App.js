import React, {
    Component
} from 'react';
import {
    BrowserRouter,
    Route
} from 'react-router-dom';
import axios from 'axios';

//Get App Components
import Results from './components/Results';
import Search from './components/Search';
import Nav from './components/Nav';
import apiKey from './config.js';

class App extends Component {

    constructor() {
        super();
        this.state = {
            defaultSearchTerm: 'dog',
            photos: [],
            searchVal: ''
        };
    }

    getPhotos = () => {}

    componentDidMount = () =>  {
        axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&per_page=24&tags=${this.state.defaultSearchTerm}&format=json&nojsoncallback=1`)
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
                        }
                    })
                });
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });
    }

    getPhotoUrls() {
        this.state.photoData.map(photo => {
            return `https://farm${photo.farmId}.staticflickr.com/${photo.serverId}/${photo.id}_${photo.secret}.jpg`
        });
    }

    handleSearchInput= e =>
    this.setState({ searchVal: e.target.value });

    searchSubmitHandler = e => {
        e.preventDefault();
        axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${this.state.searchVal}&format=json&nojsoncallback=1`)
            .then(response => {
                var data = response.photos;
                this.setState({
                    photos: data
                });
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });
        this.setState({ searchVal: '' });
    }

    render() {
        return ( 
            <BrowserRouter>
                <div className="App">
                    <div className="container">
                        <Search 
                        searchSubmitHandler={this.searchSubmitHandler}
                        handleSearchInput={this.handleSearchInput}
                        pendingSearch={this.state.searchVal} />
                        <Nav />
                        <Results photos={this.state.photos} />
                    </div> 
                </div> 
            </BrowserRouter>
        );
    }
}

export default App;