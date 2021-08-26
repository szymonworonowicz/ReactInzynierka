import React,{useState, useEffect} from "react";
import { useTranslation } from "react-i18next";
import {CircularProgress, IconButton} from '@material-ui/core'
import { IBannedUser } from "../../../Interfaces/Admin";
import {IPageRequest} from '../../../Interfaces/Paged';
import {AdminApi} from '../../../Services/Admin/AdminApi';
import GenericTable from "../../Shared/GenericTable/GenericTable";
import { IGenericTableProps } from "../../Shared/GenericTable/GenericTableInterface/IGenericTableProps";
import {IGenericTableColumnDefinitionType} from '../../Shared/GenericTable/GenericTableInterface/IGenericTableColumnDefinition';
import { LockOpen } from "@material-ui/icons";
import moment from 'moment'
import { useToast } from "../../../shared/hooks/useToast";

const BannedUsers :React.FC = () => {

    const [bannedUser,setBannedUser ] = useState<Array<IBannedUser>>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [countOfElements, setCountOfElements] = useState<number>(0);
    const [query,setQuery] = useState<IPageRequest>({
        elemPerPage:10,
        page : 0
    });
    const {t} = useTranslation();
    const toast = useToast()
    
    useEffect(() => {
        setIsLoaded(true);
        (
            async () => {
                const data = await  AdminApi.getBannedUsers(query);
                setCountOfElements(data.countOfElements);
                setBannedUser(data.pageElements);
                setIsLoaded(false);
            }
        )()
    },[setIsLoaded, query])

    const unlockUser  = async (id : string) : Promise<void> => {
        const response = await AdminApi.UnBanUser(id);
        if(response) {
            debugger;
            toast(t('successUnban'), 'success');
            setBannedUser(prev => {
                let index = prev.findIndex(x => x.id === id);
                if(index !== -1) {
                    prev.splice(index, 1);
                }

                return [...prev]
            })
        }
        else {
            toast(t('failureUnban'), 'error');
        }
    }

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
                formatValue : (dataRow) => {
                    return moment(dataRow.endOffBan).format('MM/DD/YYYY')
                }
            },
            {
                header : '',
                key: 'id',
                generate : (dataRow) => {
                    return (
                        <div style={{display:'flex', flexDirection:'row'}}>
                        <IconButton onClick={() => unlockUser(dataRow.id)}>
                            <LockOpen/>
                        </IconButton>
                    </div>
                    )
                }
            }
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