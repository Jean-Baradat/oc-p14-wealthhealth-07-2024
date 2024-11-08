export type getYearsListProps = {
	value: string
	key: string
}[]

export type getMonthsListProps = {
	value: string
	monthNumber: string
	key: string
}[]

/**
 * Return a list of years with a key
 */
export const getYearsList = (): getYearsListProps => {
	return Array.from(
		{ length: new Date().getFullYear() - 1900 + 1 },
		(_, i) => 1900 + i,
	)
		.reverse()
		.map((v, i) => {
			return {
				value: `${v}`,
				key: `year-${v}-${i}`,
			}
		})
}

/**
 * Return a list of months with a number and a key
 */
export const getMonthsList = (): getMonthsListProps => {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	]

	return months.map((month, i) => ({
		value: `${month}`,
		monthNumber: `${i + 1}`,
		key: `${month.toLowerCase()}-${i}`,
	}))
}
