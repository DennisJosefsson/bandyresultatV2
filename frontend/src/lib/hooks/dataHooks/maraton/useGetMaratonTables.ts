import { useSuspenseQuery } from '@tanstack/react-query'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { maratonQueries } from '@/lib/queries/maraton/queries'
import useGenderContext from '../../contextHooks/useGenderContext'

type Title = {
  [key: string]: string
}

const titles: Title = { all: '', home: 'Hemma', away: 'Borta' }
const fields = ['all', 'home', 'away']

export const useGetMaratonTables = () => {
  const navigate = useNavigate()
  const { table, women } = useSearch({ from: '/_layout/maraton' })
  const { women: currentWomen, dispatch } = useGenderContext()
  const [homeAwayTitle, setHomeAwayTitle] = useState(
    table && fields.includes(table) ? titles[table] : ''
  )

  const { data, isLoading, error } = useSuspenseQuery(
    maratonQueries['maraton']()
  )

  useEffect(() => {
    if (currentWomen !== women) {
      dispatch({ type: 'SET', payload: women })
      navigate({ search: (prev) => ({ ...prev, women: women }) })
    }
  }, [women, currentWomen, dispatch, navigate])

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
  }
}
