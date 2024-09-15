import { createApi } from "@reduxjs/toolkit/query/react"
import axios from "axios"

const axiosBaseQuery = ({ baseUrl } = { baseUrl: "" }) => {
	return async ({ url, method, data, headers, body, params }) => {
		try {
			const result = await axios({
				url: baseUrl + url,
				method,
				data,
				headers,
				body,
				params,
			})

			return { data: result.data }
		} catch (axiosError) {
			return {
				error: {
					status: axiosError.response?.status,
					data: axiosError.response?.data || axiosError.message,
				},
			}
		}
	}
}

export const openStreetMapApi = createApi({
	reducerPath: "openstreetmap",
	baseQuery: axiosBaseQuery({
		baseUrl: `${import.meta.env.VITE_API_OPENSTREETMAP}`,
	}),
	endpoints: builder => {
		return {
			getSearch: builder.query({
				query: input => ({
					url: "/search",
					method: "GET",
					params: {
						format: "json",
						q: input,
						limit: 8,
						addressdetails: 1,
						countrycodes: "US",
						"accept-language": "us",
						layer: "address",
					},
				}),
			}),
		}
	},
})

export const { useGetSearchQuery } = openStreetMapApi
