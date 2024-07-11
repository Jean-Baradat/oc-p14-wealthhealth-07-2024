import { Link } from "react-router-dom"
import { CircleUser, Home, Menu, List, Package2 } from "lucide-react"

import { Button } from "@/components/shadcn/button"
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetTitle,
	SheetDescription,
} from "@/components/shadcn/sheet"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"

const Header = () => {
	return (
		<header className="flex h-14 items-center justify-between gap-4 border-b bg-muted/40 px-4 md:justify-end lg:h-[60px] lg:px-6">
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
				<SheetContent side="left">
					<SheetTitle>
						<VisuallyHidden.Root>HRnet</VisuallyHidden.Root>
					</SheetTitle>
					<SheetDescription>
						<VisuallyHidden.Root>Navigation menu</VisuallyHidden.Root>
					</SheetDescription>
					<nav className="grid gap-2 text-lg font-medium">
						<Link
							href="#"
							className="mb-5 flex items-center gap-4 text-lg font-semibold"
						>
							<Package2 className="h-6 w-6" />
							<span>HRnet</span>
						</Link>
						<Link
							href="#"
							className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
						>
							<Home className="h-5 w-5" />
							Dashboard
						</Link>
						<Link
							href="#"
							className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
						>
							<List className="h-5 w-5" />
							Staff list
						</Link>
					</nav>
				</SheetContent>
			</Sheet>
			<Button
				variant="secondary"
				size="icon"
				className="rounded-full"
			>
				<CircleUser className="h-5 w-5" />
			</Button>
		</header>
	)
}

export default Header
