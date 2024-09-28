import StaffForm from "@/components/StaffForm"

const HomePage = () => {
	return (
		<main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
			<div className="flex items-center">
				<h1 className="sr-only">Create Employee</h1>
			</div>
			<div>
				<StaffForm />
			</div>
		</main>
	)
}

export default HomePage
