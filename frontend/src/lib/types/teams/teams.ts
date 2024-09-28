import { z } from 'zod'

export const teamIdFromParams = z.coerce.number().int().positive()
export const compareTeamsSeasonId = z.coerce.number().int().positive()

export const team = z.object({
  teamId: z.number(),
  name: z.string(),
  city: z.string(),
  casualName: z.string(),
  shortName: z.string(),
  women: z.boolean(),
  lat: z.coerce.number().nullable(),
  long: z.coerce.number().nullable(),
  countyId: z.coerce.number(),
  municipalityId: z.coerce.number().nullable(),
})

export const newTeam = team.omit({ teamId: true })

export const validateSearchParams = z
  .object({
    teamArray: z
      .array(z.number())
      .max(4, { message: 'Max max 4 lag' })
      .min(2, { message: 'Välj minst 2 lag' }),
    categoryArray: z
      .array(z.string())
      .min(1, { message: 'Välj minst en matchkategori' }),
    startSeason: z.number(),
    endSeason: z.number(),
    women: z.boolean(),
    link: z.boolean(),
  })
  .refine((arg) => Number(arg.startSeason) <= Number(arg.endSeason), {
    message: 'Första säsong kan inte komma efter sista säsong.',
    path: ['startSeason'],
  })

export const teamAttributes = team.and(
  z.object({
    seasonteam: z.array(
      z.object({
        year: z.string(),
        seasonId: z.number(),
        teamseason: z.object({ qualification: z.boolean().nullable() }),
      })
    ),
  })
)
