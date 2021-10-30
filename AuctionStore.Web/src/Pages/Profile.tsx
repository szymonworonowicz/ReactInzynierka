import React ,{useContext} from "react";
import { UserContext } from "../Context/UserContext";
import { UserRoles } from "../Helpers/constans";
import UserProfile from '../Components/UserProfile/UserProfile'
import AdminProfile from '../Components/AdminProfile/AdminProfile'
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    root:{
        marginTop:' 3rem'
    }
})
const Profile : React.FC = () => {
    const context = useContext(UserContext);
    const {userRole} = context;
    const classes = useStyles();
    
    const getProfile = () : JSX.Element => {
        if(userRole === UserRoles.Admin) {
            return <AdminProfile/>;
        }
        else {
            return <UserProfile/>;
        }
    };

    return (
        <div className={classes.root}>
            {getProfile()}
        </div>
    )
}

export default Profile;