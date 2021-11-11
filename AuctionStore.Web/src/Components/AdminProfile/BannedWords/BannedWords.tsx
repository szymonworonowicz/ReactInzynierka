import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {IconButton } from "@material-ui/core";
import { Delete, Add } from "@material-ui/icons";
import { IPageRequest } from "../../../Interfaces/Paged";
import { AdminApi } from "../../../Services/Admin/AdminApi";
import { IBannedWord } from "../../../Interfaces/Admin";
import GenericTable from "../../Shared/GenericTable/GenericTable";
import { IGenericTableProps } from "../../Shared/GenericTable/GenericTableInterface/IGenericTableProps";
import { IGenericTableColumnDefinitionType } from "../../Shared/GenericTable/GenericTableInterface/IGenericTableColumnDefinition";
import moment from "moment";
import { useToast } from "../../../shared/hooks/useToast";
import PaperNav from "../../Shared/PaperNav/PaperNav";
import Modal from "../../../shared/Modal/Modal";
import AddWord from '../../../Forms/AddWord';
import usePaged from "../../../shared/hooks/usePaged/usePaged";
import {AddBannedWordType} from '../../../Types/Admin'

const BannedWords: React.FC = () => {
  const [query, setQuery] = useState<IPageRequest>({
    elemPerPage: 10,
    page: 0,
  });

  const [addModal, setAddModal] = useState<boolean>(false);


  const { t } = useTranslation();
  const toast = useToast();

  const [bannedWords, isLoaded, countOfElements] = usePaged<IBannedWord>({
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

  const generateColumns = (): IGenericTableColumnDefinitionType<
    IBannedWord,
    keyof IBannedWord
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
    IBannedWord,
    keyof IBannedWord
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
