import React from "react";
import { Link } from "react-router-dom";
import { useGetBooksQuery } from "../app/redux/features/book/bookApi";
import { setFeatured } from "../app/redux/features/book/filterSlice";
import { useAppDispatch, useAppSelector } from "../app/redux/hooks/hooks";
import { IBook } from "../shared/types/book/type";

interface DisplayProductProps {
  limit?: number;
}

function DisplayProduct({ limit }: DisplayProductProps) {
  const dispatch = useAppDispatch();
  const { data: books } = useGetBooksQuery(limit);
  const { featured } = useAppSelector((state) => state.filter);

  return (
    <div className="py-12 px-6 2xl:px-6 container">
      <div className="order-2 xl:-order-1">
        <div className="flex items-center justify-between mb-12">
          <h4 className="mt-2 text-xl font-bold">Book List</h4>
          <div className="flex items-center space-x-4">
           <button  className={`filter-btn active-filter`}>
           <Link to='/add-book'>
              Add Book
            </Link>
           </button>
          </div>
        </div>
        {books?.data?.length ? (
          <div className="space-y-6 md:space-y-0 md:grid grid-cols-1 lg:grid-cols-3 gap-6">
            {books?.data?.map((book:IBook) => (
              <Link to={`/get-single-book/${book._id}`} className="book-card" key={book._id}>
                <img
                  className="h-[240px] w-[170px] object-cover"
                  src={book.image}
                  alt="book"
                />
                <div className="flex-1 h-full pr-2 pt-2 flex flex-col">
                  <div className="flex items-center justify-between">
                    <div>
                    </div>
                  </div>
                  <div className="space-y-2 mt-4 h-full">
                    <h4 className="book-name">{book.title}</h4>
                    <p className="author">{book.author}</p>
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
