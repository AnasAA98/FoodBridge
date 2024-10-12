// src/app/navbar/navbar.jsx
import React from 'react';
import styles from './navbar.module.css'; // Make sure this path is correct

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navList}>
                <li className={styles.navItem}><a href="/about" className={styles.navLink}>About</a></li>
                <li className={styles.navItem}><a href="/spotLight" className={styles.navLink}>Spotlight</a></li>
                <li className={styles.navItem}><a href="/contact" className={styles.navLink}>Contact Us</a></li>
                <li className={styles.navItem}><a href="/restaurants" className={styles.navLink}>Login</a></li>

            </ul>
        </nav>
    );
}

export default Navbar; 
