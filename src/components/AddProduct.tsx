import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../app/redux/hooks/hooks";
import { RootState } from "../shared/types/global/types";
import { IBook } from "../shared/types/book/type";
import { useAddBookMutation, useGetBookQuery, useGetBooksQuery, useUpdateBookMutation } from "../app/redux/features/book/bookApi";
import { removeUpdateData, setUpdateData } from "../app/redux/features/book/filterSlice";

function AddProduct() {
  const [isFeatured, setIsFeatured] = useState(false);
  const [updateBookInfo, setUpdateBookInfo] = useState<IBook | null>(null);


  const { update } = useAppSelector((state:RootState) => state.filter);

  const [addBook, { isSuccess }] = useAddBookMutation();

  const [updateBook, { isSuccess: isUpdateSuccess }] = useUpdateBookMutation();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const {id} = useParams();

  const location = useLocation();

  const { data:updatableBook } = useGetBookQuery(id, {
    skip: !id,
  });

  useEffect(() => {
    if (location.pathname.match('/add-book')) {
      dispatch(removeUpdateData());
      setUpdateBookInfo(null)
      setIsFeatured(false)
    }
  }, [dispatch, location])

  useEffect(() => {
    if (updatableBook?.data) {
      dispatch(setUpdateData());
        setUpdateBookInfo(updatableBook.data as IBook);
    }
  }, [dispatch, updatableBook]);

  useEffect(() => {
    if (isSuccess || isUpdateSuccess) {
      dispatch(removeUpdateData());
      navigate("/");
    }
  }, [dispatch, isSuccess, isUpdateSuccess, navigate]);

  console.log({updateBookInfo})

  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const title = form.title.value;
    const author = form.author.value;
    const image = form.image.value;
    const publicationDate = form.publicationDate.value;
    const genre = form.genre.value;
  
    const book: {
      title: string;
      author: string;
      publicationDate: string;
      genre: string;
      image?: string; 
    } = {
      title,
      author,
      publicationDate,
      genre
    };
  
    if (image) {
      book.image = image;
    }
  
    update ? updateBook({ book, id:id }) : addBook(book);
    form.reset();
  };
  
  
  return (
    <div className="py-6 2xl:px-6">
      <div className="container">
        <div className="p-8 overflow-hidden bg-white shadow-cardShadow rounded-md max-w-xl mx-auto">
          <h4 className="mb-8 text-xl font-bold text-center">
            {!update ? "Add New Book" : "Edit Book"}
          </h4>
          <form className="book-form space-y-2" onSubmit={handleAddProduct}>
          <div className="space-y-2">
              <label htmlFor="title">Book Name</label>
              <input
                required
                defaultValue={updateBookInfo?.title}
                className="text-input"
                type="text"
                name="title"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="author">Author</label>
              <input
                required
                defaultValue={updateBookInfo?.author}
                className="text-input"
                type="text"
                name="author"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="author">Publication date</label>
              <input
                required
                defaultValue={updateBookInfo?.author}
                className="text-input"
                type="text"
                name="publicationDate"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="author">Genre</label>
              <input
                required
                defaultValue={updateBookInfo?.author}
                className="text-input"
                type="text"
                name="genre"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="image">Image Url</label>
              <input
                defaultValue={updateBookInfo?.image}
                className="text-input"
                type="url"
                id="thumbnail"
                name="image"
              />
            </div>

            <div
              className="flex items-center"
            >
              <input
                id="featured"
                type="checkbox"
                checked={isFeatured}
                name="featured"
                className="w-4 h-4"
                onChange={() => setIsFeatured((prevState) => !prevState)}
              />
              <label htmlFor="featured" className="ml-2 text-sm">
                {" "}
                This is a featured book
              </label>
            </div>

            <button type="submit" className="submit" id="submit">
              {update ? "Update Book" : "Add Book"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
