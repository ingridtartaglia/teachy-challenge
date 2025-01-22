'use client'
import { useState, useEffect } from 'react'
import { Character } from '../types/character'

export function useCharacters() {
  const charactersApi = 'https://swapi.dev/api/people/'
  const [characters, setCharacters] = useState<Character[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasNextPage, setHasNextPage] = useState(true)

  const fetchFilmTitle = async (filmsApi: string) => {
    try {
      const resp = await fetch(filmsApi)
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

      const resp = await fetch(`${charactersApi}?page=${page}`)
      const data = await resp.json()
      const characters = await Promise.all(
        data.results.map(async (character: Character) => {
          const filmTitles = await Promise.all(
            character.films.map(filmUrl => fetchFilmTitle(filmUrl))
          )
          return { 
            ...character, filmTitles: filmTitles.join(', ')
          }
        })
      )

      setCharacters(page => [...page, ...characters])
      setHasNextPage(data.next !== null)
    } catch (error) {
      console.error('Erro ao buscar personagens: ', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCharacters()
  }, [page])

  const loadMore = () => {
    setPage(page => page + 1)
  }

  return { characters, loading, hasNextPage, loadMore }
}
