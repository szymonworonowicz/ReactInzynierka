import React ,{useContext} from "react";
import { UserContext } from "../Context/UserContext";
import { UserRoles } from "../Helpers/constans";
import UserProfile from '../Components/UserProfile/UserProfile'
import AdminProfile from '../Components/AdminProfile/AdminProfile'

const Profile : React.FC = () => {
    debugger;
    console.log('profile')
    const context = useContext(UserContext);
    const {userRole} = context;
    console.log(userRole)
    const getProfile = () : JSX.Element => {
        if(userRole === UserRoles.Admin) {
            return <AdminProfile/>;
        }
        else {
            return <UserProfile/>;
        }
    };

    return (
        <>
            {getProfile()}
        </>
    )
}

export default Profile;