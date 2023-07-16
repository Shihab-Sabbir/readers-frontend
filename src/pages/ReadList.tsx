import React, { useEffect, useState } from "react";
import {
  useGetBooksQuery,
  useHandleReadingStatusMutation,
} from "../app/redux/features/book/bookApi";
import { useAppSelector } from "../app/redux/hooks/hooks";
import { IBook } from "../shared/types/book/type";
import Loading from "../components/Laoding";

export default function ReadList() {
  const [readingList, setReadingList] = useState([]);
  const [genre, setGenre] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const { phoneNumber } = useAppSelector((state) => state.auth);
  const { search } = useAppSelector((state) => state.filter);
  const { data: books ,isLoading} = useGetBooksQuery({ search, genre, publicationDate });
  const [handleReadingStatus] = useHandleReadingStatusMutation();

  useEffect(() => {
    if (books?.data && phoneNumber) {
      const readingLists = books.data.filter((book: IBook) =>
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        book.readList?.find((r) => r.phoneNumber == phoneNumber!)
      );
      setReadingList(readingLists);
    }
  }, [books, phoneNumber, setReadingList]);

  if(isLoading){
    return <Loading/>
  }

  return (
    <div className="py-12 px-6 2xl:px-6 container">
      <div className="order-2 xl:-order-1">
        <div className="flex items-center justify-between mb-12">
          <h4 className="mt-2 text-xl font-bold">Reading List</h4>
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
        {readingList?.length ? (
          <div className="space-y-6 md:space-y-0 md:grid grid-cols-1 lg:grid-cols-3 gap-6">
            {readingList?.map((book: IBook, index: number) => (
              <div className="book-card" key={book._id}>
                <img
                  className="h-[240px] w-[170px] object-cover"
                  src={book.image}
                  alt="book"
                />
                <div className="flex-1 h-full pr-2 pt-2 flex flex-col">
                  <div className="mt-4 w-fit text-sm">
                    <select
                      className="px-2 border-purple-400 border py-2 rounded-md"
                      onChange={(e) =>
                        handleReadingStatus({
                          id: book._id,
                          status: e.target.value,
                        })
                      }
                    >
                      <option selected value="" disabled>
                        Choose Reading Status
                      </option>
                      <option value="reading">Reading</option>
                      <option value="read soon">Read soon</option>
                      <option value="finished">Finish Reading</option>
                    </select>
                  </div>
                  <p className="text-xs py-2 capitalize">
                    Status:{" "}
                    {book?.readList?.[index]?.status || "Not selected yet!"}
                  </p>
                  <div className="space-y-2 mt-4 h-full">
                    <h4 className="book-name">{book.title}</h4>
                    <p className="author">{book.author}</p>
                    <p className="author">{book.genre}</p>
                    <p className="author">{book.publicationDate}</p>
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
