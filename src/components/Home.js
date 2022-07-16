import { useState, useEffect } from 'react'
import axios from 'axios'

import MovieCard from './MovieCard'

const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'

const Home = () => {
	const [movies, setMovies] = useState([])

	useEffect(() => {
		axios.get(API_URL)
			.then(res => setMovies(res.data.results))
	}, [])

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
				{ popularMovieCards }
			</div>
		</div>
	);
}

export default Home;