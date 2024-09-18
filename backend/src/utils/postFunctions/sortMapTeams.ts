import Team from '../../models/Team'

type SortedTeamGroups = {
  [key: string]: Team[]
}

export function sortMapTeams(teamArray: Team[]) {
  const sortCounties = teamArray.reduce((groups, team) => {
    if (!groups[team.county.name]) {
      groups[team.county.name] = []
    }
    groups[team.county.name].push(team)
    return groups
  }, {} as SortedTeamGroups)

  return Object.keys(sortCounties).map((county) => {
    return {
      county,
      teams: sortCounties[county],
    }
  })
}
