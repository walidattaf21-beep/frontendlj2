import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="navigatie">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/list">Lijst</NavLink>
      <NavLink to="/teams">Teams</NavLink>
      <NavLink to="/favorieten">Favs</NavLink>
    </nav>
  );
}

export default Navigation;
