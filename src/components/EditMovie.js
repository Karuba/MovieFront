import { useState, useEffect } from 'react';
import "./EditMovie.css";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const labels = {
   0.5: 'Useless',
   1: 'Useless+',
   1.5: 'Poor',
   2: 'Poor+',
   2.5: 'Ok',
   3: 'Ok+',
   3.5: 'Good',
   4: 'Good+',
   4.5: 'Excellent',
   5: 'Excellent+',
};

function getLabelText(value) {
   return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const EditMovie = () => {

   const { auth } = useAuth();


   const location = useLocation();
   const navigate = useNavigate();

   const CREATE_URL = `https://localhost:7166/api/movie/${location.state.id}`;
   const [selectedFile, setSelectedFile] = useState(null);
   const [name, setName] = useState(location.state.name);
   const [desc, setDesc] = useState(location.state.description);
   const [rating, setRating] = useState(location.state.rating);
   const [image] = useState(location.state.image);
   const [success, setSuccess] = useState(false);



   useEffect(() => {
      if (location.state === null) {
         navigate("/")
      }
   });

   const handleSubmit = async (event) => {
      event.preventDefault()
      const formData = new FormData();
      formData.append("selectedFile", selectedFile);

      try {

         if (selectedFile) {
            const response = await axios.post('https://localhost:7166/api/movie/UploadImage',
               formData,
               {
                  headers: {
                     'Content-Type': 'multipart/form-data',
                     'Authorization': `Bearer ${auth?.token}`,
                  }
               }
            );
            if (response?.status === 200) {
               const options = {
                  name: name,
                  description: desc,
                  rating: rating,
                  image: selectedFile.name
               };
               const responses = await axios.put(CREATE_URL, options, {
                  headers: {
                     'Authorization': `Bearer ${auth?.token}`,
                  }
               });
               responses?.status === 200 ? setSuccess(true) : setSuccess(false)
            }
         }
         else if (name !== location.state.name || desc !== location.state.description) {

            const options = {
               headers: {
                  'Accept': 'application/json',
               },
               name: name,
               description: desc,
               rating: rating,
               image: image
            };
            const responses = await axios.put(CREATE_URL, options);
            responses?.status === 200 ? setSuccess(true) : setSuccess(false)
         }
         else {
            console.log('nothing to change');

         }

      } catch (error) {
         console.log(error)
      }

   }

   const handleSelectedFile = (event) => {
      setSelectedFile(event.target.files[0])
   }

   return (
      <section className='movie'>
         <div className='movie-inner'>
            {success ? (
               <section>
                  <h1>Success!</h1>
                  <p>
                     <Link to="/">Home</Link>
                  </p>
               </section>
            ) : (
               <form onSubmit={handleSubmit}>
                  <label htmlFor='file' className='file-label'>
                     {(!selectedFile) ? (<img className='file-img' src={`https://localhost:7166/api/movie/image/${image}`} alt='movie poster' />) : (<></>)}
                     <input id='file' type="file" accept='image/webp' onChange={handleSelectedFile} />
                     {selectedFile && (
                        <div className='chosen-img'>
                           <img
                              src={URL.createObjectURL(selectedFile)}
                              /* style={styles.image} */
                              alt="Thumb"
                           />
                        </div>
                     )}
                  </label>
                  <label htmlFor="name">
                     <span className='title'>Title:</span>
                     <input
                        type="text"
                        id="name"
                        autoComplete="off"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                     />
                  </label>

                  <label htmlFor="desc">
                     Description:
                     <input
                        type="text"
                        id="desc"
                        autoComplete="off"
                        onChange={(e) => setDesc(e.target.value)}
                        value={desc}
                        required
                     />
                  </label>

                  <label htmlFor="rating">
                     Rating:
                     <input
                        type="number"
                        id="rating"
                        autoComplete="off"
                        min="0"
                        max="5"
                        onChange={(e) => setRating(e.target.value)}
                        value={rating}
                     />
                  </label>

                  <input className='submit' type="submit" value="Edit the movie" />
               </form>
            )}
         </div>
      </section>
   )
}

export default EditMovie;