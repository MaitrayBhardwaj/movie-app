import { Link } from 'react-router-dom'
import { RiMovie2Fill, RiSearchLine } from 'react-icons/ri'

const Header = () => {
	return (
		<header className="bg-slate-800 body-font">
			<div className="container mx-auto flex flex-wrap p-4 flex-col md:flex-row items-center">
				<Link className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" to="/">
					<RiMovie2Fill className="text-2xl text-white" />
					<span className="ml-3 text-white text-xl">Cinematic</span>
				</Link>
				<nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
					<form>
						<label className="relative block">
							<span className="sr-only">Search</span>
							<span className="absolute inset-y-0 left-0 flex items-center pl-2">
								<RiSearchLine />
							</span>
							<input 
								className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
								placeholder="Search Movies" 
								type="text" 
								name="search"
							/>
						</label>
					</form>
				</nav>
			</div>
		</header>
	);
}

export default Header;
