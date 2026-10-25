import { Link } from 'react-router-dom';

function PokemonCard({ id, name, knop, onKlik }) {
  return (
    <div className="card">
      <Link to={`/pokemon/${name}`}>
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt={name} />
        <h3>{name}</h3>
      </Link>
      <button onClick={onKlik}>{knop}</button>
    </div>
  );
}

export default PokemonCard;
