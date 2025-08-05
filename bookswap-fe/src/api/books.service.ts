import axios from "axios";
import type { GetBooksParams } from "../types/bookParams.type";
import type { Book } from "../types/books.type";

const url = import.meta.env.VITE_API_URL;

export const getBooks = async (
  params: GetBooksParams = {}
): Promise<Book[]> => {
  const searchParams = new URLSearchParams();

  for (const key in params) {
    if (params[key] !== undefined) {
      searchParams.append(key, String(params[key]));
    }
  }

  const response = await axios.get(`${url}/books?${searchParams.toString()}`);
  console.log("Response from getBooks:", response.data);
  return response.data;
};
