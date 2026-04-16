import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <span className="navbar__logo">Movie Catalog</span>
        <ul className="navbar__links">
          <li><NavLink to="/" end>Фільми</NavLink></li>
          <li><NavLink to="/genres">Жанри</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}
