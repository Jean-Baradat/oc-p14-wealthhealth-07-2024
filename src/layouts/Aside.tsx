import { Home, List } from "lucide-react"
import { Link, NavLink } from "react-router-dom"

const Aside = () => {
	return (
		<div className="hidden border-r bg-muted/40 md:block">
			<div className="flex h-full flex-col gap-2">
				<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
					<Link
						to="/"
						className="flex items-center gap-2 font-semibold"
					>
						<picture>
							<source
								srcSet="./favicon.webp"
								type="image/webp"
							/>
							<source
								srcSet="./favicon.avif"
								type="image/avif"
							/>
							<img
								src="./favicon-32x32.png"
								alt="HRnet logo"
								className="size-6"
							/>
						</picture>
						<span>HRnet</span>
					</Link>
				</div>
				<div className="flex-1">
					<nav className="sticky top-3 grid items-start gap-2 px-2 text-base lg:top-4 lg:px-4">
						<NavLink
							to="/"
							className={({ isActive }) =>
								`flex items-center gap-3 rounded-lg p-3 transition-all hover:text-primary ${
									isActive
										? "bg-muted text-primary/90"
										: "text-muted-foreground"
								}`
							}
						>
							<Home className="size-5" />
							Dashboard
						</NavLink>
						<NavLink
							to="/staff-list"
							className={({ isActive }) =>
								`flex items-center gap-3 rounded-lg p-3 transition-all hover:text-primary ${
									isActive
										? "bg-muted text-primary/90"
										: "text-muted-foreground"
								}`
							}
						>
							<List className="size-5" />
							Staff list
						</NavLink>
					</nav>
				</div>
			</div>
		</div>
	)
}

export default Aside
