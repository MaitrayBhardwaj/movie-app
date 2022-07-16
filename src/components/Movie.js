import { useState, useEffect } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom';

import { FaDollarSign, FaImdb } from 'react-icons/fa'
import { BsBoxArrowUpRight } from 'react-icons/bs'

import Spinner from './Spinner'

const MOVIE_API = (id) => `https://api.themoviedb.org/3/movie/${id}?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US`
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280/'
const imgNA = 'https://2gyntc2a2i9a22ifya16a222-wpengine.netdna-ssl.com/wp-content/uploads/sites/29/2014/12/Image-Not-Available.jpg'

const Movie = () => {
    const [movieData, setMovieData] = useState({ genres: [] })
    const [hasLoaded, setHasLoaded] = useState(false)
    const { movieID } = useParams()

    useEffect(() => {
        axios.get(MOVIE_API(movieID))
            .then(res => {
                setMovieData(res.data)
                setHasLoaded(true)
            })
    }, [movieID])

    const styles = {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(${IMG_PATH}${movieData?.backdrop_path})`, 
        backgrounSize: 'cover', 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
    }

    const genreElements = movieData?.genres.map(genre => (
        <div key={genre.id} className="bg-white text-slate-900 hover:bg-slate-900 hover:text-white py-2 px-4 mr-2 rounded-full">{genre.name}</div>
    ))

    return (
        <div className='py-8 px-12 relative mx-0 min-h-screen bg-slate-700' style={styles}>
            {
                hasLoaded ?
                <>
                    <section className="text-white flex flex-col body-font">
                        <div className="container flex p-2 md:flex-row flex-col items-center">
                            <div>
                                <img 
                                    className="object-cover object-center w-64 h-96 rounded" 
                                    alt="poster"
                                    src={movieData.poster_path ? `${IMG_PATH}/${movieData.poster_path}` : imgNA }
                                />
                            </div>
                            <div className="lg:flex-grow md:w-1/2 flex flex-col md:items-start md:text-left items-center text-center ml-5">
                                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
                                    { movieData.title }
                                </h1>
                                <p className='font-bold'>{movieData.tagline}</p>
                                <p className="mb-8 my-3">{movieData.overview}</p>
                                <div className="flex text-2xl">
                                    <a href={`https://www.imdb.com/title/${movieData.imdb_id}`} rel="noreferrer" target="_blank">
                                        <FaImdb className="mr-3" />
                                    </a>
                                    <a
                                        href={movieData.homepage}
                                        rel="noreferrer"
                                        target="_blank"    
                                    >
                                        <BsBoxArrowUpRight className="mr-3" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='flex my-2 justify-center'>
                                { genreElements }
                            </div>
                            <div className='flex items-center'>
                                <div className='flex'><FaDollarSign /><span>Budget: {movieData.budget}</span></div>
                            </div>
                        </div>
                    </section>
                    <div className="bg-slate-700 flex justify-center items-center h-12 w-12 text-amber-400 absolute top-2 p-2 right-6 rounded-[50%] border-2 border-gray-500">
                        { movieData.vote_average }
                    </div>
                </> : <Spinner isAbsolute={true} />
            }       
        </div>
    );
}

export default Movie;