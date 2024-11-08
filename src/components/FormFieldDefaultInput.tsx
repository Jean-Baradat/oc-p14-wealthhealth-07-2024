import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/shadcn/form"
import { Input } from "@/components/shadcn/input"
import { Popover, PopoverContent } from "@/components/shadcn/popover"
import { PopoverTrigger } from "@radix-ui/react-popover"
import { Button } from "@/components/shadcn/button"
import { CircleHelp, OctagonAlert } from "lucide-react"
import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import { useController } from "react-hook-form"
import { StaffFormFieldsType } from "@/components/StaffForm"

interface FormFieldDefaultInputProps extends StaffFormFieldsType {
	input: { maxLength: number; placeholder: string }
	invalidStringMessage: { content: string; example: string }
	autocompleteValue?: string
}

const FormFieldDefaultInput = ({
	form,
	name,
	label,
	input,
	invalidStringMessage,
	autocompleteValue = "",
}: FormFieldDefaultInputProps) => {
	const [hasUserEdited, setHasUserEdited] = useState(false)

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

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value

		setHasUserEdited(true)
		field.onChange(newValue)
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

					<FormControl>
						<div className="flex gap-2">
							{autocompleteValue ? (
								<Input
									maxLength={input.maxLength}
									placeholder={input.placeholder}
									{...field}
									onChange={handleInput}
									className={
										form.errors[name] && "focus-visible:ring-destructive"
									}
								/>
							) : (
								<Input
									maxLength={input.maxLength}
									placeholder={input.placeholder}
									{...field}
									className={
										form.errors[name] && "focus-visible:ring-destructive"
									}
								/>
							)}

							{form.errors[name]?.type === "invalid_string" && (
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant={"outline"}
											className="hover:bg-muted"
										>
											<CircleHelp className="size-4" />
										</Button>
									</PopoverTrigger>
									<PopoverContent align="end">
										<p className="pb-2 text-justify">
											{invalidStringMessage.content}
										</p>
										<p className="pb-3">{invalidStringMessage.example}</p>
										<Button
											className="w-full"
											asChild
										>
											<NavLink to="">A problem ? Report a bug</NavLink>
										</Button>
									</PopoverContent>
								</Popover>
							)}
						</div>
					</FormControl>
				</FormItem>
			)}
		/>
	)
}

export default FormFieldDefaultInput
