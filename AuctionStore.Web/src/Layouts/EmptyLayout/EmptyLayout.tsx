import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import styles from './EmptyLayout.module.css';
import Footer from '../../Components/Footer/Footer';

const EmptyLayout : React.FC = ({children}) => {

    return (
        <>
            <Navbar/>
            <div className={styles.children}>
                {children}
            </div>
            <Footer/>
        </>
    )

}

export default EmptyLayout;