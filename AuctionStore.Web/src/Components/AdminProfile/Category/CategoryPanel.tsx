import React, { useState, useEffect } from "react";
import PaperNav from "../../Shared/PaperNav/PaperNav";
import { Add } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { IPageRequest } from "../../../Interfaces/Paged";
import { ICategory } from "../../../Interfaces/Api";
import { CircularProgress} from "@material-ui/core";
import { CategoriesApi } from "../../../Services/Categories/CategoriesApi";
import GenericTable from "../../Shared/GenericTable/GenericTable";
import { IGenericTableProps } from "../../Shared/GenericTable/GenericTableInterface/IGenericTableProps";
import { IGenericTableColumnDefinitionType } from "../../Shared/GenericTable/GenericTableInterface/IGenericTableColumnDefinition";
import CategoryPanelElement from './CategoryElement/CategoryPanelElement';

const CategoryPanel: React.FC = () => {
  const [addModal, setAddModal] = useState<boolean>(false);
  const [categories, setCategories] = useState<Array<ICategory>>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [query, setQuery] = useState<IPageRequest>({
    elemPerPage: 10,
    page: 0,
  });
  const { t } = useTranslation();

  useEffect(() => {
    setIsLoaded(true);
    (async () => {
      const data = await CategoriesApi.getAll();
      setCategories(data);
      setIsLoaded(false);
    })();
  }, [query, setIsLoaded]);

  const DeleteCategory = (id : string) : Promise<void> => {
      return new Promise ((resolve) => resolve()); 
  }

  const generateColumns = (): IGenericTableColumnDefinitionType<
    ICategory,
    keyof ICategory
  >[] => {

    return [
        {
            header:t('Categories'),
            key:'id',
            generate: (rowData) =>  <CategoryPanelElement  data={rowData} deleteCategory = {DeleteCategory} />
        }
    ]
  };

  const generateGenericTableProps = (): IGenericTableProps<
    ICategory,
    keyof ICategory
  > => {
    return {
      columns: generateColumns(),
      countOfElements: categories.length,
      data: categories,
      query,
      setQuery,
    };
  };

  if (isLoaded) {
    return <CircularProgress />;
  }

  return (
    <>
      <PaperNav
        ExternalIcon={Add}
        header={t("banned_words")}
        externalIconAction={() => setAddModal(true)}
      />
      {/* {addModal && (
        
      )} */}
      <GenericTable {...generateGenericTableProps()} />
    </>
  );
};

export default CategoryPanel;
