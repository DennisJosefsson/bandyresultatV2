//import { SheetContent } from '@/components/ui/sheet'
import { SeasonObjectType } from '@/lib/types/season/seasons'
// import { SerieAttributes } from '@/lib/types/series/series'
// import {
//   TeamAndSeasonAttributes,
//   TeamSeasonAttributes,
// } from '@/lib/types/teams/teams'
// import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
// import { Sheet } from '@/components/ui/sheet'
// import { useState } from 'react'
// import SeriesModal from '../SeriesModal'
// import SingleSeason from '../SingleSeason'
// import BulkAddGame from './BulkAddGame/BulkAddGame'
// import TeamSeasonForm from './TeamSeasonForm'
// import MetadataForm from './MetadataForm'
import { useNavigate } from '@tanstack/react-router'
import { setDashboardTeamSeason } from '@/lib/zustand/dashboard/teamSeasonStore'

export type FormContent =
  | 'teamseason'
  | 'series'
  | 'metadata'
  | 'bulkAddGame'
  | null

const SeasonsList = ({ seasons }: { seasons: SeasonObjectType[] }) => {
  const navigate = useNavigate({ from: '/dashboard/seasons' })
  // const [seasonId, setSeasonId] = useState<number>(0)
  // const [year, setYear] = useState<string>('')
  // const [open, setOpen] = useState<boolean>(false)
  // const [teams, setTeams] = useState<TeamAndSeasonAttributes[] | null>(null)
  // const [tab, setTab] = useState<string>('sections')
  // const [formContent, setFormContent] = useState<FormContent>(null)
  // const [women, setWomen] = useState<boolean>(false)
  // const [serieData, setSerieData] = useState<SerieAttributes | null>(null)
  // const [series, setSeries] = useState<SerieAttributes[] | null>(null)
  // const [teamSeasonData, setTeamSeasonData] = useState<
  //   TeamSeasonAttributes[] | null
  // >(null)

  return (
    <>
      <div className="grid grid-cols-4 justify-between gap-x-8 gap-y-2 pt-2">
        {seasons
          .sort((a, b) => {
            if (a.year < b.year) {
              return 1
            }
            if (a.year > b.year) {
              return -1
            }
            return 0
          })
          .map((season) => {
            return (
              <div
                key={season.seasonId}
                className="flex flex-row items-center justify-between bg-background px-2 py-1 text-sm lg:text-base"
              >
                <div
                  className="cursor-pointer font-semibold"
                  onClick={() => {
                    setDashboardTeamSeason({
                      year: season.year,
                      women: season.women,
                      teamSeasonData: undefined,
                    })
                    navigate({
                      to: '/dashboard/season/$seasonId',
                      params: { seasonId: season.seasonId.toString() },
                    })
                  }}
                >
                  {season.year} {season.women ? 'Dam' : 'Herr'}
                </div>
              </div>
            )
          })}
        {/* <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="bottom" className="h-[90%] overflow-auto">
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList>
                <TabsTrigger value="sections">Sektioner</TabsTrigger>
                <TabsTrigger value="forms">Formulär</TabsTrigger>
              </TabsList>
              <TabsContent value="sections">
                <SingleSeason
                  year={year}
                  women={women}
                  setFormContent={setFormContent}
                  setTab={setTab}
                  setSerieData={setSerieData}
                  setTeams={setTeams}
                  setSeries={setSeries}
                  setTeamSeasonData={setTeamSeasonData}
                />
              </TabsContent>
              <TabsContent value="forms">
                {formContent === 'teamseason' && (
                  <TeamSeasonForm
                    women={women}
                    seasonId={seasonId}
                    teamSeasonData={teamSeasonData}
                    setFormContent={setFormContent}
                    setTab={setTab}
                    setTeamSeasonData={setTeamSeasonData}
                  />
                )}
                {formContent === 'series' && (
                  <SeriesModal
                    women={women}
                    seasonId={seasonId}
                    serieData={serieData}
                    setFormContent={setFormContent}
                    setTab={setTab}
                    setSerieData={setSerieData}
                  />
                )}
                {formContent === 'metadata' && (
                  <MetadataForm
                    seasonId={seasonId}
                    year={year}
                    teams={teams}
                    setTab={setTab}
                    setFormContent={setFormContent}
                  />
                )}
                {formContent === 'bulkAddGame' && (
                  <BulkAddGame
                    teams={teams}
                    seasonYear={year}
                    seasonId={seasonId}
                    series={series}
                    women={women}
                    setTab={setTab}
                    setFormContent={setFormContent}
                  />
                )}
              </TabsContent>
            </Tabs>
          </SheetContent>
        </Sheet> */}
      </div>
    </>
  )
}

export default SeasonsList
