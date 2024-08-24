/**
 *
 * @returns
 */
export const getYearsList = () => {
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
 *
 * @returns
 */
export const getMonthsList = () => {
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
