import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import MovieCard from "./MovieCard";

const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query='

const Search = () => {
    const [movies, setMovies] = useState([])
    const { query } = useParams()

    useEffect(() => {
        axios.get(`${SEARCH_API}${query}`)
            .then(res => setMovies(res.data.results))
    }, [query])

    const movieElements = movies.map(movie => (
        <MovieCard 
            key={movie.id}
            id={movie.id}
            img={movie.poster_path}
            score={movie.vote_average}
            title={movie.title}
            releaseDate={movie.release_date}
        />
    ))

    const styles = {
		backgroundImage: "url('https://cdn.wallpapersafari.com/73/59/V06ozM.jpg')",
		backgroundAttachment: 'fixed',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center'
	}

    return (
        <div className="flex flex-col pb-5 min-h-screen" style={styles}>
            <h1 className="text-2xl my-3 text-center text-white">Search results for "{query}"</h1>
            <div className='flex flex-wrap justify-center'>
                { movieElements }
            </div>
        </div>
    );
}

export default Search;
