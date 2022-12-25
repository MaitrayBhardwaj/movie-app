import { motion } from 'framer-motion'

const Notification = ({ message }) => {
    return (
        <motion.div
            animate={{ y: 0 }}
            initial={{ y: -150 }}
            exit={{ y: -150 }}
            className="fixed top-16 left-1/4 text-center right-1/4 text-white z-10 p-3 bg-black"
        >
            { message }
        </motion.div>
    );
}

export default Notification;
