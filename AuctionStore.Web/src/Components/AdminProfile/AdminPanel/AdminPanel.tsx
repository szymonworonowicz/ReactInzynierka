import React,{useState} from "react";
import { useTranslation } from "react-i18next";
import { IAdmin } from "../../../Interfaces/Admin";
import {AdminApi} from '../../../Services/Admin/AdminApi';
import {CircularProgress, IconButton} from '@material-ui/core'
import {IPageRequest} from '../../../Interfaces/Paged';
import GenericTable from "../../Shared/GenericTable/GenericTable";
import { IGenericTableProps } from "../../Shared/GenericTable/GenericTableInterface/IGenericTableProps";
import {IGenericTableColumnDefinitionType} from '../../Shared/GenericTable/GenericTableInterface/IGenericTableColumnDefinition';
import moment from 'moment'
import { useToast } from "../../../shared/hooks/useToast";
import { Check, Clear, Delete, BeachAccess } from "@material-ui/icons";
import usePaged from '../../../shared/hooks/usePaged/usePaged';


const AdminPanel : React.FC = () => {

    const [query,setQuery] = useState<IPageRequest>({
        elemPerPage:10,
        page : 0
    });

    const {t} = useTranslation();
    const toast = useToast()

    const [adminsResponse,isLoaded, countOfElements] = usePaged<IAdmin>({
        apiCall:AdminApi.getAdmins,
        query: query
    });

    const [admins, setAdmins] = useState<Array<IAdmin>>(adminsResponse);

    const handleHoliday = async (id : string) : Promise<void> => {
        const response = await AdminApi.AdminHoliday(id);
        if(response) {
            toast(t('successHoliday'), 'success');
            setAdmins(prev => {
                let index = prev.findIndex(x => x.id === id);
                if(index !== -1) {
                    prev[index].isDisabled = !prev[index].isDisabled;
                }

                return [...prev]
            })
        }
        else {
            toast(t('failureHoliday'), 'error');
        }
    }

    const handleDelete = async (id : string) : Promise<void> => {
        const response = await AdminApi.AdminHoliday(id);
        if(response) {
            toast(t('successDelete'), 'success');
            setAdmins(prev => {
                let index = prev.findIndex(x => x.id === id);
                if(index !== -1) {
                    prev[index].isDeleted = !prev[index].isDeleted;
                }

                return [...prev]
            })
        }
        else {
            toast(t('failureDelete'), 'error');
        }
    }

    const generateColumns = () : IGenericTableColumnDefinitionType<IAdmin, keyof IAdmin> [] => {
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
                header: t('disabled'),
                key: 'isDisabled',
                generate : (dataRow) => {
                    return (
                        <div>
                            {
                                dataRow.isDisabled ? <Clear/> : <Check/>
                            }
                        </div>
                    )
                }    
            },
            {
                header : t('delete'),
                key : 'isDeleted',
                generate : (dataRow) => {
                    return (
                        <div>
                            {
                                dataRow.isDeleted ? <Clear/> : <Check/>
                            }
                        </div>
                    )
                }   
            },
            {
                header:t('createdAt'),
                key:'CreatedDateUtc',
                formatValue : (dataRow) => {
                    return moment(dataRow.CreatedDateUtc).format('MM/DD/YYYY')
                }
            },
            {
                header:t('lastLoginAt'),
                key:'LastLoginDateUtc',
                formatValue : (dataRow) => {
                    return moment(dataRow.LastLoginDateUtc).format('MM/DD/YYYY')
                }
            },
            {
                header : '',
                key:'id',
                generate :(dataRow) => {
                    return (
                        <div style={{display:'flex', flexDirection:'row'}}>
                            <IconButton onClick={() => handleHoliday(dataRow.id)}>
                                <BeachAccess/>
                            </IconButton>
                            <IconButton onClick={() => handleDelete(dataRow.id)}>
                                <Delete/>
                            </IconButton>
                        </div>
                    )
                }
            }

        ]
    }

    const generateGenericTableProps = () : IGenericTableProps<IAdmin, keyof IAdmin> => {
        return {
            columns: generateColumns(),
            countOfElements,
            query,
            setQuery,
            data:admins
        }
    }

    if (isLoaded ) {
        return <CircularProgress />;
      }
    return (
        <GenericTable {...generateGenericTableProps()}/>
    )
}

export default AdminPanel;