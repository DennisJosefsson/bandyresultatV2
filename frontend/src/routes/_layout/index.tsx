import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/')({
  component: Home,
  notFoundComponent: NotFound,
})

function Home() {
  return (
    <div className="mx-auto mb-2 flex h-[25rem] max-w-7xl flex-row justify-between font-inter">
      <div className="my-10 md:my-20 flex flex-col">
        <div className="mb-3 md:mb-6">
          <h1 className="pl-2 text-base font-bold text-primary sm:text-2xl lg:text-4xl">
            Ett stycke bandyhistoria
          </h1>
        </div>
        <div className="w-[280px] pl-2 md:w-[500px] lg:w-full">
          <h2 className="mb-4 text-sm font-bold sm:text-base lg:text-2xl">
            Samlade resultat från de högsta serierna - 1907 och framåt
          </h2>
        </div>
      </div>
    </div>
  )
}

function NotFound() {
  return (
    <div className="mx-auto mb-2 flex h-[25rem] max-w-7xl flex-row justify-between font-inter">
      Länken finns inte.
    </div>
  )
}
