import { useEffect, useState } from "react";
import { getBooks } from "../../api/books.service";
import type { Book } from "../../types/books.type";
import BookCard from "../book-card/BookCard";
import styles from "./BookList.module.css";
import { useApiRequest } from "../../hooks/useApi";
import Spinner from "../spinner/Spinner";
import Pagination from "../pagination/Pagination";

const BookList: React.FC = () => {
  const [page, setPage] = useState(1);
  const limit = 12;
  const totalPages = 10; 
  const {
    data: books,
    error,
    loading,
    execute,
  } = useApiRequest<Book[], { offset: number }>(getBooks);

  useEffect(() => {
    const offset = (page - 1) * limit;
    execute({ offset });
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (loading) return <Spinner />;
  if (error) return <p>Error</p>;

  return (
    <>
      <div className={styles.bookList}>
        {books?.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            genre={book.genre}
            coverImage={book.coverImage}
          />
        ))}
      </div>
      <div>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default BookList;
