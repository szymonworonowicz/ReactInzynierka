import React, { useEffect, useState, useMemo } from "react";
import { IUserAddressContainerProps } from "./IUserAddressContainerProps";
import { useTranslation } from "react-i18next";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { IAddress } from "../../../../Interfaces/user";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from "@material-ui/core";
import UserAddressContainerPapper from "./UserAddressContainerPapper/UserAddressContainerPapper";

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
const UserAddressesContainer: React.FC<IUserAddressContainerProps> = ({
  data,
  onDeleteAddress,
}) => {

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const selectedAddress = useMemo(() => data[selectedIndex],[selectedIndex, data])

  const classes = useStyles();
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
      <FormControl className={classes.formControl}>
        <InputLabel id="address-select">{t("chooseAddress")}</InputLabel>
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
        >
          {data.map((elem, index) => {
            return (
              <MenuItem value={index} key={elem.id}>
                {generateMenuItemText(elem)}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
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
            />
          </Paper>
        )}
      </div>
    </>
  );
};

export default UserAddressesContainer;
