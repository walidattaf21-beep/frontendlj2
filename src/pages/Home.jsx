import MenuKaart from '../components/MenuKaart';

function Home() {
  return (
    <>
      <h2>Welkom</h2>
      <MenuKaart titel="Pokemon Lijst" tekst="Bekijk en zoek alle Pokemon" link="/list" />
      <MenuKaart titel="Mijn Teams" tekst="Teams maken en beheren" link="/teams" />
      <MenuKaart titel="Favorieten" tekst="Je opgeslagen Pokemon" link="/favorieten" />
    </>
  );
}

export default Home;
