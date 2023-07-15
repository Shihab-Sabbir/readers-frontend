import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { logoutReducer } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  prepareHeaders: (headers) => {
    const token = JSON.parse(
      localStorage.getItem("readers-current-user") || ""
    );
    headers.set("Authorization", `${token}`);
    return headers;
  },
});

const baseQueryWithAuthHandling = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    api.dispatch(logoutReducer());
  }
  return result;
};

const rootApi = createApi({
  reducerPath: "rootApi",
  tagTypes: ["Books"],
  baseQuery: baseQueryWithAuthHandling,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endpoints: (builder) => ({}),
});

export default rootApi;
