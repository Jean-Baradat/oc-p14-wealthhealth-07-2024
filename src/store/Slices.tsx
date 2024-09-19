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
	addressDataFound?: object
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
	addressDataFound: {},
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
