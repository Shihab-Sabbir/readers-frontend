import rootApi from "../api/rootApi";

export const bookApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (data) => {
        let query = `/products?searchTerm=${data?.search}`;

        if (data?.limit) {
          query += `&limit=${data.limit}`;
        }

        if (data?.genre) {
          query += `&genre=${data.genre}`;
        }

        if (data?.publicationDate) {
          query += `&publicationYear=${data.publicationDate}`;
        }

        return query;
      },
      providesTags: ["Books"],
      keepUnusedDataFor: 0,
    }),
    getBook: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: ["Books"],
    }),
    handleWishList: builder.mutation({
      query: (id) => ({
        url: `/products/wish/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Books"],
    }),
    handleReadingList: builder.mutation({
      query: (id) => ({
        url: `/products/read-list/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Books"],
    }),
    handleReview: builder.mutation({
      query: ({ id, review }) => ({
        url: `/products/review/${id}`,
        method: "PATCH",
        body: { review },
      }),
      invalidatesTags: ["Books"],
    }),
    handleReadingStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/products/read-status/${id}`,
        method: "PATCH",
        body: { status },
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
  useHandleWishListMutation,
  useHandleReadingListMutation,
  useHandleReadingStatusMutation,
  useHandleReviewMutation,
} = bookApi;
