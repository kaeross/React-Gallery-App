import React from 'react';
import NotFound from './results/NotFound';
import FlickrImages from './results/FlickrImages'

const Results = props => {
    return (
        <div class="photo-container">
            <h2>Results</h2>
            <ul>
                <FlickrImages />
                <NotFound />
            </ul>
        </div>
    )
}


export default Results;