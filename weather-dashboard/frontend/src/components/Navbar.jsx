import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={{ padding: '10px', background: '#f0f0f0' }}>
    <Link to="/" style={{ margin: '0 10px' }}>Dashboard</Link>
    <Link to="/search" style={{ margin: '0 10px' }}>Search</Link>
  </nav>
);

export default Navbar;