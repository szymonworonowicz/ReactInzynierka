import React, { useState, useEffect } from "react";
import PaperNav from "../../Shared/PaperNav/PaperNav";
import { Add } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { PageRequestType } from "../../../Types/Paged";
import {CategoryListType } from "../../../Types/Category";
import { CategoriesApi } from "../../../Services/Categories/Category.service";
import GenericTable from "../../Shared/GenericTable/GenericTable";
import { IGenericTableProps,IGenericTableColumnDefinitionProps } from "../../../Interfaces/Shared/GenericTable";
import CategoryPanelElement from './CategoryElement/CategoryPanelElement';
import Modal from '../../../shared/Modal/Modal';
import AddCategoryForm from '../../../Forms/AddCategoryForm';
import {AddCategoryType} from '../../../Types/Category';
import {GuidEmpty} from '../../../Helpers/constans';
import { LottieContext } from "../../../Context/LottieContext";

const CategoryPanel: React.FC = () => {
  const [addModal, setAddModal] = useState<boolean>(false);
  const [categories, setCategories] = useState<Array<CategoryListType>>([]);
  const {isOpen, setLottieOpen} = React.useContext(LottieContext);
  const [query, setQuery] = useState<PageRequestType>({
    elemPerPage: 10,
    page: 0,
  });
  const { t } = useTranslation();

  useEffect(() => {
    setLottieOpen(true);
    CategoriesApi.getAll()
      .then(response => {
        setCategories(response);
      })
      .finally(() => {
        setLottieOpen(false);
      })
  }, [query, setLottieOpen]);

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

  const addCategory = (data :AddCategoryType) : void => {
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

  const generateColumns = (): IGenericTableColumnDefinitionProps<
    CategoryListType,
    keyof CategoryListType
  >[] => {

    return [
        {
            header:t('categories'),
            key:'id',
            generate: (rowData) =>  
                <CategoryPanelElement  data={rowData} 
                    deleteCategory = {DeleteCategory} 
                    deleteSubCategory={DeleteSubCategory}/>
        }
    ]
  };

  const generateGenericTableProps = (): IGenericTableProps<
    CategoryListType,
    keyof CategoryListType
  > => {
    return {
      columns: generateColumns(),
      countOfElements: categories.length,
      data: categories,
      query,
      setQuery,
    };
  };

  if (isOpen) {
    return <></>
  }

  return (
    <>
      <PaperNav
        ExternalIcon={Add}
        header={t("categories")}
        externalIconAction={() => setAddModal(true)}
      />
      {addModal && (
        <Modal
          header={t('AddCategory')}
          isOpen={addModal}
          handleClose={() => setAddModal(false)}
          key='categorymodal'
          handleSave = {(data : AddCategoryType) => addCategory(data)}
        >
          <AddCategoryForm/>

        </Modal>
      )}
      <GenericTable {...generateGenericTableProps()} />
    </>
  );
};

export default CategoryPanel;
