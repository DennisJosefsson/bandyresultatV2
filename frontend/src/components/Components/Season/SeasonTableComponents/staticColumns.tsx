import { Button } from '@/components/ui/button'

import { ColumnDef } from '@tanstack/react-table'

import { staticTable } from '@/lib/types/tables/seasonTable'
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
      <div className="w-6 truncate text-left sm:w-24 text-[10px] lg:w-32 lg:text-sm xl:text-base 2xl:text-lg">
        Lag
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-6 text-left truncate sm:w-24 lg:w-32 xl:text-base 2xl:text-lg">
        {row.getValue('team_casualName')}
      </div>
    ),
  },
  {
    accessorKey: 'totalGames',
    header: ({ column }) => (
      <div className="text-center text-[10px] lg:text-sm">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          size="icon"
          className="text-[10px] lg:text-sm"
        >
          M
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="w-4 h-4 ml-2" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="w-4 h-4 ml-2" />
          ) : (
            <CaretSortIcon className="w-4 h-4 ml-2" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className=" text-center tabular-nums text-[10px] lg:text-sm xl:text-base 2xl:text-lg">
        {row.getValue('totalGames')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalWins',
    header: ({ column }) => (
      <div className="text-center text-[10px] lg:text-sm">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          size="icon"
          className="text-[10px] lg:text-sm"
        >
          V
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="w-4 h-4 ml-2" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="w-4 h-4 ml-2" />
          ) : (
            <CaretSortIcon className="w-4 h-4 ml-2" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className=" text-center tabular-nums text-[10px] lg:text-sm xl:text-base 2xl:text-lg">
        {row.getValue('totalWins')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalDraws',
    header: ({ column }) => (
      <div className="text-center text-[10px] lg:text-sm">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          size="icon"
          className="text-[10px] lg:text-sm"
        >
          O
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="w-4 h-4 ml-2" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="w-4 h-4 ml-2" />
          ) : (
            <CaretSortIcon className="w-4 h-4 ml-2" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className=" text-center tabular-nums text-[10px] lg:text-sm xl:text-base 2xl:text-lg">
        {row.getValue('totalDraws')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalLost',
    header: ({ column }) => (
      <div className="text-center text-[10px] lg:text-sm">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          size="icon"
          className="text-[10px] lg:text-sm"
        >
          F
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="w-4 h-4 ml-2" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="w-4 h-4 ml-2" />
          ) : (
            <CaretSortIcon className="w-4 h-4 ml-2" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className=" text-center tabular-nums text-[10px] lg:text-sm xl:text-base 2xl:text-lg">
        {row.getValue('totalLost')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalGoalsScored',
    header: ({ column }) => (
      <div className="text-center text-[10px] lg:text-sm">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          size="icon"
          className="text-[10px] lg:text-sm"
        >
          GM
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="w-4 h-4 ml-2" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="w-4 h-4 ml-2" />
          ) : (
            <CaretSortIcon className="w-4 h-4 ml-2" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className=" text-center tabular-nums text-[10px] lg:text-sm xl:text-base 2xl:text-lg">
        {row.getValue('totalGoalsScored')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalGoalsConceded',
    header: ({ column }) => (
      <div className="text-center text-[10px] lg:text-sm">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          size="icon"
          className="text-[10px] lg:text-sm"
        >
          IM
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="w-4 h-4 ml-2" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="w-4 h-4 ml-2" />
          ) : (
            <CaretSortIcon className="w-4 h-4 ml-2" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className=" text-center tabular-nums text-[10px] lg:text-sm xl:text-base 2xl:text-lg">
        {row.getValue('totalGoalsConceded')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalGoalDifference',
    header: ({ column }) => (
      <div className="text-center text-[10px] lg:text-sm">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          size="icon"
          className="text-[10px] lg:text-sm"
        >
          MS
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="w-4 h-4 ml-2" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="w-4 h-4 ml-2" />
          ) : (
            <CaretSortIcon className="w-4 h-4 ml-2" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className=" text-center tabular-nums text-[10px] lg:text-sm xl:text-base 2xl:text-lg">
        {row.getValue('totalGoalDifference')}
      </div>
    ),
    maxSize: 16,
  },
  {
    accessorKey: 'totalPoints',
    header: ({ column }) => (
      <div className="text-center text-[10px] lg:text-sm">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          size="icon"
          className="text-[10px] lg:text-sm"
        >
          P
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="w-4 h-4 ml-2" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="w-4 h-4 ml-2" />
          ) : (
            <CaretSortIcon className="w-4 h-4 ml-2" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className=" text-center tabular-nums text-[10px] lg:text-sm xl:text-base 2xl:text-lg">
        {row.getValue('totalPoints')}
      </div>
    ),
    maxSize: 16,
  },
]
