import React, { useEffect, useState } from "react";
import {
  useDeleteBookMutation,
  useGetBookQuery,
  useHandleReadingListMutation,
  useHandleWishListMutation,
} from "../app/redux/features/book/bookApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { IBook } from "../shared/types/book/type";
import { useAppSelector } from "../app/redux/hooks/hooks";
import { AiFillHeart } from "react-icons/ai";
import { FiBookOpen } from "react-icons/fi";
import { RootState } from "../shared/types/global/types";

export default function BookDetails() {
  const [book, setBook] = useState<IBook | null>(null);
  const [wished, setWished] = useState(false);

  const { id } = useParams();
  const { data } = useGetBookQuery(id, {
    skip: !id,
  });
  const [handleWishList, { isSuccess: isWishListSuccess }] =
    useHandleWishListMutation();
  const [handleReadList, { isSuccess: isReadListSuccess }] =
  useHandleReadingListMutation();
  const { phoneNumber, token } = useAppSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (data?.data) {
      setBook(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (book && phoneNumber) {
      const wishedBy = book.wishedBy;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const isWished = wishedBy?.includes(phoneNumber!);
      if (isWished) {
        setWished(true);
      }
      else{
        setWished(false)
      }
    }
  }, [book, phoneNumber,isWishListSuccess]);

  useEffect(() => {
    if (isWishListSuccess) {
      if (wished) {
        toast.success("Added in wished list", { id: "wishList" });
      } else {
        toast.success("Remove from wished list", { id: "wishList" });
      }
    }
  }, [isWishListSuccess, wished]);

  const [deleteBook, { isSuccess }] = useDeleteBookMutation();
  const navigate = useNavigate();

  if (isSuccess) {
    toast.success("Deleted successfully !", { id: "deletebook" });
    navigate("/");
  }

  return (
    <div className="mb-[100px] mx-auto">
      <div className="book-card w-[600px] mx-auto">
        <div className="relative">
          <img
            className="h-[340px] w-[270px] object-cover"
            src={book?.image}
            alt="book"
          />
        </div>
        <div className="flex-1 h-full pr-2 pt-2 flex flex-col">
          <div className="flex items-center flex-row-reverse w-full justify-between">
          <div className="flex items-center justify-between">
            {phoneNumber == book?.addedBy && (
              <div className="text-gray-500 space-x-2">
                <Link to={`/edit-book/${book?._id}`}>
                  <button className="edit">
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </button>
                </Link>
                <button
                  className="deleteBook"
                  onClick={() => deleteBook(book?._id)}
                >
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
          {token && (
           <div className="flex gap-2 items-center">
             <div className="p-3 bg-purple-300 w-fit">
              <AiFillHeart
              title='Wish list'
                className={
                  wished
                    ? "text-2xl cursor-pointer text-red-600"
                    : "text-2xl cursor-pointer text-black"
                }
                onClick={() => handleWishList(book?._id)}
              />
            </div>
            <div className="p-3 bg-purple-300 w-fit">
              <FiBookOpen
              title='Reading list'
                className={
                  wished
                    ? "text-2xl cursor-pointer text-blue-600"
                    : "text-2xl cursor-pointer text-black"
                }
                onClick={() => handleReadList(book?._id)}
              />
            </div>
           </div>
          )}
          </div>
          <div className="space-y-2 mt-4 h-full">
            <h4 className="book-name">{book?.title}</h4>
            <p className="author">{book?.author}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
