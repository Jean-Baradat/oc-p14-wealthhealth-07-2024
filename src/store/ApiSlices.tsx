import { createApi } from "@reduxjs/toolkit/query/react"
import axios, { AxiosError } from "axios"

interface RequestParams {
	url: string
	method: "GET" | "POST" | "PUT" | "DELETE"
	params?: Record<string, string | number>
}

const axiosBaseQuery = ({ baseUrl }: { baseUrl: string } = { baseUrl: "" }) => {
	return async ({
		url,
		method,
		params,
	}: RequestParams): Promise<
		| {
				data: []
		  }
		| {
				error: { status: number | undefined; data: string | object }
		  }
	> => {
		try {
			const result = await axios({
				url: baseUrl + url,
				method,
				params,
			})

			return { data: result.data }
		} catch (axiosError) {
			const error = axiosError as AxiosError

			return {
				error: {
					status: error.response?.status,
					data: error.response?.data || error.message,
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
