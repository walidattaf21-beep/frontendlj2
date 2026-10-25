import { useState, useEffect } from 'react';
import PokemonCard from '../components/PokemonCard';

const types = ['fire', 'water', 'grass', 'electric', 'bug', 'normal', 'poison', 'ground', 'psychic', 'rock', 'ghost', 'dragon'];

function List({ favorieten, toggleFavoriet }) {
  const [pokemons, setPokemons] = useState([]);
  const [zoekterm, setZoekterm] = useState('');
  const [type, setType] = useState('');
  const [namenVanType, setNamenVanType] = useState([]);
  const [sorteerOpNaam, setSorteerOpNaam] = useState(false);

  // Alle Pokemon ophalen
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then((res) => res.json())
      .then((data) => setPokemons(data.results));
  }, []);

  // Als je een type kiest: ophalen welke Pokemon dat type hebben
  useEffect(() => {
    if (type === '') return;
    fetch(`https://pokeapi.co/api/v2/type/${type}`)
      .then((res) => res.json())
      .then((data) => setNamenVanType(data.pokemon.map((p) => p.pokemon.name)));
  }, [type]);

  // Zoeken
  let lijst = pokemons.filter((p) => p.name.includes(zoekterm.toLowerCase()));

  // Filteren op type
  if (type !== '') {
    lijst = lijst.filter((p) => namenVanType.includes(p.name));
  }

  // Sorteren op naam
  if (sorteerOpNaam) {
    lijst = [...lijst].sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <>
      <h2>Pokemon Lijst</h2>

      <input placeholder="Zoek een Pokemon..." value={zoekterm} onChange={(e) => setZoekterm(e.target.value)} />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">Alle types</option>
        {types.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      <label>
        <input type="checkbox" checked={sorteerOpNaam} onChange={() => setSorteerOpNaam(!sorteerOpNaam)} />
        Sorteer op naam
      </label>

      {lijst.map((p) => {
        // id staat in de url: .../pokemon/25/ -> 25
        const id = p.url.split('/')[6];
        const isFav = favorieten.some((f) => f.id === id);
        return (
          <PokemonCard
            key={id}
            id={id}
            name={p.name}
            knop={isFav ? '★' : '☆'}
            onKlik={() => toggleFavoriet({ id: id, name: p.name })}
          />
        );
      })}
    </>
  );
}

export default List;
