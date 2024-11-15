import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/shadcn/table"

import {
	Column,
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/shadcn/select"
import { Button } from "@/components/shadcn/button"
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronsRightIcon,
	ChevronsLeftIcon,
	ArrowUp,
	ArrowDown,
} from "lucide-react"
import { useState } from "react"
import { format, parseISO } from "date-fns"
import { Input } from "@/components/shadcn/input"
import { StaffFormFields, StaffFormFormSubmitted } from "@/store/Slices"
import { Label } from "@/components/shadcn/label"

const HeaderButton = (
	column: Column<StaffFormFields, unknown>,
	ColName: string,
) => {
	return (
		<Button
			variant="link"
			className="px-1 font-bold"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		>
			{ColName}
			{column.getIsSorted() === "asc" ? (
				<ArrowUp className="ml-1 size-4" />
			) : column.getIsSorted() === "desc" ? (
				<ArrowDown className="ml-1 size-4" />
			) : (
				<div className="ml-1 size-4"></div>
			)}
		</Button>
	)
}

const StaffListTable = ({ data }: { data: StaffFormFormSubmitted[] }) => {
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 5,
	})

	const firstLetterUppercase = (str: string) => {
		return str.charAt(0).toUpperCase() + str.slice(1)
	}

	const formatDate = (dateString: string): string => {
		return format(parseISO(dateString), "MM/dd/yyyy")
	}

	const handleRowsPerPage = (value: string) => {
		const newPageSize = Number(value)

		setPagination(prev => {
			const newState = { ...prev, pageSize: newPageSize }

			const maxPage = Math.ceil(table.getRowCount() / newPageSize) - 1

			if (prev.pageIndex > maxPage) {
				newState.pageIndex = Math.max(0, maxPage)
			}
			return newState
		})
	}

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		table.setGlobalFilter(String(e.target.value))
	}

	const columns: ColumnDef<StaffFormFields>[] = [
		{
			accessorKey: "first-name",
			header: ({ column }) => {
				return HeaderButton(column, "First Name")
			},
			accessorFn: row => {
				return firstLetterUppercase(row["first-name"])
			},
		},
		{
			accessorKey: "last-name",
			header: ({ column }) => {
				return HeaderButton(column, "Last Name")
			},
			accessorFn: row => {
				return firstLetterUppercase(row["last-name"])
			},
		},
		{
			accessorKey: "date-of-start",
			header: ({ column }) => {
				return HeaderButton(column, "Start Date")
			},
			accessorFn: row => {
				return formatDate(row["date-of-start"])
			},
		},
		{
			header: ({ column }) => {
				return HeaderButton(column, "Department")
			},
			accessorKey: "department",
		},
		{
			accessorKey: "date-of-birth",
			header: ({ column }) => {
				return HeaderButton(column, "Date of Birth")
			},
			accessorFn: row => {
				return formatDate(row["date-of-birth"])
			},
		},
		{
			accessorKey: "street",
			header: ({ column }) => {
				return HeaderButton(column, "Street")
			},
		},
		{
			accessorKey: "city",
			header: ({ column }) => {
				return HeaderButton(column, "City")
			},
		},
		{
			accessorKey: "state",
			header: ({ column }) => {
				return HeaderButton(column, "State")
			},
		},
		{
			accessorKey: "zipCode",
			header: ({ column }) => {
				return HeaderButton(column, "Zip Code")
			},
		},
	]

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		state: {
			pagination: {
				pageSize: pagination.pageSize,
				pageIndex: pagination.pageIndex,
			},
		},
	})

	return (
		<div>
			<Label
				htmlFor="search-anything"
				className="sr-only"
			>
				Search for anything in the table
			</Label>
			<Input
				onChange={handleSearchChange}
				placeholder="Search anything..."
				className="sticky top-[4.5rem] z-10 mb-2 h-12 border-muted-foreground/50 bg-background text-lg shadow-sm"
				id="search-anything"
			/>

			<div className="rounded border">
				<Table>
					<TableHeader className="bg-muted">
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map(header => (
									<TableHead
										key={header.id}
										className="p-2"
									>
										{flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>

					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map(row => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map(cell => (
										<TableCell
											key={cell.id}
											className="px-3"
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No data.
								</TableCell>
							</TableRow>
						)}
					</TableBody>

					<TableFooter>
						<TableRow>
							<TableCell colSpan={3}>
								<div className="flex-1 text-sm text-muted-foreground">
									Showing {pagination.pageIndex * pagination.pageSize + 1} to{" "}
									{Math.min(
										(pagination.pageIndex + 1) * pagination.pageSize,
										table.getRowCount(),
									)}{" "}
									of {table.getRowCount()} entries
								</div>
							</TableCell>
							<TableCell colSpan={6}>
								<div className="flex items-center justify-end space-x-6 lg:space-x-8">
									<div className="flex items-center space-x-2">
										<p className="text-sm font-medium">Rows per page</p>
										<Select
											value={`${table.getState().pagination.pageSize}`}
											onValueChange={handleRowsPerPage}
										>
											<SelectTrigger className="h-8 w-[70px]">
												<SelectValue
													placeholder={table.getState().pagination.pageSize}
												/>
											</SelectTrigger>
											<SelectContent>
												{[5, 10, 20, 30, 40, 50, 100].map(pageSize => (
													<SelectItem
														key={pageSize}
														value={`${pageSize}`}
													>
														{pageSize}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
									<div className="flex w-[100px] items-center justify-center text-sm font-medium">
										Page {table.getState().pagination.pageIndex + 1} of{" "}
										{table.getPageCount()}
									</div>
									<div className="flex items-center space-x-1">
										<Button
											variant="outline"
											className="hidden size-8 p-0 xl:flex"
											onClick={() =>
												setPagination(prev => ({
													...prev,
													pageIndex: 0,
												}))
											}
											disabled={!table.getCanPreviousPage()}
										>
											<span className="sr-only">Go to first page</span>
											<ChevronsLeftIcon className="size-4" />
										</Button>
										<Button
											variant="outline"
											className="size-8 p-0"
											onClick={() =>
												setPagination(prev => ({
													...prev,
													pageIndex: prev.pageIndex - 1,
												}))
											}
											disabled={!table.getCanPreviousPage()}
										>
											<span className="sr-only">Go to previous page</span>
											<ChevronLeftIcon className="size-4" />
										</Button>
										<Button
											variant="outline"
											className="size-8 p-0"
											onClick={() =>
												setPagination(prev => ({
													...prev,
													pageIndex: prev.pageIndex + 1,
												}))
											}
											disabled={!table.getCanNextPage()}
										>
											<span className="sr-only">Go to next page</span>
											<ChevronRightIcon className="size-4" />
										</Button>
										<Button
											variant="outline"
											className="hidden size-8 p-0 xl:flex"
											onClick={() =>
												setPagination(prev => ({
													...prev,
													pageIndex: table.getPageCount() - 1,
												}))
											}
											disabled={!table.getCanNextPage()}
										>
											<span className="sr-only">Go to last page</span>
											<ChevronsRightIcon className="size-4" />
										</Button>
									</div>
								</div>
							</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</div>
		</div>
	)
}

export default StaffListTable
