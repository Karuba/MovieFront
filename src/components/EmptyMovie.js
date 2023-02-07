import React from 'react'
import { Link } from 'react-router-dom';
import "./Movie.css";
import "./EmptyMovie.css";
import useAuth from '../hooks/useAuth';


const EmptyMovie = () => {
   const { auth } = useAuth();
   return (
      <>
         {(auth?.roles?.find(role => role === "Administrator")) ? (
            <Link className='movie-link'
               to={`/movie/create`}
            >
               <div className="movie">
                  <div className='empty'></div>
                  <div className="movie__column">
                     <div className='empty__title'></div>
                     <div className="empty__year"></div>
                     <div className="empty__summary"></div>
                     <div className="empty__id"></div>
                     <div className='empty__genres'></div>
                  </div>
               </div>
            </Link >)
            : (
               <></>)}
      </>
   )
}

export default EmptyMovie;