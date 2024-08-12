import { getSearch } from '@/lib/requests/games'
import { useMutation } from '@tanstack/react-query'

const useSearchMutation = () => {
  const { data, mutate, isSuccess, error, isError } = useMutation({
    mutationFn: getSearch,
  })

  return { data, mutate, isSuccess, error, isError }
}

export default useSearchMutation
