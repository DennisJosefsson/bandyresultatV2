import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { getSingleTeamTeamSeasons } from '@/lib/requests/teamSeason'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/_layout/team/$teamId/seasons')({
  loader: ({ params }) => getSingleTeamTeamSeasons({ teamId: params.teamId }),
  component: Seasons,
})

function Seasons() {
  const [open, setOpen] = useState('seasons')
  const seasons = Route.useLoaderData({ select: (data) => data.seasons })
  const rest = Route.useLoaderData({ select: (data) => data.rest })

  return (
    <div className="p-2">
      <Accordion type="single" collapsible value={open} onValueChange={setOpen}>
        <AccordionItem
          value="seasons"
          className="mb-2 rounded-md bg-background p-2 shadow-md"
        >
          <AccordionTrigger className="text-sm md:text-base">
            Senaste säsongerna
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-8 gap-2">
              {seasons.map((season) => {
                return (
                  <div
                    key={season.seasonId}
                    className="flex items-center justify-center rounded bg-muted p-2 font-semibold text-sm dark:bg-muted/50 md:text-base"
                  >
                    <Link
                      from="/team/$teamId/seasons"
                      to="/team/$teamId/$seasonId"
                      params={{ seasonId: season.seasonId }}
                      search={(prev) => ({ ...prev })}
                    >
                      {season.year}
                    </Link>
                  </div>
                )
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
        {rest.length > 0 ? (
          <AccordionItem
            value="rest"
            className="mb-2 rounded-md bg-background p-2 shadow-md"
          >
            <AccordionTrigger className="text-sm md:text-base">
              Övriga
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-8 gap-2">
                {rest.map((season) => {
                  return (
                    <div
                      key={season.seasonId}
                      className="flex items-center justify-center rounded bg-muted p-2 font-semibold text-sm dark:bg-muted/50 md:text-base"
                    >
                      <Link
                        from="/team/$teamId/seasons"
                        to="/team/$teamId/$seasonId"
                        params={{ seasonId: season.seasonId }}
                        search={(prev) => ({ ...prev })}
                      >
                        {season.year}
                      </Link>
                    </div>
                  )
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ) : null}
      </Accordion>
    </div>
  )
}
