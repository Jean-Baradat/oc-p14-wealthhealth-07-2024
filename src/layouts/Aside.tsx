import { Home, List } from "lucide-react"
import { Link } from "react-router-dom"

const Aside = () => {
	return (
		<div className="hidden border-r bg-muted/40 md:block">
			<div className="flex h-full max-h-screen flex-col gap-2">
				<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
					<Link
						href="/"
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
								className="h-6 w-6"
							/>
						</picture>
						<span>HRnet</span>
					</Link>
				</div>
				<div className="flex-1">
					<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
						<Link
							href="#"
							className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
						>
							<Home className="h-4 w-4" />
							Dashboard
						</Link>
						<Link
							href="#"
							className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
						>
							<List className="h-4 w-4" />
							Staff list
						</Link>
					</nav>
				</div>
			</div>
		</div>
	)
}

export default Aside
