import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {IconButton } from "@material-ui/core";
import { Delete, Add } from "@material-ui/icons";
import { PageRequestType } from "../../../Types/Paged";
import { AdminApi } from "../../../Services/Admin/Admin.service";
import { BannedWordType, AddBannedWordType } from "../../../Types/Admin";
import GenericTable from "../../Shared/GenericTable/GenericTable";
import { IGenericTableProps } from "../../../Interfaces/Shared/GenericTable";
import { IGenericTableColumnDefinitionProps } from "../../../Interfaces/Shared/GenericTable/IGenericTableColumnDefinitionProps";
import moment from "moment";
import { useToast } from "../../../shared/hooks/useToast";
import PaperNav from "../../Shared/PaperNav/PaperNav";
import Modal from "../../../shared/Modal/Modal";
import AddWord from '../../../Forms/AddWord';
import usePaged from "../../../shared/hooks/usePaged/usePaged";

const BannedWords: React.FC = () => {
  const [query, setQuery] = useState<PageRequestType>({
    elemPerPage: 10,
    page: 0,
  });

  const [addModal, setAddModal] = useState<boolean>(false);


  const { t } = useTranslation();
  const toast = useToast();

  const [bannedWords, isLoaded, countOfElements] = usePaged<BannedWordType>({
    apiCall : AdminApi.getBannedWords,
    query : query
  })

  const DeleteWord = (id: string): void => {
    AdminApi.deleteBannedWord(id)
      .then(resp => {
        if(resp) {
          toast(t("deleteBannedWord"), "success");
          setQuery(prev => {
            return {
              ...prev,
              page : 0
            }
          })
        }
        else {
          toast(t("deleteBannedWordFailure"), "error");
        }
      })
  };

  const AddNewWord = (newWord : AddBannedWordType) : void => {
    AdminApi.AddNewBannedWord(newWord)
      .then(response => {
        if(response !== null) {
            setQuery(prev => {
              return {
                ...prev,
                page : 0
              }
            })
            toast(t("addedBannedWord"), "success");
            setAddModal(false);
        }
        else {
            toast(t("addBannedWordFailure"), "error");
        }
      })
  }

  const generateColumns = (): IGenericTableColumnDefinitionProps<
    BannedWordType,
    keyof BannedWordType
  >[] => {
    return [
      {
        header: t("bannedWord"),
        key: "word",
      },
      {
        header: t("added"),
        key: "added",
        formatValue: (dataRow) => {
          return moment(dataRow.added).format("MM/DD/YYYY");
        },
      },
      {
        header: "",
        key: "id",
        generate: (dataRow) => {
          return (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <IconButton onClick={() => DeleteWord(dataRow.id)}>
                <Delete />
              </IconButton>
            </div>
          );
        },
      },
    ];
  };

  const generateGenericTableProps = (): IGenericTableProps<
    BannedWordType,
    keyof BannedWordType
  > => {
    return {
      columns: generateColumns(),
      countOfElements: countOfElements,
      query,
      setQuery,
      data: bannedWords,
    };
  };

  if (!isLoaded) {
    return <></>
  }

  return (
    <div>
      {addModal && 
      <Modal
        header={t('add_banned_word')}
        isOpen={addModal}
        handleClose={() => setAddModal(false)}
        handleSave = {(newWord : AddBannedWordType) => AddNewWord(newWord)}
      >
          <AddWord/>
      </Modal>}
      <PaperNav
        ExternalIcon={Add}
        header={t("bannedWord")}
        externalIconAction={() => setAddModal(true)}
      />
      <GenericTable {...generateGenericTableProps()} />
    </div>
  );
};

export default BannedWords;
