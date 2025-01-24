'use client'
import { useCharacters } from '../hooks/useCharacters'
import { formatHeight } from '../utils/utils'

const CharactersList = () => {
  const { characters, isLoading, hasNextPage, loadMore } = useCharacters()

	return (
		<div className="p-5">
      { characters.length > 0 &&
        <div className="overflow-hidden rounded-md">
          <table className="w-full table-fixed border border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-left bg-gray-100">Nome</th>
                <th className="border px-4 py-2 text-left bg-gray-100">Altura</th>
                <th className="border px-4 py-2 text-left bg-gray-100">
                  <span className="hidden sm:block">Nº de espaçonaves</span>
                  <span className="sm:hidden">Nº de naves</span>
                </th>
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
      { isLoading && 
        <div className="py-5 flex justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-8 w-8 mr-3"></div>
        </div>
      }   
      { hasNextPage && characters.length > 0 && !isLoading && 
        <div className="py-5 flex justify-center">
           <button 
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
            onClick={loadMore}>
            Carregar mais
          </button>
        </div>
      }
    </div>
	)
}

export default CharactersList;
