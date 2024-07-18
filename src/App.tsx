import { RouterProvider } from "react-router-dom"
import Router from "@/routers/Router"
import { ThemeProvider } from "@/components/theme"

const App = () => {
	return (
		<ThemeProvider
			defaultTheme="light"
			storageKey="theme"
		>
			<RouterProvider router={Router} />
		</ThemeProvider>
	)
}

export default App
