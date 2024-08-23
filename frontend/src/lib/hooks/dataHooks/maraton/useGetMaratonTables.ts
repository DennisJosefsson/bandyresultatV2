import { maratonQueries } from '@/lib/queries/maraton/queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
import { useState } from 'react'

type Title = {
  [key: string]: string
}

const titles: Title = { all: '', home: 'Hemma', away: 'Borta' }
const fields = ['all', 'home', 'away']

export const useGetMaratonTables = () => {
  const { table, women } = useSearch({ from: '/_layout/maraton/' })

  const [homeAwayTitle, setHomeAwayTitle] = useState(
    table && fields.includes(table) ? titles[table] : ''
  )

  const { data, isLoading, error, isPending } = useSuspenseQuery(
    maratonQueries['maraton']()
  )

  let tabell
  switch (table) {
    case 'all':
      tabell = data.maratonTabell.filter((item) => item.women === women)
      break
    case 'home':
      tabell = data.maratonHemmaTabell.filter((item) => item.women === women)
      break
    case 'away':
      tabell = data.maratonBortaTabell.filter((item) => item.women === women)
      break
    default:
      tabell = data.maratonTabell.filter((item) => item.women === women)
  }

  return {
    tabell,
    table,
    homeAwayTitle,
    setHomeAwayTitle,
    error,
    isLoading,
    isPending,
  }
}
