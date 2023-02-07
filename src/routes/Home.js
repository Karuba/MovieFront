import { useState, useEffect } from 'react'
import axios from 'axios';
import Movie from '../components/Movie';
import "./Home.css";
import EmptyMovie from "../components/EmptyMovie";

function Home() {
   const pageSize = 12
   const [pageNumber, setPageNumber] = useState(1);

   const [isLoading, setIsLoading] = useState(true);
   const [movies, setMovies] = useState([]);

   const getMovies = async () => {
      const filter = JSON.parse(localStorage.getItem('filter'));
      console.log('filter: ', filter);

      const { data } = await axios.get(`https://localhost:7166/api/movie?moviename=${filter ? filter : ""}&pagenumber=${pageNumber}&pagesize=${pageSize}`);

      setMovies(data);
      setIsLoading(false);
   }
   useEffect(() => {
      if (isLoading)
         getMovies();
   }, [isLoading]);
   const onPrevPage = () => {
      setPageNumber(pageNumber - 1);
      setIsLoading(true);
   }
   const onNextPage = () => {
      setPageNumber(pageNumber + 1);
      setIsLoading(true);
   }

   return (
      <section className="container">
         {isLoading ?
            <div className="loader">
               <span className="loader__text">Loading...</span>
            </div>
            : (
               <section className='movie-body'>
                  <div className="movies">
                     <EmptyMovie />
                     {
                        movies.map(movie => (
                           <Movie
                              key={movie.id}
                              id={movie.id}
                              rating={movie.rating}
                              description={movie.description}
                              name={movie.name}
                              image={movie.image}
                              starrings={movie.starrings}>
                           </Movie>
                        )
                        )
                     }
                  </div>
               </section>
            )
         }
         <div className='page-box'>
            <div className='page'>
               <div className='page-field'>
                  {pageNumber === 1 ? (<></>) : (<button className='page-btn' onClick={onPrevPage}><img src='../img/left.png' alt='left arrow'></img></button>)}
               </div>
               <div className='page-field num'>
                  {pageNumber}
               </div>
               <div className='page-field'>
                  {movies.length < pageSize ? (<></>) : (<button className='page-btn' onClick={onNextPage}><img src='../img/right.png' alt='right allow'></img></button>)}
               </div>
            </div>
         </div>
      </section>
   )
}



/* class Home extends React.Component {
   state = {
      isLoading: true,
      movies: []
   };

   getMovies = async () => {
      const { data } = await axios.get('https://localhost:7166/api/movie');
      console.log(data);
      this.setState({ isLoading: false, movies: data })
   }

   componentDidMount() {
      this.getMovies();
   }

   render() {
      const { isLoading, movies } = this.state;
      return (
         <section className="container">
            {isLoading ?
               <div className="loader">
                  <span className="loader__text">Loading...</span>
               </div>
               : (
                  <div className="movies">
                     <EmptyMovie />
                     {
                        movies.map(movie => (
                           <Movie
                              key={movie.id}
                              id={movie.id}
                              rating={movie.rating}
                              description={movie.description}
                              name={movie.name}
                              image={movie.image}
                              starrings={movie.starrings}>
                           </Movie>
                        )
                        )
                     }
                  </div>
               )
            }
         </section>
      )
   }
} */

export default Home;


/* import { useState, useEffect } from 'react';
import axios from 'axios';
import Movie from '../components/Movie';
import "./Home.css";
import NewMovie from "../components/NewMovie"; */

/* const Home = () => {
   const { isLoading, setIsLoading } = useState(true);
   const { movies, setMovies } = useState();

   useEffect(() => {
      getMovies();
      if (movies) {
         setIsLoading(false);
      }
      console.log(movies);

   }, [movies])

   const getMovies = async () => {
      const {
         data: {
            data: { movies },
         },
      } = await axios.get('https://yts.mx/api/v2/list_movies.json');
      //console.log(movies);
      setMovies(movies);
   }

   return (
      <section className="container">
         {isLoading ?
            <div className="loader">
               <span className="loader__text">Loading...</span>
            </div>
            : (
               <div className="movies">
                  <NewMovie />
                  {
                     movies.map(movie => (
                        <Movie
                           key={movie.id}
                           id={movie.id}
                           year={movie.year}
                           summary={movie.summary}
                           title={movie.title}
                           poster={movie.medium_cover_image}
                           genres={movie.genres}>
                        </Movie>
                     )
                     )
                  }
               </div>
            )
         }
      </section>
   )
} */



/* class Homex extends React.Component {
   state = {
      isLoading: true,
      movies: []
   };

   getMovies = async () => {
      const {
         data: {
            data: { movies },
         },
      } = await axios.get('https://yts.mx/api/v2/list_movies.json');
      //console.log(movies);
      this.setState({ isLoading: false, movies })
   }

   componentDidMount() {
      this.getMovies();
   }

   render() {
      const { isLoading, movies } = this.state;
      return (
         <section className="container">
            {isLoading ?
               <div className="loader">
                  <span className="loader__text">Loading...</span>
               </div>
               : (
                  <div className="movies">
                     <NewMovie />
                     {
                        movies.map(movie => (
                           <Movie
                              key={movie.id}
                              id={movie.id}
                              year={movie.year}
                              summary={movie.summary}
                              title={movie.title}
                              poster={movie.medium_cover_image}
                              genres={movie.genres}>
                           </Movie>
                        )
                        )
                     }
                  </div>
               )
            }
         </section>
      )
   }
}

export default Home;
*/

