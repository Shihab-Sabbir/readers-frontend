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
    const tokenString = localStorage.getItem("readers-current-user");
    const token = tokenString ? JSON.parse(tokenString).accessToken : null;
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
  const status = result?.error?.status;
  const message = result?.error?.data?.message;
  if (status === 404 && message == "TokenExpiredError: jwt expired") {
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
