import CharactersList from '../components/CharactersList'

export default function Home() {
  return (
    <main>
      <h1 className="font-bold">Personagens dos filmes de Star Wars</h1>
      <div>
        <CharactersList />
      </div>
    </main>
  )
}