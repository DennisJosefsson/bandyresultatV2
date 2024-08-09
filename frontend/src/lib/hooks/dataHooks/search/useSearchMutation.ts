import { getSearch } from '@/lib/requests/games'
import { useMutation } from '@tanstack/react-query'

const useSearchMutation = () => {
  const { data, mutate } = useMutation({
    mutationFn: getSearch,
  })

  return { data, mutate }
}

export default useSearchMutation
