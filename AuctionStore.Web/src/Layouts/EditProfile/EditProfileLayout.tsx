import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer';

const EditProfileLayout : React.FC =({children}) => {

    return (
        <>
            <Navbar/>
            {children}
            <Footer/>

        </>
    )
}

export default EditProfileLayout;