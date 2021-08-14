import React from 'react'
import Navbar from '../Components/Navbar/Navbar'

const DefaultLayout : React.FC = ({children}) => {

    return (
        <>
            <Navbar/>
            {children}
        </>
    )

}

export default DefaultLayout;