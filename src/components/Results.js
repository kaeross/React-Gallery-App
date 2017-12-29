import React from 'react';
import {
    Route
} from 'react-router-dom';

//result components
import NotFound from './gallery/NotFound';
import Photo from './gallery/Photo'

const Results = props => {
    {/* Get props.results */}
    return (
        <div class="photo-container">
            <h2>Results</h2>{/* Show if results array > 0 */}
            <ul>
                {/* If results found */}
                <Route exact path="/" component={Photo} />
                {/* If no results found */}
                <Route component={NotFound} />
            </ul>
        </div>
    )
}


export default Results;