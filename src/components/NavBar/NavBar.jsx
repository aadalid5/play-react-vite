import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './NavBar.module.scss';

function NavBar({ className }) {
    const withClasses = classNames({
        [className]: className,
    });

    return (
        <nav className={withClasses} aria-label="Quick Menu">
            <ul className={styles.list}>
                <li>
                    <a className={styles.link} href="/the-latest">
                        Latest
                    </a>
                </li>
                <li>
                    <a className={styles.link} href="/magazine">
                        Magazine
                    </a>
                </li>
                <li>
                    <a className={styles.link} href="/topics">
                        Topics
                    </a>
                </li>
                <li>
                    <a className={styles.link} href="/podcasts">
                        Podcasts
                    </a>
                </li>
            </ul>
        </nav>
    );
}

NavBar.defaultProps = {
    className: '',
};

NavBar.propTypes = {
    className: PropTypes.string,
};

export default NavBar;
