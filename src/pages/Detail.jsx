import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function Detail({ teams, voegToeAanTeam, toggleFavoriet }) {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [teamId, setTeamId] = useState('');

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  }, [name]);

  if (!pokemon) return <p>Laden...</p>;

  // Dit slaan we op in een team of bij favorieten
  const kort = { id: String(pokemon.id), name: pokemon.name };

  return (
    <div className="detail">
      <Link to="/list">&larr; Terug</Link>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h2>{pokemon.name}</h2>
      <p>Type: {pokemon.types.map((t) => t.type.name).join(', ')}</p>

      {pokemon.stats.map((s) => (
        <p key={s.stat.name}>{s.stat.name}: {s.base_stat}</p>
      ))}

      <select value={teamId} onChange={(e) => setTeamId(Number(e.target.value))}>
        <option value="">Kies een team</option>
        {teams.map((t) => (
          <option key={t.id} value={t.id}>{t.naam} ({t.pokemons.length}/6)</option>
        ))}
      </select>
      <button onClick={() => teamId && voegToeAanTeam(teamId, kort)}>+ Voeg toe aan team</button>
      <button onClick={() => toggleFavoriet(kort)}>☆ Favoriet</button>
    </div>
  );
}

export default Detail;
