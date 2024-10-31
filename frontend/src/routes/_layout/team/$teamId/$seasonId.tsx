import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute('/_layout/team/$teamId/$seasonId')({
  params: {
    parse: (params) => ({
      seasonId: z.number().int().parse(Number(params.seasonId)),
    }),
    stringify: ({ seasonId }) => ({ seasonId: `${seasonId}` }),
  },
  component: () => <div>Hello /_layout/team/$teamId/$seasonId!</div>,
})
