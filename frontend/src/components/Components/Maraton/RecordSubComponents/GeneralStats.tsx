import { useLoaderData, useSearch } from '@tanstack/react-router'
import GeneralStatsCard from './GeneralStatsCard'

const GeneralStats = () => {
  const { women } = useSearch({ from: '/_layout' })
  const data = useLoaderData({ from: '/_layout/maraton/records/' })

  return (
    <div>
      {!women && (
        <>
          <h2 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
            Säsonger
          </h2>
          <div className="grid grid-cols-1 gap-2 md:gap-4 lg:gap-6 lg:grid-cols-2">
            <div>
              <h3 className="mb-2 text-xs font-bold leading-4 sm:text-base lg:text-lg">
                Sedan 1931
              </h3>
              <div>
                {data?.seasons.map((team) => {
                  return (
                    <GeneralStatsCard
                      key={`${team.count}-${team.casualName}`}
                      pos={team.position}
                      name={team.casualName}
                      count={team.count}
                    />
                  )
                })}
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-xs font-bold leading-4 sm:text-base lg:text-lg">
                Säsonger totalt
              </h3>
              <div>
                {data?.allSeasons?.map((team) => {
                  return (
                    <GeneralStatsCard
                      key={`${team.count}-${team.casualName}`}
                      pos={team.position}
                      name={team.casualName}
                      count={team.count}
                    />
                  )
                })}
              </div>
            </div>
          </div>
          <h2 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
            Slutspel
          </h2>
          <div className="grid grid-cols-1 gap-2 md:gap-4 lg:gap-6 lg:grid-cols-2">
            <div>
              <h3 className="mb-2 text-xs font-bold leading-4 sm:text-base lg:text-lg">
                Sedan 1931
              </h3>
              <div>
                {data?.playoffs.map((team) => {
                  return (
                    <GeneralStatsCard
                      key={`${team.count}-${team.casualName}`}
                      pos={team.position}
                      name={team.casualName}
                      count={team.count}
                    />
                  )
                })}
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-xs font-bold leading-4 sm:text-base lg:text-lg">
                Slutspel totalt
              </h3>
              <div>
                {data?.allPlayoffs?.map((team) => {
                  return (
                    <GeneralStatsCard
                      key={`${team.count}-${team.casualName}`}
                      pos={team.position}
                      name={team.casualName}
                      count={team.count}
                    />
                  )
                })}
              </div>
            </div>
          </div>
          <h2 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
            SM-Finaler
          </h2>
          <div className="grid grid-cols-1 gap-2 md:gap-4 lg:gap-6 lg:grid-cols-2">
            <div>
              <h3 className="mb-2 text-xs font-bold leading-4 sm:text-base lg:text-lg">
                Guld
              </h3>
              <div>
                {data?.golds.map((team) => {
                  return (
                    <GeneralStatsCard
                      key={`${team.count}-${team.casualName}`}
                      pos={team.position}
                      name={team.casualName}
                      count={team.count}
                    />
                  )
                })}
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-xs font-bold leading-4 sm:text-base lg:text-lg">
                Spelade
              </h3>
              <div>
                {data?.finals.map((team) => {
                  return (
                    <GeneralStatsCard
                      key={`${team.count}-${team.casualName}`}
                      pos={team.position}
                      name={team.casualName}
                      count={team.count}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </>
      )}
      {women && (
        <>
          <div className="grid grid-cols-1 gap-2 md:gap-4 lg:gap-6 lg:grid-cols-2">
            <div>
              <h2 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                Säsonger
              </h2>
              <div>
                {data?.seasons.map((team) => {
                  return (
                    <GeneralStatsCard
                      key={`${team.count}-${team.casualName}`}
                      pos={team.position}
                      name={team.casualName}
                      count={team.count}
                    />
                  )
                })}
              </div>
            </div>

            <div>
              <h2 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                Slutspel
              </h2>
              <div>
                {data?.playoffs.map((team) => {
                  return (
                    <GeneralStatsCard
                      key={`${team.count}-${team.casualName}`}
                      pos={team.position}
                      name={team.casualName}
                      count={team.count}
                    />
                  )
                })}
              </div>
            </div>
          </div>
          <h2 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
            SM-Finaler
          </h2>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
            <div>
              <h3 className="mb-2 text-xs font-bold leading-4 sm:text-base lg:text-lg">
                Guld
              </h3>
              <div>
                {data?.golds.map((team) => {
                  return (
                    <GeneralStatsCard
                      key={`${team.count}-${team.casualName}`}
                      pos={team.position}
                      name={team.casualName}
                      count={team.count}
                    />
                  )
                })}
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-xs font-bold leading-4 sm:text-base lg:text-lg">
                Spelade
              </h3>
              <div>
                {data?.finals.map((team) => {
                  return (
                    <GeneralStatsCard
                      key={`${team.count}-${team.casualName}`}
                      pos={team.position}
                      name={team.casualName}
                      count={team.count}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default GeneralStats
