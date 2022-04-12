import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import './MovieThumb.css';

const MovieThumb = (props) => (
    <div className="rmdb-moviethumb">
        {props.clickable ? 
            <Link to={{ pathname: `/${props.movieId}`, movieName:`${props.movieName}`}}>
                <img className="clickable" src={props.image} alt="moviethumb" />
            </Link>
            :
            <img className="clickable" src={props.image} alt="moviethumb" /> 
        }
    </div>
)


MovieThumb.prototype = {
    image: PropTypes.string,
    movieId: PropTypes.number,
    movieName: PropTypes.string,
}

export default MovieThumb;