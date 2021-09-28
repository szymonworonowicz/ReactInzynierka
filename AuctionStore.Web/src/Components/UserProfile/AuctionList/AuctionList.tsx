import React,{useState,useCallback,useEffect,useContext} from "react";
import {IAuctionListProps} from './IAuctionListProps';
import {IAuction} from '../../../Interfaces/Auctions';
import {CircularProgress} from '@material-ui/core';
import {IPageRequest} from '../../../Interfaces/Paged';
import {AuctionApi} from '../../../Services/Auction/Auction.service';
import AuctionListElement from '../../AuctionsTable/AuctionList/AuctionListElement';
import { IGenericTableProps,IGenericTableColumnDefinitionType} from "../../Shared/GenericTable/index";
import GenericTable from "../../Shared/GenericTable/GenericTable";
import {UserContext} from '../../../Context/UserContext';


const AuctionList:React.FC<IAuctionListProps> = ({isWinning}) => {
    const [auctions,setAuctions ] = useState<Array<IAuction>>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [countOfElements, setCountOfElements] = useState<number>(0);
    const context = useContext(UserContext);
    const [query,setQuery] = useState<IPageRequest>({
        elemPerPage:10,
        page : 0
    });

    const fetchData = useCallback(async() => {
        const data = await  AuctionApi.getUserAuction(context.userId as string, isWinning, query);
        setCountOfElements(data.countOfElements);
        setAuctions(data.pageElements);
        setIsLoaded(false);
    },[context.userId, isWinning,query]);

    useEffect(() => {
        setIsLoaded(true);
        (
            async () => {
                await fetchData();
            }
        )()
    },[fetchData]);



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