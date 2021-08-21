import React,{useContext} from "react";
import { UserContext } from "../Context/UserContext";

const Profile = () => {
    
    const context = useContext(UserContext);
    const {isLogged} = context;

    return (
        <>
        </>
    )
}

export default Profile;