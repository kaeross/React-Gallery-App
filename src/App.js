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
            photos: []
        };
    }

    componentDidMount(searchTerm) {
        axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${searchTerm}&format=json&nojsoncallback=1`)
            .then(response => {
                this.setState({
                    photos: response.photos.photo
                });
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });
    }

    // getPhotoUrls() {
    //     this.setState.photoUrl = this.state.photos.map(photo => {
    //         return `https://farm${photo.farmId}.staticflickr.com/${photo.serverId}/${photo.id}_${photo.secret}.jpg`
    //     });
    // }

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