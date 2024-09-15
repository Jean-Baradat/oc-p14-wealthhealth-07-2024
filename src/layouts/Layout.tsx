import { Outlet } from "react-router"
import Aside from "@/layouts/Aside"
import Header from "@/layouts/Header"
import { Toaster } from "@/components/shadcn/toaster"

const Layout = () => {
	return (
		<div
			className="grid min-h-screen w-full grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[280px_minmax(0,1fr)]"
			{...{ "vaul-drawer-wrapper": "" }}
			style={{ backgroundColor: "hsl(var(--background))" }}
		>
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
