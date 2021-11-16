import React,{useState,useContext} from "react";
import {IAuctionListProps} from '../../../Interfaces/Auction/';
import {AuctionType} from '../../../Types/Auction';
import {PageRequestType} from '../../../Types/Paged';
import {AuctionApi} from '../../../Services/Auction/Auction.service';
import AuctionListElement from '../../AuctionsTable/AuctionList/AuctionListElement';
import { IGenericTableProps,IGenericTableColumnDefinitionProps} from "../../../Interfaces/shared/GenericTable"
import GenericTable from "../../Shared/GenericTable/GenericTable";
import {UserContext} from '../../../Context/UserContext';
import usePaged from '../../../shared/hooks/usePaged/usePaged';


const AuctionList:React.FC<IAuctionListProps> = ({isWinning}) => {
    const context = useContext(UserContext);
    const [query,setQuery] = useState<PageRequestType>({
        elemPerPage:10,
        page : 0
    });

    const [auctions, isLoaded, countOfElements] = usePaged<AuctionType>({
        apiCall : AuctionApi.getUserAuction,
        query : query,
    },
    context.userId as string,
    isWinning);

    const generateColumns = (): Array<IGenericTableColumnDefinitionProps<AuctionType, keyof AuctionType>> => {
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

    const generateGenericTableProps = () : IGenericTableProps<AuctionType, keyof AuctionType> => {
        return {
            columns : generateColumns(),
            countOfElements,
            data : auctions,
            query,
            setQuery
        }
    }

    if (!isLoaded ) {
        return <>/</>
      }
    return (
        <GenericTable  {...generateGenericTableProps()}/>
    )
}

export default AuctionList;