'use client'
import { useCharacters } from '../hooks/useCharacters'
import { formatHeight } from '../utils/utils'

const CharactersList = () => {
  const { characters, loading, hasNextPage, loadMore } = useCharacters()

	return (
		<div className="p-5">
      { characters.length > 0 &&
        <div className="overflow-hidden rounded-md">
          <table className="w-full table-fixed border border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-left bg-gray-100">Nome</th>
                <th className="border px-4 py-2 text-left bg-gray-100">Altura</th>
                <th className="border px-4 py-2 text-left bg-gray-100">Nº de espaçonaves</th>
                <th className="border px-4 py-2 text-left bg-gray-100">Filmes</th>
              </tr>
            </thead>
            <tbody>
              {characters.map((character, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{character.name}</td>
                  <td className="border px-4 py-2">{formatHeight(character.height)}</td>
                  <td className="border px-4 py-2">{character.starships.length}</td>
                  <td className="border px-4 py-2">{character.filmTitles}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
      { loading && 
        <div className="py-5">
          <p className="text-center">Carregando...</p>
        </div>
      }   
      { hasNextPage && characters.length > 0 && !loading && 
        <div className="py-5 flex justify-center">
           <button 
            className="px-4 py-2 bg-green-500 text-white rounded-md"
            onClick={loadMore}>
            Carregar mais
          </button>
        </div>
      }
    </div>
	)
}

export default CharactersList;
