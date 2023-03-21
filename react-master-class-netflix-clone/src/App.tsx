import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Routes/Home';
import Search from './Routes/Search';
import Tv from './Routes/Tv';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="movies/:movieId" element={<Home />} />
        </Route>
        <Route path="/tv" element={<Tv />}>
          <Route path=":tvId" element={<Tv />} />
        </Route>
        <Route path="/search" element={<Search />}>
          <Route path="movies/:movieId" element={<Search />} />
          <Route path="tv/:tvId" element={<Search />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
