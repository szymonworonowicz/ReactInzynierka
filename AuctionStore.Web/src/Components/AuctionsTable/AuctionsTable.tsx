import React, {useState, useEffect} from "react";
import {CircularProgress} from '@material-ui/core';
import {IPageRequest} from '../../Interfaces/Paged';
import GenericTable from "../Shared/GenericTable/GenericTable";
import { IGenericTableProps,IGenericTableColumnDefinitionType} from "../Shared/GenericTable/index";
import {IAuction} from '../../Interfaces/Auctions';
import {AuctionApi} from '../../Services/Auction/Auction.service';
import {ICategoriesTableProps} from './IAuctionsTableProps';
import AuctionListElement from './AuctionList/AuctionListElement';

const AuctionsTable: React.FC<ICategoriesTableProps> = ({categoryId}) => {
    const [auctions,setAuctions ] = useState<Array<IAuction>>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [countOfElements, setCountOfElements] = useState<number>(0);
    const [query,setQuery] = useState<IPageRequest>({
        elemPerPage:10,
        page : 0
    });

    useEffect(() => {
        setIsLoaded(true);
        (
            async () => {
                const data = await  AuctionApi.getAllByCategory(categoryId, query)
                setCountOfElements(data.countOfElements);
                setAuctions(data.pageElements);
                setIsLoaded(false);
            }
        )()
    },[setIsLoaded, query, categoryId]);

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