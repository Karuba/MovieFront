/*For class based components*/
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react";
import "./Detail.css";

function Detail() {
   const location = useLocation();
   const navigate = useNavigate();

   useEffect(() => {
      if (location.state === null) {
         navigate("/")
      }
   });

   return (
      <section className='movie'>
         <div className='movie-inner'>

            <label htmlFor='file' className='file-label'><img className='file-img' src={`https://localhost:7166/api/movie/image/${location.state.image}`} />
            </label>

            <label htmlFor="name">
               Title:
               <span className='title'>
                  {location.state.name}
               </span>
            </label>

            <label htmlFor="desc">
               Description:
               <span>{location.state.description}</span>
            </label>

            <label htmlFor="rating">
               Rating:
               <span>{location.state.rating}</span>
            </label>
         </div>
      </section>
   )
}

export default Detail;