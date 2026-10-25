import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './pages/Home'
import List from './pages/List'
import Detail from './pages/Detail'
import Teams from './pages/Teams'
import Favorieten from './pages/Favorieten'
import './App.css'

function App() {
  // Data ophalen uit localStorage, of een lege lijst als er nog niks is
  const [favorieten, setFavorieten] = useState(JSON.parse(localStorage.getItem('favorieten')) || [])
  const [teams, setTeams] = useState(JSON.parse(localStorage.getItem('teams')) || [])

  // Opslaan in localStorage als er iets verandert
  useEffect(() => {
    localStorage.setItem('favorieten', JSON.stringify(favorieten))
    localStorage.setItem('teams', JSON.stringify(teams))
  }, [favorieten, teams])

  // Favoriet aan of uit zetten
  function toggleFavoriet(pokemon) {
    if (favorieten.some((f) => f.id === pokemon.id)) {
      setFavorieten(favorieten.filter((f) => f.id !== pokemon.id))
    } else {
      setFavorieten([...favorieten, pokemon])
    }
  }

  // Create: nieuw team
  function maakTeam(naam) {
    setTeams([...teams, { id: Date.now(), naam: naam, pokemons: [] }])
  }

  // Update: team hernoemen
  function hernoemTeam(teamId, naam) {
    setTeams(teams.map((t) => (t.id === teamId ? { ...t, naam: naam } : t)))
  }

  // Delete: team verwijderen
  function verwijderTeam(teamId) {
    setTeams(teams.filter((t) => t.id !== teamId))
  }

  // Pokemon aan team toevoegen (max 6)
  function voegToeAanTeam(teamId, pokemon) {
    const team = teams.find((t) => t.id === teamId)
    if (team.pokemons.length >= 6) {
      alert('Dit team is vol (max 6)')
      return
    }
    setTeams(teams.map((t) => (t.id === teamId ? { ...t, pokemons: [...t.pokemons, pokemon] } : t)))
  }

  // Pokemon uit team halen
  function verwijderUitTeam(teamId, index) {
    setTeams(teams.map((t) => (t.id === teamId ? { ...t, pokemons: t.pokemons.filter((p, i) => i !== index) } : t)))
  }

  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List favorieten={favorieten} toggleFavoriet={toggleFavoriet} />} />
          <Route path="/pokemon/:name" element={<Detail teams={teams} voegToeAanTeam={voegToeAanTeam} toggleFavoriet={toggleFavoriet} />} />
          <Route path="/teams" element={<Teams teams={teams} maakTeam={maakTeam} hernoemTeam={hernoemTeam} verwijderTeam={verwijderTeam} verwijderUitTeam={verwijderUitTeam} />} />
          <Route path="/favorieten" element={<Favorieten favorieten={favorieten} toggleFavoriet={toggleFavoriet} />} />
        </Routes>
      </main>
      <Navigation />
      <Footer />
    </BrowserRouter>
  )
}

export default App
