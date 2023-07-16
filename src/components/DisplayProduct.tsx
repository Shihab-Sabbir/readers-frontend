import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useGetBooksQuery } from "../app/redux/features/book/bookApi";
import { IBook } from "../shared/types/book/type";
import { useAppSelector } from "../app/redux/hooks/hooks";
import { RootState } from "../shared/types/global/types";

interface DisplayProductProps {
  limit?: number;
}

function DisplayProduct({ limit }: DisplayProductProps) {
  const location = useLocation();
  const [genre, setGenre] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const { token } = useAppSelector((state: RootState) => state.auth);
  const { search } = useAppSelector((state) => state.filter);
  const { data: books } = useGetBooksQuery({
    limit,
    search,
    genre,
    publicationDate,
  });

  return (
    <div className="py-12 px-6 2xl:px-6 container">
      <div className="order-2 xl:-order-1">
        <div className="flex items-center justify-between mb-12">
          {location.pathname.includes("all-books") && (
            <h4 className="mt-2 text-xl font-bold">All Book List</h4>
          )}
          {location.pathname.includes("all-books") || (
            <h4 className="mt-2 text-xl font-bold">Top Books</h4>
          )}
          <div className="flex items-center space-x-4">
            {location.pathname.includes("all-books") && !!token && (
              <button className={`filter-btn active-filter shadow-xl`}>
                <Link to="/add-book">Add Book</Link>
              </button>
            )}
            <div className="flex gap-2 bg-white p-2 shadow-lg rounded-xl">
                <input
                  onChange={(e) => setGenre(e.target.value)}
                  type="text"
                  className="placeholder:text-xs text-xs pl-2"
                  placeholder="Filter by Genre"
                />
                <input
                  onChange={(e) => setPublicationDate(e.target.value)}
                  type="text"
                  className="placeholder:text-xs text-xs pl-2"
                  placeholder="Filter by Publishing Year"
                />
              </div>
          </div>
        </div>
        {books?.data?.length ? (
          <div className="space-y-6 md:space-y-0 md:grid grid-cols-1 lg:grid-cols-3 gap-6">
            {books?.data?.map((book: IBook) => (
              <Link
                to={`/get-single-book/${book._id}`}
                className="book-card"
                key={book._id}
              >
                <img
                  className="h-[240px] w-[170px] object-cover"
                  src={book.image}
                  alt="book"
                />
                <div className="flex-1 h-full pr-2 pt-2 flex flex-col">
                  <div className="flex items-center justify-between">
                    <div></div>
                  </div>
                  <div className="space-y-2 mt-4 h-full">
                    <h4 className="book-name">{book.title}</h4>
                    <p className="author">{book.author}</p>
                    <p className="author">{book.genre}</p>
                    <p className="author">{book.publicationDate}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p>No book Found</p>
        )}
      </div>
    </div>
  );
}

export default DisplayProduct;
