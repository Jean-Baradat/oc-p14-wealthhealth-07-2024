import { addMonths, addYears, format } from "date-fns"
import { CalendarIcon, OctagonAlert } from "lucide-react"
import { Calendar } from "@/components/shadcn/calendar"
import { Button } from "@/components/shadcn/button"
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/shadcn/form"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/shadcn/popover"
import { Input } from "@/components/shadcn/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/shadcn/select"
import { useState } from "react"
import { ControllerRenderProps } from "react-hook-form"
import { StaffFormFields } from "@/store/Slices"
import { getMonthsListProps, getYearsListProps } from "@/utils/dateUtils"
import { StaffFormFieldsType } from "@/components/StaffForm"

interface FormFieldDateInputProps extends StaffFormFieldsType {
	years: getYearsListProps
	months: getMonthsListProps
	input: { maxLength: number; placeholder: string }
}

type SelectedDateReturn<T> = T extends Date
	? Date | undefined
	: string | undefined

const FormFieldDateInput = ({
	form,
	name,
	label,
	years,
	months,
	input,
}: FormFieldDateInputProps) => {
	const [date, setDate] = useState<Date | null>(null)

	/**
	 * Handles the selection of a year from the years dropdown
	 * Updates the date state and the form field value
	 */
	const handleYearsSelect = (
		year: string,
		field: ControllerRenderProps<StaffFormFields>,
	) => {
		const selectedYear = parseInt(year)
		let newDate = null

		if (date) {
			newDate = addYears(date, selectedYear - date.getFullYear())
		} else {
			newDate = new Date(selectedYear, 0, 1)
		}

		setDate(newDate)
		field.onChange(format(newDate, "MM-dd-yyyy"))
	}

	/**
	 * Handles the selection of a month from the months dropdown
	 * Updates the date state and the form field value
	 */
	const handleMonthsSelect = (
		month: string,
		field: ControllerRenderProps<StaffFormFields>,
	) => {
		const selectedMonth = parseInt(month) - 1
		let newDate = null

		if (date) {
			newDate = addMonths(date, selectedMonth - date.getMonth())
		} else {
			newDate = new Date(new Date().getFullYear(), selectedMonth, 1)
		}

		setDate(newDate)
		field.onChange(format(newDate, "MM-dd-yyyy"))
	}

	/**
	 * Handles the input change event for the date input field
	 * Updates the date state and the form field value if the input is a valid date
	 */
	const handleInput = (
		e: React.ChangeEvent<HTMLInputElement>,
		field: ControllerRenderProps<StaffFormFields>,
	) => {
		const inputDate = new Date(e.target.value)

		if (
			inputDate instanceof Date &&
			!isNaN(inputDate.getTime()) &&
			inputDate <= new Date() &&
			inputDate >= new Date("1900-01-01")
		) {
			setDate(inputDate)
		}

		field.onChange(e.target.value)
	}

	/**
	 * Handles the calendar date selection
	 * Updates the date state and the form field value if the selected value is a valid date
	 */
	const handleCalendar = (
		value: Date | undefined,
		field: ControllerRenderProps<StaffFormFields>,
	) => {
		if (value instanceof Date && !isNaN(value.getTime())) {
			setDate(value)
			field.onChange(format(value, "MM-dd-yyyy"))
		}
	}

	const handleSelectedDateCalendar = <T extends Date | string>(
		fieldValue: string,
		type: "year" | "month" | "calendar",
	): SelectedDateReturn<T> => {
		const fieldDate = new Date(fieldValue)
		const isValidDate = fieldDate instanceof Date && !isNaN(fieldDate.getTime())
		const isFutureDate = fieldDate > new Date()

		if (date) {
			switch (type) {
				case "calendar":
					return date as SelectedDateReturn<T>
				case "month":
					return format(date, "M") as SelectedDateReturn<T>
				case "year":
					return format(date, "yyyy") as SelectedDateReturn<T>
			}
		}

		if (!isValidDate || isFutureDate) {
			return (type === "calendar" ? null : undefined) as SelectedDateReturn<T>
		}

		switch (type) {
			case "calendar":
				return fieldDate as SelectedDateReturn<T>
			case "month":
				return format(fieldDate, "M") as SelectedDateReturn<T>
			case "year":
				return format(fieldDate, "yyyy") as SelectedDateReturn<T>
			default:
				return undefined as SelectedDateReturn<T>
		}
	}

	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel className="inline-flex items-center gap-1">
						<span>{label}</span>
						{form.errors[name] && <OctagonAlert className="size-4" />}
						<FormMessage />
					</FormLabel>

					<FormControl>
						<div className="flex gap-2">
							<Popover>
								<PopoverTrigger asChild>
									<Button variant={"outline"}>
										<CalendarIcon className="size-4" />
									</Button>
								</PopoverTrigger>

								<PopoverContent
									className="w-auto p-3"
									align="start"
								>
									<div className="flex gap-3">
										<Select
											onValueChange={year => handleYearsSelect(year, field)}
											defaultValue={handleSelectedDateCalendar<string>(
												field.value,
												"year",
											)}
											value={handleSelectedDateCalendar<string>(
												field.value,
												"year",
											)}
										>
											<SelectTrigger>
												<SelectValue placeholder="Select Year" />
											</SelectTrigger>
											<SelectContent
												position="popper"
												className="max-h-80"
											>
												{years.map(year => {
													return (
														<SelectItem
															key={year.key}
															value={year.value}
														>
															{year.value}
														</SelectItem>
													)
												})}
											</SelectContent>
										</Select>
										<Select
											onValueChange={month => handleMonthsSelect(month, field)}
											defaultValue={handleSelectedDateCalendar<string>(
												field.value,
												"month",
											)}
											value={handleSelectedDateCalendar<string>(
												field.value,
												"month",
											)}
										>
											<SelectTrigger>
												<SelectValue placeholder="Select Month" />
											</SelectTrigger>
											<SelectContent
												position="popper"
												className="max-h-80"
											>
												{months.map(value => {
													return (
														<SelectItem
															key={value.key}
															value={value.monthNumber}
														>
															{value.value}
														</SelectItem>
													)
												})}
											</SelectContent>
										</Select>
									</div>
									<Calendar
										mode="single"
										selected={handleSelectedDateCalendar<Date>(
											field.value,
											"calendar",
										)}
										defaultMonth={handleSelectedDateCalendar<Date>(
											field.value,
											"calendar",
										)}
										key={date?.toISOString()}
										onSelect={value => handleCalendar(value, field)}
										disabled={date =>
											date >= new Date() || date <= new Date("1900-01-01")
										}
									/>
								</PopoverContent>
							</Popover>
							<Input
								maxLength={input.maxLength}
								placeholder={input.placeholder}
								{...field}
								onChange={e => handleInput(e, field)}
								className={
									form.errors[name] && "focus-visible:ring-destructive"
								}
							/>
						</div>
					</FormControl>
				</FormItem>
			)}
		/>
	)
}

export default FormFieldDateInput
