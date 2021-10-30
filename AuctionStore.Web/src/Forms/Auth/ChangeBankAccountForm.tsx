import React from "react";
import { useFormContext } from "react-hook-form";
import {
  Grid,
  FormControl,
  Input,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { IBankAccount } from "../../Interfaces/user";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ChangeBankAccountForm: React.FC = () => {
  const { register, setValue, getValues } = useFormContext();
  const classes = useStyles();
  const { t } = useTranslation();
  const [bankAccount, setBankAccount] = React.useState<IBankAccount>({
    id: getValues()["id"],
    accountNr: getValues()["accountNr"],
    ownerAddress: getValues()["ownerAddress"],
    ownerFirstName: getValues()["ownerFirstName"],
    ownerLastName: getValues()["ownerLastName"],
  });

  const handleChangeBankAccountData = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, id } = e.target;
    setBankAccount((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
    setValue(`${id}`, value);
  };

  return (
    <>
      <form>
        <Grid container spacing={1} justify={"center"} alignContent={"center"}>
          <input type="hidden" {...register("id", { required: true })} />
          <input type="hidden" {...register("accountNr", { required: true })} />
          <input
            type="hidden"
            {...register("ownerAddress", { required: true })}
          />
          <input
            type="hidden"
            {...register("ownerFirstName", { required: true })}
          />
          <input
            type="hidden"
            {...register("ownerLastName", { required: true })}
          />
          <Grid item xs={12}>
            <FormControl className={clsx(classes.margin)} fullWidth>
              <InputLabel htmlFor="accountNr">{t("accountNr")}</InputLabel>
              <Input
                id="accountNr"
                autoFocus
                fullWidth
                value={bankAccount.accountNr}
                onChange={handleChangeBankAccountData}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={clsx(classes.margin)} fullWidth>
              <InputLabel htmlFor="ownerFirstName">{t("ownerFirstName")}</InputLabel>
              <Input
                id="ownerFirstName"
                autoFocus
                fullWidth
                value={bankAccount.ownerFirstName}
                onChange={handleChangeBankAccountData}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={clsx(classes.margin)} fullWidth>
              <InputLabel htmlFor="ownerLastName">{t("ownerLastName")}</InputLabel>
              <Input
                id="ownerLastName"
                autoFocus
                fullWidth
                value={bankAccount.ownerLastName}
                onChange={handleChangeBankAccountData}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={clsx(classes.margin)} fullWidth>
              <InputLabel htmlFor="ownerAddress">
                {t("ownerAddress")}
              </InputLabel>
              <Input
                id="ownerAddress"
                autoFocus
                fullWidth
                value={bankAccount.ownerAddress}
                onChange={handleChangeBankAccountData}
              />
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ChangeBankAccountForm;
