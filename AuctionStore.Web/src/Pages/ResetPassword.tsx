import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ResetPasswordForm from '../Forms/Auth/ResetPasswordForm';

interface RouteInfo {
    token : string
};

interface IResetPasswordProps extends RouteComponentProps<RouteInfo>{};

const ResetPassword : React.FC<IResetPasswordProps> = ({match}) => {

    return (
        <div>
            <ResetPasswordForm  token={match.params.token}/>
        </div>
    )
}

export default withRouter(ResetPassword);