import { useLoaderData } from '@tanstack/react-router'

export const useGetMaratonTables = () => {
  const data = useLoaderData({ from: '/_layout/maraton/table/$table' })

  return {
    data,
  }
}
