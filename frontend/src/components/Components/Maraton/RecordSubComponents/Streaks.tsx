import Date from '@/components/Components/Common/Date'
import { Card } from '@/components/ui/card'
import { useLoaderData } from '@tanstack/react-router'
import StreakCard from './StreakCard'

const Streaks = () => {
  const data = useLoaderData({ from: '/_layout/maraton/records/streaks' })
  return (
    <>
      {data ? (
        <div>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
            <StreakCard
              streak={data?.unbeatenStreak}
              title="Matcher i rad utan förlust"
            />
            <StreakCard
              streak={data?.winStreak}
              title="Matcher i rad med vinst"
            />
            <StreakCard
              streak={data?.drawStreak}
              title="Matcher i rad med oavgjort"
            />
            <StreakCard
              streak={data?.losingStreak}
              title="Matcher i rad med förlust"
            />
            <StreakCard
              streak={data?.noWinStreak}
              title="Matcher i rad utan seger"
            />

            <div className="p-2">
              <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                Inofficiella Svenska Mästare
              </h3>
              <div>
                {data?.currInoffChamps.rows.map((team, index) => {
                  return (
                    <Card
                      className="mb-1 p-1 flex flex-row justify-between items-center text-[10px] md:text-sm md:mb-2 md:p-2"
                      key={`${team.team.name}-${Math.random()}`}
                    >
                      <span className="mr-4 w-8 text-right text-base md:text-2xl font-bold tabular-nums">
                        {index + 1}
                      </span>
                      <div className="flex flex-col flex-grow mr-4">
                        <div className="flex flex-row justify-between">
                          <span className="truncate font-semibold">
                            {team.team.name}
                          </span>
                          <span className="text-right">
                            {team.goalsScored}-{team.goalsConceded}
                          </span>
                        </div>
                        <div className="flex flex-row items-center justify-between text-[10px] md:text-xs">
                          <div>
                            <span className="w-48 sm:w-64">
                              <Date>{team.date}</Date>
                            </span>
                          </div>

                          <span className="text-right">
                            {team.opponent.shortName}
                          </span>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
              <div>
                <p className="w-[292px] bg-background p-1 text-xs font-bold md:w-[22rem]">
                  Totalt {data?.currInoffChamps.count}{' '}
                  <a
                    href="https://sv.wikipedia.org/wiki/Inofficiella_v%C3%A4rldsm%C3%A4sterskapet_i_fotboll"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600"
                  >
                    &quot;mästare&quot;
                  </a>{' '}
                  sedan finalen 2000.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Streaks
