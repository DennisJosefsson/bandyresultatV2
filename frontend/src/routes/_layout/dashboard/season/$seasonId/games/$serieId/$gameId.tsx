import { createFileRoute, Outlet } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute(
  '/_layout/dashboard/season/$seasonId/games/$serieId/$gameId'
)({
  params: {
    parse: (params) => ({
      gameId: z.number().int().parse(Number(params.gameId)),
    }),
    stringify: ({ gameId }) => ({ gameId: `${gameId}` }),
  },
  component: () => <Outlet />,
})
