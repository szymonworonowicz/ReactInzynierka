import {ISubCategory} from './ISubCategory'

export  interface ICategoryList {
    id:string,
    name:string,
    subCategories: Array<ISubCategory>
}