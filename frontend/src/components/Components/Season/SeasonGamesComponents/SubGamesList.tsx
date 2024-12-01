import Date from '@/components/Components/Common/Date'
import { groupArray } from '@/lib/types/games/gameObject'
import { getRouteApi, Link } from '@tanstack/react-router'
import { Link as LinkIcon } from 'lucide-react'
import { z } from 'zod'
import SubGamesListItem from './GamesListSubComponents/SubGamesListItem'

type SubGameListProps = {
  gamesArray: z.infer<typeof groupArray>
  title: string
}

const route = getRouteApi('/_layout/season/$seasonId/games/sub/$group')

const SubGamesList = ({ gamesArray, title }: SubGameListProps) => {
  const seasonId = route.useParams({
    select: (params) => params.seasonId,
  })
  if (gamesArray.length === 0) return null
  return (
    <div className="w-full mb-6 font-inter">
      <h1 className="text-xs font-semibold tracking-wider text-primary md:text-base xl:text-lg 2xl:text-xl">
        {title}
      </h1>
      <div>
        {gamesArray.map((group) => {
          return (
            <div key={group.group} className="mb-6">
              <div
                id={group.group}
                className="flex flex-row gap-1 items-center mb-0.5 group"
              >
                <h3 className="text-[10px] font-semibold text-primary md:text-xs tracking-wide xl:text-sm 2xl:text-base">
                  {group.name}
                </h3>
                <Link
                  from="/season/$seasonId/games/sub/$group"
                  params={{ seasonId: seasonId }}
                  hash={group.group}
                  search={(prev) => ({ ...prev })}
                >
                  <LinkIcon className="hidden w-4 h-4 text-muted-foreground group-hover:block" />
                </Link>
              </div>
              {group.comment && (
                <p className="my-2 max-w-xl bg-background p-1 text-[10px] md:text-xs font-bold xl:text-sm 2xl:text-base">
                  {group.comment}
                </p>
              )}
              <div>
                {group.dates.map((date) => {
                  return (
                    <div key={date.date}>
                      {date.date !== 'null' && (
                        <div className="flex flex-row gap-1 items-center mb-0.5 group">
                          <h3
                            className="text-[0.75rem] md:text-sm tracking-wide xl:text-base 2xl:text-lg"
                            id={`${group.group}-${date.date}`}
                          >
                            <Date>{date.date}</Date>
                          </h3>
                          <Link
                            from="/season/$seasonId/games/sub/$group"
                            params={{ seasonId: seasonId }}
                            hash={`${group.group}-${date.date}`}
                            search={(prev) => ({ ...prev })}
                          >
                            <LinkIcon className="hidden w-4 h-4 text-muted-foreground group-hover:block" />
                          </Link>
                        </div>
                      )}
                      {date.games.map((game) => {
                        return (
                          <SubGamesListItem key={game.gameId} game={game} />
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SubGamesList
