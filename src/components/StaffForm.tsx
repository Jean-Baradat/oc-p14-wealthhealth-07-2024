import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { addMonths, addYears, format, parseISO } from "date-fns"
import { CalendarIcon, OctagonAlert, CircleHelp } from "lucide-react"
import { cn } from "@/utils/utils"
import { Calendar } from "@/components/shadcn/calendar"
import { z } from "zod"
import { Button } from "@/components/shadcn/button"
import { getMonthsList, getYearsList } from "@/utils/dateUtils"
import {
	Form,
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
import { toast } from "@/components/shadcn/use-toast"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/shadcn/select"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/shadcn/tooltip"
import { useState, useMemo } from "react"
import { NavLink } from "react-router-dom"

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
		.regex(/^\d{4}-\d{2}-\d{2}$/, "Format must be YYYY-MM-DD")
		.date()
		.transform(dateString => new Date(dateString))
		.refine(date => date >= new Date("1900-01-01"), {
			message: "Must be after January 1st, 1900",
		})
		.refine(date => date <= new Date(), {
			message: "Cannot be in the future",
		}),
})

const StaffForm = () => {
	const years = useMemo(() => getYearsList(), [])
	const months = useMemo(() => getMonthsList(), [])
	const [date, setDate] = useState<Date | null>(null)

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			"first-name": "",
			"last-name": "",
			"date-of-birth": "",
		},
	})

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

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6"
			>
				<FormField
					control={form.control}
					name="first-name"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="inline-flex items-center gap-1">
								<span>First Name</span>
								{form.formState.errors["first-name"] && (
									<OctagonAlert className="size-4" />
								)}
								<FormMessage />
							</FormLabel>

							<FormControl>
								<div className="flex gap-2">
									<Input
										maxLength={30}
										placeholder="John"
										{...field}
									/>
									{form.formState.errors["first-name"]?.type ===
										"invalid_string" && (
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant={"link"}
													className="hover:bg-muted"
												>
													<CircleHelp className="size-4" />
												</Button>
											</PopoverTrigger>
											<PopoverContent align="end">
												<p className="pb-2">
													Please enter only letters, with or without accents.
													You can include spaces, hyphens or an apostrophe
													between words. Your entry must not exceed three words.
												</p>
												<p className="pb-3">
													Examples: Jean-Pierre, O'Connor, محمد, Иван, María
													José D.
												</p>
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

				<FormField
					control={form.control}
					name="last-name"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="inline-flex items-center gap-1">
								<span>Last Name</span>
								{form.formState.errors["last-name"] && (
									<OctagonAlert className="size-4" />
								)}
								<FormMessage />
							</FormLabel>

							<FormControl>
								<div className="flex gap-2">
									<Input
										maxLength={30}
										placeholder="Doe"
										{...field}
									/>
									{form.formState.errors["last-name"]?.type ===
										"invalid_string" && (
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant={"link"}
													className="hover:bg-muted"
												>
													<CircleHelp className="size-4" />
												</Button>
											</PopoverTrigger>
											<PopoverContent align="end">
												<p className="pb-2">
													Please enter only letters, with or without accents.
													You can include spaces, hyphens or an apostrophe
													between words. Your entry must not exceed three words.
												</p>
												<p className="pb-3">
													Examples: Dubois, Fitzgerald, الحسن, Петров, Rodríguez
												</p>
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

				<FormField
					control={form.control}
					name="date-of-birth"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="inline-flex items-center gap-1">
								<span>Date of Birth</span>
								{form.formState.errors["date-of-birth"] && (
									<OctagonAlert className="size-4" />
								)}
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
													onValueChange={year => {
														const selectedYear = parseInt(year)
														let newDate = null

														if (date) {
															newDate = addYears(
																date,
																selectedYear - date.getFullYear(),
															)
														} else {
															newDate = new Date(selectedYear, 0, 1)
														}

														setDate(newDate)
														field.onChange(format(newDate, "yyyy-MM-dd"))
													}}
													defaultValue={date ? format(date, "yyyy") : undefined}
													value={date ? format(date, "yyyy") : undefined}
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
													onValueChange={month => {
														const selectedMonth = parseInt(month) - 1
														let newDate = null

														if (date) {
															newDate = addMonths(
																date,
																selectedMonth - date.getMonth(),
															)
														} else {
															newDate = new Date(
																new Date().getFullYear(),
																selectedMonth,
																1,
															)
														}

														setDate(newDate)
														field.onChange(format(newDate, "yyyy-MM-dd"))
													}}
													defaultValue={date ? format(date, "M") : undefined}
													value={date ? format(date, "M") : undefined}
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
												selected={date}
												defaultMonth={date}
												key={date?.toISOString()}
												onSelect={value => {
													if (
														value instanceof Date &&
														!isNaN(value.getTime())
													) {
														setDate(value)
														field.onChange(format(value, "yyyy-MM-dd"))
													}
												}}
												disabled={date =>
													date >= new Date() || date <= new Date("1900-01-01")
												}
											/>
										</PopoverContent>
									</Popover>
									<Input
										maxLength={10}
										placeholder="1994-02-22"
										{...field}
										onChange={e => {
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
										}}
									/>
								</div>
							</FormControl>
						</FormItem>
					)}
				/>

				<Button type="submit">Save</Button>
			</form>
		</Form>
	)
}

export default StaffForm
