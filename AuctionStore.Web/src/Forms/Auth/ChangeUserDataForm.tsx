import React from "react";
import { useFormContext, FieldError } from "react-hook-form";
import {
  Grid,
  TextField,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { UserInfoType } from "../../Types/User/";
import {
  getRegexTable,
  getValidator,
  ValidatorType,
} from "../../Helpers/constans";


const ChangeUserDataForm: React.FC = () => {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<UserInfoType>();

  const [data, setData] = React.useState<UserInfoType>(getValues() as UserInfoType);
  const { t } = useTranslation();

  const regexTable = getRegexTable(t);

  const validationTable = {
    fistName: getValidator(t, null, regexTable[ValidatorType.Alphabetic], true),
    lastName: getValidator(t, null, regexTable[ValidatorType.Alphabetic], true),
    email: getValidator(t, null, regexTable[ValidatorType.Email], true),
  };
  const handleChangeUserData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, id } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
    setValue(id as (keyof UserInfoType), value);
  };

  return (
    <>
      <form>
        <input
          type="hidden"
          {...register("firstName", validationTable.fistName)}
        />
        <input
          type="hidden"
          {...register("lastName", validationTable.lastName)}
        />
        <input type="hidden" {...register("email", validationTable.email)} />
        <Grid container spacing={1} justify={"center"} alignContent={"center"}>
          <Grid item xs={12}>
            <TextField
              id="firstName"
              name="firstName"
              fullWidth
              label={t("firstName")}
              value={data.firstName}
              onChange={handleChangeUserData}
              error={
                errors.firstName && errors.firstName?.message !== undefined
              }
              helperText={(errors.firstName as FieldError)?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="lastName"
              name="lastName"
              fullWidth
              label={t("lastName")}
              value={data.lastName}
              onChange={handleChangeUserData}
              error={
                errors.lastName && errors.lastName?.message !== undefined
              }
              helperText={(errors.lastName as FieldError)?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="email"
              name="email"
              fullWidth
              label={t("email")}
              value={data.email}
              onChange={handleChangeUserData}
              error={errors.email && errors.email.message !== undefined}
              helperText={(errors.email as FieldError)?.message}
            />
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ChangeUserDataForm;
