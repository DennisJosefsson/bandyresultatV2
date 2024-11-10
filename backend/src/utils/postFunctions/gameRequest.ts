import { z } from 'zod'
import Season from '../../models/Season'

export const streakRequest = z.object({
  record: z.enum(['streaks', 'points', 'scored', 'conceded', 'generalStats']),
  women: z.enum(['true', 'false']),
})

export const parseGeneralStats = z
  .array(
    z.object({
      team: z.number(),
      casual_name: z.string(),
      data_count: z.coerce.number(),
    })
  )
  .transform((res) =>
    res.map((item, index) => {
      return {
        teamId: item.team,
        casualName: item.casual_name,
        count: item.data_count,
        position: index + 1,
      }
    })
  )

export const parseDataStats = z
  .array(
    z.object({
      team: z.object({ name: z.string() }),
      season: z.object({ year: z.string() }),
      data: z.coerce.number(),
    })
  )
  .transform((res) =>
    res.map((item, index) => {
      return {
        year: item.season.year,
        name: item.team.name,
        data: item.data,
        position: index + 1,
      }
    })
  )

export const parseStreak = z
  .array(
    z.object({
      team: z.number(),
      name: z.string(),
      game_count: z.number(),
      start_date: z.string(),
      end_date: z.string(),
    })
  )
  .transform((res) =>
    res.map((item, index) => {
      return {
        teamId: item.team,
        name: item.name,
        gameCount: item.game_count,
        startDate: item.start_date,
        endDate: item.end_date,
        position: index + 1,
      }
    })
  )

export const parseSearchRequest = (
  object: unknown,
  maxSeason: Season | null
) => {
  if (!maxSeason) {
    throw new Error('Missing season')
  }

  const maxYear = maxSeason.year.split('/')[1]

  const searchRequest = z
    .object({
      categoryArray: z
        .array(
          z.enum([
            'final',
            'semi',
            'quarter',
            'eight',
            'regular',
            'qualification',
          ])
        )
        .min(1, { message: 'Måste ange minst en matchkategori.' })
        .max(6)
        .catch([
          'final',
          'semi',
          'quarter',
          'eight',
          'regular',
          'qualification',
        ]),
      order: z.enum(['asc', 'desc']).catch('desc'),
      limit: z.coerce.number().max(100).catch(10),
      result: z
        .string()
        .regex(/^\d{1,2}-\d{1,2}$/, { message: 'Felaktigt resultatformat' })
        .optional()
        .nullable()
        .or(z.literal('')),
      gameResult: z.enum(['win', 'lost', 'draw', 'all']).catch('all'),
      goalsScored: z.coerce
        .number({ message: 'Gjorda mål måste vara en siffra.' })
        .int({ message: 'Gjorda mål måste vara ett heltal.' })
        .nonnegative({
          message: 'Gjorda mål måste vara 0 eller större än 0.',
        })
        .optional(),
      goalsScoredOperator: z.enum(['eq', 'lte', 'gte']).catch('gte'),
      goalsConceded: z.coerce
        .number({ message: 'Insläppta mål måste vara en siffra.' })
        .int({ message: 'Insläppta mål måste vara ett heltal.' })
        .nonnegative({
          message: 'Insläppta mål måste vara 0 eller större än 0.',
        })
        .optional(),
      goalsConcededOperator: z.enum(['eq', 'lte', 'gte']).catch('lte'),
      goalDiff: z.coerce
        .number({ message: 'Målskillnaden måste vara en siffra.' })
        .int({ message: 'Målskillnaden måste vara ett heltal.' })
        .nonnegative({
          message: 'Målskillnaden måste vara 0 eller större än 0.',
        })
        .optional(),
      goalDiffOperator: z.enum(['eq', 'lte', 'gte']).catch('gte'),
      startSeason: z
        .string()
        .regex(/^\d{4}$/, { message: 'Fel format, första år' })
        .refine(
          (arg) => {
            if (Number(arg) < 1907) return false
            return true
          },
          {
            message: 'Första året kan inte vara före 1907',
          }
        )
        .refine(
          (arg) => {
            if (Number(arg) > parseInt(maxYear)) return false
            return true
          },
          {
            message: `Första året kan inte vara efter ${maxYear}`,
          }
        )
        .catch('1907'),
      endSeason: z
        .string()
        .regex(/^\d{4}$/, { message: 'Fel format, sista år' })
        .refine(
          (arg) => {
            if (Number(arg) < 1907) return false
            return true
          },
          {
            message: 'Sista året kan inte vara före 1907',
          }
        )
        .refine(
          (arg) => {
            if (Number(arg) > parseInt(maxYear)) return false
            return true
          },
          {
            message: `Sista året kan inte vara efter ${maxYear}`,
          }
        )
        .catch(maxYear),
      teamId: z.number().optional(),
      opponentId: z.number().optional(),
      inputDate: z
        .string()
        .regex(/^\d{1,2}\/\d{1,2}/, { message: 'Fel datum, sökning' })
        .refine(
          (arg) => {
            const dateArgs = arg.split('/')
            if (
              Number(dateArgs[0]) > 31 ||
              Number(dateArgs[0]) === 0 ||
              Number(dateArgs[1]) > 12 ||
              Number(dateArgs[1]) === 0
            )
              return false
            return true
          },
          { message: 'Fel datumformat' }
        )
        .optional()
        .nullable()
        .or(z.literal('')),
      homeGame: z.enum(['home', 'away', 'all']).catch('all'),

      selectedGender: z.enum(['men', 'women', 'all']).catch('all'),
      orderVar: z
        .enum([
          'date',
          'goalsScored',
          'goalsConceded',
          'goalDifference',
          'totalGoals',
        ])
        .catch('date'),
    })
    .refine((arg) => Number(arg.endSeason) >= Number(arg.startSeason), {
      message: '"Första år" kan inte komma efter "Sista år"',
      path: ['startSeason'],
    })
    .refine(
      (arg) => {
        if (arg.teamId && arg.opponentId) {
          if (arg.teamId == arg.opponentId) return false
        }
        return true
      },
      {
        message: 'Lag och motståndare får inte vara samma.',
        path: ['opponentId'],
      }
    )
    .refine(
      (arg) => {
        if (arg.opponentId && !arg.teamId) return false
        return true
      },
      {
        message: 'Kan inte välja motståndare utan att välja lag.',
        path: ['opponent'],
      }
    )

  const parsedObject = searchRequest.parse(object)

  return parsedObject
}
