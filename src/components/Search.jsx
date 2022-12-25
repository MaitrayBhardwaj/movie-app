import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";

import MovieCard from "./MovieCard";
import Spinner from "./Spinner";

const SEARCH_API = (query, page = 1) => `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${query}&page=${page}`

const Search = () => {
	const [totalPages, setTotalPages] = useState(1)
    const [movies, setMovies] = useState([])
    const [hasLoaded, setHasLoaded] = useState(false)
    const { query } = useParams()

    const pageNo = useRef(1)

    useEffect(() => {
        document.title =`Search - "${query}"`
        axios.get(SEARCH_API(query))
            .then(res => {
                setTotalPages(res.data.total_pages)
                setMovies(res.data.results)
                setHasLoaded(true)
            })
    }, [query])

    const loadMore = (page) => {
        pageNo.current = pageNo.current + 1
        axios.get(SEARCH_API(query, page))
            .then(res => setMovies(prevMovies => [...prevMovies, ...res.data.results]))
    }

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
                <InfiniteScroll
					className='relative flex flex-wrap justify-center'
					pageStart={1}
					loadMore={loadMore}
					hasMore={ pageNo.current < totalPages }
					loader={<Spinner isAbsolute={false} key={0} />}
				>
                    { hasLoaded ? movieElements : <Spinner isAbsolute={true} /> }
				</InfiniteScroll>
            </div>
        </div>
    );
}

export default Search;