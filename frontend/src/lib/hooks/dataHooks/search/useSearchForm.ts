import { useGetTeams } from '../teams/useGetTeams'

import { getSearch } from '@/lib/requests/games'
import { useQuery } from '@tanstack/react-query'

import { SearchParamsObject } from '@/lib/types/games/search'
import { useState } from 'react'
import useGenderContext from '../../contextHooks/useGenderContext'

export const useGetSearchTeams = () => {
  const { womenContext } = useGenderContext()
  const { data, isLoading, error } = useGetTeams()

  const filteredTeams = data
    ? data
        .filter((team) => team.teamId !== 176)
        .filter((team) => team.women === womenContext)
    : []
  const filteredOpponents = data
    ? data
        .filter((team) => team.teamId !== 176)
        .filter((team) => team.women === womenContext)
    : []

  const teamSelection = filteredTeams.map((team) => {
    return { value: team.teamId, label: team.casualName }
  })

  const opponentSelection = filteredOpponents.map((team) => {
    return { value: team.teamId, label: team.casualName }
  })

  return { teamSelection, opponentSelection, isLoading, error }
}

export type ErrorState =
  | {
      error: true
      message: string
    }
  | { error: false }

type Team = {
  teamId: number
  name: string
  casualName: string
  shortName: string
}

export type SearchGame = {
  homeTeam: Team
  awayTeam: Team
  homeTeamId: number
  awayTeamId: number
  result: string
  date: string
  qualification: boolean
}

export const useSearchResults = () => {
  const [searchObject, setSearchObject] = useState<SearchParamsObject | null>(
    null
  )
  const { data: searchResult, isSuccess: isSearchResultSuccess } = useQuery({
    queryKey: ['search', searchObject],
    queryFn: () => getSearch(searchObject),
    enabled: !!searchObject,
    staleTime: 100,
  })

  const gameArray = isSearchResultSuccess
    ? searchResult?.searchResult
        ?.filter((game, index, array) => {
          const gameIndex = array.findIndex((b) => game.gameId === b.gameId)
          return index === gameIndex
        })
        .map((game) => {
          return {
            homeTeam: game.homeGame ? game.lag : game.opp,
            awayTeam: game.homeGame ? game.opp : game.lag,
            homeTeamId: game.homeGame ? game.team : game.opponent,
            awayTeamId: game.homeGame ? game.opponent : game.team,
            result: game.game.result,
            date: game.date,
            qualification: game.qualificationGame,
          }
        })
    : []

  // const baseUrl = import.meta.env.PROD
  //   ? 'https://bandyresultat.se'
  //   : 'http://localhost:5173'
  console.log('gameArray', gameArray)
  return { searchResult, gameArray, isSearchResultSuccess, setSearchObject }
}
