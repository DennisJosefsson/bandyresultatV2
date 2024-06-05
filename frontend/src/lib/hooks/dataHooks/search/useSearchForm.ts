import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  SearchParamsObject,
  searchParamsObject,
} from '@/lib/types/games/search'
import { useGetTeams } from '../teams/useGetTeams'

import { Dispatch, SetStateAction, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { getSearch } from '@/lib/requests/games'

import useGenderContext from '../../contextHooks/useGenderContext'

export const initValues: SearchParamsObject = {
  categoryArray: [
    'final',
    'semi',
    'quarter',
    'eight',
    'regular',
    'qualification',
  ],
  order: 'desc',
  limit: '10',
  result: '',
  gameResult: 'all',
  goalsScored: '',
  goalsScoredOperator: 'gte',
  goalsConceded: '',
  goalsConcededOperator: 'gte',
  goalDiff: '',
  goalDiffOperator: 'gte',
  startSeason: '1907',
  endSeason: '2024',
  team: '',
  opponent: '',
  inputDate: '',
  selectedGender: 'all',
  homeGame: 'both',
  orderVar: 'date',
}

export const useSearchForm = () => {
  const methods = useForm<SearchParamsObject>({
    defaultValues: initValues,
    criteriaMode: 'all',
    mode: 'onTouched',
    resolver: zodResolver(searchParamsObject),
  })

  return methods
}

export const useGetSearchTeams = () => {
  const { women } = useGenderContext()
  const { data, isLoading, error } = useGetTeams()

  const filteredTeams = data
    ? data
        .filter((team) => team.teamId !== 176)
        .filter((team) => team.women === women)
    : []
  const filteredOpponents = data
    ? data
        .filter((team) => team.teamId !== 176)
        .filter((team) => team.women === women)
    : []

  const teamSelection = filteredTeams.map((team) => {
    return { value: team.teamId, label: team.casualName }
  })

  const opponentSelection = filteredOpponents.map((team) => {
    return { value: team.teamId, label: team.casualName }
  })

  return { teamSelection, opponentSelection, isLoading, error }
}

type ErrorState =
  | {
      error: true
      message: string
    }
  | { error: false }

export const useSearchResults = (
  searchParams: SearchParamsObject | null,
  setError: Dispatch<SetStateAction<ErrorState>>
) => {
  const {
    data: searchResult,
    error: searchResultError,
    isSuccess: isSearchResultSuccess,
  } = useQuery({
    queryKey: ['search', searchParams],
    queryFn: () => getSearch(searchParams),
    enabled: !!searchParams,
  })

  useEffect(() => {
    if (
      searchResultError &&
      searchResultError instanceof AxiosError &&
      searchResultError.response
    ) {
      setError({ error: true, message: searchResultError.response.data.errors })
      setTimeout(() => {
        setError({ error: false })
      }, 5000)
    }
  }, [searchResultError, setError])

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

  const baseUrl = import.meta.env.PROD
    ? 'https://bandyresultat.se'
    : 'http://localhost:5173'
  const searchLink = `${baseUrl}/search?link=${searchResult?.searchLink[0].linkName}`

  return { searchResult, gameArray, searchLink, isSearchResultSuccess }
}
