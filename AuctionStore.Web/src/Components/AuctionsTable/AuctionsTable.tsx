import React, {useState} from "react";
import {CircularProgress} from '@material-ui/core';
import {IPageRequest} from '../../Interfaces/Paged';
import GenericTable from "../Shared/GenericTable/GenericTable";
import { IGenericTableProps,IGenericTableColumnDefinitionType} from "../Shared/GenericTable/index";
import {IAuction} from '../../Interfaces/Auctions';
import {AuctionApi} from '../../Services/Auction/Auction.service';
import {ICategoriesTableProps} from './IAuctionsTableProps';
import AuctionListElement from './AuctionList/AuctionListElement';
import usePaged from "../../shared/hooks/usePaged/usePaged";

const AuctionsTable: React.FC<ICategoriesTableProps> = ({categoryId}) => {
    const [query,setQuery] = useState<IPageRequest>({
        elemPerPage:10,
        page : 0
    });

    const [auctions, isLoaded, countOfElements] = usePaged<IAuction>({
        apiCall: AuctionApi.getAllByCategory,
        query : query
    },
    categoryId) 


    const generateColumns = (): Array<IGenericTableColumnDefinitionType<IAuction, keyof IAuction>> => {
        return [
            {
                header:'',
                key:'id',
                generate:(rowData) => {
                    return (
                        <AuctionListElement  data={rowData} key={rowData.id} hideStatus={true}/>
                    )
                }
            }
        ]
    }

    const generateGenericTableProps = () : IGenericTableProps<IAuction, keyof IAuction> => {
        return {
            columns : generateColumns(),
            countOfElements,
            data : auctions,
            query,
            setQuery
        }
    }

    if (isLoaded ) {
        return <CircularProgress />;
      }
    return (
        <GenericTable  {...generateGenericTableProps()}/>
    )
}

export default AuctionsTable;