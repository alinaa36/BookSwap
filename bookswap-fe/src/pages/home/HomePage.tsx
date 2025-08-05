import type React from "react";
import Header from "../../components/header/Header";
import styles from './HomePage.module.css';
import BookList from "../../components/book-list/BookList";

const HomePage: React.FC = () => {
  return (
    <div className={styles.homePage}>
      <Header />
      <BookList />
    </div>
  );
}

export default HomePage;