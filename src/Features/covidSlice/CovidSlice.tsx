// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const countryApi = createApi({
  reducerPath: 'countryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://disease.sh/v3/covid-19/countries' }),
  endpoints: (builder) => ({
    getCountryData: builder.query({
      query: () => '',
    }),
  }),
});

export const graphApi = createApi({
  reducerPath: 'graphApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://disease.sh/v3/covid-19/historical/all?lastdays=all' }),
  endpoints: (builder) => ({
    getGraphData: builder.query({
      query: () => '',
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCountryDataQuery } = countryApi
export const { useGetGraphDataQuery } = graphApi