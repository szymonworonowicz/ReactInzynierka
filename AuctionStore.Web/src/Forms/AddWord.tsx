import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormContext, FieldError } from "react-hook-form";
import { Grid, TextField} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { AddBannedWordType } from "../Types/Admin";
import {
  getRegexTable,
  getValidator,
  ValidatorType,
} from "../Helpers/constans";

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

const AddWord: React.FC = () => {
  const [newWord, setNewWord] = useState<AddBannedWordType>({
    newWord: "",
  });
  const { register, setValue, formState:{errors} } = useFormContext<AddBannedWordType>();
  const { t } = useTranslation();
  const classes = useStyles();

  const handleNewWordChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;

    setNewWord({
      newWord: value,
    });
    setValue("newWord", value);
  };

  const regexTable = getRegexTable(t);

  const formValidators = {
    newWord : getValidator(t,null, regexTable[ValidatorType.AlphaNumeric],true)
  }

  return (
    <form>
      <Grid container spacing={1} justify={"center"} alignContent={"center"}>
        <input type="hidden" {...register("newWord", formValidators.newWord)} />
        <Grid item xs={12}>
        <TextField
            id="newWord"
            name="newWord"
            autoFocus
            fullWidth
            value={newWord.newWord}
            onChange={handleNewWordChange}
            error={
              errors.newWord && errors.newWord.message !== undefined
            }
            helperText={(errors.newWord as FieldError)?.message}
            label={t("newWord")}
            className={clsx(classes.margin)}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default AddWord;
