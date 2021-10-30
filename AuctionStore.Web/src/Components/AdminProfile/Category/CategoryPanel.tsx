import React, { useState, useEffect } from "react";
import PaperNav from "../../Shared/PaperNav/PaperNav";
import { Add } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { IPageRequest } from "../../../Interfaces/Paged";
import { ICategoryList } from "../../../Interfaces/Api";
import { CircularProgress} from "@material-ui/core";
import { CategoriesApi } from "../../../Services/Categories/Category.service";
import GenericTable from "../../Shared/GenericTable/GenericTable";
import { IGenericTableProps,IGenericTableColumnDefinitionType } from "../../Shared/GenericTable";
import CategoryPanelElement from './CategoryElement/CategoryPanelElement';
import Modal from '../../../shared/Modal/Modal';
import AddCategoryForm from '../../../Forms/AddCategoryForm';
import {IAddCategory} from '../../../Interfaces/Category';
import {GuidEmpty} from '../../../Helpers/constans';

const CategoryPanel: React.FC = () => {
  const [addModal, setAddModal] = useState<boolean>(false);
  const [categories, setCategories] = useState<Array<ICategoryList>>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [query, setQuery] = useState<IPageRequest>({
    elemPerPage: 10,
    page: 0,
  });
  const { t } = useTranslation();

  useEffect(() => {
    setIsLoaded(true);
    CategoriesApi.getAll()
      .then(response => {
        setCategories(response);
      })
      .finally(() => {
        setIsLoaded(false);
      })
  }, [query, setIsLoaded]);

  const DeleteCategory =  (id : string) : void => {
      CategoriesApi.deleteCategory(id)
        .then(response => {
          if(response) {
            setCategories(prev => {
              let index = prev.findIndex(x => x.id === id);
              if(index === -1) {
                return [...prev];
              }
              let arr = prev;
              arr.splice(index, 1)
              return [...arr];
            })
          }
        }
      )
  }

  const DeleteSubCategory = (id:string) : void => {
    CategoriesApi.deleteSubCategory(id)
      .then(response => {
        if(response) {
          setCategories(prev => {
            let index = prev.findIndex(x => x.subCategories.some(x => x.id === id));
            if(index === -1) {
              return [...prev];
            }
            let arr = prev;
            let elem = prev[index];
            let subCategoryIndex = elem.subCategories.findIndex(x => x.id === id);
            elem.subCategories.splice(subCategoryIndex, 1);
            arr.splice(index, 1, elem)
            return [...arr];
          })
        }
      })
  }

  const addCategory = (data :IAddCategory) : void => {
    let value = {}
    if(data.id === undefined || data.id === '') {
      value = {
        ...data,
        id:GuidEmpty
      }
    }
    //@TODO ADD Category/Subcategory into table
    CategoriesApi.AddCategory(value)
      .then(response => {
        if(data.id === undefined) {
          setCategories(prev => {
            return [...prev, response];
          })
        }
        else {
          let index = categories.findIndex(x => x.id === data.id);
          setCategories(prev => {
            let category = prev[index];
            category.subCategories = [...category.subCategories, ...response.subCategories];
            let local = prev;
            local.splice(index,1,category);
            return [...local];
          })
        }
        setAddModal(false);
      })

  }

  const generateColumns = (): IGenericTableColumnDefinitionType<
    ICategoryList,
    keyof ICategoryList
  >[] => {

    return [
        {
            header:t('Categories'),
            key:'id',
            generate: (rowData) =>  
                <CategoryPanelElement  data={rowData} 
                    deleteCategory = {DeleteCategory} 
                    deleteSubCategory={DeleteSubCategory}/>
        }
    ]
  };

  const generateGenericTableProps = (): IGenericTableProps<
    ICategoryList,
    keyof ICategoryList
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
      {addModal && (
        <Modal
          header={t('AddCategory')}
          isOpen={addModal}
          handleClose={() => setAddModal(false)}
          key='categorymodal'
          handleSave = {(data : IAddCategory) => addCategory(data)}
        >
          <AddCategoryForm/>

        </Modal>
      )}
      <GenericTable {...generateGenericTableProps()} />
    </>
  );
};

export default CategoryPanel;
