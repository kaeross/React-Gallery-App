import React, {
    Component
} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Get App Components
import Results from './components/Results';
import Search from './components/Search';
import Nav from './components/Nav';
import apiKey from './config.js';

class App extends Component {

    constructor() {
        super();
        this.state = {
            defaultSearchTerm: 'My favourite things',
            perPage: 16,
            photos: [],
            searchVal: ''
        };
    }

    getPhotos = searchTerm => {
        axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&per_page=${this.state.perPage}&tags=${searchTerm}&format=json&nojsoncallback=1`)
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

    componentDidMount = () =>  {
        this.getPhotos(this.state.defaultSearchTerm)
    }

    handleSearchInput= e => this.setState({ searchVal: e.target.value });

    searchSubmitHandler = e =>  {
        e.preventDefault();
        this.props.history.push(this.state.searchVal);
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <div className="container">
                        <Search 
                            searchSubmitHandler={this.searchSubmitHandler}
                            handleSearchInput={this.handleSearchInput}
                            pendingSearch={this.state.searchVal} />
                        <Nav />

                        <Switch>
                            <Route exact path={'/'} render={ ({match}) => 
                                <Results query={this.state.defaultSearchTerm} getPhotos={this.getPhotos} photos={this.state.photos} />
                            } />

                            <Route path={'/:query'} render={ ({match}) => 
                                <Results query={match.params.query} getPhotos={this.getPhotos} photos={this.state.photos} />
                            } />
                        </Switch>
                    </div> 
                </div>
            </Router>
        );
    }
}

export default App;