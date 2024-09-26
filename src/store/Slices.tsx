import { createSlice } from "@reduxjs/toolkit"
export interface StaffFormState {
	"first-name"?: string
	"last-name"?: string
	"date-of-birth"?: string
	"date-of-start"?: string
	street?: string
	city?: string
	state?: string
	zipCode?: string
	addressFound?: object
}

const initialState: StaffFormState = {
	"first-name": "",
	"last-name": "",
	"date-of-birth": "",
	"date-of-start": "",
	street: "",
	city: "",
	state: "",
	zipCode: "",
	addressFound: {
		address: {
			road: "",
			city: "",
			postcode: "",
			house_number: "",
			state: "",
			town: "",
			village: "",
			municipality: "",
			suburb: "",
			borough: "",
			city_district: "",
			locality: "",
			hamlet: "",
			district: "",
			subdivision: "",
			quarter: "",
			isolated_dwelling: "",
		},
		display_name: "Finding your address made easy",
		place_id: null,
	},
}

export const staffFormSlice = createSlice({
	name: "staffForm",
	initialState,
	reducers: {
		update: (state, { payload }) => {
			Object.assign(state, payload)
		},
	},
})

export const { update } = staffFormSlice.actions
export const staffFormStateData = (state: { staffForm: StaffFormState }) => {
	return state.staffForm
}
