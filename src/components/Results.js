import React from 'react';
import {
    Route
} from 'react-router-dom';

//result components
import NotFound from './gallery/NotFound';
import Photo from './gallery/Photo';

const Results = ({match}) => {
    {/* Get props.results */}
    let searchQuery = match.params.query;
    return (
        <div class="photo-container">
            <h2>Results</h2>{/* Show if results array > 0 */}
            <ul>
                {/* If results found */}
                <Route exact path="/" render={(props) => {}} component={Photo} />
                {/* If no results found */}
                <Route component={NotFound} />
            </ul>
        </div>
    )
}


export default Results;