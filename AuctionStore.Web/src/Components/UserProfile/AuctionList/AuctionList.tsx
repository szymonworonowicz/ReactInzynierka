import React,{useState,useContext} from "react";
import {IAuctionListProps} from './IAuctionListProps';
import {IAuction} from '../../../Interfaces/Auctions';
import {CircularProgress} from '@material-ui/core';
import {IPageRequest} from '../../../Interfaces/Paged';
import {AuctionApi} from '../../../Services/Auction/Auction.service';
import AuctionListElement from '../../AuctionsTable/AuctionList/AuctionListElement';
import { IGenericTableProps,IGenericTableColumnDefinitionType} from "../../Shared/GenericTable/index";
import GenericTable from "../../Shared/GenericTable/GenericTable";
import {UserContext} from '../../../Context/UserContext';
import usePaged from '../../../shared/hooks/usePaged/usePaged';


const AuctionList:React.FC<IAuctionListProps> = ({isWinning}) => {
    const context = useContext(UserContext);
    const [query,setQuery] = useState<IPageRequest>({
        elemPerPage:10,
        page : 0
    });

    const [auctions, isLoaded, countOfElements] = usePaged<IAuction>({
        apiCall : AuctionApi.getUserAuction,
        query : query,
    },
    context.userId as string,
    isWinning);

    const generateColumns = (): Array<IGenericTableColumnDefinitionType<IAuction, keyof IAuction>> => {
        return [
            {
                header:'',
                key:'id',
                generate:(rowData) => {
                    return (
                        <AuctionListElement  data={rowData} key={rowData.id} hideStatus={!isWinning}/>
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

export default AuctionList;