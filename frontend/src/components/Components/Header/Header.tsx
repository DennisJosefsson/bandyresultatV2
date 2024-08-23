import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'
import useUserContext from '@/lib/hooks/contextHooks/useUserContext'
import { Link } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import LoginComponent from './LoginComponents/LoginComponent'
import ModeToggle from './ModeToggle'

const Header = () => {
  const [open, setOpen] = useState<boolean>(false)
  const { user } = useUserContext()
  const { womenContext } = useGenderContext()

  return (
    <header className="sticky top-0 z-[1] mb-4 flex h-16 flex-row items-center justify-between gap-4 border-b bg-background px-2 font-poppins text-foreground dark:bg-slate-950 dark:text-slate-50 md:px-6">
      <div className="flex flex-row gap-8">
        <h1 className="text-base font-bold uppercase tracking-[0.2rem] text-primary md:text-2xl lg:text-4xl xl:pl-0">
          <Link to="/" search={{ women: womenContext }}>
            Bandyresultat
          </Link>
        </h1>
        <nav className="hidden flex-col gap-6 text-lg font-medium lg:flex lg:flex-row lg:items-center lg:gap-6 lg:text-sm">
          <Link
            to="/seasons"
            search={{ women: womenContext }}
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
            to="/maraton"
            search={{ table: 'all', women: womenContext }}
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
      <div className="flex flex-row gap-2">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 lg:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Öppnar och stänger menyn.</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <nav className="grid gap-6 text-lg font-medium">
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
                search={{ women: womenContext }}
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
                to="/maraton"
                search={{ table: 'all', women: womenContext }}
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
      {/* <hr className="mx-auto my-2 h-px border-0 bg-[#011d29] dark:bg-gray-700 xl:w-[1280px]" /> */}
    </header>
  )
}

export default Header
