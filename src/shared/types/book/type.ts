export interface IReading {
  phoneNumber: string;
  status?: "reading" | "read soon" | "finished";
}

export interface IReview {
  _id?: string;
  name: string;
  date: string;
  body: string;
}

export interface IBook {
  _id?: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  image?: string;
  addedBy: string;
  wishedBy?: string[] | null;
  readList?: IReading[] | null;
  review?: IReview[] | null;
}
