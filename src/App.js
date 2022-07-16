import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from "./components/Header";
import Home from './components/Home';
import Footer from './components/Footer';
import Movie from './components/Movie';
import Search from './components/Search';

function App() {
  	return (
		<Router>
			<div className="flex flex-col">
				<Header />
				<Routes>
					<Route path="/search/:query" element={ <Search /> } />
					<Route path="/movie/:movieID" element={ <Movie /> } />
					<Route path="/" element={ <Home /> } />
				</Routes>
				<Footer />
			</div>
		</Router>
  	);
}

export default App;