import { Button } from '@/components/ui/button'
import { maratonTable } from '@/lib/types/tables/tables'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from '@radix-ui/react-icons'
import { ColumnDef } from '@tanstack/react-table'
import { z } from 'zod'

export const showColumns = {
  totalDraws: true,
  totalGoalsScored: true,
  totalGoalsConceded: true,
}

export const hideColumns = {
  totalDraws: false,
  totalGoalsScored: false,
  totalGoalsConceded: false,
}

export const columns: ColumnDef<z.infer<typeof maratonTable>>[] = [
  {
    accessorKey: 'team.casualName',
    header: () => (
      <div className="max-w-6 truncate text-left  sm:max-w-24 text-[10px] lg:max-w-32 lg:text-sm xl:text-base 2xl:text-lg">
        Lag
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-left truncate max-w-6 sm:max-w-24 lg:max-w-32 xl:text-base 2xl:text-lg">
        {row.getValue('team_casualName')}
      </div>
    ),
  },
  {
    accessorKey: 'totalGames',
    header: ({ column }) => (
      <div className="text-center  text-[10px] lg:text-sm">
        <Button
          className=" text-[10px] lg:text-sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          size="icon"
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
      <div className=" text-center  tabular-nums text-[10px] lg:text-sm xl:text-base 2xl:text-lg">
        {row.getValue('totalGames')}
      </div>
    ),
  },
  {
    accessorKey: 'totalWins',
    header: ({ column }) => (
      <div className="text-center  text-[10px] lg:text-sm">
        <Button
          className=" text-[10px] lg:text-sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          size="icon"
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
      <div className="text-center  tabular-nums text-[10px] lg:text-sm xl:text-base 2xl:text-lg">
        {row.getValue('totalWins')}
      </div>
    ),
  },
  {
    accessorKey: 'totalDraws',
    header: ({ column }) => (
      <div className="text-center  text-[10px] lg:text-sm ">
        <Button
          className=" text-[10px] lg:text-sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          size="icon"
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
      <div className="text-center  tabular-nums text-[10px] lg:text-sm xl:text-base 2xl:text-lg">
        {row.getValue('totalDraws')}
      </div>
    ),
  },
  {
    accessorKey: 'totalLost',
    header: ({ column }) => (
      <div className="text-center  text-[10px] lg:text-sm">
        <Button
          className=" text-[10px] lg:text-sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          size="icon"
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
      <div className="text-center  tabular-nums text-[10px] lg:text-sm xl:text-base 2xl:text-lg">
        {row.getValue('totalLost')}
      </div>
    ),
  },
  {
    accessorKey: 'totalGoalsScored',
    header: ({ column }) => (
      <div className="text-center  text-[10px] lg:text-sm">
        <Button
          className=" text-[10px] lg:text-sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          size="icon"
        >
          G
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
      <div className="text-center  tabular-nums text-[10px] lg:text-sm xl:text-base 2xl:text-lg">
        {row.getValue('totalGoalsScored')}
      </div>
    ),
  },
  {
    accessorKey: 'totalGoalsConceded',
    header: ({ column }) => (
      <div className="text-center  text-[10px] lg:text-sm">
        <Button
          className=" text-[10px] lg:text-sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          size="icon"
        >
          I
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
      <div className="text-center  tabular-nums text-[10px] lg:text-sm xl:text-base 2xl:text-lg">
        {row.getValue('totalGoalsConceded')}
      </div>
    ),
  },
  {
    accessorKey: 'totalGoalDifference',
    header: ({ column }) => (
      <div className="text-center  text-[10px] lg:text-sm">
        <Button
          className=" text-[10px] lg:text-sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          size="icon"
        >
          S
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
      <div className="text-center  tabular-nums text-[10px] lg:text-sm xl:text-base 2xl:text-lg">
        {row.getValue('totalGoalDifference')}
      </div>
    ),
  },
  {
    accessorKey: 'totalPoints',
    header: ({ column }) => (
      <div className="text-center  text-[10px] lg:text-sm">
        <Button
          className=" text-[10px] lg:text-sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          size="icon"
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
      <div className="text-center  tabular-nums text-[10px] lg:text-sm xl:text-base 2xl:text-lg">
        {row.getValue('totalPoints')}
      </div>
    ),
  },
]
