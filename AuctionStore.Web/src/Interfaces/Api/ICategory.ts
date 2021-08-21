import {ISubCategory} from './ISubCategory'

export  interface ICategory {
    id:string,
    name:string,
    subCategories: Array<ISubCategory>
}