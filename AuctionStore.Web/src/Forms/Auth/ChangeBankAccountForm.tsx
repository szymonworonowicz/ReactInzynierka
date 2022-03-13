import React from "react";
import { useFormContext, FieldError } from "react-hook-form";
import {
  Grid,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { BankAccountType } from "../../Types/User/";
import {
  getRegexTable,
  getValidator,
  ValidatorType,
} from "../../Helpers/constans";

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
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
    clearErrors
  } = useFormContext<BankAccountType>();
  
  const [bankAccount, setBankAccount] = React.useState<BankAccountType>({
    id: getValues().id,
    accountNr: getValues().accountNr,
    ownerAddress: getValues().ownerAddress,
    ownerFirstName: getValues().ownerFirstName,
    ownerLastName: getValues().ownerLastName,
  });

  const classes = useStyles();
  const { t } = useTranslation();
  
  const regexTable = getRegexTable(t);

  React.useEffect(() => {
    clearErrors()
  },[clearErrors])

  const formValidators = {
    accountNr: getValidator(
      t,
      null,
      regexTable[ValidatorType.AlphaNumeric],
      true
    ),
    ownerAddress: getValidator(t, null, null, true),
    ownerFirstName: getValidator(
      t,
      null,
      regexTable[ValidatorType.Alphabetic],
      true
    ),
    ownerLastName: getValidator(
      t,
      null,
      regexTable[ValidatorType.Alphabetic],
      true
    ),
  };

  const handleChangeBankAccountData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, id } = e.target;
    setBankAccount((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
    setValue(id as (keyof BankAccountType), value);
  };

  return (
    <>
      <form>
        <Grid
          container
          spacing={1}
          justifyContent="center"
          alignContent="center"
        >
          <input type="hidden" {...register("id", { required: true })} />
          <input
            type="hidden"
            {...register("accountNr", formValidators.accountNr)}
          />
          <input
            type="hidden"
            {...register("ownerAddress", formValidators.ownerAddress)}
          />
          <input
            type="hidden"
            {...register("ownerFirstName", formValidators.ownerFirstName)}
          />
          <input
            type="hidden"
            {...register("ownerLastName", formValidators.ownerLastName)}
          />
          <Grid item xs={12}>
            <TextField
              id="accountNr"
              name="accountNr"
              label={t("accountNr")}
              autoFocus
              fullWidth
              value={bankAccount.accountNr}
              onChange={handleChangeBankAccountData}
              error={
                errors.accountNr && errors.accountNr.message !== undefined
              }
              helperText={(errors.accountNr as FieldError)?.message}
              className={clsx(classes.margin)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="ownerFirstName"
              name="ownerFirstName"
              label={t("ownerFirstName")}
              fullWidth
              value={bankAccount.ownerFirstName}
              onChange={handleChangeBankAccountData}
              error={
                errors.ownerFirstName &&
                errors.ownerFirstName?.message !== undefined
              }
              helperText={(errors.ownerFirstName as FieldError)?.message}
              className={clsx(classes.margin)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="ownerLastName"
              name="ownerLastName"
              label={t("ownerLastName")}
              fullWidth
              value={bankAccount.ownerLastName}
              onChange={handleChangeBankAccountData}
              error={
                errors.ownerLastName &&
                errors.ownerLastName.message !== undefined
              }
              helperText={(errors.ownerLastName as FieldError)?.message}
              className={clsx(classes.margin)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="ownerAddress"
              name="ownerAddress"
              label={t("ownerAddress")}
              fullWidth
              value={bankAccount.ownerAddress}
              onChange={handleChangeBankAccountData}
              error={
                errors.ownerAddress &&
                errors.ownerAddress?.message !== undefined
              }
              helperText={(errors.ownerAddress as FieldError)?.message}
              className={clsx(classes.margin)}
            />
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ChangeBankAccountForm;
