import { useState } from 'react';
import "./CreateMovie.css";
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';
/* import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; */
////////////////////////////////
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
//////////////////////////////////
const CREATE_URL = 'https://localhost:7166/api/movie';

const CreateMovie = () => {

   const [hover, setHover] = useState(-1);


   const { auth } = useAuth();


   const [selectedFile, setSelectedFile] = useState(null);
   const [name, setName] = useState('');
   const [desc, setDesc] = useState('');
   const [rating, setRating] = useState(0.5);
   const [success, setSuccess] = useState(false);

   const handleSubmit = async (event) => {
      event.preventDefault()
      const formData = new FormData();
      formData.append("selectedFile", selectedFile);




      if (selectedFile && name && desc && rating) {
         try {
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
               const responses = await axios.post(CREATE_URL, options, {
                  headers: {
                     'Authorization': `Bearer ${auth?.token}`
                  }
               });
               responses?.status === 200 ? setSuccess(true) : setSuccess(false)
            }
         } catch (error) {
            console.log(error)
         }
      }
      else {
         alert("Movie poster field is empty!")
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
                     {(!selectedFile) ? (<img className='file-img' src='../img/image.png' alt='movie poster' />) : (<></>)}
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
                  <Box
                     sx={{
                        width: 200,
                        display: 'flex',
                        alignItems: 'center',
                     }}
                  >
                     <Rating
                        name="hover-feedback"
                        value={rating}
                        precision={0.5}
                        getLabelText={getLabelText}
                        onChange={(event, newValue) => {
                           setRating(newValue);
                        }}
                        onChangeActive={(event, newHover) => {
                           setHover(newHover);
                        }}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                     />
                     {rating !== null && (
                        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>
                     )}
                  </Box>
                  <input className='submit' type="submit" value="Create the movie" />
               </form>
            )
            }
         </div>
      </section>
   )
}

export default CreateMovie;

/* event.preventDefault()
      const formData = new FormData();
      formData.append("selectedFile", selectedFile);
      try {
         const options = {
            url: 'https://localhost:7166/api/movie',
            method: 'POST',
            headers: { "Accept": "application/json" },
            name: "Gerry",
            description: "Derry",
            rating: 4,
            image: "ss"
         };
         const response = await axios(CREATE_URL, options);
         console.log("create image response: ", response);

      } catch (error) {
         console.log(error)
      } */