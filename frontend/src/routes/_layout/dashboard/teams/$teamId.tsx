import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute('/_layout/dashboard/teams/$teamId')({
  params: {
    parse: (params) => ({
      teamId: z.number().int().parse(Number(params.teamId)),
    }),
    stringify: ({ teamId }) => ({ teamId: `${teamId}` }),
  },
})
