import { z } from 'zod'
import Game from '../../../models/Game.js'
import Team from '../../../models/Team.js'
import TeamGame from '../../../models/TeamGame.js'

const parseNumber = z.coerce.number()
export const getTeamStats = async ({ teamId }: { teamId: number }) => {
  const maxScoredHome = await TeamGame.max('goalsScored', {
    where: { teamId, homeGame: true },
  }).then((res) => parseNumber.parse(res))

  const maxScoredHomeGames = await TeamGame.findAll({
    where: { goalsScored: maxScoredHome, teamId, homeGame: true },
    attributes: ['gameId', 'date'],
    order: [['date', 'desc']],
    include: [
      { model: Team, as: 'team', attributes: ['casualName'] },
      { model: Team, as: 'opponent', attributes: ['casualName'] },
      { model: Game, attributes: ['result'] },
    ],
  }).then((res) =>
    res.map((item) => {
      return {
        gameId: item.gameId,
        date: item.date,
        homeTeam: item.team.casualName,
        awayTeam: item.opponent.casualName,
        result: item.game.result,
      }
    })
  )

  const maxScoredAway = await TeamGame.max('goalsScored', {
    where: { teamId, homeGame: false },
  }).then((res) => parseNumber.parse(res))

  const maxScoredAwayGames = await TeamGame.findAll({
    where: { goalsScored: maxScoredAway, teamId, homeGame: false },
    attributes: ['gameId', 'date'],
    order: [['date', 'desc']],
    include: [
      { model: Team, as: 'team', attributes: ['casualName'] },
      { model: Team, as: 'opponent', attributes: ['casualName'] },
      { model: Game, attributes: ['result'] },
    ],
  }).then((res) =>
    res.map((item) => {
      return {
        gameId: item.gameId,
        date: item.date,
        homeTeam: item.opponent.casualName,
        awayTeam: item.team.casualName,
        result: item.game.result,
      }
    })
  )

  const maxGoalDifferenceHome = await TeamGame.max('goalDifference', {
    where: { teamId, homeGame: true },
  }).then((res) => parseNumber.parse(res))

  const maxGoalDifferenceHomeGames = await TeamGame.findAll({
    where: { goalDifference: maxGoalDifferenceHome, teamId, homeGame: true },
    attributes: ['gameId', 'date'],
    order: [['date', 'desc']],
    include: [
      { model: Team, as: 'team', attributes: ['casualName'] },
      { model: Team, as: 'opponent', attributes: ['casualName'] },
      { model: Game, attributes: ['result'] },
    ],
  }).then((res) =>
    res.map((item) => {
      return {
        gameId: item.gameId,
        date: item.date,
        homeTeam: item.team.casualName,
        awayTeam: item.opponent.casualName,
        result: item.game.result,
      }
    })
  )

  const maxGoalDifferenceAway = await TeamGame.max('goalDifference', {
    where: { teamId, homeGame: false },
  }).then((res) => parseNumber.parse(res))

  const maxGoalDifferenceAwayGames = await TeamGame.findAll({
    where: { goalDifference: maxGoalDifferenceAway, teamId, homeGame: false },
    attributes: ['gameId', 'date'],
    order: [['date', 'desc']],
    include: [
      { model: Team, as: 'team', attributes: ['casualName'] },
      { model: Team, as: 'opponent', attributes: ['casualName'] },
      { model: Game, attributes: ['result'] },
    ],
  }).then((res) =>
    res.map((item) => {
      return {
        gameId: item.gameId,
        date: item.date,
        homeTeam: item.opponent.casualName,
        awayTeam: item.team.casualName,
        result: item.game.result,
      }
    })
  )

  const minGoalDifferenceHome = await TeamGame.min('goalDifference', {
    where: { teamId, homeGame: true },
  }).then((res) => parseNumber.parse(res))

  const minGoalDifferenceHomeGames = await TeamGame.findAll({
    where: { goalDifference: minGoalDifferenceHome, teamId, homeGame: true },
    attributes: ['gameId', 'date'],
    order: [['date', 'desc']],
    include: [
      { model: Team, as: 'team', attributes: ['casualName'] },
      { model: Team, as: 'opponent', attributes: ['casualName'] },
      { model: Game, attributes: ['result'] },
    ],
  }).then((res) =>
    res.map((item) => {
      return {
        gameId: item.gameId,
        date: item.date,
        homeTeam: item.team.casualName,
        awayTeam: item.opponent.casualName,
        result: item.game.result,
      }
    })
  )

  const minGoalDifferenceAway = await TeamGame.min('goalDifference', {
    where: { teamId, homeGame: false },
  }).then((res) => parseNumber.parse(res))

  const minGoalDifferenceAwayGames = await TeamGame.findAll({
    where: { goalDifference: minGoalDifferenceAway, teamId, homeGame: false },
    attributes: ['gameId', 'date'],
    order: [['date', 'desc']],
    include: [
      { model: Team, as: 'team', attributes: ['casualName'] },
      { model: Team, as: 'opponent', attributes: ['casualName'] },
      { model: Game, attributes: ['result'] },
    ],
  }).then((res) =>
    res.map((item) => {
      return {
        gameId: item.gameId,
        date: item.date,
        homeTeam: item.opponent.casualName,
        awayTeam: item.team.casualName,
        result: item.game.result,
      }
    })
  )

  const maxConcededHome = await TeamGame.max('goalsConceded', {
    where: { teamId, homeGame: true },
  }).then((res) => parseNumber.parse(res))

  const maxConcededHomeGames = await TeamGame.findAll({
    where: { goalsConceded: maxConcededHome, teamId, homeGame: true },
    attributes: ['gameId', 'date'],
    order: [['date', 'desc']],
    include: [
      { model: Team, as: 'team', attributes: ['casualName'] },
      { model: Team, as: 'opponent', attributes: ['casualName'] },
      { model: Game, attributes: ['result'] },
    ],
  }).then((res) =>
    res.map((item) => {
      return {
        gameId: item.gameId,
        date: item.date,
        homeTeam: item.team.casualName,
        awayTeam: item.opponent.casualName,
        result: item.game.result,
      }
    })
  )

  const maxConcededAway = await TeamGame.max('goalsConceded', {
    where: { teamId, homeGame: false },
  }).then((res) => parseNumber.parse(res))

  const maxConcededAwayGames = await TeamGame.findAll({
    where: { goalsConceded: maxConcededAway, teamId, homeGame: false },
    attributes: ['gameId', 'date'],
    order: [['date', 'desc']],
    include: [
      { model: Team, as: 'team', attributes: ['casualName'] },
      { model: Team, as: 'opponent', attributes: ['casualName'] },
      { model: Game, attributes: ['result'] },
    ],
  }).then((res) =>
    res.map((item) => {
      return {
        gameId: item.gameId,
        date: item.date,
        homeTeam: item.opponent.casualName,
        awayTeam: item.team.casualName,
        result: item.game.result,
      }
    })
  )

  const maxTotalHome = await TeamGame.max('totalGoals', {
    where: { teamId, homeGame: true },
  }).then((res) => parseNumber.parse(res))

  const maxTotalHomeGames = await TeamGame.findAll({
    where: { totalGoals: maxTotalHome, teamId, homeGame: true },
    attributes: ['gameId', 'date'],
    order: [['date', 'desc']],
    include: [
      { model: Team, as: 'team', attributes: ['casualName'] },
      { model: Team, as: 'opponent', attributes: ['casualName'] },
      { model: Game, attributes: ['result'] },
    ],
  }).then((res) =>
    res.map((item) => {
      return {
        gameId: item.gameId,
        date: item.date,
        homeTeam: item.team.casualName,
        awayTeam: item.opponent.casualName,
        result: item.game.result,
      }
    })
  )

  const maxTotalAway = await TeamGame.max('totalGoals', {
    where: { teamId, homeGame: false },
  }).then((res) => parseNumber.parse(res))

  const maxTotalAwayGames = await TeamGame.findAll({
    where: { totalGoals: maxTotalAway, teamId, homeGame: false },
    attributes: ['gameId', 'date'],
    order: [['date', 'desc']],
    include: [
      { model: Team, as: 'team', attributes: ['casualName'] },
      { model: Team, as: 'opponent', attributes: ['casualName'] },
      { model: Game, attributes: ['result'] },
    ],
  }).then((res) =>
    res.map((item) => {
      return {
        gameId: item.gameId,
        date: item.date,
        homeTeam: item.opponent.casualName,
        awayTeam: item.team.casualName,
        result: item.game.result,
      }
    })
  )

  const minTotalHome = await TeamGame.min('totalGoals', {
    where: { teamId, homeGame: true, played: true },
  }).then((res) => parseNumber.parse(res))

  const minTotalHomeGames = await TeamGame.findAll({
    where: { totalGoals: minTotalHome, teamId, homeGame: true, played: true },
    attributes: ['gameId', 'date'],
    order: [['date', 'desc']],
    include: [
      { model: Team, as: 'team', attributes: ['casualName'] },
      { model: Team, as: 'opponent', attributes: ['casualName'] },
      { model: Game, attributes: ['result'] },
    ],
  }).then((res) =>
    res.map((item) => {
      return {
        gameId: item.gameId,
        date: item.date,
        homeTeam: item.team.casualName,
        awayTeam: item.opponent.casualName,
        result: item.game.result,
      }
    })
  )

  const minTotalAway = await TeamGame.min('totalGoals', {
    where: { teamId, homeGame: false, played: true },
  }).then((res) => parseNumber.parse(res))

  const minTotalAwayGames = await TeamGame.findAll({
    where: { totalGoals: minTotalAway, teamId, homeGame: false, played: true },
    attributes: ['gameId', 'date'],
    order: [['date', 'desc']],
    include: [
      { model: Team, as: 'team', attributes: ['casualName'] },
      { model: Team, as: 'opponent', attributes: ['casualName'] },
      { model: Game, attributes: ['result'] },
    ],
  }).then((res) =>
    res.map((item) => {
      return {
        gameId: item.gameId,
        date: item.date,
        homeTeam: item.opponent.casualName,
        awayTeam: item.team.casualName,
        result: item.game.result,
      }
    })
  )

  return {
    maxScoredHomeGames,
    maxScoredAwayGames,
    maxGoalDifferenceHomeGames,
    maxGoalDifferenceAwayGames,
    minGoalDifferenceHomeGames,
    minGoalDifferenceAwayGames,
    maxConcededHomeGames,
    maxConcededAwayGames,
    maxTotalHomeGames,
    maxTotalAwayGames,
    minTotalHomeGames,
    minTotalAwayGames,
  }
}
