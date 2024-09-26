import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/shadcn/form"
import { OctagonAlert, X } from "lucide-react"
import { states, type State } from "@/db/states"

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

const FormFieldSelect = ({ form, name, label, autocompleteValue = "" }) => {
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
								<SelectTrigger>
									<SelectValue placeholder="Select a state" />
								</SelectTrigger>
							</FormControl>
							<SelectContent className="max-h-48">
								<SelectItem value="clear">Clear selection</SelectItem>
								{states.map((state: State) => (
									<SelectItem
										key={state.key}
										value={state.label}
									>
										{state.value}
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
											className="hover:bg-muted"
											onClick={handleClear}
										>
											<X className="size-4" />
										</Button>
									</TooltipTrigger>
									<TooltipContent>
										<p>Delete State</p>
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
