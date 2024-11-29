import { pointsGoalsResponse } from '@/lib/types/games/streaks'
import { z } from 'zod'
import PointsGoalsCard from './PointsGoalsCard'

const PointsGoals = ({
  data,
}: {
  data: z.infer<typeof pointsGoalsResponse>
}) => {
  return (
    <>
      {data ? (
        <div>
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
                {data.avgMaxHome?.map((team,index) => {
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
                {data.avgMaxAway?.map((team,index) => {
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
                {data.avgMinAll?.map((team,index) => {
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
                {data.avgMinHome?.map((team,index) => {
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
                {data.avgMinAway?.map((team,index) => {
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
                {data.sumMaxAll?.map((team,index) => {
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
                {data.sumMaxHome?.map((team,index) => {
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
                {data.sumMaxAway?.map((team,index) => {
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
                {data.sumMinAll?.map((team,index) => {
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
                {data.sumMinHome?.map((team,index) => {
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
                {data.sumMinAway?.map((team,index) => {
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
