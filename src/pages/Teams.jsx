import { useState } from 'react';
import PokemonCard from '../components/PokemonCard';

function Teams({ teams, maakTeam, hernoemTeam, verwijderTeam, verwijderUitTeam }) {
  const [naam, setNaam] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (naam === '') return;
    maakTeam(naam);
    setNaam('');
  }

  return (
    <>
      <h2>Mijn Teams</h2>

      <form onSubmit={handleSubmit}>
        <input placeholder="Naam van nieuw team" value={naam} onChange={(e) => setNaam(e.target.value)} />
        <button>Team maken</button>
      </form>

      {teams.map((team) => (
        <div key={team.id} className="team">
          <h3>{team.naam} ({team.pokemons.length}/6)</h3>
          <button onClick={() => hernoemTeam(team.id, prompt('Nieuwe naam:', team.naam) || team.naam)}>Hernoem</button>
          <button onClick={() => verwijderTeam(team.id)}>Verwijder</button>

          {team.pokemons.map((p, index) => (
            <PokemonCard key={index} id={p.id} name={p.name} knop="✕" onKlik={() => verwijderUitTeam(team.id, index)} />
          ))}
        </div>
      ))}
    </>
  );
}

export default Teams;
