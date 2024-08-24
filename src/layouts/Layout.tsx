import { Outlet } from "react-router"
import Aside from "@/layouts/Aside"
import Header from "@/layouts/Header"
import { Toaster } from "@/components/shadcn/toaster"

const Layout = () => {
	return (
		<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
			<Aside />
			<div className="flex flex-col">
				<Header />
				<Outlet />
				<Toaster />
			</div>
		</div>
	)
}

export default Layout
