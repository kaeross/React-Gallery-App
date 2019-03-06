import React, { Component } from 'react';
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

const SearchWithRouter = withRouter(Search);

class App extends Component {
  constructor() {
    super();
    this.state = {
      defaultSearchTerm: 'Cat'
    };
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <SearchWithRouter />
            <Nav />
            <Switch>
              <Route
                exact
                path={'/'}
                render={({ match }) => (
                  <Results query={this.state.defaultSearchTerm} />
                )}
              />

              <Route
                path={'/:query'}
                render={({ match }) => <Results query={match.params.query} />}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
