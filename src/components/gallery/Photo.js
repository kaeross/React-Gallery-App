import React from 'react';

const Photo = props => {
    props.photos.map(photo => 
        <li key={photo.id}>
            <img src={photo.url} alt="" />
        </li>
    )  
}

Photo.propTypes = {
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired
};

export default Photo;