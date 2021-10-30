import React,{useState} from "react";
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
import usePaged from "../../../shared/hooks/usePaged/usePaged";

const BannedUsers :React.FC = () => {
    const [query,setQuery] = useState<IPageRequest>({
        elemPerPage:10,
        page : 0
    });
    const {t} = useTranslation();
    const toast = useToast()

    const [bannedUser, isLoaded, countOfElements] = usePaged<IBannedUser>({
        apiCall : AdminApi.getBannedUsers,
        query : query
    })
    
    const unlockUser  = (id : string) : void => {
        AdminApi.UnBanUser(id)
        .then(_response => {
            toast(t('successUnban'), 'success');
            query.page = 0;
        })
        .catch(() => {
            toast(t('failureUnban'), 'error');

        })

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