import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'

const EditProfileLayout : React.FC =({children}) => {

    return (
        <>
            <Navbar/>
            {children}

        </>
    )
}

export default EditProfileLayout;