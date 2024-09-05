import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { GameObjectType } from '@/lib/types/games/games'
import { DotsVerticalIcon } from '@radix-ui/react-icons'

import { useMediaQuery } from 'usehooks-ts'

type EditGameButtonProps = {
  game: GameObjectType
  changeButtonOnClick: (game: GameObjectType, gameId: number) => void
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
          <DropdownMenuItem
            onClick={() =>
              game.gameId && changeButtonOnClick(game, game.gameId)
            }
          >
            Ändra
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => game.gameId && deleteButtonOnClick(game.gameId)}
          >
            Ta bort
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default EditGameButton
