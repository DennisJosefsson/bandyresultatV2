import { Link, useSearch } from '@tanstack/react-router'
import Header from '../Header/Header'

const DefaultNotFound = () => {
  const women = useSearch({
    from: '/_layout',
    select: (search) => search.women,
  })
  return (
    <>
      <Header />
      <div className="flex flex-row justify-center">
        <p>
          Glöggen är slut och länken finns inte, dags att ta sig{' '}
          <Link to="/" search={{ women }} className="text-blue-700">
            hem
          </Link>
          .
        </p>
      </div>
    </>
  )
}

export default DefaultNotFound
