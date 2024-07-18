/* eslint-disable indent */
/**
 * contain the context definition and associated types
 */

import { createContext } from "react"

/**
 * Possible themes
 */
type Theme = "dark" | "light" | "system"

/**
 * Context providing the current theme and a function for updating it
 */
const ThemeProviderContext = createContext<{
	theme: Theme
	setTheme: (theme: Theme) => void
}>({
	theme: "system" as Theme,
	setTheme: () => null,
})

export type { Theme }
export { ThemeProviderContext }
