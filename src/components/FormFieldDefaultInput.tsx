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

const FormFieldDefaultInput = ({
	form,
	name,
	label,
	input,
	invalidStringMessage,
}) => {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel className="inline-flex items-center gap-1">
						<span>{label}</span>
						{form.formState.errors[name] && <OctagonAlert className="size-4" />}
						<FormMessage />
					</FormLabel>

					<FormControl>
						<div className="flex gap-2">
							<Input
								maxLength={input.maxLength}
								placeholder={input.placeholder}
								{...field}
							/>
							{form.formState.errors[name]?.type === "invalid_string" && (
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
