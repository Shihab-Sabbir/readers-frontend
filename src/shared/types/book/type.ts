interface IReading {
  phoneNumber: string;
  status?: "reading" | "read soon" | "finished";
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
}
