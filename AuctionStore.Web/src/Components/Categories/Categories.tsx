import React, { useEffect, useState } from "react";
import { ICategoryList } from "../../Interfaces/Api";
import { CategoriesApi } from "../../Services/Categories/Category.service";
import StyledTreeView from "./StyledTreeView/StyledTreeView";
import styles from "./Categories.module.css";
import {Button} from '@material-ui/core';
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { LottieContext } from "../../Context/LottieContext";

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<ICategoryList[]>([]);
  const {isOpen, setLottieOpen} = React.useContext(LottieContext);
  const {t} = useTranslation();
  const history = useHistory();

  useEffect(() => {
    setLottieOpen(true);

      CategoriesApi.getAll()
      .then(response => {
        setCategories(response);
      })
      .finally(() => {
        setLottieOpen(false);
      })
  }, [setLottieOpen]);

  const handleNewsletter = () =>  {
    history.push('/newsletter');
  }

  return (
    <div className={styles.component}>
      {!isOpen && <StyledTreeView data={categories} />}
      <Button onClick={handleNewsletter}>{t('newsletter')}</Button>
    </div>
  );
};

export default Categories;
