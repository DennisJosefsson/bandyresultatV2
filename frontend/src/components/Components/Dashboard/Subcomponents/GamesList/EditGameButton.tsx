import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { gameObject } from '@/lib/types/games/games'
import { DotsVerticalIcon } from '@radix-ui/react-icons'

import { useMediaQuery } from 'usehooks-ts'
import { z } from 'zod'

type EditGameButtonProps = {
  game: z.infer<typeof gameObject>
  changeButtonOnClick: (gameId: number) => void
  deleteButtonOnClick: (gameId: number) => void
}

const EditGameButton = ({
  game,
  changeButtonOnClick,
  deleteButtonOnClick,
}: EditGameButtonProps) => {
  const matches = useMediaQuery('(min-width: 768px)')

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={matches ? 'icon' : 'xs'} variant="ghost">
            <DotsVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => changeButtonOnClick(game.gameId)}>
            Ändra
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => deleteButtonOnClick(game.gameId)}>
            Ta bort
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default EditGameButton
