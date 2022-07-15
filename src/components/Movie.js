import { useState, useEffect } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom';

import { FaImdb } from 'react-icons/fa'

const MOVIE_API = (id) => `https://api.themoviedb.org/3/movie/${id}?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US`
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280/'

const Movie = () => {
    const [movieData, setMovieData] = useState({})
    const { movieID } = useParams()

    useEffect(() => {
        axios.get(MOVIE_API(movieID))
            .then(res => setMovieData(res.data))
    }, [])

    const styles = {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url(${IMG_PATH}${movieData?.backdrop_path})`, 
        backgrounSize: 'cover', 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }

    console.log(movieData)

    return (
        <div className='py-8 px-12 relative mx-0 bg-slate-700' style={styles}>
            <section className="text-white body-font">
                <div className="container flex p-2 md:flex-row flex-col items-center">
                    <div>
                        <img 
                            className="object-cover object-center w-64 h-96 rounded" 
                            alt="poster"
                            src={`${IMG_PATH}/${movieData.poster_path}`}
                        />
                    </div>
                    <div className="lg:flex-grow md:w-1/2 flex flex-col md:items-start md:text-left items-center text-center ml-5">
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
                            { movieData.original_title }
                        </h1>
                        <p className='font-bold'>{movieData.tagline}</p>
                        <p className="mb-8 my-3">{movieData.overview}</p>
                        <div className="text-lg">
                            <FaImdb className="text-3xl" />
                        </div>
                    </div>
                </div>
            </section>
            <div className="bg-slate-700 text-amber-400 absolute top-2 p-2 right-6 rounded-[50%] border-2 border-gray-500">
                {movieData.vote_average}
            </div>       
        </div>
    );
}

export default Movie;