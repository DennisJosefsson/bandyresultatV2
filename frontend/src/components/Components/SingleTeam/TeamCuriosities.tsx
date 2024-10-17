import { getRouteApi } from '@tanstack/react-router'
import StreakComponent from './CuriositiesSubComponents/StreakComponent'
import TeamSeasonCuriosities from './CuriositiesSubComponents/TeamSeasonCuriosities'

const route = getRouteApi('/_layout/team/$teamId')

const TeamCuriosities = () => {
  const streaks = route.useLoaderData({ select: (data) => data.streaks })
  return (
    <div>
      <TeamSeasonCuriosities />

      <div className="grid grid-cols-1 gap-1 lg:grid-cols-2 lg:gap-2">
        {streaks.unbeatenStreak.length > 0 ? (
          <StreakComponent>
            <StreakComponent.Title>Obesegrade</StreakComponent.Title>
            <StreakComponent.Content
              streak={streaks.unbeatenStreak}
            ></StreakComponent.Content>
          </StreakComponent>
        ) : null}

        {streaks.winStreak.length > 0 ? (
          <StreakComponent>
            <StreakComponent.Title>Vinster i rad</StreakComponent.Title>
            <StreakComponent.Content
              streak={streaks.winStreak}
            ></StreakComponent.Content>
          </StreakComponent>
        ) : null}

        {streaks.drawStreak.length > 0 ? (
          <StreakComponent>
            <StreakComponent.Title>Oavgjorda</StreakComponent.Title>
            <StreakComponent.Content
              streak={streaks.drawStreak}
            ></StreakComponent.Content>
          </StreakComponent>
        ) : null}

        {streaks.losingStreak.length > 0 ? (
          <StreakComponent>
            <StreakComponent.Title>Förluster</StreakComponent.Title>
            <StreakComponent.Content
              streak={streaks.losingStreak}
            ></StreakComponent.Content>
          </StreakComponent>
        ) : null}

        {streaks.noWinStreak.length > 0 ? (
          <StreakComponent>
            <StreakComponent.Title>
              Matcher i rad utan vinst
            </StreakComponent.Title>
            <StreakComponent.Content
              streak={streaks.noWinStreak}
            ></StreakComponent.Content>
          </StreakComponent>
        ) : null}
      </div>
    </div>
  )
}

export default TeamCuriosities
