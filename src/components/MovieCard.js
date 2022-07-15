import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

const MovieCard = (props) => {
	return (
		<Link to={`/movie/${props.id}`}>
			<motion.div
				whileHover={{ y: -5 }}
				whileTap={{ y: 0 }} 
				className="flex w-64 flex-col m-3">
				<img
					alt={`${props.title}'s poster`}
					className="object-cover h-full"
					src={`${IMG_PATH}/${props.img}`} />
				<div className="flex justify-between items-center bg-black text-white p-3">
					<h2 className="text-md">{ props.title }</h2>
					<div
						className="rounded-[50%] p-1 text-amber-500 text-xs border-gray-700 border-2 bg-gray-800"
					>
						{props.score}
					</div>
				</div>
			</motion.div>
		</Link>
	);
};

export default MovieCard;