import {CategoryListType} from '../../Types/Category'
import { IDataComponentProps } from '../IDataComponentProps'

export interface ICategoryPanelElementProps  extends IDataComponentProps<CategoryListType> {
    deleteCategory : (id : string)  => void;
    deleteSubCategory : (id: string) => void;
}