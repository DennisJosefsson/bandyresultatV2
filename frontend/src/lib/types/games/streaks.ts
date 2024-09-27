import { z } from 'zod'

const seasons = z.object({
  seasons: z.number(),
  team: z.number(),
  casual_name: z.string(),
})

const playoffs = z.object({
  playoffs: z.number(),
  team: z.number(),
  casual_name: z.string(),
})

export const generalStatsResponse = z.object({
  golds: z.array(
    z.object({ guld: z.number(), team: z.number(), casual_name: z.string() })
  ),
  finals: z.array(
    z.object({ finals: z.number(), team: z.number(), casual_name: z.string() })
  ),
  seasons: z.array(seasons),
  allSeasons: z.array(seasons),
  playoffs: z.array(playoffs),
  allPlayoffs: z.array(playoffs),
})

export const streak = z.object({
  team: z.number(),
  name: z.string(),
  game_count: z.number(),
  start_date: z.string(),
  end_date: z.string(),
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
        team: z.number(),
        lag: z.object({
          name: z.string(),
          casulName: z.string(),
          shortName: z.string(),
        }),
        opponent: z.number(),
        opp: z.object({
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
  team: z.number(),
  lag: z.object({
    name: z.string(),
    casulName: z.string(),
    shortName: z.string(),
  }),
  data: z.number(),
  season: z.object({
    seasonId: z.number(),
    year: z.string(),
  }),
})

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
})

export const streakReturn = generalStatsResponse
  .and(streakResponse)
  .and(pointsGoalsResponse)

export const streakParams = z.object({ record: z.string(), women: z.boolean() })
