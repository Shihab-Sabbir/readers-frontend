import rootApi from "../api/rootApi";

export const authApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    userSignUp: builder.mutation({
      query: (data) => ({
        url: "auth/signup",
        method: "POST",
        body: data,
      }),
    }),
    userSignIn: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useUserSignInMutation, useUserSignUpMutation } = authApi;
