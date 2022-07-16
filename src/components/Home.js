import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroller'

import MovieCard from './MovieCard'
import Spinner from './Spinner'

const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page='

const Home = () => {
	const [totalPages, setTotalPages] = useState(1)
	const [movies, setMovies] = useState([])
	const [hasLoaded, setHasLoaded] = useState(false)

	const pageNo = useRef(1)

	useEffect(() => {
		axios.get(`${API_URL}1`)
			.then(res => {
				setTotalPages(res.data.total_pages)
				setMovies(res.data.results)
				setHasLoaded(true)
			})
	}, [])

	const loadMore = (page) => {
		pageNo.current = pageNo.current + 1
		axios.get(`${API_URL}${page}`)
			.then(res => setMovies(prevMovies => [...prevMovies, ...res.data.results]))
			.catch(err => console.log(err))
	}

	const styles = {
		backgroundImage: "url('https://cdn.wallpapersafari.com/73/59/V06ozM.jpg')",
		backgroundAttachment: 'fixed',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center'
	}

	const popularMovieCards = movies?.map(movie => (
		<MovieCard
			key={movie.id}
			id={movie.id}
			img={movie.poster_path}
			score={movie.vote_average}
			title={movie.title}
			releaseDate={movie.release_date}
		/>
	))

	return (
		<div className="flex flex-col pb-5 min-h-screen" style={styles}>
			<h1 className="text-2xl my-3 text-center text-white">Popular Movies</h1>
			<div className='flex flex-wrap justify-center'>
				<InfiniteScroll
					className='relative flex flex-wrap justify-center'
					pageStart={1}
					loadMore={loadMore}
					hasMore={ pageNo.current < totalPages }
					loader={<Spinner isAbsolute={false} key={0} />}
				>
					{ hasLoaded ? popularMovieCards : <Spinner isAbsolute={true} /> }
				</InfiniteScroll>
			</div>
		</div>
	);
}

export default Home;