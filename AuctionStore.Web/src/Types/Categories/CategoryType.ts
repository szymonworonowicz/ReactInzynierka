import {SubCategoryType} from './'

export  type CategoryType =  {
    id:string,
    name:string,
    subCategories: Array<SubCategoryType>
}