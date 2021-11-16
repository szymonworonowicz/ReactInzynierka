import {SubCategoryType} from '.'

export  type CategoryListType =  {
    id:string,
    name:string,
    subCategories: Array<SubCategoryType>
}