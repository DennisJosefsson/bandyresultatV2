import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { deleteGame } from '@/lib/requests/games'
import { useMutation } from '@tanstack/react-query'
import {
  useNavigate,
  useParams,
  useRouter,
  useSearch,
} from '@tanstack/react-router'
import { AxiosError } from 'axios'

const DeleteDialog = () => {
  const { toast } = useToast()
  const router = useRouter()
  const women = useSearch({
    from: '/_layout',
    select: (search) => search.women,
  })
  const { seasonId, serieId, gameId } = useParams({
    from: '/_layout/dashboard/season/$seasonId/games/$serieId/$gameId/delete',
  })
  const navigate = useNavigate({
    from: '/dashboard/season/$seasonId/games/$serieId/$gameId/delete',
  })

  const close = () => {
    navigate({
      to: '/dashboard/season/$seasonId/games/$serieId',
      search: { women },
      params: { seasonId, serieId },
    })
  }

  const deleteMutation = useMutation({
    mutationFn: ({ gameId }: { gameId: number }) => deleteGame(gameId),
    onSuccess: () => onSuccessDeleteMutation(),
    onError: (error) => onErrorFunction(error),
  })

  const onSuccessDeleteMutation = () => {
    router.invalidate()
    toast({
      duration: 5000,
      title: 'Match borttagen',
    })
    close()
  }

  const onErrorFunction = (error: unknown) => {
    if (error instanceof AxiosError) {
      toast({
        duration: 5000,
        title: 'Fel',
        description: error.response?.data.errors,
        variant: 'destructive',
      })
    } else {
      toast({
        duration: 5000,
        title: 'Något gick fel',
        variant: 'destructive',
      })
    }
  }
  return (
    <Dialog defaultOpen={true}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ta bort match</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-center">Är du säker?</div>
          <div className="flex flex-row items-center justify-center gap-2">
            <Button
              variant="destructive"
              onClick={() =>
                deleteMutation.mutate({ gameId: parseInt(gameId) })
              }
            >
              Ja, ta bort
            </Button>
            <Button onClick={close}>Nej, ångra</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteDialog
