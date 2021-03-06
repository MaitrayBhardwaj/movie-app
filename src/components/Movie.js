import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { AnimatePresence } from 'framer-motion';
import axios from 'axios'

import { FaImdb, FaPlusCircle, FaMinusCircle } from 'react-icons/fa'
import { BsBoxArrowUpRight } from 'react-icons/bs'

import { firestore } from '../firebase'
import { UserContext } from '../context/UserContext'

import Notification from './Notification'
import Spinner from './Spinner'

const MOVIE_API = (id) => `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280/'
const imgNA = 'https://2gyntc2a2i9a22ifya16a222-wpengine.netdna-ssl.com/wp-content/uploads/sites/29/2014/12/Image-Not-Available.jpg'

const Movie = () => {
    const [movieData, setMovieData] = useState({ genres: [] })
    const [hasLoaded, setHasLoaded] = useState(false)
    const [isInWatchList, setIsInWatchList] = useState(false)
    const [isNotifActive, setIsNotifActive] = useState(false)
    
    const { movieID } = useParams()
    const navigate = useNavigate()

    const { user } = useContext(UserContext)

    useEffect(() => {
        document.title = 'Loading...'
        axios.get(MOVIE_API(movieID))
            .then(res => {
                setMovieData(res.data)
                setHasLoaded(true)
                document.title = res.data.title
            })
            .catch(err => {
                navigate('/not_found')
            })
        if(user) {
            const docRef = doc(firestore, "watchlists", user?.uid);
            getDoc(docRef)
                .then(res => {
                    const { list } = res.data()
                    for(let movie of list){ // eslint-disable-next-line
                        if(movie.movieID == movieID){
                            setIsInWatchList(true)
                            break
                        }
                    }
                })
        }
    }, [movieID, user])

    const addtoWatchList = async () => {
        const userRef = doc(firestore, 'watchlists', user.uid)
        const newMovie = {
            movieID: movieData.id,
            movieName: movieData.title,
            moviePoster: movieData.poster_path
        }

        updateDoc(userRef, {
            list: arrayUnion(newMovie)
        }).then(() => {
            setIsInWatchList(true)
            setIsNotifActive(() => {
                setTimeout(() => setIsNotifActive(false), 2500)
                return true
            })
        })
    }

    const removeFromWatchList = async () => {
        const userRef = doc(firestore, 'watchlists', user.uid)
        const thisMovie = {
            movieID: movieData.id,
            movieName: movieData.title,
            moviePoster: movieData.poster_path
        }

        updateDoc(userRef, {
            list: arrayRemove(thisMovie)
        }).then(() => {
            setIsInWatchList(false)
            setIsNotifActive(() => {
                setTimeout(() => setIsNotifActive(false), 2500)
                return true
            })
        })
    }

    const styles = {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(${IMG_PATH}${movieData?.backdrop_path})`, 
        backgrounSize: 'cover', 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
    }

    const genreElements = movieData?.genres.map(genre => (
        <div key={genre.id} className="bg-white text-slate-900 my-2 hover:bg-slate-900 hover:text-white py-2 px-4 mr-2 rounded-full">{genre.name}</div>
    ))

    return (
        <div className='py-8 text-lg px-12 relative mx-0 min-h-screen bg-slate-700' style={styles}>
            {
                hasLoaded ?
                <>
                    <section className="text-white flex flex-col body-font">
                        <AnimatePresence>
                            { isNotifActive && <Notification message={ isInWatchList ? 'Added to watchlist' : 'Removed from watchlist' } /> }
                        </AnimatePresence>
                        <div className="container flex-col flex p-2 lg:flex-row md:items-start items-center">
                            <div>
                                <img 
                                    className="object-cover object-center w-64 h-96 rounded" 
                                    alt="poster"
                                    src={movieData.poster_path ? `${IMG_PATH}/${movieData.poster_path}` : imgNA }
                                />
                            </div>
                            <div className="lg:flex-grow md:w-1/2 flex flex-col md:items-start md:text-left items-center text-center lg:ml-5 md:ml-0">
                                <h1 className="title-font w-full sm:text-6xl my-3 text-5xl mb-4 font-medium text-white">
                                    { movieData.title }
                                </h1>
                                { 
                                    user && 
                                    <button
                                        onClick={isInWatchList ? removeFromWatchList : addtoWatchList} 
                                        className={`${isInWatchList ? 'bg-red-600' : 'bg-green-600' } text-md p-1 my-2 flex items-center rounded-md text-white`}
                                    >
                                        { isInWatchList ? <FaMinusCircle className="mx-1" />  : <FaPlusCircle className="mx-1" /> }
                                        <span className="mx-1">{isInWatchList ? `Remove from watchlist` : 'Add to Watchlist'}</span>
                                    </button>
                                }
                                <p className='font-bold'>{movieData.tagline}</p>
                                <p className="mb-8 my-3 text-left pt-2 pb-1 md:w-[80vw] lg:w-[65vw]">{movieData.overview}</p>
                                <div className="flex items-center text-2xl">
                                    <a href={`https://www.imdb.com/title/${movieData.imdb_id}`} rel="noreferrer" target="_blank">
                                        <FaImdb className="text-3xl mr-3" />
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
                            <div className='flex flex-wrap my-2 justify-center'>
                                { genreElements }
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