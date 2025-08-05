export type GetBooksParams = {
  offset?: number;
  limit?: number;
  title?: string;
  genreId?: number;
  [key: string]: string | number | undefined;
};