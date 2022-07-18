import { Link } from 'react-router-dom'

const Error = () => {
    const styles = {
		backgroundImage: "url('https://cdn.wallpapersafari.com/73/59/V06ozM.jpg')",
		backgroundAttachment: 'fixed',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center'
	}

    return (
        <div className="min-h-screen text-white text-center flex flex-col items-center" style={styles}>
            <h1 className="text-3xl my-12">You find yourself in a weird place.</h1>
            <p className='text-md my-12'>
                The link you followed may be broken, or the page may have been removed or you aren't allowed to access it. 
            </p>
            <Link to="/">Go back to Cinematic.</Link>
        </div>
    );
}

export default Error;
