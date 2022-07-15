import { useState, useEffect } from 'react'
import axios from 'axios'

import MovieCard from './MovieCard'

const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const imgNA = 'https://2gyntc2a2i9a22ifya16a222-wpengine.netdna-ssl.com/wp-content/uploads/sites/29/2014/12/Image-Not-Available.jpg'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query='

const Home = () => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        axios.get(API_URL)
            .then(res => setMovies(res.data.results))
    }, [])

    const popularMovieCards = movies?.map(movie => (
        <MovieCard 
            key={movie.id}
            id={movie.id} 
            img={movie.poster_path} 
            score={movie.vote_average} 
            title={movie.original_title}
            releaseDate={movie.release_date}
        />
    ))

    return (
        <div className="flex flex-col">
            <h1 className="text-2xl my-3 text-center">Popular Movies</h1>
            <div className='flex flex-wrap justify-center'>
                { popularMovieCards }
            </div>
        </div>
    );
}

export default Home;