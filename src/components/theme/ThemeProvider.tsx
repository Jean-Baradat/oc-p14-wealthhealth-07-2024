import { useEffect, useState, useMemo } from "react"
import { Theme, ThemeProviderContext } from "@/components/theme/ThemeContext"

/**
 * Theme provider component
 * @param children Children's components for wrapping
 * @param defaultTheme Default theme to use
 * @param storageKey Storage key to save the theme in localStorage
 * @returns Theme provider component
 */
export const ThemeProvider = ({
	children,
	defaultTheme,
	storageKey,
	...props
}: {
	children: React.ReactNode
	defaultTheme: Theme
	storageKey: string
}) => {
	const [theme, setTheme] = useState<Theme>(
		() => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
	)

	useEffect(() => {
		const root = window.document.documentElement

		root.classList.remove("light", "dark")

		if (theme === "system") {
			const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
				.matches
				? "dark"
				: "light"

			root.classList.add(systemTheme)
			return
		}

		root.classList.add(theme)
	}, [theme])

	const value = useMemo(
		() => ({
			theme,
			setTheme: (theme: Theme) => {
				localStorage.setItem(storageKey, theme)
				setTheme(theme)
			},
		}),
		[theme, storageKey],
	)

	return (
		<ThemeProviderContext.Provider
			{...props}
			value={value}
		>
			{children}
		</ThemeProviderContext.Provider>
	)
}
