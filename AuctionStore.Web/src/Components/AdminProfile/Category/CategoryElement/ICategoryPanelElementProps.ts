import { ICategoryList } from "../../../../Interfaces/Api";

export interface ICategoryPanelElementProps {
    data : ICategoryList;
    deleteCategory : (id : string)  => void;
    deleteSubCategory : (id: string) => void;
}