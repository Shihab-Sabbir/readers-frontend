import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetBooksQuery } from "../app/redux/features/book/bookApi";
import { useAppSelector } from "../app/redux/hooks/hooks";
import { IBook } from "../shared/types/book/type";

export default function WishList() {
  const [wishedBook, setWishedBook] = useState([]);
  const { phoneNumber } = useAppSelector((state) => state.auth);
  const { search } = useAppSelector((state) => state.filter);
  const { data: books } = useGetBooksQuery({search});

  useEffect(() => {
    if (books?.data && phoneNumber) {
      const wishedBooks = books.data.filter((book:IBook) =>
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        book.wishedBy?.includes(phoneNumber!)
      );
      setWishedBook(wishedBooks);
    }
  }, [books, phoneNumber, setWishedBook]);

  return (
    <div className="py-12 px-6 2xl:px-6 container">
      <div className="order-2 xl:-order-1">
        <div className="flex items-center justify-between mb-12">
          <h4 className="mt-2 text-xl font-bold">Wished Books List</h4>
        </div>
        {wishedBook?.length ? (
          <div className="space-y-6 md:space-y-0 md:grid grid-cols-1 lg:grid-cols-3 gap-6">
            {wishedBook?.map((book: IBook) => (
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
