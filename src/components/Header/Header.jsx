import React, {useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import BigLogo from '../Logos/BigLogo';
import CompactLogo from '../Logos/CompactLogo';
import NavBar from '../NavBar/NavBar';
import PropTypes from 'prop-types';
import styles from './Header.module.scss';
import Hamburguer from '../Logos/Hamburguer';

function Header({ showAd, showExpandedLogo }) {
    const [isSticky, setIsSticky] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [headerTransition, setIsHeaderTransition] = useState(true);
    const [prevScroll, setPrevScroll] = useState(0);

    const headerRef = useRef(null);
    const mainContentRef = useRef(null);

    const headerWithClasses = classNames(styles.header, {
        [styles['no-transition']]: !headerTransition,
        [styles['expanded-logo']]: showExpandedLogo,
    });

    const resizeClasses = classNames(styles.resize, {
        [styles['resize-placeholder']]: isSticky || isHidden,
    });


    return (
        <>
            {showAd && (
                <div className={styles['ad-container']}>
                    <div>AdSlot</div>
                </div>
            )}
            <div className={resizeClasses} />
            <header className={headerWithClasses} ref={headerRef}>
                <div className={styles['main-content']} ref={mainContentRef}>
                    <a href="/">
                        <BigLogo
                            className={styles['big-logo']}
                        />
                        <CompactLogo
                            className={styles['compact-logo']}
                        />
                    </a>
                    <div className={styles.content}>
                        <div className={styles['upper-section']}>
                            <Hamburguer />
                            <div className={styles['subscribe-sign-in']}>
                                <button> Login </button>
                                
                            </div>
                        </div>
                        <NavBar className={styles.navbar} />
                    </div>
                </div>
            </header>
        </>
    );
}

Header.defaultProps = {
    showAd: true,
    children: null,
    scrollCallback: null,
    showExpandedLogo: false,
};

Header.propTypes = {
    showAd: PropTypes.bool,
    children: PropTypes.node,
    scrollCallback: PropTypes.func,
    showExpandedLogo: PropTypes.bool,
};

export default Header;
