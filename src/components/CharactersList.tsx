'use client'
import { useCharacters } from '../hooks/useCharacters'
import { formatHeight } from '../utils/utils'

const CharactersList = () => {
  const { characters, loading, hasNextPage, loadMore } = useCharacters()

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>Nome</th>
						<th>Altura</th>
						<th>Nº de espaçonaves</th>
						<th>Filmes</th>
					</tr>
				</thead>
				<tbody>
					{characters.map((character, index) => (
						<tr key={index} className="text-black">
							<td>{character.name}</td>
							<td>{formatHeight(character.height)}</td>
							<td>{character.starships.length}</td>
							<td>{character.filmTitles}</td>
						</tr>
					))}
				</tbody>
			</table>
      { loading && <p className="text-center">Carregando...</p> }   
      { hasNextPage && !loading && 
        (<button 
          onClick={loadMore}>
          Carregar mais
        </button>)
      }
    </div>
	)
}

export default CharactersList;
