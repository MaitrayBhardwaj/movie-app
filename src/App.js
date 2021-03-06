import { useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import { UserContext } from './context/UserContext'

import Header from "./components/Header";
import Home from './components/Home';
import Footer from './components/Footer';
import Movie from './components/Movie';
import Search from './components/Search';
import Watchlist from './components/Watchlist';
import Error from './components/Error';

function App() {
	const [user, setUser] = useState(null)

  	return (
		<Router>
			<UserContext.Provider value={{ user, setUser }} >
				<div className="flex text-lg overflow-x-hidden flex-col">
					<Header />
					<Routes>
						<Route path="/watchlist" element={ <Watchlist /> } />
						<Route path="/search/:query" element={ <Search /> } />
						<Route path="/movie/:movieID" element={ <Movie /> } />
						<Route path="/" exact element={ <Home /> } />
						<Route path="*" element={ <Error /> } />
					</Routes>
					<Footer />
				</div>
			</UserContext.Provider>
		</Router>
  	);
}

export default App;