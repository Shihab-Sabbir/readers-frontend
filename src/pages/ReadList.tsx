import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetBooksQuery } from "../app/redux/features/book/bookApi";
import { useAppSelector } from "../app/redux/hooks/hooks";
import { IBook } from "../shared/types/book/type";

export default function ReadList() {
  const [readingList, setReadingList] = useState([]);
  const { data: books } = useGetBooksQuery(undefined);
  const { phoneNumber } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (books?.data && phoneNumber) {
      const readingLists = books.data.filter((book:IBook) =>
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        book.readList?.includes(phoneNumber!)
      );
      setReadingList(readingLists);
    }
  }, [books, phoneNumber, setReadingList]);

  return (
    <div className="py-12 px-6 2xl:px-6 container">
      <div className="order-2 xl:-order-1">
        <div className="flex items-center justify-between mb-12">
          <h4 className="mt-2 text-xl font-bold">Wished Books List</h4>
        </div>
        {readingList?.length ? (
          <div className="space-y-6 md:space-y-0 md:grid grid-cols-1 lg:grid-cols-3 gap-6">
            {readingList?.map((book: IBook) => (
              <div
                className="book-card"
                key={book._id}
              >
                <img
                  className="h-[240px] w-[170px] object-cover"
                  src={book.image}
                  alt="book"
                />
                <div className="flex-1 h-full pr-2 pt-2 flex flex-col">
                <div className="mt-4 border w-fit rounded-md border-purple-400 text-sm">
                        <select name="" className="px-2 border-purple-400 border">
                            <option value="">Reading</option>
                            <option value="">Read soon</option>
                            <option value="">Finish Reading</option>
                        </select>
                    </div>
                  <div className="space-y-2 mt-4 h-full">
                    <h4 className="book-name">{book.title}</h4>
                    <p className="author">{book.author}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No book Found</p>
        )}
      </div>
    </div>
  );
}
