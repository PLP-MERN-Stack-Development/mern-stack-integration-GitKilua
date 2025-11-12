import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import WeatherDetail from './components/WeatherDetail';
import SearchForm from './components/SearchForm';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/weather/:city" element={<WeatherDetail />} />
        <Route path="/search" element={<SearchForm />} />
      </Routes>
    </Router>
  );
}

export default App;