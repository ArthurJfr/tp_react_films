import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WishlistProvider } from './context/WishlistProvider';
import Navbar from './components/NavBar/Navbar';
import MovieList from './components/MovieList/MovieList';
import MovieDetail from './components/MovieDetail/MovieDetail';
import Wishlist from './components/WishList/Wishlist';
import Home from './components/Home/Home';

const App = () => {
  return (
    <WishlistProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </Router>
    </WishlistProvider>
  );
};

export default App; 