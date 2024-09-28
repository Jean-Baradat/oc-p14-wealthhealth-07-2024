import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/shadcn/form"
import { OctagonAlert, X } from "lucide-react"

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

type dataListItem = {
	key: string
	label: string
	value: string
}

const FormFieldSelect = ({
	form,
	name,
	label,
	autocompleteValue = "",
	dataList,
	placeholder,
	tooltipContent,
}) => {
	const [hasUserEdited, setHasUserEdited] = useState(false)

	const { field } = useController({
		name,
		control: form.control,
	})

	useEffect(() => {
		if (!hasUserEdited) {
			if (field.value) {
				field.onChange(field.value)
			} else if (autocompleteValue) {
				field.onChange(autocompleteValue)
			}
		}
	}, [autocompleteValue, field.value])

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
					<FormLabel className="inline-flex items-center gap-1">
						<span>{label}</span>
						{form.errors[name] && <OctagonAlert className="size-4" />}
						<FormMessage />
					</FormLabel>

					<div className="flex items-center gap-2">
						<Select
							onValueChange={handleInput}
							value={field.value || ""}
						>
							<FormControl>
								<SelectTrigger ref={field.ref}>
									<SelectValue placeholder={placeholder} />
								</SelectTrigger>
							</FormControl>
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
						{field.value && (
							<TooltipProvider>
								<Tooltip delayDuration={0}>
									<TooltipTrigger asChild>
										<Button
											variant={"outline"}
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
