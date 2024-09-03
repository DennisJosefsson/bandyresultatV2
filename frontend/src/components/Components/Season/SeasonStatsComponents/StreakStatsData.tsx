import { useGetStreakStats } from '@/lib/hooks/dataHooks/stats/useGetStreaksStats'
import StreakStatsCard from './StreakStatsCard'

const StreakStatsData = () => {
  const { unbeatenStreak, winStreak, noWinStreak, drawStreak, losingStreak } =
    useGetStreakStats()

  return (
    <>
      <div>
        {unbeatenStreak && unbeatenStreak.length > 0 ? (
          <StreakStatsCard
            title="Matcher i rad utan förlust:"
            streak={unbeatenStreak}
          />
        ) : null}

        {winStreak && winStreak.length > 0 ? (
          <StreakStatsCard
            title="Matcher i rad med vinst:"
            streak={winStreak}
          />
        ) : null}

        {drawStreak && drawStreak.length > 0 ? (
          <StreakStatsCard
            title="Matcher i rad med oavgjort:"
            streak={drawStreak}
          />
        ) : null}

        {noWinStreak && noWinStreak.length > 0 ? (
          <StreakStatsCard
            title="Matcher i rad utan vinst:"
            streak={noWinStreak}
          />
        ) : null}

        {losingStreak && losingStreak.length > 0 ? (
          <StreakStatsCard
            title="Matcher i rad med förlust:"
            streak={losingStreak}
          />
        ) : null}
      </div>
    </>
  )
}

export default StreakStatsData
