import StaffListTable from "@/components/StaffListTable"
import { staffFormFormSubmittedState } from "@/store/Slices"
import { useSelector } from "react-redux"

const StaffList = () => {
	const staffFormFormSubmittedData = useSelector(staffFormFormSubmittedState)

	return (
		<main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
			<h1 className="sr-only">Staff list</h1>
			<StaffListTable data={staffFormFormSubmittedData} />
		</main>
	)
}

export default StaffList
