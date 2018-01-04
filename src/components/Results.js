import React from 'react';
import PropTypes from 'prop-types';


//result components
import NotFound from './gallery/NotFound';
import Photo from './gallery/Photo';

const Results = props => {
    if (props.photos.length > 0) {
        return (
            <div className="photo-container">
                <h2>Results</h2>
                <ul>
                    <Photo photos={props.photos} /> 
                </ul>
            </div>
        )
    } else {
        return (
            <div className="photo-container">
                <ul>
                    <NotFound />
                </ul>
            </div>
        )
    }
    
}

Results.propTypes = {
   photos: PropTypes.array.isRequired 
};

export default Results;