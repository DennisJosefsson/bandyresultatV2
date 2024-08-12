import { useGetTeams } from '../teams/useGetTeams'

import { useNavigate, useSearch } from '@tanstack/react-router'
import { useEffect } from 'react'
import useGenderContext from '../../contextHooks/useGenderContext'
import useSearchMutation from './useSearchMutation'

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
  const searchParams = useSearch({ from: '/_layout/search' })
  const navigate = useNavigate({ from: '/search' })
  const {
    data: searchResult,
    isSuccess: isSearchResultSuccess,
    mutate,
    error,
    isError,
  } = useSearchMutation()

  useEffect(() => {
    if (searchParams.submit) {
      mutate(searchParams)
    }
    navigate({ search: (prev) => ({ ...prev, submit: undefined }) })
  }, [searchParams, mutate, navigate])

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

  return {
    searchResult,
    gameArray,
    isSearchResultSuccess,
    mutate,
    error,
    isError,
  }
}
