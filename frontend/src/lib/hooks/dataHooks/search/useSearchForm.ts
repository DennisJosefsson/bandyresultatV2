import {
  SearchParamsObject,
  searchParamsObject,
} from '@/lib/types/games/search'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useGetTeams } from '../teams/useGetTeams'

import { getSearch } from '@/lib/requests/games'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Dispatch, SetStateAction, useEffect } from 'react'

import { useSearch } from '@tanstack/react-router'
import useGenderContext from '../../contextHooks/useGenderContext'

export const defaultValues: SearchParamsObject = {
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
  const initValues = useSearch({ from: '/_layout/search' })
  const methods = useForm<SearchParamsObject>({
    defaultValues: initValues,
    criteriaMode: 'all',
    mode: 'onTouched',
    resolver: zodResolver(searchParamsObject),
  })

  return { methods }
}

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

  // const baseUrl = import.meta.env.PROD
  //   ? 'https://bandyresultat.se'
  //   : 'http://localhost:5173'

  return { searchResult, gameArray, isSearchResultSuccess }
}
