import { pointsGoalsResponse } from '@/lib/types/games/streaks'
import { z } from 'zod'
import MaxMinGoalsCard from './MaxMinGoalsCard'
import PointsGoalsCard from './PointsGoalsCard'

const PointsGoals = ({
  data,
}: {
  data: z.infer<typeof pointsGoalsResponse>
}) => {
  return (
    <>
      {data ? (
        <div className="flex flex-col gap-2 mt-3">
          <div className="grid gap-2 grid-cols1 lg:grid-cols-2">
            {data.gamesMaxGoals ? (
              <div>
                <h2 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                  Elitseriematcher med flest antal mål
                </h2>
                {data.gamesMaxGoals.map((game) => {
                  return (
                    <MaxMinGoalsCard
                      key={`MaxGoals-${game.position}-${game.date}-${game.teams}`}
                      teams={game.teams}
                      pos={game.position}
                      result={game.result}
                      date={game.date}
                    />
                  )
                })}
                {data.count ? (
                  <p className="my-2 max-w-xl bg-background p-1 text-[10px] md:text-xs font-bold xl:text-sm 2xl:text-base">
                    Totalt {data.count.maxGoalCount} matcher
                    med {data.count.lastMaxGoal} mål.
                  </p>
                ) : null}
              </div>
            ) : null}
            {data.gamesMinGoals ? (
              <div>
                <h2 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                  Elitseriematcher med minst antal mål
                </h2>
                {data.gamesMinGoals.map((game) => {
                  return (
                    <MaxMinGoalsCard
                      key={`MinGoals-${game.position}-${game.date}-${game.teams}`}
                      teams={game.teams}
                      pos={game.position}
                      result={game.result}
                      date={game.date}
                    />
                  )
                })}
                {data.count ? (
                  <p className="my-2 max-w-xl bg-background p-1 text-[10px] md:text-xs font-bold xl:text-sm 2xl:text-base">
                    Totalt {data.count.minGoalCount} matcher
                    med {data.count.lastMinGoal} mål.
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
          <h2 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
            Högsta
          </h2>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
            <div>
              <h3 className="mb-2 text-xs font-bold leading-4 sm:text-base lg:text-lg">
                Genomsnitt
              </h3>
              <div>
                {data.avgMaxAll?.map((team, index) => {
                  return (
                    <PointsGoalsCard
                      key={`${team.data}-${team.name}-${team.year}-${index}`}
                      pos={team.position}
                      name={team.name}
                      data={team.data}
                      year={team.year}
                    />
                  )
                })}
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-xs font-bold leading-4 sm:text-base lg:text-lg">
                Genomsnitt Hemma
              </h3>
              <div>
                {data.avgMaxHome?.map((team, index) => {
                  return (
                    <PointsGoalsCard
                      key={`${team.data}-${team.name}-${team.year}-${index}`}
                      pos={team.position}
                      name={team.name}
                      data={team.data}
                      year={team.year}
                    />
                  )
                })}
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-xs font-bold leading-4 sm:text-base lg:text-lg">
                Genomsnitt Borta
              </h3>
              <div>
                {data.avgMaxAway?.map((team, index) => {
                  return (
                    <PointsGoalsCard
                      key={`${team.data}-${team.name}-${team.year}-${index}`}
                      pos={team.position}
                      name={team.name}
                      data={team.data}
                      year={team.year}
                    />
                  )
                })}
              </div>
            </div>
          </div>
          <h2 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
            Lägsta
          </h2>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
            <div>
              <h3 className="mb-2 text-xs font-bold leading-4 sm:text-base lg:text-lg">
                Genomsnitt
              </h3>
              <div>
                {data.avgMinAll?.map((team, index) => {
                  return (
                    <PointsGoalsCard
                      key={`${team.data}-${team.name}-${team.year}-${index}`}
                      pos={team.position}
                      name={team.name}
                      data={team.data}
                      year={team.year}
                    />
                  )
                })}
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-xs font-bold leading-4 sm:text-base lg:text-lg">
                Genomsnitt Hemma
              </h3>
              <div>
                {data.avgMinHome?.map((team, index) => {
                  return (
                    <PointsGoalsCard
                      key={`${team.data}-${team.name}-${team.year}-${index}`}
                      pos={team.position}
                      name={team.name}
                      data={team.data}
                      year={team.year}
                    />
                  )
                })}
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-xs font-bold leading-4 sm:text-base lg:text-lg">
                Genomsnitt Borta
              </h3>
              <div>
                {data.avgMinAway?.map((team, index) => {
                  return (
                    <PointsGoalsCard
                      key={`${team.data}-${team.name}-${team.year}-${index}`}
                      pos={team.position}
                      name={team.name}
                      data={team.data}
                      year={team.year}
                    />
                  )
                })}
              </div>
            </div>
          </div>
          <h2 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
            Högsta
          </h2>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
            <div>
              <h3 className="mb-2 text-xs font-bold leading-4 sm:text-base lg:text-lg">
                Totalt
              </h3>
              <div>
                {data.sumMaxAll?.map((team, index) => {
                  return (
                    <PointsGoalsCard
                      key={`${team.data}-${team.name}-${team.year}-${index}`}
                      pos={team.position}
                      name={team.name}
                      data={team.data}
                      year={team.year}
                    />
                  )
                })}
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-xs font-bold leading-4 sm:text-base lg:text-lg">
                Totalt Hemma
              </h3>
              <div>
                {data.sumMaxHome?.map((team, index) => {
                  return (
                    <PointsGoalsCard
                      key={`${team.data}-${team.name}-${team.year}-${index}`}
                      pos={team.position}
                      name={team.name}
                      data={team.data}
                      year={team.year}
                    />
                  )
                })}
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-xs font-bold leading-4 sm:text-base lg:text-lg">
                Totalt Borta
              </h3>
              <div>
                {data.sumMaxAway?.map((team, index) => {
                  return (
                    <PointsGoalsCard
                      key={`${team.data}-${team.name}-${team.year}-${index}`}
                      pos={team.position}
                      name={team.name}
                      data={team.data}
                      year={team.year}
                    />
                  )
                })}
              </div>
            </div>
          </div>
          <h2 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
            Lägsta
          </h2>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
            <div>
              <h3 className="mb-2 text-xs font-bold leading-4 sm:text-base lg:text-lg">
                Totalt
              </h3>
              <div>
                {data.sumMinAll?.map((team, index) => {
                  return (
                    <PointsGoalsCard
                      key={`${team.data}-${team.name}-${team.year}-${index}`}
                      pos={team.position}
                      name={team.name}
                      data={team.data}
                      year={team.year}
                    />
                  )
                })}
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-xs font-bold leading-4 sm:text-base lg:text-lg">
                Totalt Hemma
              </h3>
              <div>
                {data.sumMinHome?.map((team, index) => {
                  return (
                    <PointsGoalsCard
                      key={`${team.data}-${team.name}-${team.year}-${index}`}
                      pos={team.position}
                      name={team.name}
                      data={team.data}
                      year={team.year}
                    />
                  )
                })}
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-xs font-bold leading-4 sm:text-base lg:text-lg">
                Totalt Borta
              </h3>
              <div>
                {data.sumMinAway?.map((team, index) => {
                  return (
                    <PointsGoalsCard
                      key={`${team.data}-${team.name}-${team.year}-${index}`}
                      pos={team.position}
                      name={team.name}
                      data={team.data}
                      year={team.year}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default PointsGoals
