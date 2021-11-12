import React, { useEffect, useState, useMemo } from "react";
import { IUserAddressContainerProps } from "../../../../Interfaces/UserAddress/";
import { useTranslation } from "react-i18next";
import { IAddress } from "../../../../Interfaces/user";
import {
  Select,
  MenuItem,
  Paper,
} from "@material-ui/core";
import UserAddressContainerPapper from "./UserAddressContainerPapper/UserAddressContainerPapper";


const UserAddressesContainer: React.FC<IUserAddressContainerProps> = ({
  data,
  onDeleteAddress,
  onEditAddress
}) => {

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const selectedAddress = useMemo(() => data[selectedIndex],[selectedIndex, data])

  const { t } = useTranslation();

  useEffect(() => {
    setSelectedIndex(0)
  },[data])

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const index = event.target.value as number;
    setSelectedIndex(index);
  };
  const generateMenuItemText = (elem: IAddress): string => {
    return `${elem.city} ${t("ul")} ${elem.street} ${elem.houseNo}`;
  };

  const generateMenu = (): JSX.Element => {
    return (
        <Select
          labelId="address-select"
          value={selectedIndex}
          onChange={handleChange}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            getContentAnchorEl: null,
          }}
          label={t("chooseAddress")}
        >
          {data.map((elem, index) => {
            return (
              <MenuItem value={index} key={elem.id}>
                {generateMenuItemText(elem)}
              </MenuItem>
            );
          })}
        </Select>
    );
  };

  return (
    <>
      <div>
        {generateMenu()}
        {data.length !== 0 && (
          <Paper square>
            <UserAddressContainerPapper
              address={selectedAddress}
              onDeleteAddress={onDeleteAddress}
              onEditAddress = {onEditAddress}
            />
          </Paper>
        )}
      </div>
    </>
  );
};

export default UserAddressesContainer;
