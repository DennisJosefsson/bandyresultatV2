import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useToast } from '@/components/ui/use-toast'
import useUserContext from '@/lib/hooks/contextHooks/useUserContext'
import { getLogin, logout } from '@/lib/requests/login'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { User2Icon } from 'lucide-react'
import { SyntheticEvent, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import LoginForm from './LoginForm'

const LoginComponent = () => {
  const { toast } = useToast()
  const { user, dispatch } = useUserContext()
  const navigate = useNavigate()
  const [userName, setUserName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false)
  const matches = useMediaQuery('(min-width: 430px)')

  const loginMutation = useMutation({
    mutationFn: () => getLogin(userName, password),
    onSuccess(data) {
      if (data.success && user === false) {
        dispatch({ type: 'LOGIN' })
        toast({ duration: 1500, title: 'Inloggad' })
      }
    },
    onError(error) {
      if (error instanceof AxiosError) {
        const message = `${error.response?.data.errors}`
        toast({
          duration: 2500,
          variant: 'destructive',
          title: 'Du får inte logga in.',
          description: message,
        })
        return
      }
    },
  })

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess(data) {
      if (data.success) {
        dispatch({ type: 'LOGOUT' })
        toast({ duration: 1500, title: 'Utloggad.' })
        navigate({ to: '/', search: { women: false } })
      }
    },
    onError: () =>
      toast({
        duration: 1500,
        variant: 'destructive',
        title: 'Något gick fel',
      }),
  })

  const handleResponse = async (event: SyntheticEvent) => {
    event.preventDefault()
    loginMutation.mutate()
    setShowLoginModal(false)
  }

  const loggaUt = async () => {
    logoutMutation.mutate()
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size={matches ? 'icon' : 'smallicon'}>
            <User2Icon className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {user ? (
            <DropdownMenuItem onClick={() => loggaUt()}>
              Logga ut
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => setShowLoginModal(true)}>
              Logga in
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <LoginForm
          userName={userName}
          setUserName={setUserName}
          password={password}
          setPassword={setPassword}
          setShowModal={setShowLoginModal}
          handleResponse={handleResponse}
        />
      </Dialog>
    </div>
  )
}

export default LoginComponent
