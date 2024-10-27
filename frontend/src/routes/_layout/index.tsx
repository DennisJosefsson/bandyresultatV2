import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/')({
  component: Home,
  notFoundComponent: NotFound,
})

function Home() {
  return (
    <div className="mx-auto mb-2 flex h-[25rem] max-w-7xl flex-col gap-2 font-inter">
      <div className="min-w-[9/10] max-w-7xl m-2 xl:mx-0 py-4 px-12 rounded-md bg-muted border-dashed border-primary border-2">
        <div className="flex flex-col lg:flex-row gap-1 md:gap-4">
          <div>
            <p className="text-primary text-[10px] md:text-sm mb-2 font-semibold">
              2024-10-26:
            </p>
          </div>
          <div>
            <p className="text-primary text-[10px] md:text-sm mb-2">
              Ny säsong, mer statistik. Jag har börjat arbetet med att lägga in
              resultat också från lägre divisioner.
            </p>
            <p className="text-primary text-[10px] md:text-sm mb-2">
              Till att börja med finns matchresultat från Allsvenskan och
              Division 1 från och med säsong 2016/2017.
            </p>
            <p className="text-primary text-[10px] md:text-sm">
              Målsättningen är att lägga in även tidigare matchresultat, men
              inom det närmaste kommer det enbart finnas tabeller.
            </p>
          </div>
        </div>
      </div>
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
