import React, { useState, useCallback, useEffect, useContext } from "react";
import { IAuctionConfirmDeliveryAddressProps } from "./IAuctionConfirmDeliveryAddressProps";
import { UserContext } from "../../../../Context/UserContext";
import { useTranslation } from "react-i18next";
import { IAddress } from "../../../../Interfaces/user";
import { UserApi } from "../../../../Services/User/UserApi";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AddressContainer from "./AdressContainer/AddressContainer";
import Modal from "../../../../shared/Modal/Modal";
import AddressForm from "../../../../Forms/AddressForm";

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
    const [addressTable, setAddressTable] = useState<Array<IAddress>>([]);
    const [selectedItem, setSelectedItem] = useState<number>(0);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [editAddress, setEditAddress] = useState<boolean>(false);

    const context = useContext(UserContext);
    const { t } = useTranslation();
    const classes = useStyles();

    const fetchData = useCallback(async () => {
      const response = await UserApi.getAddresses(context.userId);
      setAddressTable(response);
      setIsLoaded(true);
    }, [context.userId]);

    useEffect(() => {
      (async () => {
        await fetchData();
      })();
    }, [fetchData]);

    const handleChangeAddress = (
      event: React.ChangeEvent<{ value: unknown }>
    ) => {
      const index = event.target.value as number;
      setSelectedItem(index);
      setSelectedCity(addressTable[index].city);
    };

    const generateMenuItemText = (elem: IAddress): string => {
      return `${elem.city} ${t("ul")} ${elem.street} ${elem.houseNo}`;
    };

    return (
      <>
        <FormControl className={classes.formControl}>
          <InputLabel id="address-select">{t("chooseAddress")}</InputLabel>
          <Select
            labelId="address-select"
            value={selectedItem}
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
        </FormControl>
        {isLoaded && (
          <AddressContainer
            data={addressTable[selectedItem]}
            setEditAddress={setEditAddress}
          />
        )}
      </>
    );
  };

export default AuctionConfirmDeliveryAddress;
