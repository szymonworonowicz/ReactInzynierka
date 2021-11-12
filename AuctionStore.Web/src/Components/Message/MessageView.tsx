import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core";
import { IMessage } from "../../Interfaces/Message";
import { IPageRequest } from "../../Interfaces/Paged";
import { MessageService } from "../../Services/Messaage/Message.service";
import { UserContext } from "../../Context/UserContext";
import GenericTable from "../Shared/GenericTable/GenericTable";
import { IGenericTableProps } from "../../Interfaces/Shared/GenericTable";

import { IGenericTableColumnDefinitionProps } from "../../Interfaces/Shared/GenericTable/IGenericTableColumnDefinitionProps";
import MessageItem from "./MessageItem/MessageItem";
import { useToast } from "../../shared/hooks/useToast";
import Popper from "../../shared/Popper/Popper";
import MessageDetails from "./MessageDetails/MessageDetails";
import { UpdateMessageStateType } from "../../Types/Messages";
import { LottieContext } from "../../Context/LottieContext";

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
  const [query, setQuery] = useState<IPageRequest>({
    elemPerPage: 10,
    page: 0,
  });
  const [showMore, setShowMore] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<IMessage | undefined>();
  const [countOfElements, setCountOfElements] = React.useState<number>(0);
  const [messages, setMessages] = React.useState<Array<IMessage>>([]);

  const context = useContext(UserContext);

  const { isOpen, setLottieOpen } = React.useContext(LottieContext);

  React.useEffect(() => {
    setLottieOpen(true);
    MessageService.getMessages(query, context.userId as string)
      .then((data) => {
        setCountOfElements(data.countOfElements);
        setMessages(data.pageElements);
      })
      .finally(() => {
        setLottieOpen(false);
      });
  }, [context.userId, query, setLottieOpen]);

  const updateMessagesState = React.useCallback((): void => {
    const messageStates: UpdateMessageStateType[] = messages.map((message) => {
      return {
        messageId: message.id,
        isReaded: message.isReaded,
      };
    });

    MessageService.setMessageState(messageStates);
  }, [messages]);

  React.useEffect(() => {
    return () => {
      updateMessagesState();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { t } = useTranslation();
  const toast = useToast();
  const classes = useStyles();

  const showMessageMore = (messageId: string): void => {
    const messageIndex = messages.findIndex((x) => x.id === messageId);
    const message = messages[messageIndex];

    if (!message?.isReaded) {
      setMessages((prev) => {
        const stateMessage = prev[messageIndex];
        stateMessage.isReaded = true;
        prev.splice(messageIndex, 1, stateMessage);

        return prev;
      });
    }
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
    MessageService.deleteMessage(messageId).then((response) => {
      if (response) {
        toast(t("successRemoveMessage"), "success");
        setQuery((prev) => {
          return {
            ...prev,
            query: 0,
          };
        });
      } else {
        toast(t("failureRemoveMessage"), "error");
      }
    });
  };

  const handleMessageReaded = (messageId: string) => {
    setMessages((prev) => {
      const local = prev;
      const messageIndex = local.findIndex((x) => x.id === messageId);
      debugger;
      const stateMessage = local[messageIndex];
      stateMessage.isReaded = !stateMessage.isReaded;
      local.splice(messageIndex, 1, stateMessage);

      return [...local];
    });
  };

  const generateColumns = (): IGenericTableColumnDefinitionProps<
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
              handleMessageReaded={handleMessageReaded}
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
      externalMethod: updateMessagesState,
    };
  };

  if (isOpen) {
    return <></>;
  }

  console.log("AS");
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
          hasCloseIcon={true}
        />
      )}

      <GenericTable {...generateGenericTableProps()} />
    </div>
  );
};

export default MessageView;
