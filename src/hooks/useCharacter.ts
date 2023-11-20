import { useQuery } from '@tanstack/react-query'
import { getCharacter } from '@/api/character'

export const useGetCharacter = () => {
  return useQuery({
    queryKey: ['character'],
    queryFn: getCharacter,
  })
}
