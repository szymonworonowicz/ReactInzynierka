import {useState} from 'react';
import {IUserData} from '../../Interfaces/user'
import {authService} from '../../Services/Auth.service'

export const useUserContext = () => {

    const [userContextValue, setUserContextValue] = useState<IUserData>({
        userId: null,
        userName: null,
        userRole: null,
        userLogin: null,
        isLogged: false,
      });
    
      authService.onLogin = (authdata) => {
        setUserContextValue({
          userId: authdata.id,
          userName: authdata.name,
          userRole: authdata.role,
          userLogin: authdata.userName,
          isLogged: true,
        });
      };
     
      authService.onLogout = () => {
        setUserContextValue({
          userId: null,
          userName: null,
          userLogin: null,
          userRole: null,
          isLogged: false,
        });
      };

      return userContextValue;
}