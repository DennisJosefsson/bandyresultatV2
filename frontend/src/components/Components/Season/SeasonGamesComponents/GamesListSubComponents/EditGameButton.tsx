import { Button } from '@/components/ui/button'
import { GameObjectType } from '@/lib/types/games/games'
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { useParams } from '@tanstack/react-router'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'

import GameForm from '../GameForm'
import { useGamesSingleSeason } from '@/lib/hooks/dataHooks/games/useGamesSingleSeason'
import { Dialog } from '@/components/ui/dialog'
import DeleteDialog from './DeleteDialog'
import { setGame } from '@/lib/zustand/games/gameStore'

type EditGameButtonProps = {
  game: GameObjectType
}

const EditGameButton = ({ game }: EditGameButtonProps) => {
  const { seasonId } = useParams({ from: '/_layout/season/$seasonId/games' })
  const { women } = useGenderContext()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [gameId, setGameId] = useState<number | null>(null)
  const { genderSeason } = useGamesSingleSeason(seasonId)

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            onClick={() => {
              setGame(game)
              setShowModal(true)
            }}
            size="icon"
          >
            <DotsVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              setGame(game)
              setShowModal(true)
            }}
          >
            Ändra
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              game.gameId && setGameId(game.gameId)
              setShowDeleteModal(true)
            }}
          >
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
