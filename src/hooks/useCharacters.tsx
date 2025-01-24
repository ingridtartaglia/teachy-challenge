'use client'
import { useState, useEffect } from 'react'
import { Character } from '../types/character'

export function useCharacters() {
  const charactersApi = 'https://swapi.dev/api/people/'
  const [characters, setCharacters] = useState<Character[]>([])
  const [currentPage, setPage] = useState(1)
  const [isLoading, setLoading] = useState(false)
  const [hasNextPage, setHasNextPage] = useState(true)

  const fetchFilmTitle = async (filmApi: string) => {
    try {
      const resp = await fetch(filmApi)
      const data = await resp.json()
      return data.title
    } catch (error) {
      console.error('Erro ao buscar título do filme: ', error)
      return null
    }
  }

  const fetchCharacters = async () => {
    try {
      setLoading(true)

      const resp = await fetch(`${charactersApi}?page=${currentPage}`)
      const data = await resp.json()
      const fetchedCharacters = await Promise.all(
        data.results.map(async (character: Character) => {
          const filmTitles = await Promise.all(
            character.films.map(filmApi => fetchFilmTitle(filmApi))
          )
          return { 
            ...character, filmTitles: filmTitles.join(', ')
          }
        })
      )

      setCharacters(prevCharacters => [...prevCharacters, ...fetchedCharacters])
      
      setHasNextPage(data.next !== null)
    } catch (error) {
      console.error('Erro ao buscar personagens: ', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCharacters()
  }, [currentPage])

  const loadMore = () => {
    setPage(page => page + 1)
  }

  return { characters, isLoading, hasNextPage, loadMore }
}
