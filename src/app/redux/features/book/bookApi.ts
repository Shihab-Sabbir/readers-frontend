import rootApi from "../api/rootApi";

export const bookApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (limit) => `/products?limit=${limit}`,
      providesTags: ["Books"],
    }),
    getBook: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: ["Books"],
    }),
    handleWishList: builder.mutation({
      query: (id) => ({
        url: `/products/wish/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Books"],
    }),
    addBook: builder.mutation({
      query: (book) => ({
        url: "/products",
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation({
      query: ({ book, id }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: book,
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation({
      query: (bookId) => ({
        url: `/products/${bookId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useGetBookQuery,
} = bookApi;
