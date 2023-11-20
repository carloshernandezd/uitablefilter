import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import React from 'react'
import { Button } from './ui/button'
import {
  DoubleArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons'
import { Input } from './ui/input'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading: boolean
  isError: boolean
}

function Tanstack<TData, TValue>({
  columns,
  data,
  isLoading,
  isError,
}: DataTableProps<TData, TValue>) {
  const pageSizeOptions = [10, 20, 30, 40, 50]
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnFilters,
    },
  })

  return (
    <>
      <Input
        type="text"
        className="max-w-sm h-9"
        placeholder={`Filter`}
        value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
        onChange={(e) => {
          table.getColumn('name')?.setFilterValue(e.target.value)
        }}
      />
      <div className="mt-5 border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <>
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Loading...
                  </TableCell>
                </TableRow>
              </>
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  ¡Ups! Algo salió mal. Por favor, inténtelo de nuevo más tarde.
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col items-center justify-between w-full gap-4 px-2 py-1 mt-2 overflow-auto sm:flex-row sm:gap-8">
        <div className="flex-1 text-sm whitespace-nowrap text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getRowModel().rows.length} row(s) selected.
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium whitespace-nowrap">
              Rows per page
            </p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {pageSizeOptions.map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              aria-label="Go to first page"
              variant="outline"
              className="hidden w-8 h-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <DoubleArrowLeftIcon className="w-4 h-4" aria-hidden="true" />
            </Button>
            <Button
              aria-label="Go to previous page"
              variant="outline"
              className="w-8 h-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeftIcon className="w-4 h-4" aria-hidden="true" />
            </Button>
            <Button
              aria-label="Go to next page"
              variant="outline"
              className="w-8 h-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRightIcon className="w-4 h-4" aria-hidden="true" />
            </Button>
            <Button
              aria-label="Go to last page"
              variant="outline"
              className="hidden w-8 h-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <DoubleArrowRightIcon className="w-4 h-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Tanstack
