// src/app/navbar/navbar.jsx
import React from 'react';
import styles from './navbar.module.css'; // Make sure this path is correct

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navList}>
                <li className={styles.navItem}><a href="/about" className={styles.navLink}>About</a></li>
                <li className={styles.navItem}><a href="/customers" className={styles.navLink}>Customers</a></li>
                <li className={styles.navItem}><a href="/restaurants" className={styles.navLink}>Restaurants</a></li>
            </ul>
        </nav>
    );
}

export default Navbar; // Make sure you're exporting the component
