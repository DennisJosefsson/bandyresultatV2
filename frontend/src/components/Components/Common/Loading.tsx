import CompareSkeleton from './Skeletons/CompareSkeleton'
import MaratonSkeleton from './Skeletons/MaratonSkeleton'
import RecordsSkeleton from './Skeletons/RecordsSkeleton'
import SearchSelectionSkeleton from './Skeletons/SearchSelectionSkeleton'
import SeasonDevelopmentSkeleton from './Skeletons/SeasonDevelopmentSkeleton'
import SeasonGameListSkeleton from './Skeletons/SeasonGameListSkeleton'
import SeasonListSkeleton from './Skeletons/SeasonListSkeleton'
import SeasonMapSkeleton from './Skeletons/SeasonMapSkeleton'
import SeasonPlayoffSkeleton from './Skeletons/SeasonPlayoffSkeleton'
import SeasonStatsSkeleton from './Skeletons/SeasonStatsSkeleton'
import SeasonTableSkeleton from './Skeletons/SeasonTableSkeleton'
import SingleTeamSkeleton from './Skeletons/SingleTeamSkeleton'
import TeamListSkeleton from './Skeletons/TeamListSkeleton'
import Spinner from './Spinner'

type SkeletonType =
  | 'seasonList'
  | 'seasonMap'
  | 'seasonGamesList'
  | 'seasonTable'
  | 'seasonPlayoff'
  | 'seasonDevelopment'
  | 'seasonStats'
  | 'searchSelection'
  | 'teamsList'
  | 'compare'
  | 'singleTeam'
  | 'maraton'
  | 'records'

type LoadingProps = {
  page?: SkeletonType
}

const Loading = ({ page }: LoadingProps) => {
  let content
  switch (page) {
    case 'seasonList':
      content = <SeasonListSkeleton />
      break
    case 'seasonGamesList':
      content = <SeasonGameListSkeleton />
      break
    case 'seasonTable':
      content = <SeasonTableSkeleton />
      break
    case 'seasonPlayoff':
      content = <SeasonPlayoffSkeleton />
      break
    case 'seasonDevelopment':
      content = <SeasonDevelopmentSkeleton />
      break
    case 'seasonStats':
      content = <SeasonStatsSkeleton />
      break
    case 'seasonMap':
      content = <SeasonMapSkeleton />
      break
    case 'singleTeam':
      content = <SingleTeamSkeleton />
      break
    case 'teamsList':
      content = <TeamListSkeleton />
      break
    case 'searchSelection':
      content = <SearchSelectionSkeleton />
      break
    case 'compare':
      content = <CompareSkeleton />
      break
    case 'maraton':
      content = <MaratonSkeleton />
      break
    case 'records':
      content = <RecordsSkeleton />
      break
    default:
      content = <Spinner />
  }
  return (
    <div className="mx-auto grid place-items-center font-inter text-foreground">
      {content}
    </div>
  )
}

export default Loading
