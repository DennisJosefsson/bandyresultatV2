import { TableHeader, TableRow, TableHead } from '@/components/ui/table'

const TeamTableHeader = () => {
  return (
    <TableHeader>
      <TableRow key={`tablehead`}>
        <TableHead
          scope="col"
          className="px-1 py-1 text-right text-[8px] sm:text-[10px] md:w-8 md:py-2 lg:text-sm"
        >
          M
        </TableHead>
        <TableHead
          scope="col"
          className="px-1 py-1 text-right text-[8px] sm:text-[10px] md:w-8 md:py-2 lg:text-sm"
        >
          V
        </TableHead>
        <TableHead
          scope="col"
          className="px-1 py-1 text-right text-[8px] sm:text-[10px] md:w-8 md:py-2 lg:text-sm"
        >
          O
        </TableHead>
        <TableHead
          scope="col"
          className="px-1 py-1 text-right text-[8px] sm:text-[10px] md:w-8 md:py-2 lg:text-sm"
        >
          F
        </TableHead>
        <TableHead
          scope="col"
          className="hidden px-1 py-1 text-right text-[8px] xs:table-cell sm:text-[10px] md:w-12 md:py-2 lg:text-sm"
        >
          GM
        </TableHead>
        <TableHead
          scope="col"
          className="hidden px-1 py-1 text-right text-[8px] xs:table-cell sm:text-[10px] md:w-12 md:py-2 lg:text-sm"
        >
          IM
        </TableHead>
        <TableHead
          scope="col"
          className="hidden px-1 py-1 text-right text-[8px] xs:table-cell sm:text-[10px] md:w-12 md:py-2 lg:text-sm"
        >
          MS
        </TableHead>
        <TableHead
          scope="col"
          className="px-1 py-1 text-right text-[8px] sm:text-[10px] md:w-8 md:py-2 lg:text-sm"
        >
          P
        </TableHead>
      </TableRow>
    </TableHeader>
  )
}

export default TeamTableHeader
