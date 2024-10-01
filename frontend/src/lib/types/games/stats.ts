import { z } from 'zod'

const countCat = z.object({
  year: z.string(),
  season_id: z.number(),
  count: z.number(),
  category: z.string(),
})

const goalsCat = z.object({
  data: z.number(),
  category: z.string(),
  season: z.object({
    seasonId: z.number(),
    year: z.string(),
  }),
})

const singleGoals = goalsCat.omit({ category: true })

const streak = z.object({
  team: z.number(),
  casual_name: z.string(),
  game_count: z.number(),
  start_date: z.string(),
  end_date: z.string(),
})

const maxMinGoals = z.object({
  home_name: z.string(),
  away_name: z.string(),
  resultat: z.string(),
  datum: z.string(),
  sum_goals: z.number(),
})

export const statsObject = z.object({
  gamesCountTotal: z.number(),
  gamesCountTotalCat: z.array(countCat),
  winCountHomeTeam: z.number(),
  winCountAwayTeam: z.number(),
  drawCount: z.number(),
  winCountHomeTeamCat: z.array(countCat),
  winCountAwayTeamCat: z.array(countCat),
  drawCountCat: z.array(countCat),
  goalsScoredTotal: singleGoals,
  goalsScoredTotalCat: z.array(goalsCat),
  goalsScoredAverage: singleGoals,
  goalsScoredAverageCat: z.array(goalsCat),
  goalsScoredHomeTotal: singleGoals,
  goalsScoredAwayTotal: singleGoals,
  goalsScoredHomeTotalCat: z.array(goalsCat),
  goalsScoredAwayTotalCat: z.array(goalsCat),
  goalsScoredHomeAverage: singleGoals,
  goalsScoredAwayAverage: singleGoals,
  goalsScoredHomeAverageCat: z.array(goalsCat),
  goalsScoredAwayAverageCat: z.array(goalsCat),
  unbeatenStreak: z.array(streak),
  winStreak: z.array(streak),
  drawStreak: z.array(streak),
  noWinStreak: z.array(streak),
  losingStreak: z.array(streak),
  maxGoals: z.array(maxMinGoals),
  minGoals: z.array(maxMinGoals),
  maxDiff: z.array(
    z.object({
      home_name: z.string(),
      away_name: z.string(),
      resultat: z.string(),
      datum: z.string(),
      goal_difference: z.number(),
    })
  ),
})
