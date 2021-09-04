import React, {useState, useEffect} from "react";
import { useTranslation } from "react-i18next";
import {CircularProgress, IconButton} from '@material-ui/core';
import {IPageRequest} from '../../Interfaces/Paged';
import moment from 'moment'
import GenericTable from "../Shared/GenericTable/GenericTable";
import { IGenericTableProps,IGenericTableColumnDefinitionType} from "../Shared/GenericTable/index";
import {IAuction} from '../../Interfaces/Auctions';
import {AuctionApi} from '../../Services/Auction/AuctionApi';
import {ICategoriesTableProps} from './IAuctionsTableProps'

const AuctionsTable: React.FC<ICategoriesTableProps> = ({categoryId}) => {
    const [bannedUser,setBannedUser ] = useState<Array<IAuction>>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [countOfElements, setCountOfElements] = useState<number>(0);
    const [query,setQuery] = useState<IPageRequest>({
        elemPerPage:10,
        page : 0
    });
    const {t} = useTranslation();

    useEffect(() => {
        setIsLoaded(true);
        (
            async () => {
                const data = await  AuctionApi.getAllByCategory(categoryId, query)
                setCountOfElements(data.countOfElements);
                setBannedUser(data.pageElements);
                setIsLoaded(false);
            }
        )()
    },[setIsLoaded, query, categoryId])

    return (
        <>
        </>
    )
}

export default AuctionsTable;