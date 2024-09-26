import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/shadcn/button"
import { getMonthsList, getYearsList } from "@/utils/dateUtils"
import { Form } from "@/components/shadcn/form"
import { toast } from "@/components/shadcn/use-toast"
import { useEffect, useMemo } from "react"
import FormFieldDefaultInput from "@/components/FormFieldDefaultInput"
import FormFieldDateInput from "@/components/FormFieldDateInput"
import AutoComplete from "@/components/AutoComplete"
import { useSelector, useDispatch } from "react-redux"
import { staffFormStateData, update } from "@/store/Slices"
import { merge } from "lodash"
import FormFieldSelect from "@/components/FormFieldSelect"
import { states } from "@/db/states"
import { departments } from "@/db/departments"

/**
 * Validation schema for the staff form.
 */
const FormSchema = z.object({
	"first-name": z
		.string()
		.min(1, {
			message: "Required",
		})
		.regex(
			/^[a-zA-Z\xC0-\uFFFF]+([ \-']?[a-zA-Z\xC0-\uFFFF]+){0,2}\.?$/,
			"Format is invalid",
		)
		.min(2, {
			message: "Too short (minimum 2 characters)",
		})
		.max(30, {
			message: "Too long (maximum 30 characters)",
		}),
	"last-name": z
		.string()
		.min(1, {
			message: "Required",
		})
		.regex(
			/^[a-zA-Z\xC0-\uFFFF]+([ \-']?[a-zA-Z\xC0-\uFFFF]+){0,2}\.?$/,
			"Format is invalid",
		)
		.min(2, {
			message: "Too short (minimum 2 characters)",
		})
		.max(30, {
			message: "Too long (maximum 30 characters)",
		}),
	"date-of-birth": z
		.string()
		.min(1, {
			message: "Required",
		})
		.regex(/^\d{2}-\d{2}-\d{4}$/, "Format must be MM-DD-YYYY")
		.transform(DS => {
			const [month, day, year] = DS.split("-")
			return `${year}-${month}-${day}`
		})
		.pipe(z.string().date("Not invalid"))
		.refine(DS => new Date(DS) >= new Date("1900-01-01"), {
			message: "Must be after January 1st, 1900",
		})
		.refine(DS => new Date(DS) <= new Date(), {
			message: "Cannot be in the future",
		}),
	"date-of-start": z
		.string()
		.min(1, {
			message: "Required",
		})
		.regex(/^\d{2}-\d{2}-\d{4}$/, "Format must be MM-DD-YYYY")
		.transform(DS => {
			const [month, day, year] = DS.split("-")
			return `${year}-${month}-${day}`
		})
		.pipe(z.string().date("Not invalid"))
		.refine(DS => new Date(DS) >= new Date("1900-01-01"), {
			message: "Must be after January 1st, 1900",
		})
		.refine(DS => new Date(DS) <= new Date(), {
			message: "Cannot be in the future",
		}),
	street: z
		.string()
		.min(1, {
			message: "Required",
		})
		.regex(/^\d+\s+[a-zA-Z0-9\s.,#-]+$/, "Format is invalid")
		.min(2, {
			message: "Too short (minimum 2 characters)",
		})
		.max(50, {
			message: "Too long (maximum 30 characters)",
		}),
	city: z
		.string()
		.min(1, {
			message: "Required",
		})
		.regex(/^[a-zA-Z\s.,'-]+$/, "Format is invalid")
		.min(2, {
			message: "Too short (minimum 2 characters)",
		})
		.max(50, {
			message: "Too long (maximum 30 characters)",
		}),
	zipCode: z
		.string()
		.min(1, {
			message: "Required",
		})
		.regex(/^\d{5}(-\d{4})?$/, "Format is invalid")
		.min(5, {
			message: "Too short (minimum 5 numbers)",
		})
		.max(10, {
			message: "Too long (maximum 10 characters, including hyphen)",
		}),
	state: z.string().min(1, {
		message: "Required",
	}),
	department: z.string().min(1, {
		message: "Required",
	}),
})

const StaffForm = () => {
	const years = useMemo(() => getYearsList(), [])
	const months = useMemo(() => getMonthsList(), [])
	const dispatch = useDispatch()
	const staffFormData = useSelector(staffFormStateData)
	const { addressFound } = staffFormData

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: staffFormData,
	})

	const {
		handleSubmit,
		getValues,
		control,
		formState: { errors },
	} = form

	useEffect(() => {
		return () => {
			dispatch(update(merge({}, staffFormData, getValues())))
		}
	}, [])

	const onSubmit = (data: z.infer<typeof FormSchema>) => {
		toast({
			title: "You submitted the following values:",
			description: (
				<pre className="mt-2 w-[340px] overflow-x-auto rounded-md bg-slate-800 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		})
	}

	/**
	 * Constructs a street address string from the found address data.
	 * Combines the house number and road name if available.
	 *
	 * @returns {string} The formatted street address
	 */
	const handleAutocompleteValueStreet = (): string => {
		const house_number = addressFound.address.house_number
		const road = addressFound.address.road

		return `${house_number ?? ""}${house_number && road ? " " : ""}${road ?? ""}`
	}

	/**
	 * Retrieves the city name from the found address data.
	 * Searches through a hierarchy of address components to find the most appropriate city name.
	 *
	 * @returns {string} The city name if found, or an empty string if no suitable city name is available
	 */
	const handleAutocompleteValueCity = (): string => {
		const address = addressFound.address
		const cityHierarchy = [
			"city",
			"town",
			"village",
			"municipality",
			"suburb",
			"borough",
			"city_district",
			"locality",
			"hamlet",
			"district",
			"subdivision",
			"quarter",
			"isolated_dwelling",
		]

		for (const key of cityHierarchy) {
			if (address[key] && address[key].trim() !== "") {
				return address[key]
			}
		}

		return ""
	}

	return (
		<Form {...form}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-6"
			>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<FormFieldDefaultInput
						form={{ control, errors }}
						name="first-name"
						label="First Name"
						input={{ maxLength: 30, placeholder: "John" }}
						invalidStringMessage={{
							content: `
								Please enter only letters, with or without accents.
								You can include spaces, hyphens or an apostrophe between words. 
								Your entry must not exceed three words. Trim any leading 
								or trailing spaces from your input.
							`,
							example:
								"Examples: Jean-Pierre, O'Connor, محمد, Иван, María José D.",
						}}
					/>

					<FormFieldDefaultInput
						form={{ control, errors }}
						name="last-name"
						label="Last Name"
						input={{ maxLength: 30, placeholder: "Doe" }}
						invalidStringMessage={{
							content: `
								Please enter only letters, with or without accents.
								You can include spaces, hyphens or an apostrophe
								between words. Your entry must not exceed three words.
								Trim any leading or trailing spaces from your input.
							`,
							example: "Examples: Dubois, Fitzgerald, الحسن, Петров, Rodríguez",
						}}
					/>
				</div>

				<FormFieldDateInput
					form={{ control, errors }}
					name="date-of-birth"
					label="Date of Birth"
					years={years}
					months={months}
					input={{ maxLength: 10, placeholder: "02-22-1994" }}
				/>

				<FormFieldDateInput
					form={{ control, errors }}
					name="date-of-start"
					label="Date of Start"
					years={years}
					months={months}
					input={{ maxLength: 10, placeholder: "02-22-1994" }}
				/>

				<fieldset className="min-w-0 rounded-md border p-4">
					<legend className="px-2 text-sm font-semibold">Address</legend>
					<div className="flex flex-col gap-4">
						<AutoComplete
							inputPlaceholder="e.g. 1600 Pennsylvania Avenue NW, Washington, DC 20500"
							displayName={addressFound.display_name}
						/>

						<div className="grid gap-4 rounded-lg border bg-muted/10 px-3 py-2">
							<FormFieldDefaultInput
								form={{ control, errors }}
								name="street"
								label="Street"
								input={{ maxLength: 100, placeholder: "1234 Main St" }}
								invalidStringMessage={{
									content: `
										Please enter a valid address, starting with its number, 
										then its name and type, and other information if necessary. 
										You can include spaces, hyphens, commas, dots or a pound sign.
									`,
									example:
										"Exemples : 123 Main St, 42 Broadway Ave #1234, 1600 Pennsylvania Avenue NW",
								}}
								autocompleteValue={handleAutocompleteValueStreet()}
							/>
							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<FormFieldDefaultInput
									form={{ control, errors }}
									name="city"
									label="City"
									input={{ maxLength: 100, placeholder: "New York" }}
									invalidStringMessage={{
										content: `
											...
										`,
										example: "Examples: ...",
									}}
									autocompleteValue={handleAutocompleteValueCity()}
								/>
								<FormFieldSelect
									form={{ control, errors }}
									name="state"
									label="State"
									dataList={states}
									placeholder="Select a state"
									tooltipContent="Delete the state"
								/>
							</div>

							<FormFieldDefaultInput
								form={{ control, errors }}
								name="zipCode"
								label="ZIP Code"
								input={{ maxLength: 10, placeholder: "10001" }}
								invalidStringMessage={{
									content: `
										...
									`,
									example: "Examples: ...",
								}}
								autocompleteValue={addressFound.address.postcode}
							/>
						</div>
					</div>
				</fieldset>

				<FormFieldSelect
					form={{ control, errors }}
					name="department"
					label="Department"
					dataList={departments}
					placeholder="Select a department"
					tooltipContent="Delete the department"
				/>

				<Button type="submit">Save</Button>
			</form>
		</Form>
	)
}

export default StaffForm
