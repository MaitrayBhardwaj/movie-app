import { useState } from 'react';
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const imgNA = 'https://2gyntc2a2i9a22ifya16a222-wpengine.netdna-ssl.com/wp-content/uploads/sites/29/2014/12/Image-Not-Available.jpg'

const MovieCard = (props) => {
	const [isHovered, setIsHovered] = useState(false)

	const styles = {
		backgroundImage: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.7))'
	}

	return (
		<Link to={`/movie/${props.id}`}>
			<motion.div
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				whileHover={{ y: -3 }}
				whileTap={{ y: 0 }}
				className="flex w-64 shadow-lg overflow-hidden flex-col m-3 relative">
				<img
					alt={`${props.title}'s poster`}
					className="object-cover w-64"
					src={props.img ? `${IMG_PATH}/${props.img}` : imgNA } />
				{
					isHovered &&
					<motion.div
						animate={{ y: 0 }}
						initial={{ y: 10 }}
						className="absolute bottom-0 w-64 mt-6 bg-gradient-to-t from-black text-white p-3">
						<h2 className="text-md">{ props.title }</h2>
					</motion.div>
				}
				<div
					style={styles}
					className="absolute top-2 right-2 h-8 w-8 flex justify-center items-center rounded-[50%] p-1 text-amber-500 text-xs border-gray-700 border-2 bg-gray-800"
				>
					{props.score}
				</div>
			</motion.div>
		</Link>
	);
};

export default MovieCard;