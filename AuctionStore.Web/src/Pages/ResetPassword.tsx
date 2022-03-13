import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RouteComponentProps, withRouter } from "react-router-dom";
import ResetPasswordForm from "../Forms/Auth/ResetPasswordForm";

interface RouteInfo {
  token: string;
}

interface IResetPasswordProps extends RouteComponentProps<RouteInfo> {}

const ResetPassword: React.FC<IResetPasswordProps> = ({ match }) => {
  const methods = useForm();
  return (
    <div>
      <FormProvider {...methods}>
        <ResetPasswordForm token={match.params.token} />
      </FormProvider>
    </div>
  );
};

export default withRouter(ResetPassword);
