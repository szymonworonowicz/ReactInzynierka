import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CircularProgress, IconButton } from "@material-ui/core";
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

const BannedWords: React.FC = () => {
  const [bannedWords, setBannedWords] = useState<Array<IBannedWord>>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [query, setQuery] = useState<IPageRequest>({
    elemPerPage: 10,
    page: 0,
  });
  const [addModal, setAddModal] = useState<boolean>(false);

  const { t } = useTranslation();
  const toast = useToast();

  useEffect(() => {
    setIsLoaded(true);
    (async () => {
      const data = await AdminApi.getBannedWords(query);
      setBannedWords(data.pageElements);
      setIsLoaded(false);
    })();
  }, [setIsLoaded, query]);

  const DeleteWord = async (id: string): Promise<void> => {
    if (await AdminApi.deleteBannedWord(id)) {
      toast(t("deleteBannedWord"), "success");
      setBannedWords((prev) => {
        let index = prev.findIndex((x) => x.id === id);
        if (index !== -1) {
          prev.splice(index, 1);
        }
        return [...prev];
      });
    } else {
      toast(t("deleteBannedWordFailure"), "error");
    }
  };

  const AddNewWord = async (word : string) : Promise<void> => {
    const response = await AdminApi.AddNewBannedWord(word);
    if(response !== null) {
        setBannedWords(prev => [...prev, response]);
        toast(t("addedBannedWord"), "success");
        setAddModal(false);
    }
    else {
        toast(t("AddBanedWordFailure"), "error");
    }
  }

  const generateColumns = (): IGenericTableColumnDefinitionType<
    IBannedWord,
    keyof IBannedWord
  >[] => {
    return [
      {
        header: t("banned_word"),
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
      countOfElements: bannedWords.length,
      query,
      setQuery,
      data: bannedWords,
    };
  };

  if (isLoaded) {
    return <CircularProgress />;
  }

  return (
    <div>
      {addModal && 
      <Modal
        header={t('add_banned_word')}
        isOpen={addModal}
        handleClose={() => setAddModal(false)}
        handleSave = {(word : string) => AddNewWord(word)}
      >
          <AddWord/>
      </Modal>}
      <PaperNav
        ExternalIcon={Add}
        header={t("banned_words")}
        externalIconAction={() => setAddModal(true)}
      />
      <GenericTable {...generateGenericTableProps()} />
    </div>
  );
};

export default BannedWords;
