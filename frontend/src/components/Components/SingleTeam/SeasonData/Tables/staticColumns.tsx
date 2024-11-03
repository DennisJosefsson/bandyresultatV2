import { Button } from '@/components/ui/button'

import { createColumnHelper } from '@tanstack/react-table'

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

const columnHelper = createColumnHelper<z.infer<typeof staticTable>>()

export const columns = [
  columnHelper.accessor('team.casualName' as const, {
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
  }),
  columnHelper.accessor('totalGames' as const, {
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
        {row.getValue('totalGames')}
      </div>
    ),
    maxSize: 16,
  }),
  columnHelper.accessor('totalWins' as const, {
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
      <div className="text-center text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
        {row.getValue('totalWins')}
      </div>
    ),
    maxSize: 16,
  }),
  columnHelper.accessor('totalDraws' as const, {
    header: ({ column }) => (
      <div className="text-center text-[8px] sm:text-[10px] lg:text-sm ">
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
      <div className="text-center text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
        {row.getValue('totalDraws')}
      </div>
    ),
    maxSize: 16,
  }),
  columnHelper.accessor('totalLost' as const, {
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
      <div className="text-center text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
        {row.getValue('totalLost')}
      </div>
    ),
    maxSize: 16,
  }),
  columnHelper.accessor('totalGoalsScored' as const, {
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
      <div className="text-center text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
        {row.getValue('totalGoalsScored')}
      </div>
    ),
    maxSize: 16,
  }),
  columnHelper.accessor('totalGoalsConceded' as const, {
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
      <div className="text-center text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
        {row.getValue('totalGoalsConceded')}
      </div>
    ),
    maxSize: 16,
  }),
  columnHelper.accessor('totalGoalDifference' as const, {
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
      <div className="text-center text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
        {row.getValue('totalGoalDifference')}
      </div>
    ),
    maxSize: 16,
  }),
  columnHelper.accessor('totalPoints' as const, {
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
      <div className="text-center text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
        {row.getValue('totalPoints')}
      </div>
    ),
    maxSize: 16,
  }),
]

// export const columns: ColumnDef<z.infer<typeof staticTable>>[] = [
//   {
//     accessorKey: 'team.casualName',
//     header: () => (
//       <div className="w-6 truncate text-left text-[8px] sm:w-24 sm:text-[10px] lg:w-32 lg:text-sm">
//         Lag
//       </div>
//     ),
//     cell: ({ row }) => (
//       <div className="w-6 truncate text-left sm:w-24 lg:w-32">
//         {row.getValue('team_casualName')}
//       </div>
//     ),
//   },
//   {
//     accessorKey: 'totalGames',
//     header: ({ column }) => (
//       <div className="text-center text-[8px] sm:text-[10px] lg:text-sm">
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
//           size="icon"
//           className="text-[8px] sm:text-[10px] lg:text-sm"
//         >
//           M
//           {column.getIsSorted() === 'desc' ? (
//             <ArrowDownIcon className="ml-2 h-4 w-4" />
//           ) : column.getIsSorted() === 'asc' ? (
//             <ArrowUpIcon className="ml-2 h-4 w-4" />
//           ) : (
//             <CaretSortIcon className="ml-2 h-4 w-4" />
//           )}
//         </Button>
//       </div>
//     ),
//     cell: ({ row }) => (
//       <div className=" text-center text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
//         {row.getValue('totalGames')}
//       </div>
//     ),
//     maxSize: 16,
//   },
//   {
//     accessorKey: 'totalWins',
//     header: ({ column }) => (
//       <div className="text-center text-[8px] sm:text-[10px] lg:text-sm">
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
//           size="icon"
//           className="text-[8px] sm:text-[10px] lg:text-sm"
//         >
//           V
//           {column.getIsSorted() === 'desc' ? (
//             <ArrowDownIcon className="ml-2 h-4 w-4" />
//           ) : column.getIsSorted() === 'asc' ? (
//             <ArrowUpIcon className="ml-2 h-4 w-4" />
//           ) : (
//             <CaretSortIcon className="ml-2 h-4 w-4" />
//           )}
//         </Button>
//       </div>
//     ),
//     cell: ({ row }) => (
//       <div className=" text-center text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
//         {row.getValue('totalWins')}
//       </div>
//     ),
//     maxSize: 16,
//   },
//   {
//     accessorKey: 'totalDraws',
//     header: ({ column }) => (
//       <div className="text-center text-[8px] sm:text-[10px] lg:text-sm">
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
//           size="icon"
//           className="text-[8px] sm:text-[10px] lg:text-sm"
//         >
//           O
//           {column.getIsSorted() === 'desc' ? (
//             <ArrowDownIcon className="ml-2 h-4 w-4" />
//           ) : column.getIsSorted() === 'asc' ? (
//             <ArrowUpIcon className="ml-2 h-4 w-4" />
//           ) : (
//             <CaretSortIcon className="ml-2 h-4 w-4" />
//           )}
//         </Button>
//       </div>
//     ),
//     cell: ({ row }) => (
//       <div className=" text-center text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
//         {row.getValue('totalDraws')}
//       </div>
//     ),
//     maxSize: 16,
//   },
//   {
//     accessorKey: 'totalLost',
//     header: ({ column }) => (
//       <div className="text-center text-[8px] sm:text-[10px] lg:text-sm">
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
//           size="icon"
//           className="text-[8px] sm:text-[10px] lg:text-sm"
//         >
//           F
//           {column.getIsSorted() === 'desc' ? (
//             <ArrowDownIcon className="ml-2 h-4 w-4" />
//           ) : column.getIsSorted() === 'asc' ? (
//             <ArrowUpIcon className="ml-2 h-4 w-4" />
//           ) : (
//             <CaretSortIcon className="ml-2 h-4 w-4" />
//           )}
//         </Button>
//       </div>
//     ),
//     cell: ({ row }) => (
//       <div className=" text-center text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
//         {row.getValue('totalLost')}
//       </div>
//     ),
//     maxSize: 16,
//   },
//   {
//     accessorKey: 'totalGoalsScored',
//     header: ({ column }) => (
//       <div className="text-center text-[8px] sm:text-[10px] lg:text-sm">
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
//           size="icon"
//           className="text-[8px] sm:text-[10px] lg:text-sm"
//         >
//           GM
//           {column.getIsSorted() === 'desc' ? (
//             <ArrowDownIcon className="ml-2 h-4 w-4" />
//           ) : column.getIsSorted() === 'asc' ? (
//             <ArrowUpIcon className="ml-2 h-4 w-4" />
//           ) : (
//             <CaretSortIcon className="ml-2 h-4 w-4" />
//           )}
//         </Button>
//       </div>
//     ),
//     cell: ({ row }) => (
//       <div className=" text-center text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
//         {row.getValue('totalGoalsScored')}
//       </div>
//     ),
//     maxSize: 16,
//   },
//   {
//     accessorKey: 'totalGoalsConceded',
//     header: ({ column }) => (
//       <div className="text-center text-[8px] sm:text-[10px] lg:text-sm">
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
//           size="icon"
//           className="text-[8px] sm:text-[10px] lg:text-sm"
//         >
//           IM
//           {column.getIsSorted() === 'desc' ? (
//             <ArrowDownIcon className="ml-2 h-4 w-4" />
//           ) : column.getIsSorted() === 'asc' ? (
//             <ArrowUpIcon className="ml-2 h-4 w-4" />
//           ) : (
//             <CaretSortIcon className="ml-2 h-4 w-4" />
//           )}
//         </Button>
//       </div>
//     ),
//     cell: ({ row }) => (
//       <div className=" text-center text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
//         {row.getValue('totalGoalsConceded')}
//       </div>
//     ),
//     maxSize: 16,
//   },
//   {
//     accessorKey: 'totalGoalDifference',
//     header: ({ column }) => (
//       <div className="text-center text-[8px] sm:text-[10px] lg:text-sm">
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
//           size="icon"
//           className="text-[8px] sm:text-[10px] lg:text-sm"
//         >
//           MS
//           {column.getIsSorted() === 'desc' ? (
//             <ArrowDownIcon className="ml-2 h-4 w-4" />
//           ) : column.getIsSorted() === 'asc' ? (
//             <ArrowUpIcon className="ml-2 h-4 w-4" />
//           ) : (
//             <CaretSortIcon className="ml-2 h-4 w-4" />
//           )}
//         </Button>
//       </div>
//     ),
//     cell: ({ row }) => (
//       <div className=" text-center text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
//         {row.getValue('totalGoalDifference')}
//       </div>
//     ),
//     maxSize: 16,
//   },
//   {
//     accessorKey: 'totalPoints',
//     header: ({ column }) => (
//       <div className="text-center text-[8px] sm:text-[10px] lg:text-sm">
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
//           size="icon"
//           className="text-[8px] sm:text-[10px] lg:text-sm"
//         >
//           P
//           {column.getIsSorted() === 'desc' ? (
//             <ArrowDownIcon className="ml-2 h-4 w-4" />
//           ) : column.getIsSorted() === 'asc' ? (
//             <ArrowUpIcon className="ml-2 h-4 w-4" />
//           ) : (
//             <CaretSortIcon className="ml-2 h-4 w-4" />
//           )}
//         </Button>
//       </div>
//     ),
//     cell: ({ row }) => (
//       <div className=" text-center text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
//         {row.getValue('totalPoints')}
//       </div>
//     ),
//     maxSize: 16,
//   },
// ]
