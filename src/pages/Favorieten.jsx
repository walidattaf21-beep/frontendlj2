import PokemonCard from '../components/PokemonCard';

function Favorieten({ favorieten, toggleFavoriet }) {
  return (
    <>
      <h2>Favorieten</h2>
      {favorieten.length === 0 && <p>Nog geen favorieten.</p>}

      {favorieten.map((p) => (
        <PokemonCard key={p.id} id={p.id} name={p.name} knop="★" onKlik={() => toggleFavoriet(p)} />
      ))}
    </>
  );
}

export default Favorieten;
