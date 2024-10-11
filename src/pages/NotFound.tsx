import { Button } from "@/components/shadcn/button"
import { Link } from "react-router-dom"

const NotFound = () => {
	return (
		<div className="flex min-h-screen items-center px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
			<div className="w-full space-y-6 text-center">
				<div className="space-y-3">
					<h1 className="text-4xl font-bold tracking-tighter text-primary transition-transform sm:text-5xl">
						404
					</h1>
					<p className="text-primary/60">
						Looks like you've ventured into the unknown digital realm.
					</p>
				</div>
				<Button
					asChild
					className="font-bold uppercase"
				>
					<Link to="/">Return to website</Link>
				</Button>
			</div>
		</div>
	)
}

export default NotFound
