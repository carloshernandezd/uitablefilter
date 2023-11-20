import axios from 'axios'
import { Character } from '@/interface'

export const getCharacter = async (): Promise<Character[]> => {
  return axios
    .get('https://rickandmortyapi.com/api/character')
    .then((response) => response.data.results)
    .catch((error) => console.error(error.response))
}
