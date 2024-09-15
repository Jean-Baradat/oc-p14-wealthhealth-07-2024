import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { openStreetMapApi } from "@/store/ApiSlices"
import { staffFormSlice } from "@/store/Slices"

export const store = configureStore({
	reducer: {
		[openStreetMapApi.reducerPath]: openStreetMapApi.reducer,
		[staffFormSlice.name]: staffFormSlice.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(openStreetMapApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
