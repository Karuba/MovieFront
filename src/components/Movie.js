import { useState } from 'react'
/* import PropTypes from 'prop-types' */
import "./Movie.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

function Movie({ id, name, rating, description, image, starrings }) {

   const { auth } = useAuth();

   const [visible, setVisible] = useState(true);
   const CREATE_URL = `https://localhost:7166/api/movie/${id}`;
   const deleteMovie = async (event) => {
      if (window.confirm("Are you sure?")) {
         event.preventDefault();
         try {
            const options = {
               headers: {
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${auth?.token}`,
               }
            };
            const response = await axios.delete(CREATE_URL, options);

            if (response.status === 204) {
               setVisible(false);
            }

         } catch (error) {
            console.log(error)
         }
      }
   }

   return (
      <>{(visible) ? (
         <div className='movie-box'>
            {(auth?.roles?.find(role => role === "Administrator")) ? (
               <div className='buttons'>
                  <Link className='edit-btn'
                     to={`movie/edit/${id}`}
                     state={{
                        id: id, name: name, rating, description, image, starrings
                     }} ></Link>
                  <button onClick={deleteMovie} className='cross-btn'></button>
               </div>
            ) :
               (<></>)}
            <Link className='movie-link'
               to={`/movie/${id}`}
               state={{
                  name: name, rating, description, image, starrings
               }}
            >
               <div className="movie">
                  <img className='poster' src={`https://localhost:7166/api/movie/image/${image}`} alt={name} title="title"></img>
                  <div className="movie__column">
                     <h3 className="movie__title">{name}</h3>
                     <h5 className="movie__year">rating: {rating}</h5>
                     <p className="movie__summary">Desc: {description.length > 40 ? description.slice(0, 40) + "..." : description}</p>
                     <p className="movie__id">{/* {id} */}</p>
                     <ul className='movie__genres'>
                        {starrings.map((starring, i) => { return <li key={i} className='genres__genre'>{starring.firstName} {starring.secondName} Desc: {starring.description}</li> })}
                     </ul>
                  </div>
               </div>
            </Link >
         </div>
      )
         :
         (<></>)
      }
      </>
   )
}

/* Movie.propTypes = {
   id: PropTypes.number.isRequired,
   title: PropTypes.string.isRequired,
   year: PropTypes.number.isRequired,
   summary: PropTypes.string.isRequired,
   poster: PropTypes.string.isRequired,
   genres: PropTypes.arrayOf(PropTypes.string).isRequired
} */

export default Movie;