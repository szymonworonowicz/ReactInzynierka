import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IAdmin } from "../../../Interfaces/Admin";
import { AdminApi } from "../../../Services/Admin/AdminApi";
import { CircularProgress, IconButton } from "@material-ui/core";
import { IPageRequest } from "../../../Interfaces/Paged";
import GenericTable from "../../Shared/GenericTable/GenericTable";
import { IGenericTableProps } from "../../Shared/GenericTable/GenericTableInterface/IGenericTableProps";
import { IGenericTableColumnDefinitionType } from "../../Shared/GenericTable/GenericTableInterface/IGenericTableColumnDefinition";
import moment from "moment";
import { useToast } from "../../../shared/hooks/useToast";
import { Check, Clear, Delete, BeachAccess } from "@material-ui/icons";
import usePaged from "../../../shared/hooks/usePaged/usePaged";
import Modal from '../../../shared/Modal/Modal';
import {Add} from '@material-ui/icons';
import PaperNav from "../../Shared/PaperNav/PaperNav";
import RegisterForm from '../../../Forms/Auth/RegisterForm';
import {IRegisterCredentials} from '../../../Interfaces/Api';
import { UserRoles } from "../../../Helpers/constans";
import { authService } from "../../../Services/Auth/Auth.service";


const AdminPanel: React.FC = () => {
  const [query, setQuery] = useState<IPageRequest>({
    elemPerPage: 10,
    page: 0,
  });
  const [addModal, setAddModal] = useState<boolean>(false);

  const { t } = useTranslation();
  const toast = useToast();
  

  const [adminsResponse, isLoaded, countOfElements] = usePaged<IAdmin>({
    apiCall: AdminApi.getAdmins,
    query: query,
  });

  const handleHoliday = (id: string): void => {
    AdminApi.AdminHoliday(id)
      .then((response) => {
        toast(t("successHoliday"), "success");
        setQuery((prev) => {
          return {
            ...prev,
            page: 0,
          };
        });
        // setAdmins(prev => {
        //     let index = prev.findIndex(x => x.id === id);
        //     if(index !== -1) {
        //         prev[index].isDisabled = !prev[index].isDisabled;
        //     }

        //     return [...prev]
        // })
      })
      .catch(() => {
        toast(t("failureHoliday"), "error");
      });
  };

  const handleDelete = (id: string): void => {
    AdminApi.AdminDelete(id)
      .then((response) => {
        toast(t("successDelete"), "success");
        setQuery((prev) => {
          return {
            ...prev,
            page: 0,
          };
        });
        // setAdmins(prev => {
        //     let index = prev.findIndex(x => x.id === id);
        //     if(index !== -1) {
        //         prev[index].isDeleted = !prev[index].isDeleted;
        //     }

        //     return [...prev]
        // })
      })
      .catch(() => {
        toast(t("failureDelete"), "error");
      });
  };

  const AddAdmin = (data :IRegisterCredentials) => {
    data.userType = UserRoles.Admin;
    authService.register(data)
        .then(response => {
            if(response) {
                toast(t('addAdminSuccess'), 'success');
            }
        })
        .catch(() =>{
            toast(t('addAdminFailure'), 'error');
        })
        .finally(() => {
            setAddModal(false);
            setQuery(prev => {
                return {
                    ...prev,
                    page:0
                }
            })
        })
    
  }

  const generateColumns = (): IGenericTableColumnDefinitionType<
    IAdmin,
    keyof IAdmin
  >[] => {
    return [
      {
        header: t("nick"),
        key: "userName",
      },
      {
        header: t("firstName"),
        key: "firstName",
      },
      {
        header: t("lastName"),
        key: "lastName",
      },
      {
        header: t("email"),
        key: "email",
      },
      {
        header: t("disabled"),
        key: "isDisabled",
        generate: (dataRow) => {
          return <div>{dataRow.isDisabled ? <Clear /> : <Check />}</div>;
        },
      },
      {
        header: t("deleted"),
        key: "isDeleted",
        generate: (dataRow) => {
          return <div>{dataRow.isDeleted ? <Clear /> : <Check />}</div>;
        },
      },
      {
        header: t("createdAt"),
        key: "CreatedDateUtc",
        formatValue: (dataRow) => {
          return moment(dataRow.CreatedDateUtc).format("MM/DD/YYYY");
        },
      },
      {
        header: t("lastLoginAt"),
        key: "LastLoginDateUtc",
        formatValue: (dataRow) => {
          return moment(dataRow.LastLoginDateUtc).format("MM/DD/YYYY");
        },
      },
      {
        header: "",
        key: "id",
        generate: (dataRow) => {
          return (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <IconButton onClick={() => handleHoliday(dataRow.id)}>
                <BeachAccess />
              </IconButton>
              <IconButton onClick={() => handleDelete(dataRow.id)}>
                <Delete />
              </IconButton>
            </div>
          );
        },
      },
    ];
  };

  const generateGenericTableProps = (): IGenericTableProps<
    IAdmin,
    keyof IAdmin
  > => {
    return {
      columns: generateColumns(),
      countOfElements,
      query,
      setQuery,
      data: adminsResponse,
    };
  };

  if (isLoaded) {
    return <CircularProgress />;
  }
  return (
    <>
      {addModal && (
        <Modal
          header={t("addAdmin")}
          isOpen={addModal}
          handleClose={() => setAddModal(false)}
          handleSave={(data : IRegisterCredentials) => AddAdmin(data)}
        >
          <RegisterForm />
        </Modal>
      )}
      <PaperNav
        ExternalIcon={Add}
        header={t("admins")}
        externalIconAction={() => setAddModal(true)}
      />
      <GenericTable {...generateGenericTableProps()} />
    </>
  );
};

export default AdminPanel;
