import { useContext } from "react"
import { ThemeProviderContext } from "@/components/theme/ThemeContext"

/**
 * Retrieves the current theme context from the ThemeProviderContext
 * @returns The current theme
 */
export const UseTheme = () => {
	const context = useContext(ThemeProviderContext)

	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider")
	}

	return context
}
