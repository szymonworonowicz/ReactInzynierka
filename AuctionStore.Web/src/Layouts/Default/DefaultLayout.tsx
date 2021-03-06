import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Categories from "../../Components/Categories/Categories";
import Footer from "../../Components/Footer/Footer";
import styles from "./DefaultLayout.module.css";

const DefaultLayout: React.FC = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className={styles.content}>
        <Categories />
        <div className={styles.main}>
        {children}

        </div>
      </div>

      {/* <div className={styles.children}></div> */}
      <Footer />
      {/* </div> */}
    </div>
  );
};

export default DefaultLayout;
