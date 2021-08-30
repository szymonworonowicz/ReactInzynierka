import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import styles from './EmptyLayout.module.css';

const EmptyLayout : React.FC = ({children}) => {

    return (
        <>
            <Navbar/>
            <div className={styles.children}>
                {children}
            </div>

        </>
    )

}

export default EmptyLayout;