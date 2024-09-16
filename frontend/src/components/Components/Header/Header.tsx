import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'
import useUserContext from '@/lib/hooks/contextHooks/useUserContext'
import { Link } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import LoginComponent from './LoginComponents/LoginComponent'
import ModeToggle from './ModeToggle'

const Header = () => {
  const [open, setOpen] = useState<boolean>(false)
  const { user } = useUserContext()
  const { womenContext } = useGenderContext()
  const matches = useMediaQuery('(min-width: 430px)')

  return (
    <header className="sticky top-0 z-[1] mb-4 flex h-16 flex-row items-center justify-between gap-4 border-b bg-background px-2 font-poppins text-foreground dark:bg-slate-950 dark:text-slate-50 md:px-6">
      <div className="flex flex-row gap-8 justify-between items-center">
        <div>
          <h1 className="text-sm xs:text-base font-bold uppercase tracking-[0.2rem] text-primary md:text-2xl lg:text-4xl xl:pl-0">
            <Link to="/" search={{ women: womenContext }}>
              Bandyresultat
            </Link>
          </h1>
        </div>
        <div>
          <nav className="hidden flex-col gap-6 text-lg font-semibold tracking-wider lg:flex lg:flex-row lg:items-center lg:gap-6 lg:text-base lg:ml-20 xl:ml-40">
            <Link
              to="/seasons"
              search={{ women: womenContext, page: 1 }}
              className="text-foreground transition-colors hover:text-foreground"
            >
              Säsonger
            </Link>
            <Link
              to="/teams"
              search={{ women: womenContext }}
              className="text-foreground transition-colors hover:text-foreground"
            >
              Lag
            </Link>
            <Link
              to="/search"
              search={{ women: womenContext }}
              className="text-foreground transition-colors hover:text-foreground"
            >
              Sök
            </Link>
            <Link
              to="/maraton/table/$table"
              params={{ table: 'all' }}
              search={{ women: womenContext }}
              className="text-foreground transition-colors hover:text-foreground"
            >
              Maratontabeller
            </Link>
            {user && (
              <Link
                to="/dashboard"
                search={{ women: womenContext }}
                className="text-foreground transition-colors hover:text-foreground"
              >
                Dashboard
              </Link>
            )}
            <Link
              to="/about"
              search={{ women: womenContext }}
              className="text-foreground transition-colors hover:text-foreground"
            >
              Om sidan
            </Link>
          </nav>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size={matches ? 'icon' : 'smallicon'}
              className="shrink-0 lg:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Öppnar och stänger menyn.</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <nav className="grid gap-6 text-lg font-semibold tracking-wider">
              <Link
                to="/"
                search={{ women: womenContext }}
                className="hover:text-foreground"
                onClick={() => (open ? setOpen(false) : setOpen(true))}
              >
                Hem
              </Link>

              <Link
                to="/seasons"
                search={{ women: womenContext, page: 1 }}
                className="hover:text-foreground"
                onClick={() => (open ? setOpen(false) : setOpen(true))}
              >
                Säsonger
              </Link>
              <Link
                to="/teams"
                search={{ women: womenContext }}
                className="hover:text-foreground"
                onClick={() => (open ? setOpen(false) : setOpen(true))}
              >
                Lag
              </Link>
              <Link
                to="/search"
                search={{ women: womenContext }}
                className="hover:text-foreground"
                onClick={() => (open ? setOpen(false) : setOpen(true))}
              >
                Sök
              </Link>
              <Link
                to="/maraton/table/$table"
                params={{ table: 'all' }}
                search={{ women: womenContext }}
                className="hover:text-foreground"
                onClick={() => (open ? setOpen(false) : setOpen(true))}
              >
                Maratontabeller
              </Link>
              {user && (
                <Link
                  search={{ women: womenContext }}
                  to="/dashboard"
                  className="hover:text-foreground"
                  onClick={() => (open ? setOpen(false) : setOpen(true))}
                >
                  Dashboard
                </Link>
              )}
              <Link
                to="/about"
                search={{ women: womenContext }}
                className="hover:text-foreground"
                onClick={() => (open ? setOpen(false) : setOpen(true))}
              >
                Om sidan
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <LoginComponent />
        <ModeToggle />
      </div>
    </header>
  )
}

export default Header
