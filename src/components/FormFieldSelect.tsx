import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/shadcn/form"
import { OctagonAlert, X, ChevronDown } from "lucide-react"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/shadcn/select"
import { useController } from "react-hook-form"
import { useEffect, useState } from "react"
import { Button } from "@/components/shadcn/button"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/shadcn/tooltip"
import { StaffFormFieldsType } from "@/components/StaffForm"
import { State } from "@/db/states"
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/shadcn/drawer"
import { useMediaQuery } from "@/hooks/useMediaQuery"

type dataListItem = {
	key: string
	label: string
	value: string
}

interface FormFieldSelectProps extends StaffFormFieldsType {
	autocompleteValue?: string
	dataList: State[]
	placeholder: string
	tooltipContent: string
}

const FormFieldSelect = ({
	form,
	name,
	label,
	autocompleteValue = "",
	dataList,
	placeholder,
	tooltipContent,
}: FormFieldSelectProps) => {
	const [hasUserEdited, setHasUserEdited] = useState(false)
	const [open, setOpen] = useState(false)
	const isDesktop = useMediaQuery("(min-width: 768px)")

	const { field } = useController({
		name,
		control: form.control,
	})

	useEffect(() => {
		if (
			(!hasUserEdited && autocompleteValue) ||
			(hasUserEdited && !field.value && autocompleteValue)
		) {
			field.onChange(autocompleteValue)
		}
	}, [autocompleteValue])

	const handleInput = (value: string) => {
		setHasUserEdited(true)
		field.onChange(value)
	}

	const handleClear = () => {
		setHasUserEdited(true)
		field.onChange("")
	}

	return (
		<FormField
			control={form.control}
			name={name}
			render={() => (
				<FormItem>
					<FormLabel className="inline-flex items-center gap-1 text-nowrap">
						<span className="flex gap-1">
							<span>{label}</span>
							{form.errors[name] && <OctagonAlert className="size-4" />}
						</span>
						<FormMessage className="truncate" />
					</FormLabel>

					<div className="flex gap-2">
						{isDesktop ? (
							// Desktop version with Select
							<Select
								onValueChange={handleInput}
								value={field.value || ""}
							>
								<FormControl>
									<SelectTrigger ref={field.ref}>
										<SelectValue placeholder={placeholder} />
									</SelectTrigger>
								</FormControl>
								<FormDescription className="sr-only">
									This is for the {label}.
								</FormDescription>
								<SelectContent className="max-h-52">
									{dataList.map((item: dataListItem) => (
										<SelectItem
											key={item.key}
											value={item.label}
										>
											{item.value}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						) : (
							// Mobile version with Drawer
							<Drawer
								open={open}
								onOpenChange={setOpen}
							>
								<DrawerTrigger asChild>
									<Button
										variant="outline"
										className="w-full justify-between"
									>
										<span className="truncate">
											{field.value || placeholder}
										</span>
										<ChevronDown className="ml-2 size-4 shrink-0 opacity-50" />
									</Button>
								</DrawerTrigger>

								<DrawerContent className="h-1/2">
									<DrawerHeader>
										<DrawerTitle className="text-center">{label}</DrawerTitle>
										<DrawerDescription className="text-center">
											Select a {label.toLowerCase()}
										</DrawerDescription>
									</DrawerHeader>

									<div className="overflow-y-auto p-4">
										<div className="grid gap-1 p-2">
											{dataList.map((item: dataListItem) => (
												<Button
													key={item.key}
													variant={
														field.value === item.label ? "default" : "outline"
													}
													className="w-full"
													onClick={() => {
														handleInput(item.label)
														setOpen(false)
													}}
												>
													{item.value}
												</Button>
											))}
										</div>
									</div>
								</DrawerContent>
							</Drawer>
						)}

						{field.value && (
							<TooltipProvider>
								<Tooltip delayDuration={0}>
									<TooltipTrigger asChild>
										<Button
											variant="outline"
											className="hover:bg-destructive/10"
											onClick={handleClear}
										>
											<X className="size-4" />
										</Button>
									</TooltipTrigger>
									<TooltipContent>
										<p>{tooltipContent}</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						)}
					</div>
				</FormItem>
			)}
		/>
	)
}

export default FormFieldSelect
