import { ICategory } from "../../../../Interfaces/Api";

export interface ICategoryPanelElementProps {
    data : ICategory,
    deleteCategory : (id : string)  => Promise<void>
}