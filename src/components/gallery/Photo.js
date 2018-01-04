import React from 'react';
import PropTypes from 'prop-types';


const Photo = props => {
    return (
        props.photos.map(photo => 
            <li key={photo.id}>
                <img src={photo.url} alt="" />
            </li>
        ) 
    )
}

Photo.propTypes = {
    photos: PropTypes.array.isRequired
};

export default Photo;