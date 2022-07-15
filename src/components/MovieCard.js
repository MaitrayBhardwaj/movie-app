import { motion } from 'framer-motion'

const MovieCard = (props) => {
	return (
		<motion.div
			whileHover={{ y: -8 }} 
			className="flex w-64 flex-col m-3">
			<img
				className="object-cover h-full"
				src={`https://image.tmdb.org/t/p/w300/${props.img}`} />
			<div className="flex justify-between items-center bg-black text-white p-3">
				<h2 className="text-lg">{ props.title }</h2>
				<div
					className="rounded-[50%] p-1 text-amber-500 text-xs border-gray-700 border-2 bg-gray-800"
				>
					{props.score}
				</div>
			</div>
		</motion.div>
	);
};

export default MovieCard;