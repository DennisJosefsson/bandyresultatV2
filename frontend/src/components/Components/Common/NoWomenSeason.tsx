import { Link } from '@tanstack/react-router'

export const NoWomenSeason = () => {
  return (
    <div className="mx-auto mt-4 grid place-items-center py-5 font-inter text-sm font-bold text-foreground md:text-base">
      <p className="mx-10 text-center">
        Första säsongen för damernas högsta serie var{' '}
        <Link
          to={'/season/$seasonId'}
          params={{ seasonId: '1973' }}
          className="font-bold"
        >
          1972/73
        </Link>
        .
      </p>
    </div>
  )
}
