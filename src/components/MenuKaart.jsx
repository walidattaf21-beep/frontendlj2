import { Link } from 'react-router-dom';

function MenuKaart({ titel, tekst, link }) {
  return (
    <Link to={link} className="menu-kaart">
      <h3>{titel}</h3>
      <p>{tekst}</p>
    </Link>
  );
}

export default MenuKaart;
