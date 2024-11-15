import { Link, NavLink } from "react-router-dom"
import { CircleUser, Home, Menu, List, X, ExternalLinkIcon } from "lucide-react"

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
import { siGithub } from "simple-icons"

const Header = () => {
	const [open, setOpen] = useState(false)
	const [isHovered, setIsHovered] = useState(false)

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
					<nav className="grid gap-3 text-lg font-medium">
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
									<X className="size-7" />
									<span className="sr-only">Close</span>
								</Button>
							</SheetClose>
						</div>

						<NavLink
							to="/"
							onClick={() => setOpen(false)}
							className={({ isActive }) =>
								`flex items-center gap-4 rounded px-3 py-3 ${
									isActive
										? "bg-primary text-base font-bold tracking-wide text-muted"
										: "bg-muted text-base font-bold tracking-wide text-muted-foreground"
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
								`flex items-center gap-4 rounded px-3 py-3 ${
									isActive
										? "bg-primary text-base font-bold tracking-wide text-muted"
										: "bg-muted text-base font-bold tracking-wide text-muted-foreground"
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
				<Button
					variant="secondary"
					size="icon"
					className="relative overflow-hidden rounded-full transition-all duration-300 ease-in-out"
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
					aria-label="Project GitHub"
					style={{
						width: isHovered ? "125px" : "",
					}}
					asChild
				>
					<a
						href="https://github.com/Jean-Baradat/oc-p14-wealthhealth-07-2024"
						target="_blank"
						rel="noopener noreferrer"
					>
						<div className="absolute inset-y-0 left-0 flex w-10 items-center justify-center">
							<svg
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								width="20"
								height="20"
							>
								<path d={siGithub.path} />
							</svg>
						</div>
						<div
							className="absolute inset-y-0 left-10 flex items-center transition-opacity duration-300 ease-in-out"
							style={{
								opacity: isHovered ? 1 : 0,
							}}
						>
							<p className="flex w-full items-center justify-between gap-2 whitespace-nowrap font-semibold">
								<span>GitHub</span>
								<ExternalLinkIcon className="size-3.5" />
							</p>
						</div>
					</a>
				</Button>
				<ModeToggle />
				<Button
					variant="secondary"
					size="icon"
					className="rounded-full"
				>
					<CircleUser className="size-5" />
					<span className="sr-only">My Profile</span>
				</Button>
			</div>
		</header>
	)
}

export default Header
