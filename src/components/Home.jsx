import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroller'

import MovieCard from './MovieCard'
import Spinner from './Spinner'

const API_URL = (method) => `https://api.themoviedb.org/3/discover/movie?sort_by=${method}&api_key=${import.meta.env.VITE_TMDB_API_KEY}&page=`
const methods = ['popularity.desc', 'vote_average.desc&vote_count.gte=200', 'release_date.desc', 'revenue.desc']
const methodNames = ['Popular', 'Top Rated', 'Upcoming', 'Top Grossing']

const Home = () => {
	const [totalPages, setTotalPages] = useState(1)
	const [movies, setMovies] = useState([])
	const [hasLoaded, setHasLoaded] = useState(false)
	const [sortMethod, setSortMethod] = useState(0)

	const pageNo = useRef(1)

	useEffect(() => {
		document.title = 'Cinematic'
		setHasLoaded(false)
		pageNo.current = 1
		axios.get(`${API_URL(methods[sortMethod])}${pageNo.current}`)
			.then(res => {
				setTotalPages(res.data.total_pages)
				setMovies(res.data.results)
				setHasLoaded(true)
			})
	}, [sortMethod])

	const loadMore = (page) => {
		pageNo.current = pageNo.current + 1
		axios.get(`${API_URL(methods[sortMethod])}${page}`)
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

	const movieCards = movies.map(movie => (
		<MovieCard
			key={movie.id}
			id={movie.id}
			img={movie.poster_path}
			score={movie.vote_average}
			title={movie.title}
		/>
	))

	const filterElements = methodNames.map((method, idx) => (
		<button 
			key={idx}
			className={`py-3 px-6 bg-green-600 text-white my-1 mx-3 rounded-3xl ${ idx === sortMethod ? 'border-white border-2 border-spacing-3' : '' }`}
			onClick={() => setSortMethod(idx)}
		>
			{ method }
		</button>
	))

	return (
		<div className="flex flex-col items-center pb-5 min-h-screen" style={styles}>
			<div className="flex flex-wrap justify-center my-5">
				{ filterElements }
			</div>
			<h1 className="text-2xl my-3 text-white">{ methodNames[sortMethod] } Movies</h1>
			<div className='flex flex-wrap justify-center'>
				<InfiniteScroll
					className='relative flex flex-wrap justify-center'
					pageStart={1}
					loadMore={loadMore}
					hasMore={ pageNo.current < totalPages }
					loader={<Spinner isAbsolute={false} key={0} />}
				>
					{ hasLoaded ? movieCards : <Spinner isAbsolute={true} /> }
				</InfiniteScroll>
			</div>
		</div>
	);
}

export default Home;