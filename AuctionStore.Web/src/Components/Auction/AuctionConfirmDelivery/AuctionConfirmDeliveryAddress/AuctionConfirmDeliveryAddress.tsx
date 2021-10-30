import React, { useState,  useEffect, useContext } from "react";
import { IAuctionConfirmDeliveryAddressProps } from "./IAuctionConfirmDeliveryAddressProps";
import { UserContext } from "../../../../Context/UserContext";
import { useTranslation } from "react-i18next";
import { IAddress } from "../../../../Interfaces/user";
import { UserApi } from "../../../../Services/User/UserApi";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AddressContainer from "./AdressContainer/AddressContainer";
import { useFormContext } from "react-hook-form";


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
    const {setValue} = useFormContext();
    
    useEffect(() => {
      setIsLoaded(false);
      UserApi.getAddresses(context.userId)
      .then((response ) => {
        setAddressTable(response);
        setValue('address.selectedAddressId', response[0].id ?? 0)        
      })
      .finally(() => {
        setIsLoaded(true);
      })

    }, [context.userId, setValue]);

    const handleChangeAddress = (
      event: React.ChangeEvent<{ value: unknown }>
    ) => {
      const index = event.target.value as number;
      setSelectedItem(index);
      setSelectedCity(addressTable[index].city);

      setValue('selectedAddressId',addressTable[index].id)
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
