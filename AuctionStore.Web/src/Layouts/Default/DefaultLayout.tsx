import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Categories from '../../Components/Categories/Categories';
import styles from './DefaultLayout.module.css'

const DefaultLayout : React.FC = ({children}) => {

    return (
        <>
            <Navbar/>
            <Categories/>
            <div className={styles.children}>
                {children}
            </div>

        </>
    )

}

export default DefaultLayout;