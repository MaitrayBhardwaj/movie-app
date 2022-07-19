import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RiMovie2Fill, RiSearchLine } from 'react-icons/ri'
import { FaGoogle } from 'react-icons/fa'
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

import { firestore } from '../firebase'
import { UserContext } from '../context/UserContext'

const auth = getAuth()
const provider = new GoogleAuthProvider()	

const Header = () => {
	const [searchQuery, setSearchQuery] = useState('')
	const { user, setUser } = useContext(UserContext)

	const navigate = useNavigate()

	const handleChange = (ev) => {
		setSearchQuery(ev.target.value)
	}

	const handleSubmit = (ev) => {
		ev.preventDefault()
		setSearchQuery('')
		navigate(`/search/${searchQuery}`)
	}

	const handleSignIn = () => {
		signInWithPopup(auth, provider)
			.then(res => {
				setUser(res.user);
				const { creationTime, lastSignInTime } = res.user.metadata
				if(creationTime === lastSignInTime){
					setDoc(doc(firestore, "watchlists", res.user.uid), {
						list: []
					})
				}
			}).catch(err => {
				console.log(err)
			});
	}

	const handleSignOut = () => {
		signOut(auth)
			.then(() => {
				setUser(null)
			})
			.catch(err => {
				console.log(err)
			});		  
	}

	return (
		<header className="bg-slate-800 body-font">
			<div className="container mx-auto flex flex-wrap p-4 flex-col md:flex-row items-center">
				<Link className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" to="/">
					<RiMovie2Fill className="text-2xl text-white" />
					<span className="ml-3 text-white text-xl">Cinematic</span>
				</Link>
				<nav className="md:ml-4 grow md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
					<form onSubmit={handleSubmit}>
						<label className="relative block">
							<span className="sr-only">Search</span>
							<span className="absolute inset-y-0 left-0 flex items-center pl-2">
								<RiSearchLine />
							</span>
							<input 
								onChange={handleChange}
								value={searchQuery}
								className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
								placeholder="Search Movies" 
								type="text" 
								name="search"
							/>
						</label>
					</form>
					{
						user ? 
						<div className='md:ml-auto md:mt-2 flex items-center'>
							<Link to='/watchlist' className="text-white bg-transparent p-3">
								Your watchlist
							</Link>
							<button 
								onClick={handleSignOut} 
								className="text-white mx-2 bg-transparent p-3"
							>
								Sign Out
							</button>
							<img src={user.photoURL} alt="User avatar" className="h-12 w-12 rounded-full md:hidden" />
						</div> :
						<button
							onClick={handleSignIn} 
							className='p-3 md:ml-auto flex items-center bg-transparent text-white'>
							<FaGoogle className='mx-2' /> <span className='mx-2'>Sign In</span>
						</button>
					}
				</nav>
			</div>
		</header>
	);
}

export default Header;