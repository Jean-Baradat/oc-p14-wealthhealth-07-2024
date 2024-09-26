import { Link, NavLink } from "react-router-dom"
import { CircleUser, Home, Menu, List } from "lucide-react"

import { Button } from "@/components/shadcn/button"
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetTitle,
	SheetDescription,
} from "@/components/shadcn/sheet"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"
import ModeToggle from "@/components/ModeToggle"

const Header = () => {
	return (
		<header className="sticky top-0 flex h-14 items-center justify-between gap-4 border-b bg-muted/40 px-4 backdrop-blur-sm md:justify-end lg:h-[60px] lg:px-6">
			<Sheet>
				<SheetTrigger asChild>
					<Button
						variant="outline"
						size="icon"
						className="shrink-0 md:hidden"
					>
						<Menu className="h-5 w-5" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="bottom">
					<SheetTitle>
						<VisuallyHidden.Root>HRnet</VisuallyHidden.Root>
					</SheetTitle>
					<SheetDescription>
						<VisuallyHidden.Root>Navigation menu</VisuallyHidden.Root>
					</SheetDescription>
					<nav className="grid gap-2 text-lg font-medium">
						<Link
							to="/"
							className="mb-5 flex items-center gap-4 text-lg font-semibold"
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
						<NavLink
							to="/"
							className={({ isActive }) =>
								`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
									isActive
										? "bg-muted text-foreground hover:text-foreground"
										: "text-muted-foreground"
								}`
							}
						>
							<Home className="h-5 w-5" />
							Dashboard
						</NavLink>
						<NavLink
							to="/staff-list"
							className={({ isActive }) =>
								`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
									isActive
										? "bg-muted text-foreground hover:text-foreground"
										: "text-muted-foreground"
								}`
							}
						>
							<List className="h-5 w-5" />
							Staff list
						</NavLink>
					</nav>
				</SheetContent>
			</Sheet>
			<div className="flex gap-3">
				<ModeToggle />
				<Button
					variant="secondary"
					size="icon"
					className="rounded-full"
				>
					<CircleUser className="h-5 w-5" />
				</Button>
			</div>
		</header>
	)
}

export default Header
