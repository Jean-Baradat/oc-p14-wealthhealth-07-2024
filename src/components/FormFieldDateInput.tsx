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

const FormFieldDateInput = ({ form, name, label, years, months, input }) => {
	const [date, setDate] = useState<Date | null>(null)

	// console.log(date)

	/**
	 * Handles the selection of a year from the years dropdown
	 * Updates the date state and the form field value
	 *
	 * @param {string} year - The selected year value as a string
	 * @param {Object} field - The form field object
	 *
	 * @returns {void}
	 */
	const handleYearsSelect = (year, field) => {
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
	 *
	 * @param {string} month - The selected month value as a string
	 * @param {Object} field - The form field object
	 *
	 * @returns {void}
	 */
	const handleMonthsSelect = (month, field) => {
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
	 *
	 * @param {Object} e - The input change event object
	 * @param {Object} field - The form field object
	 *
	 * @returns {void}
	 */
	const handleInput = (e, field) => {
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
	 *
	 * @param {Date} value - The selected date value
	 * @param {Object} field - The form field object
	 *
	 * @returns {void}
	 */
	const handleCalendar = (value, field) => {
		if (value instanceof Date && !isNaN(value.getTime())) {
			setDate(value)
			field.onChange(format(value, "MM-dd-yyyy"))
		}
	}

	/**
	 *
	 * @param fieldValue
	 * @param type
	 * @returns
	 */
	const handleSelectedDateCalendar = (fieldValue, type) => {
		const fieldDate = new Date(fieldValue)
		const isValidDate = fieldDate instanceof Date && !isNaN(fieldDate.getTime())
		const isFutureDate = fieldDate > new Date()

		if (date) {
			switch (type) {
				case "calendar":
					return date
				case "month":
					return format(date, "M")
				case "year":
					return format(date, "yyyy")
			}
		}

		if (!isValidDate || isFutureDate) {
			return type === "calendar" ? null : undefined
		}

		switch (type) {
			case "calendar":
				return fieldDate
			case "month":
				return format(fieldDate, "M")
			case "year":
				return format(fieldDate, "yyyy")
			default:
				return null
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
						{form.formState.errors[name] && <OctagonAlert className="size-4" />}
						<FormMessage />
					</FormLabel>

					<FormControl>
						<div className="flex gap-2">
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant={"outline"}
										className={!date && "text-muted-foreground"}
									>
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
											defaultValue={handleSelectedDateCalendar(
												field.value,
												"year",
											)}
											value={handleSelectedDateCalendar(field.value, "year")}
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
											defaultValue={handleSelectedDateCalendar(
												field.value,
												"month",
											)}
											value={handleSelectedDateCalendar(field.value, "month")}
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
										selected={handleSelectedDateCalendar(
											field.value,
											"calendar",
										)}
										defaultMonth={handleSelectedDateCalendar(
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
							/>
						</div>
					</FormControl>
				</FormItem>
			)}
		/>
	)
}

export default FormFieldDateInput
