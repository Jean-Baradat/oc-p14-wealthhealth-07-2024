import StaffForm from "@/components/StaffForm"

const HomePage = () => {
	return (
		<main className="relative grid grid-cols-1 gap-12 p-5 sm:p-10 min-[1400px]:grid-cols-[1fr_2fr]">
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_70%_at_20%_80%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)]"></div>
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_30%_30%_at_90%_10%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)]"></div>
			<div className="relative">
				<h1 className="max-w-max bg-gradient-to-r from-primary to-secondary bg-clip-text text-4xl font-extrabold text-transparent">
					Create an Employee
				</h1>
				<h2 className="mt-2 max-w-max text-xl text-muted-foreground">
					Add a new member to the table in{" "}
					<span className="font-semibold text-primary">Staff list</span>
				</h2>
				<p className="mt-5 max-w-max">
					Use the form to enter the information of the new employee. Make sure
					to fill in all required fields.
				</p>
			</div>
			<div className="relative">
				<StaffForm />
			</div>
		</main>
	)
}

export default HomePage
