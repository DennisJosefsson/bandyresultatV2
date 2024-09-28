import { game } from './games'

export const newGame = game.omit({
  gameId: true,
  homeGoal: true,
  awayGoal: true,
})
