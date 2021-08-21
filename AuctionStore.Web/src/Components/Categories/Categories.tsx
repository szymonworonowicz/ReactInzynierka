import React, { useEffect, useState } from "react";
import { ICategory } from "../../Interfaces/Api";
import { CategoriesApi } from "../../Services/Categories/CategoriesApi";
import StyledTreeView from "./StyledTreeView/StyledTreeView";
import styles from './Categories.module.css'

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      const data = await CategoriesApi.getAll();
      setCategories(data);
      setIsLoaded(true);
    })();
  }, []);

  return <div className={styles.component}>{isLoaded && <StyledTreeView data={categories} />}</div>;
};

export default Categories;
