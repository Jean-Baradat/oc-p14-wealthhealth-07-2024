import { createSlice } from "@reduxjs/toolkit"

export type StaffFormFormSubmitted = {
	"first-name": string
	"last-name": string
	"date-of-birth": string
	"date-of-start": string
	street: string
	city: string
	state: string
	zipCode: string
	department: string
	key: string
}

export type StaffFormFields = {
	"first-name": string
	"last-name": string
	"date-of-birth": string
	"date-of-start": string
	street: string
	city: string
	state: string
	zipCode: string
	department: string
}

export interface StaffFormAddressFound {
	address: {
		road?: string
		city?: string
		postcode?: string
		house_number?: string
		state?: string
		town?: string
		village?: string
		municipality?: string
		suburb?: string
		borough?: string
		city_district?: string
		locality?: string
		hamlet?: string
		district?: string
		subdivision?: string
		quarter?: string
		isolated_dwelling?: string
	}
	display_name: string
}

export interface StaffFormState {
	formFields: StaffFormFields
	addressFound: StaffFormAddressFound
	formSubmitted: StaffFormFormSubmitted[]
}

const initialState: StaffFormState = {
	formFields: {
		"first-name": "",
		"last-name": "",
		"date-of-birth": "",
		"date-of-start": "",
		street: "",
		city: "",
		state: "",
		zipCode: "",
		department: "",
	},

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
	},

	formSubmitted: [],
}

export const staffFormSlice = createSlice({
	name: "staffForm",
	initialState,
	reducers: {
		updateFormFields: (state, { payload }) => {
			Object.assign(state.formFields, payload)
		},
		updateAddressFound: (state, { payload }) => {
			Object.assign(state.addressFound, payload)
		},
		submitForm: (state, { payload }: { payload: StaffFormFormSubmitted }) => {
			state.formSubmitted = [...state.formSubmitted, payload]
		},
		resetAddressFound: state => {
			state.addressFound = initialState.addressFound
		},
	},
})

export const {
	updateFormFields,
	updateAddressFound,
	submitForm,
	resetAddressFound,
} = staffFormSlice.actions

export const staffFormFieldsState = (state: { staffForm: StaffFormState }) => {
	return state.staffForm.formFields
}
export const staffFormAddressFoundState = (state: {
	staffForm: StaffFormState
}) => {
	return state.staffForm.addressFound
}
export const staffFormFormSubmittedState = (state: {
	staffForm: StaffFormState
}) => {
	return state.staffForm.formSubmitted
}
