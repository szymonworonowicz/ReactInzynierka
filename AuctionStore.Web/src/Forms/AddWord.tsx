import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { Grid, FormControl, Input, InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

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
  const [newWord, setNewWord] = useState<string>("");
  const { register, setValue } = useFormContext();
  const { t } = useTranslation();
  const classes = useStyles();


  const handleNewWordChange = (e : any) => {
    const {value} = e.target;

    setNewWord(value);
    setValue('newWord',value);
  }
  return (
    <form>
      <Grid container spacing={1} justify={"center"} alignContent={"center"}>
        <input type="hidden" {...register("newWord", { required: true })} />
        <Grid item xs={12}>
          <FormControl className={clsx(classes.margin)} fullWidth>
            <InputLabel htmlFor="newWord">{t("newWord")}</InputLabel>
            <Input
              id="newWord"
              autoFocus
              fullWidth
              value={newWord}
              onChange={handleNewWordChange}
            />
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddWord;
