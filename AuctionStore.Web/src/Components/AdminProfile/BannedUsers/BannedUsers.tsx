import React,{useState} from "react";
import { useTranslation } from "react-i18next";
import {IconButton} from '@material-ui/core'
import { BannedUserType } from "../../../Types/Admin";
import {PageRequestType} from '../../../Types/Paged';
import {AdminApi} from '../../../Services/Admin/Admin.service';
import GenericTable from "../../Shared/GenericTable/GenericTable";
import { IGenericTableProps } from "../../../Interfaces/Shared/GenericTable";
import {IGenericTableColumnDefinitionProps} from '../../../Interfaces/Shared/GenericTable/IGenericTableColumnDefinitionProps';
import { LockOpen } from "@material-ui/icons";
import moment from 'moment'
import { useToast } from "../../../shared/hooks/useToast";
import usePaged from "../../../shared/hooks/usePaged/usePaged";

const BannedUsers :React.FC = () => {
    const [query,setQuery] = useState<PageRequestType>({
        elemPerPage:10,
        page : 0
    });
    const {t} = useTranslation();
    const toast = useToast()

    const [bannedUser, isLoaded, countOfElements] = usePaged<BannedUserType>({
        apiCall : AdminApi.getBannedUsers,
        query : query
    })
    
    const unlockUser  = (id : string) : void => {
        AdminApi.UnBanUser(id)
        .then(_response => {
            toast(t('successUnban'), 'success');
            setQuery(prev => {
                return {
                    ...prev,
                    page:0
                }
            })
        })
        .catch(() => {
            toast(t('failureUnban'), 'error');

        })

    }

    const generateColumns = () : IGenericTableColumnDefinitionProps<BannedUserType, keyof BannedUserType>[]  => {
        return [
            {
                header : t('nick'),
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

    const generateGenericTableProps = () : IGenericTableProps<BannedUserType, keyof BannedUserType>  => {
        return {
            columns:generateColumns(),
            countOfElements :countOfElements,
            query,
            setQuery,
            data:bannedUser
        }
    }

    if (!isLoaded ) {
        return <></>
      }
    
    return (
        <GenericTable  {...generateGenericTableProps()}/>
    )
}

export default BannedUsers;