import { useState, useContext, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

import { UserContext } from '../context/UserContext'
import { firestore } from '../firebase'

import MovieCard from './MovieCard'

const Watchlist = () => {
    const [movies, setMovies] = useState([])
    const navigate = useNavigate()
    const { user } = useContext(UserContext)

    useEffect(() => {
        if(user){
            const docRef = doc(firestore, "watchlists", user?.uid);
            getDoc(docRef)
                .then(res => {
                    const { list } = res.data()
                    setMovies(list)
                })
        }
    }, [])

    const movieElements = movies.map(movie => (
        <MovieCard
            key={movie.movieID}
            id={movie.movieID}
            img={movie.moviePoster}
            title={movie.movieName}
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
        <div className='min-h-screen p-2 flex flex-col items-center' style={styles}>
            <h1 className='text-3xl my-3 text-white'>Your Watchlist</h1>
            <div className="flex flex-wrap">
                { movieElements }
            </div>
        </div>
    );
}

export default Watchlist;