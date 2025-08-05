import React from "react";
import styles from "./Header.module.css";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import FaceIcon from "@mui/icons-material/Face";
import ScatterPlotIcon from "@mui/icons-material/ScatterPlot";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <AutoStoriesIcon className={styles.logo} />
      </div>
      <div className={styles.titleContainer}>
        <h1>Welcome to BookSwap</h1>
      </div>
      <div className={styles.iconContainer}>
        <FaceIcon className={styles.logo} />
        <ScatterPlotIcon className={styles.logo} />
      </div>
    </header>
  );
};

export default Header;
