import { QueryTypes } from 'sequelize'
import { z } from 'zod'
import Team from '../../../models/Team.js'
import TeamGame from '../../../models/TeamGame.js'
import TeamSeason from '../../../models/TeamSeason.js'
import { sequelize } from '../../../utils/db.js'

const parsePlayoffCount = z
  .array(z.object({ playoff_count: z.coerce.number() }))
  .transform((item) => {
    return item[0].playoff_count
  })

const parseFirstDivSeasons = z
  .array(z.object({ count: z.coerce.number() }))
  .transform((item) => {
    return item[0].count
  })

const parseFirstLatestFirstDivSeason = z
  .array(z.object({ season_id: z.coerce.number(), year: z.string() }))
  .transform((item) => {
    if (item.length === 0) return null
    return { seasonId: item[0].season_id, year: item[0].year }
  })

type AllSeasons = {
  rows: TeamSeason[]
  count: number
}

export const getStrings = async ({
  team,
  allSeasons,
}: {
  team: Team
  allSeasons: AllSeasons
}) => {
  const qualificationSeasons = await TeamSeason.count({
    where: { teamId: team.teamId, qualification: true },
  })
  const getFirstDivSeasons = await sequelize.query(
    `select count(distinct s.season_id) from teamseries t 
join series s on s.serie_id = t.serie_id 
where t.team_id = $teamId and level = 1 and s.serie_category = 'regular'`,
    { bind: { teamId: team.teamId }, type: QueryTypes.SELECT }
  )

  const firstDivSeasons = parseFirstDivSeasons.parse(getFirstDivSeasons)

  const getFirstFirstDivSeason = await sequelize.query(
    `select s2."year", s2.season_id from teamseries t 
join series s on s.serie_id = t.serie_id
join seasons s2 on s.season_id = s2.season_id 
where t.team_id = $teamId and level = 1 and (s.serie_category = any(array['regular','eight','quarter', 'semi', 'final']) or s.serie_group_code = any(array['SlutspelA', 'SlutspelB']))
order by s2.season_id asc
limit 1
`,
    { bind: { teamId: team.teamId }, type: QueryTypes.SELECT }
  )

  const firstFirstDivSeason = parseFirstLatestFirstDivSeason.parse(
    getFirstFirstDivSeason
  )

  const getLatestFirstDivSeason = await sequelize.query(
    `select s2."year", s2.season_id from teamseries t
  join series s on s.serie_id = t.serie_id
  join seasons s2 on s.season_id = s2.season_id
  where t.team_id = $teamId and level = 1 and (s.serie_category = any(array['regular','eight','quarter', 'semi', 'final']) or s.serie_group_code = any(array['SlutspelA', 'SlutspelB']))
  order by s2.season_id desc
  limit 1`,
    { bind: { teamId: team.teamId }, type: QueryTypes.SELECT }
  )

  const latestFirstDivSeason = parseFirstLatestFirstDivSeason.parse(
    getLatestFirstDivSeason
  )
  const seasonString = getSeasonStrings({
    teamCity: team.get('city'),
    teamName: team.get('casualName'),
    allSeasons,
    qualificationSeasons,
    firstDivSeasons,
    firstFirstDivSeason,
    latestFirstDivSeason,
  })

  const finalsAndWins = await TeamGame.findAll({
    where: { teamId: team.teamId, category: 'final' },
    order: [['date', 'ASC']],
    raw: true,
    nest: true,
  })

  const finalsAndWinsString = getFinalsAndWinsString(
    team.get('casualName'),
    finalsAndWins
  )

  const getPlayoffCount = await sequelize.query(
    `select count(distinct season_id) as playoff_count
from teamgames
where team = $teamId and ("category" = any(array['quarter', 'semi', 'final']) or "group" = any(array['SlutspelA', 'SlutspelB'])) and season_id >= 25;`,
    { bind: { teamId: team.teamId }, type: QueryTypes.SELECT }
  )

  const playoffCount = parsePlayoffCount.parse(getPlayoffCount)

  const playoffCountString = getPlayoffCountString(playoffCount)

  return { seasonString, finalsAndWinsString, playoffCountString }
}

function getFinalsAndWinsString(
  teamName: string,
  finalsAndWins: TeamGame[]
): string {
  const finals = finalsAndWins.length
  const golds = finalsAndWins.filter((table) => table.win === true).length
  let winString = ''
  winString += finalsAndWins
    .filter((table) => table.win === true)
    .reduce((str, winYear) => `${str}, ${winYear.date.slice(0, 4)}`, '')
  if (finals > 0 && golds > 0) {
    return `${teamName} har spelat ${
      finals === 1 ? 'en finalmatch' : `${finals} finalmatcher`
    } och vunnit ${
      golds === 1
        ? `en gång (${winString.slice(2)}).`
        : `${golds} gånger (${winString.slice(2)}).`
    }`
  } else if (finals > 0) {
    return `${teamName} har spelat ${
      finals === 1 ? 'en finalmatch' : `${finals} finalmatcher`
    } men har aldrig vunnit.`
  }

  return ''
}

function getPlayoffCountString(playoffCount: number): string {
  if (playoffCount > 1) {
    return `Laget har kvalificerat sig för slutspel ${playoffCount} gånger.`
  } else if (playoffCount === 1) {
    return 'Laget har kvalificerat sig för slutspel en gång.'
  } else {
    return 'Laget har inte kvalificerat sig för slutspel genom seriespel.'
  }

  return ''
}

function getSeasonStrings({
  firstDivSeasons,
  qualificationSeasons,
  allSeasons,
  teamName,
  teamCity,
  latestFirstDivSeason,
  firstFirstDivSeason,
}: {
  firstDivSeasons: number
  qualificationSeasons: number
  allSeasons: {
    rows: TeamSeason[]
    count: number
  }
  teamName: string
  teamCity: string
  latestFirstDivSeason: z.infer<typeof parseFirstLatestFirstDivSeason>
  firstFirstDivSeason: z.infer<typeof parseFirstLatestFirstDivSeason>
}): string {
  let firstDivString

  if (firstDivSeasons === 1) {
    firstDivString = 'spelat en säsong'
  } else if (firstDivSeasons > 1) {
    firstDivString = `spelat ${firstDivSeasons} säsonger`
  } else {
    firstDivString = 'inte spelat någon säsong'
  }

  let qualificationString
  if (qualificationSeasons === 0) {
    qualificationString = ''
  } else if (qualificationSeasons === 1) {
    qualificationString =
      'Laget har kvalat mot motstånd från högsta serien vid ett tillfälle.\n'
  } else {
    qualificationString = `Laget har kvalat mot motstånd från högsta serien vid ${qualificationSeasons} tillfällen.\n`
  }

  const firstDbSeason = allSeasons.rows[0]
  const latestDbSeason = allSeasons.rows[allSeasons.rows.length - 1]

  let allSeasonsString
  if (allSeasons.count === firstDivSeasons) {
    if (allSeasons.count === 1) {
      allSeasonsString = `Den säsongen spelades ${firstDbSeason.season.year}.\n`
    } else {
      allSeasonsString = `Första säsongen var ${
        firstFirstDivSeason && firstFirstDivSeason.year
      }, och den senaste ${
        latestFirstDivSeason && latestFirstDivSeason.year
      }.\n`
    }
  } else if (allSeasons.count === 1) {
    allSeasonsString = `Totalt har laget en säsong i databasen, den spelades ${firstDbSeason.season.year}.\n`
  } else {
    allSeasonsString = `Totalt har laget ${allSeasons.count} säsonger i databasen, `
    if (firstDivSeasons === 1) {
      allSeasonsString += `säsongen ${
        firstFirstDivSeason && firstFirstDivSeason.year
      } i högsta serien.\n`
    } else if (
      firstDivSeasons > 1 &&
      firstFirstDivSeason &&
      latestFirstDivSeason
    ) {
      if (firstDbSeason.season.seasonId === firstFirstDivSeason.seasonId) {
        allSeasonsString += `första säsongen i högsta serien spelades ${firstDbSeason.season.year}.\n `
      } else if (firstDbSeason.season.seasonId < firstFirstDivSeason.seasonId) {
        allSeasonsString += `första säsongen är ${firstDbSeason.season.year} (medan laget debuterade i högsta serien ${firstFirstDivSeason.year}).\n `
      }
      if (latestDbSeason.season.seasonId === latestFirstDivSeason.seasonId) {
        allSeasonsString += `Senaste säsongen i högsta serien är ${latestDbSeason.season.year}.\n`
      } else if (
        latestDbSeason.season.seasonId > latestFirstDivSeason.seasonId
      ) {
        allSeasonsString += `Senaste säsongen i databasen är ${latestDbSeason.season.year}, och senast laget var i högsta serien är säsongen ${latestFirstDivSeason.year}.\n`
      }
    } else if (firstDivSeasons === 0) {
      allSeasonsString += `mellan ${firstDbSeason.season.year} och ${latestDbSeason.season.year}.\n`
    }
  }

  const returnString = `${teamName} från ${teamCity} har ${firstDivString} i högsta divisionen.\n ${allSeasonsString} ${qualificationString}`
  return returnString
}
