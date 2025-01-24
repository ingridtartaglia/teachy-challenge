import CharactersList from '../components/CharactersList'

export default function Home() {
  return (
    <main>
      <h1 className="pt-5 text-lg font-bold text-center">Personagens dos filmes de Star Wars</h1>
      <CharactersList />
    </main>
  )
}