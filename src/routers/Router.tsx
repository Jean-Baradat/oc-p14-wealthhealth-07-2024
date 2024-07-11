import { createBrowserRouter } from "react-router-dom"
import HomePage from "@/pages/Home"
import NotFound from "@/pages/NotFound"
import Layout from "@/layouts/Layout"
import StaffList from "@/pages/StaffList"

/**
 * Router is an array of the application's hard routes
 */
const Router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: "/staff-list",
				element: <StaffList />,
			},
		],
	},
	{
		path: "*",
		element: <NotFound />,
	},
])

export default Router
