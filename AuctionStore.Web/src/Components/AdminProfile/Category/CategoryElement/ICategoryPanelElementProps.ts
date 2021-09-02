import { ICategoryList } from "../../../../Interfaces/Api";

export interface ICategoryPanelElementProps {
    data : ICategoryList;
    deleteCategory : (id : string)  => Promise<void>;
    deleteSubCategory : (id: string) => Promise<void>;
}