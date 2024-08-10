import { getSearch } from '@/lib/requests/games'
import { useMutation } from '@tanstack/react-query'

const useSearchMutation = () => {
  const { data, mutate, isSuccess } = useMutation({
    mutationFn: getSearch,
  })

  return { data, mutate, isSuccess }
}

export default useSearchMutation
