import React, { useState, useEffect, useContext, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { IMessage } from "../../Interfaces/Message";
import { IPageRequest } from "../../Interfaces/Paged";
import { MessageService } from "../../Services/Messaage/Message.service";
import { UserContext } from "../../Context/UserContext";
import GenericTable from "../Shared/GenericTable/GenericTable";
import { IGenericTableProps } from "../Shared/GenericTable/GenericTableInterface/IGenericTableProps";
import { IGenericTableColumnDefinitionType } from "../Shared/GenericTable/GenericTableInterface/IGenericTableColumnDefinition";
import MessageItem from "./MessageItem/MessageItem";
import { useToast } from "../../shared/hooks/useToast";
import Popper from "../../shared/Popper/Popper";
import MessageDetails from "./MessageDetails/MessageDetails";
import usePaged from "../../shared/hooks/usePaged/usePaged";

const useStyles = makeStyles({
  root: {
    position: "absolute",
    width: "80vw",
    flexGrow: 1,
    flexDirection: "row",
  },
  content: {
    height: "80vh",
    marginTop: "10px",
    position: "relative",
  },
});

const MessageView: React.FC = () => {
  // const [messages, setMessages] = useState<Array<IMessage>>([]);
  // const [isLoaded, setIsLoaded] = useState<boolean>(false);
  // const [countOfElements, setCountOfElements] = useState<number>(0);
  const [query, setQuery] = useState<IPageRequest>({
    elemPerPage: 10,
    page: 0,
  });
  const [showMore, setShowMore] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<IMessage | undefined>();

  const context = useContext(UserContext);

  const [messages, isLoaded, countOfElements] = usePaged<IMessage>(
    {
      apiCall: MessageService.getMessages,
      query: query,
    },
    context.userId as string
  );

  const { t } = useTranslation();
  const toast = useToast();
  const classes = useStyles();

  const showMessageMore = (messageId: string): void => {
    const message = messages.find((x) => x.id === messageId);
    setSelectedItem(message);
    setShowMore(true);
  };

  const handlePopperClose = (): void => {
    setShowMore(false);
  };

  const getMessageDetailsBody = (): JSX.Element => {
    return <MessageDetails message={selectedItem as IMessage} />;
  };

  const deleteMessage = (messageId: string): void => {
    MessageService.deleteMessage(messageId)
      .then(response => {
        if (response) {
          toast(t("successRemoveMessage"), "success");
          setQuery(prev => {
            return {
              ...prev,
              query: 0
            }
          })
        } else {
          toast(t("failureRemoveMessage"), "error");
        }
      })

  };

  const generateColumns = (): IGenericTableColumnDefinitionType<
    IMessage,
    keyof IMessage
  >[] => {
    return [
      {
        header: t("message"),
        key: "id",
        generate: (rowData: IMessage) => {
          return (
            <MessageItem
              message={rowData}
              showMessageMore={showMessageMore}
              deleteMessage={deleteMessage}
            />
          );
        },
      },
    ];
  };

  const generateGenericTableProps = (): IGenericTableProps<
    IMessage,
    keyof IMessage
  > => {
    return {
      columns: generateColumns(),
      countOfElements: countOfElements,
      query,
      setQuery,
      data: messages,
    };
  };

  if (isLoaded) {
    return <CircularProgress />;
  }
  return (
    <div className={classes.root}>
      {showMore && (
        <Popper
          open={showMore}
          onCancel={handlePopperClose}
          showCancel={false}
          showSave={false}
          title={t("messageDetails")}
          body={getMessageDetailsBody()}
          maxWidth="lg"
        />
      )}

      <GenericTable {...generateGenericTableProps()} />
    </div>
  );
};

export default MessageView;
