import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { GameObjectType } from '@/lib/types/games/games'
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { useSearch } from '@tanstack/react-router'
import { useCallback, useState } from 'react'

import { Dialog } from '@/components/ui/dialog'
import { useGamesSingleSeason } from '@/lib/hooks/dataHooks/games/useGamesSingleSeason'
import { setGame } from '@/lib/zustand/games/gameStore'
import { useMediaQuery } from 'usehooks-ts'
import GameForm from '../GameForm'
import DeleteDialog from './DeleteDialog'

type EditGameButtonProps = {
  game: GameObjectType
}

const EditGameButton = ({ game }: EditGameButtonProps) => {
  const { women } = useSearch({ from: '/_layout' })
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [gameId, setGameId] = useState<number | null>(null)
  const { genderSeason } = useGamesSingleSeason()
  const matches = useMediaQuery('(min-width: 768px)')

  const changeButtonOnClick = useCallback(() => {
    setGame(game)
    setShowModal(true)
  }, [game])

  const deleteButtonOnClick = useCallback(() => {
    game.gameId && setGameId(game.gameId)
    setShowDeleteModal(true)
  }, [game])

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={matches ? 'icon' : 'xs'} variant="ghost">
            <DotsVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={changeButtonOnClick}>
            Ändra
          </DropdownMenuItem>
          <DropdownMenuItem onClick={deleteButtonOnClick}>
            Ta bort
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {showModal ? (
        <>
          <GameForm
            women={women}
            season={genderSeason}
            setShowModal={setShowModal}
          />
        </>
      ) : null}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        {gameId ? (
          <DeleteDialog
            gameId={gameId}
            setShowModal={setShowDeleteModal}
            setGameId={setGameId}
          />
        ) : null}
      </Dialog>
    </div>
  )
}

export default EditGameButton
