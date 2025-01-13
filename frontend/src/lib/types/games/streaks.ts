import { z } from 'zod'

const statsItem = z.object({
  teamId: z.number(),
  casualName: z.string(),
  count: z.number(),
  position: z.number(),
})

export const generalStatsResponse = z.object({
  golds: z.array(statsItem),
  finals: z.array(statsItem),
  seasons: z.array(statsItem),
  allSeasons: z.array(statsItem),
  playoffs: z.array(statsItem),
  allPlayoffs: z.array(statsItem),
})

export const streak = z.object({
  team: z.number(),
  name: z.string(),
  gameCount: z.number(),
  startDate: z.string(),
  endDate: z.string(),
  position: z.number(),
})

export const streakResponse = z.object({
  losingStreak: z.array(streak),
  drawStreak: z.array(streak),
  winStreak: z.array(streak),
  noWinStreak: z.array(streak),
  unbeatenStreak: z.array(streak),
  currInoffChamps: z.object({
    count: z.number(),
    rows: z.array(
      z.object({
        teamId: z.number(),
        team: z.object({
          name: z.string(),
          casulName: z.string(),
          shortName: z.string(),
        }),
        opponentId: z.number(),
        opponent: z.object({
          name: z.string(),
          casulName: z.string(),
          shortName: z.string(),
        }),
        date: z.string(),
        goalsScored: z.number(),
        goalsConceded: z.number(),
      })
    ),
  }),
})

const pointsGoals = z.object({
  year: z.string(),
  name: z.string(),
  data: z.number(),
  position: z.number(),
})

const maxMinGoals = z.object({
  teams: z.string(),
  result: z.string(),
  goals: z.number(),
  position: z.number(),
  date: z.string(),
})

const count = z
  .object({
    maxGoalCount: z.number(),
    lastMaxGoal: z.number(),
    minGoalCount: z.number(),
    lastMinGoal: z.number(),
  })
  .optional()

export const pointsGoalsResponse = z.object({
  avgMaxAll: z.array(pointsGoals),
  avgMaxHome: z.array(pointsGoals),
  avgMaxAway: z.array(pointsGoals),
  avgMinAll: z.array(pointsGoals),
  avgMinHome: z.array(pointsGoals),
  avgMinAway: z.array(pointsGoals),
  sumMaxAll: z.array(pointsGoals),
  sumMaxHome: z.array(pointsGoals),
  sumMaxAway: z.array(pointsGoals),
  sumMinAll: z.array(pointsGoals),
  sumMinHome: z.array(pointsGoals),
  sumMinAway: z.array(pointsGoals),
  gamesMaxGoals: z.array(maxMinGoals).optional(),
  gamesMinGoals: z.array(maxMinGoals).optional(),
  count,
})

export const streakReturn = generalStatsResponse
  .and(streakResponse)
  .and(pointsGoalsResponse)

export const streakParams = z.object({
  record: z.string(),
  women: z.boolean(),
})
