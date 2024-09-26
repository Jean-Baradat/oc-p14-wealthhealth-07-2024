import { useEffect, useState } from "react"

/**
 * A custom React hook that listens to a media query and returns whether it matches or not.
 *
 * @param {string} query The media query string to listen to.
 * @returns {boolean} Returns true if the media query matches, false otherwise.
 *
 * @example
 * const isLargeScreen = useMediaQuery("(min-width: 1024px)");
 */
export const useMediaQuery = (query: string): boolean => {
	const [value, setValue] = useState(false)

	useEffect(() => {
		const onChange = (e: MediaQueryListEvent) => {
			setValue(e.matches)
		}

		const result = matchMedia(query)
		result.addEventListener("change", onChange)
		setValue(result.matches)

		return () => result.removeEventListener("change", onChange)
	}, [query])

	return value
}
