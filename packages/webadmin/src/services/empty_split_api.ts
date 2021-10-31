import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RootState } from "../app/types";

// initialize an empty api service that we'll inject endpoints into later as needed
const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).user;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
});

export default emptySplitApi;
