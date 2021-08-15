import React, { useState } from "react";
import {  useFormContext } from "react-hook-form";
import { Input } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const LoginForm: React.FC = () => {

  const {getValues, setValue, register} = useFormContext();
  const [login, setLogin] = useState<string | undefined>(getValues()["Login"]);
  const [password, setPassword] = useState<string | undefined>(
    getValues()["Password"]
  );
  const { t } = useTranslation();

  // useEffect(() => {
  //   register('Login');
  //   register('Password')
  // },[register])

  return (
    <>
      <form >
        <input type="hidden" {... register('Login')} />
        <input type="hidden" {... register('Password')}  />
        <Input
          autoFocus
          margin="dense"
          placeholder={t("username")}
          fullWidth
          value={login}
          onChange={(e: any) => {
            setLogin(e?.target.value);
            setValue("Login", e.target.value);
          }}
        />
        <Input
          autoFocus
          margin="dense"
          placeholder={t("password")}
          fullWidth
        //   inputRef={register('Password')}
          value={password}
          onChange={(e: any) => {
            setPassword(e?.target.value);
            setValue("Password", e.target.value);
          }}
        />
      </form>
    </>
  );
};

export default LoginForm;
