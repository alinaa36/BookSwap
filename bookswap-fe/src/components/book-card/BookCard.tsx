import type React from "react";
import styles from "./BookCard.module.css";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";

interface BookCardProps {
  title?: string;
  author?: string;
  coverImage?: string;
  genre?: { name: string };
  rating?: number;
}

const BookCard: React.FC<BookCardProps> = ({ title, author, genre }) => {
  return (
    <div className={styles.bookCard}>
      <div className={styles.bookImageContainer}>
        <img src="kitten.png" alt="Book Cover" className={styles.bookCover} />
      </div>
      <div className={styles.bookTitleContainer}>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.bookAuthorContainer}>
        <p className={styles.author}>{author}</p>
      </div>
      <div className={styles.bookGenreContainer}>
        <p className={styles.genre}>{genre?.name}</p>
      </div>
      <div className={styles.bookRatingContainer}>
        <p className={styles.stars}>★★★★★</p>
        <BubbleChartIcon className={styles.icon} />
      </div>
    </div>
  );
};
export default BookCard;
