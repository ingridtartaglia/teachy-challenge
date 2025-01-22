export interface CharactersListProps {
	characters: Character[]
}

export interface Character {
	name: string
	height: string
	starships: string
	films: string[]
  filmTitles?: string
} 
