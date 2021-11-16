import React, { useState,  useEffect, useContext } from "react";
import { IAuctionConfirmDeliveryAddressProps } from "../../../../Interfaces/Auction/AuctionConfirmation";
import { UserContext } from "../../../../Context/UserContext";
import { useTranslation } from "react-i18next";
import { AddressType } from "../../../../Types/User/";
import { UserApi } from "../../../../Services/User/User.service";
import { Select, MenuItem } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AddressContainer from "./AdressContainer/AddressContainer";
import { useFormContext } from "react-hook-form";
import { LottieContext } from "../../../../Context/LottieContext";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

const AuctionConfirmDeliveryAddress: React.FC<IAuctionConfirmDeliveryAddressProps> =
  ({ setSelectedCity }) => {
    const [addressTable, setAddressTable] = useState<Array<AddressType>>([]);
    const [selectedItem, setSelectedItem] = useState<number>(0);
    const {isOpen, setLottieOpen} = React.useContext(LottieContext);

    const context = useContext(UserContext);
    const { t } = useTranslation();
    const {setValue} = useFormContext();
    
    useEffect(() => {
      setLottieOpen(true);
      UserApi.getAddresses(context.userId)
      .then((response ) => {
        setAddressTable(response);
        setValue('address.selectedAddressId', response[0].id ?? 0)        
      })
      .finally(() => {
        setLottieOpen(false);
      })

    }, [context.userId, setLottieOpen, setValue]);

    const handleChangeAddress = (
      event: React.ChangeEvent<{ value: unknown }>
    ) => {
      const index = event.target.value as number;
      setSelectedItem(index);
      setSelectedCity(addressTable[index].city);

      setValue('selectedAddressId',addressTable[index].id)
    };

    const generateMenuItemText = (elem: AddressType): string => {
      return `${elem.city}  ${elem.street} ${elem.houseNo}`;
    };

    return (
      <>
          <Select
            labelId="address-select"
            value={selectedItem}
            label={t("chooseAddress")}
            onChange={handleChangeAddress}
            MenuProps={{
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              getContentAnchorEl: null,
            }}
          >
            {addressTable.map((elem, index) => {
              return (
                <MenuItem value={index} key={elem.id}>
                  {generateMenuItemText(elem)}
                </MenuItem>
              );
            })}
          </Select>
        {(!isOpen && addressTable )&& (
          <AddressContainer
            data={addressTable[selectedItem]}
          />
        )}
      </>
    );
  };

export default AuctionConfirmDeliveryAddress;
