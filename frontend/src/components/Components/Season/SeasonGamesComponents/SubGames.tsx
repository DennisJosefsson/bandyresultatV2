import { groupRecord } from '@/lib/types/games/gameObject'
import { z } from 'zod'
import SubGamesList from './SubGamesList'

type SubGamesProps = {
  games: z.infer<typeof groupRecord>
  title: string
}

const SubGames = ({ games, title }: SubGamesProps) => {
  return (
    <div>
      <h1 className="text-sm font-bold md:text-base xl:text-lg 2xl:text-xl">{title}</h1>
      <div className="w-full xl:px-2">
        <SubGamesList
          gamesArray={games['RegularGames']}
          title={'Grundseriematcher'}
        />
        <SubGamesList
          gamesArray={games['QualificationGames']}
          title={'Kvalmatcher'}
        />
      </div>
    </div>
  )
}

export default SubGames
