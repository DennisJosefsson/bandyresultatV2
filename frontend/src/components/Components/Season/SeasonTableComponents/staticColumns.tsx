import { Button } from '@/components/ui/button'
import { staticTable } from '@/lib/types/tables/tables'
import { ColumnDef } from '@tanstack/react-table'

import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from '@radix-ui/react-icons'
import { z } from 'zod'

export const showColumns = {
  draw: true,
  scoredGoals: true,
  concededGoals: true,
}

export const hideColumns = {
  draw: false,
  scoredGoals: false,
  concededGoals: false,
}

export const columns: ColumnDef<z.infer<typeof staticTable>>[] = [
  {
    accessorKey: 'team.casualName',
    header: () => (
      <div className="w-6 truncate text-left text-[8px] sm:w-24 sm:text-[10px] lg:w-32 lg:text-sm">
        Lag
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-6 truncate text-left sm:w-24 lg:w-32">
        {row.getValue('team_casualName')}
      </div>
    ),
  },
  {
    accessorKey: 'games',
    header: ({ column }) => (
      <div className="text-center text-[8px] sm:text-[10px] lg:text-sm">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          size="icon"
          className="text-[8px] sm:text-[10px] lg:text-sm"
        >
          M
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className=" text-center text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
        {row.getValue('games')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'won',
    header: ({ column }) => (
      <div className="text-center text-[8px] sm:text-[10px] lg:text-sm">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          size="icon"
          className="text-[8px] sm:text-[10px] lg:text-sm"
        >
          V
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className=" text-center text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
        {row.getValue('won')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'draw',
    header: ({ column }) => (
      <div className="text-center text-[8px] sm:text-[10px] lg:text-sm">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          size="icon"
          className="text-[8px] sm:text-[10px] lg:text-sm"
        >
          O
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className=" text-center text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
        {row.getValue('draw')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'lost',
    header: ({ column }) => (
      <div className="text-center text-[8px] sm:text-[10px] lg:text-sm">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          size="icon"
          className="text-[8px] sm:text-[10px] lg:text-sm"
        >
          F
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className=" text-center text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
        {row.getValue('lost')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'scoredGoals',
    header: ({ column }) => (
      <div className="text-center text-[8px] sm:text-[10px] lg:text-sm">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          size="icon"
          className="text-[8px] sm:text-[10px] lg:text-sm"
        >
          GM
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className=" text-center text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
        {row.getValue('scoredGoals')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'concededGoals',
    header: ({ column }) => (
      <div className="text-center text-[8px] sm:text-[10px] lg:text-sm">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          size="icon"
          className="text-[8px] sm:text-[10px] lg:text-sm"
        >
          IM
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className=" text-center text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
        {row.getValue('concededGoals')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'goalDifference',
    header: ({ column }) => (
      <div className="text-center text-[8px] sm:text-[10px] lg:text-sm">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          size="icon"
          className="text-[8px] sm:text-[10px] lg:text-sm"
        >
          MS
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className=" text-center text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
        {row.getValue('goalDifference')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'points',
    header: ({ column }) => (
      <div className="text-center text-[8px] sm:text-[10px] lg:text-sm">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          size="icon"
          className="text-[8px] sm:text-[10px] lg:text-sm"
        >
          P
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className=" text-center text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
        {row.getValue('points')}
      </div>
    ),
    maxSize: 16,
  },
]
