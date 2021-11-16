import React, { useState } from "react";
import { PageRequestType } from "../../Types/Paged";
import GenericTable from "../Shared/GenericTable/GenericTable";
import {
  IGenericTableProps,
  IGenericTableColumnDefinitionProps,
} from "../../Interfaces/Shared/GenericTable";
import { IAuction } from "../../Interfaces/Auctions";
import { AuctionApi } from "../../Services/Auction/Auction.service";
import { ICategoriesTableProps } from "../../Interfaces/Auction/";
import AuctionListElement from "./AuctionList/AuctionListElement";
import { LottieContext } from "../../Context/LottieContext";

const AuctionsTable: React.FC<ICategoriesTableProps> = ({ categoryId }) => {
  const { isOpen, setLottieOpen } = React.useContext(LottieContext);
  const [auctions, setAuctions] = useState<Array<IAuction>>([]);
  const [countOfElements, setCountOfElements] = useState<number>(0);

  const [query, setQuery] = useState<PageRequestType>({
    elemPerPage: 10,
    page: 0,
  });

  React.useEffect(() => {
    setLottieOpen(true);
    AuctionApi.getAllByCategory(query, categoryId)
      .then((response) => {
        setAuctions(response.pageElements);
        setCountOfElements(response.countOfElements);
      })
      .finally(() => {
        setLottieOpen(false);
      });
  }, [categoryId, query, setLottieOpen]);

  const generateColumns = (): Array<
    IGenericTableColumnDefinitionProps<IAuction, keyof IAuction>
  > => {
    return [
      {
        header: "",
        key: "id",
        generate: (rowData) => {
          return (
            <AuctionListElement
              data={rowData}
              key={rowData.id}
              hideStatus={true}
            />
          );
        },
      },
    ];
  };

  const generateGenericTableProps = (): IGenericTableProps<
    IAuction,
    keyof IAuction
  > => {
    return {
      columns: generateColumns(),
      countOfElements,
      data: auctions,
      query,
      setQuery,
    };
  };

  if (isOpen) {
    return <></>;
  }
  
  return <GenericTable {...generateGenericTableProps()} />;
};

export default AuctionsTable;
