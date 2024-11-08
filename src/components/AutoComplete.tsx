import { useEffect, useState } from "react"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { Button } from "@/components/shadcn/button"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/shadcn/command"
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/shadcn/drawer"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/shadcn/popover"
import { ChevronsUpDown } from "lucide-react"
import { Skeleton } from "@/components/shadcn/skeleton"
import { useGetSearchQuery } from "@/store/ApiSlices"
import { skipToken } from "@reduxjs/toolkit/query"
import { useDispatch } from "react-redux"
import { resetAddressFound, updateAddressFound } from "@/store/Slices"

type AddressData = {
	place_id: number
	display_name: string
	address: Record<string, string>
	[key: string]: unknown
}

const AutoComplete = ({
	inputPlaceholder,
	displayName,
}: {
	inputPlaceholder: string
	displayName: string
}) => {
	const [open, setOpen] = useState(false)
	const [inputValue, setInputValue] = useState<string>("")
	const [debouncedSearchValue, setDebouncedSearchValue] = useState<string>("")
	const isDesktop = useMediaQuery("(min-width: 768px)")
	const dispatch = useDispatch()

	const { data, error, isFetching } = useGetSearchQuery(
		debouncedSearchValue.trim() === "" ? skipToken : debouncedSearchValue,
	)

	useEffect(() => {
		return () => {
			dispatch(resetAddressFound())
		}
	}, [])

	useEffect(() => {
		const timeOutId = setTimeout(() => setDebouncedSearchValue(inputValue), 500)
		return () => clearTimeout(timeOutId)
	}, [inputValue])

	const handleSelectedAddress = (address: AddressData) => {
		dispatch(
			updateAddressFound({
				address: address.address,
				display_name: address.display_name,
			}),
		)
		setOpen(false)
		setDebouncedSearchValue("")
	}

	/**
	 * Renders the content of the command list in the autocomplete component.
	 *
	 * @returns {JSX.Element} The JSX element representing the command list content.
	 */
	const renderCommandListContent = (): JSX.Element => {
		if (error) {
			return (
				<CommandEmpty>
					An error has occurred. Please try again later.
				</CommandEmpty>
			)
		}
		if (isFetching) {
			return (
				<div className="flex flex-col gap-1 p-1">
					<Skeleton className="h-8 w-full" />
					<Skeleton className="h-8 w-full" />
					<Skeleton className="h-8 w-full" />
					<Skeleton className="h-8 w-full" />
				</div>
			)
		}
		if (debouncedSearchValue.trim() === "") {
			return <CommandEmpty>No results, please try searching.</CommandEmpty>
		}
		return (
			<>
				{debouncedSearchValue.trim() !== "" && (
					<>
						<CommandEmpty>No results, please try searching.</CommandEmpty>
						<CommandGroup className="p-1">
							{data.map((address: AddressData) => (
								<CommandItem
									key={address.place_id}
									value={address.display_name}
									onSelect={() => handleSelectedAddress(address)}
								>
									{address.display_name}
								</CommandItem>
							))}
						</CommandGroup>
					</>
				)}
			</>
		)
	}

	return isDesktop ? (
		<Popover
			open={open}
			onOpenChange={setOpen}
		>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					aria-haspopup="listbox"
					aria-expanded={open}
					className="w-full justify-between"
				>
					<span className="truncate">{displayName}</span>
					<ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="p-0 sm:w-[var(--radix-popper-anchor-width)]"
				align="start"
			>
				<Command>
					<CommandInput
						placeholder={inputPlaceholder}
						onValueChange={setInputValue}
						value={inputValue}
						className="placeholder:opacity-40"
					/>
					<CommandList>{renderCommandListContent()}</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	) : (
		<Drawer
			open={open}
			onOpenChange={setOpen}
		>
			<DrawerTrigger asChild>
				<Button
					variant="outline"
					aria-haspopup="listbox"
					aria-expanded={open}
					className="w-full justify-between"
				>
					<span className="truncate">{displayName}</span>
					<ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
				</Button>
			</DrawerTrigger>

			<DrawerContent className="top-0">
				<DrawerHeader>
					<DrawerTitle className="text-center">Address</DrawerTitle>
					<DrawerDescription className="text-center">
						Find your address
					</DrawerDescription>
				</DrawerHeader>
				<div className="p-4">
					<Command className="border p-2">
						<CommandInput
							placeholder={inputPlaceholder}
							onValueChange={setInputValue}
							value={inputValue}
							className="placeholder:opacity-50"
						/>
						<CommandList>{renderCommandListContent()}</CommandList>
					</Command>
				</div>
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}

export default AutoComplete
