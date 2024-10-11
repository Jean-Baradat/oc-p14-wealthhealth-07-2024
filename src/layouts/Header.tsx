import { Link, NavLink } from "react-router-dom"
import { CircleUser, Home, Menu, List, X } from "lucide-react"

import { Button } from "@/components/shadcn/button"
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetTitle,
	SheetDescription,
	SheetClose,
} from "@/components/shadcn/sheet"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"
import ModeToggle from "@/components/ModeToggle"
import { useState } from "react"

const Header = () => {
	const [open, setOpen] = useState(false)

	return (
		<header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-muted/40 px-4 backdrop-blur-sm md:justify-end lg:h-[60px] lg:px-6">
			<Sheet
				open={open}
				onOpenChange={setOpen}
			>
				<SheetTrigger asChild>
					<Button
						variant="outline"
						size="icon"
						className="shrink-0 md:hidden"
					>
						<Menu className="size-5" />
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
						<div className="mb-5 flex items-center justify-between">
							<Link
								to="/"
								className="flex items-center gap-4 text-lg font-semibold"
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
							<SheetClose asChild>
								<Button
									size={"icon"}
									variant={null}
								>
									<X className="size-4" />
									<span className="sr-only">Close</span>
								</Button>
							</SheetClose>
						</div>

						<NavLink
							to="/"
							onClick={() => setOpen(false)}
							className={({ isActive }) =>
								`mx-[-0.65rem] flex items-center gap-4 rounded px-3 py-2 ${
									isActive
										? "bg-muted text-foreground hover:text-foreground"
										: "text-muted-foreground"
								}`
							}
						>
							<Home className="size-5" />
							Dashboard
						</NavLink>

						<NavLink
							to="/staff-list"
							onClick={() => setOpen(false)}
							className={({ isActive }) =>
								`mx-[-0.65rem] flex items-center gap-4 rounded px-3 py-2 ${
									isActive
										? "bg-muted text-foreground hover:text-foreground"
										: "text-muted-foreground"
								}`
							}
						>
							<List className="size-5" />
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
					<CircleUser className="size-5" />
				</Button>
			</div>
		</header>
	)
}

export default Header
