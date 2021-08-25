import React,{useState, useEffect} from "react";
import { useTranslation } from "react-i18next";
import {CircularProgress} from '@material-ui/core'
import { IBannedUser } from "../../../Interfaces/user";
import {IPageRequest} from '../../../Interfaces/Paged';
import {UserApi} from '../../../Services/User/UserApi';
import GenericTable from "../../Shared/GenericTable/GenericTable";
import { IGenericTableProps } from "../../Shared/GenericTable/GenericTableInterface/IGenericTableProps";
import {IGenericTableColumnDefinitionType} from '../../Shared/GenericTable/GenericTableInterface/IGenericTableColumnDefinition';

const BannedUsers :React.FC = () => {

    const [bannedUser,setBannedUser ] = useState<Array<IBannedUser>>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [countOfElements, setCountOfElements] = useState<number>(0);
    const [query,setQuery] = useState<IPageRequest>({
        elemPerPage:10,
        page : 1
    });
    const {t} = useTranslation();
    
    useEffect(() => {
        setIsLoaded(true);
        (
            async () => {
                const data = await  UserApi.getBannedUsers(query);
                setCountOfElements(data.countOfElements);
                setBannedUser(data.pageElements);
                setIsLoaded(false);
            }
        )()
    },[setIsLoaded, query])

    const generateColumns = () : IGenericTableColumnDefinitionType<IBannedUser, keyof IBannedUser>[]  => {
        return [
            {
                header : t('userName'),
                key : 'userName',
            },
            {
                header : t('firstName'),
                key : 'firstName',
            },
            {
                header : t('lastName'),
                key : 'lastName',
            },
            {
                header : t('email'),
                key : 'email',
            },
            {
                header : t('endOffBan'),
                key : 'endOffBan',
            },
        ]
    }

    const generateGenericTableProps = () : IGenericTableProps<IBannedUser, keyof IBannedUser>  => {
        return {
            columns:generateColumns(),
            countOfElements :countOfElements,
            query,
            setQuery,
            data:bannedUser
        }
    }

    if (isLoaded ) {
        return <CircularProgress />;
      }
    
    return (
        <GenericTable  {...generateGenericTableProps()}/>
    )
}

export default BannedUsers;


