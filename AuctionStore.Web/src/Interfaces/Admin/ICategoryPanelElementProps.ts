import {CategoryType} from '../../Types/Categories'
import { IDataComponentProps } from '../IDataComponentProps'

export interface ICategoryPanelElementProps  extends IDataComponentProps<CategoryType> {
    deleteCategory : (id : string)  => void;
    deleteSubCategory : (id: string) => void;
}