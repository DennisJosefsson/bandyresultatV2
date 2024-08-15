import { useGetRecordData } from '@/lib/hooks/dataHooks/maraton/useGetRecordData'
import { useSearch } from '@tanstack/react-router'
import GeneralStatsCard from './GeneralStatsCard'

const GeneralStats = () => {
  const { women } = useSearch({ from: '/_layout' })
  const { data } = useGetRecordData()
  return (
    <div>
      {!women && (
        <>
          <h2 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
            Säsonger
          </h2>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
            <div>
              <h3 className="mb-2 text-xs font-bold leading-4 sm:text-base lg:text-lg">
                Sedan 1931
              </h3>
              <div>
                {data?.seasons.map((team, index) => {
                  return (
                    <GeneralStatsCard
                      key={`${team.seasons}-${Math.random()}`}
                      pos={index + 1}
                      name={team.casual_name}
                      count={team.seasons}
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
                {data?.allSeasons?.map((team, index) => {
                  return (
                    <GeneralStatsCard
                      key={`${team.seasons}-${Math.random()}`}
                      pos={index + 1}
                      name={team.casual_name}
                      count={team.seasons}
                    />
                  )
                })}
              </div>
            </div>
          </div>
          <h2 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
            Slutspel
          </h2>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
            <div>
              <h3 className="mb-2 text-xs font-bold leading-4 sm:text-base lg:text-lg">
                Sedan 1931
              </h3>
              <div>
                {data?.playoffs.map((team, index) => {
                  return (
                    <GeneralStatsCard
                      key={`${team.playoffs}-${Math.random()}`}
                      pos={index + 1}
                      name={team.casual_name}
                      count={team.playoffs}
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
                {data?.allPlayoffs?.map((team, index) => {
                  return (
                    <GeneralStatsCard
                      key={`${team.playoffs}-${Math.random()}`}
                      pos={index + 1}
                      name={team.casual_name}
                      count={team.playoffs}
                    />
                  )
                })}
              </div>
            </div>
          </div>
          <h2 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
            SM-Finaler
          </h2>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
            <div>
              <h3 className="mb-2 text-xs font-bold leading-4 sm:text-base lg:text-lg">
                Guld
              </h3>
              <div>
                {data?.golds.map((team, index) => {
                  return (
                    <GeneralStatsCard
                      key={`${team.guld}-${Math.random()}`}
                      pos={index + 1}
                      name={team.casual_name}
                      count={team.guld}
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
                {data?.finals.map((team, index) => {
                  return (
                    <GeneralStatsCard
                      key={`${team.finals}-${Math.random()}`}
                      pos={index + 1}
                      name={team.casual_name}
                      count={team.finals}
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
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
            <div>
              <h2 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                Säsonger
              </h2>
              <div>
                {data?.seasons.map((team, index) => {
                  return (
                    <GeneralStatsCard
                      key={`${team.seasons}-${Math.random()}`}
                      pos={index + 1}
                      name={team.casual_name}
                      count={team.seasons}
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
                {data?.playoffs.map((team, index) => {
                  return (
                    <GeneralStatsCard
                      key={`${team.playoffs}-${Math.random()}`}
                      pos={index + 1}
                      name={team.casual_name}
                      count={team.playoffs}
                    />
                  )
                })}
              </div>
            </div>
          </div>
          <h2 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
            SM-Finaler
          </h2>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
            <div>
              <h3 className="mb-2 text-xs font-bold leading-4 sm:text-base lg:text-lg">
                Guld
              </h3>
              <div>
                {data?.golds.map((team, index) => {
                  return (
                    <GeneralStatsCard
                      key={`${team.guld}-${Math.random()}`}
                      pos={index + 1}
                      name={team.casual_name}
                      count={team.guld}
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
                {data?.finals.map((team, index) => {
                  return (
                    <GeneralStatsCard
                      key={`${team.finals}-${Math.random()}`}
                      pos={index + 1}
                      name={team.casual_name}
                      count={team.finals}
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
