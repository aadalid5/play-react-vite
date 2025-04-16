import React, {useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import BigLogo from '../Logos/BigLogo';
import CompactLogo from '../Logos/CompactLogo';
import NavBar from '../NavBar/NavBar';
import PropTypes from 'prop-types';
import styles from './Header.module.scss';
import Hamburguer from '../Logos/Hamburguer';

function Header({ scrollCallback, showAd, showExpandedLogo }) {
    const [isSticky, setIsSticky] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [headerTransition, setIsHeaderTransition] = useState(true);
    const [prevScroll, setPrevScroll] = useState(0);

    const headerRef = useRef(null);
    const mainContentRef = useRef(null);

    useEffect(() => {
        const calculateScrollOffset = () => {
            const adOffset = showAd ? 100 : 280; // 100 (ad) or 280 (no ad)
            const hiddenPosition = 250 + adOffset; // 350 (ad) or 530 (no ad)
            const stickyPosition = hiddenPosition + 60; // scroll offset where header is sticky
                                                        // 410(ad) or 590(no ad)
            return {
                hiddenPosition,
                stickyPosition,
            };
        };

        const handleScroll = () => {
            const { stickyPosition, hiddenPosition } = calculateScrollOffset(); 
            // {stickyPosition: 590, hiddenPosition: 530}
            const currentScroll = window.pageYOffset;
            const isHeaderSticky = currentScroll > stickyPosition; // >590
            const isHeaderHidden = // 530 < currentScroll < 590
                currentScroll < stickyPosition && 
                currentScroll > hiddenPosition;
            const scrollDelta = currentScroll - prevScroll;
            const isScrollingDown = scrollDelta > 0; // true (scroll down)  |  false (scroll up)
            if (isScrollingDown && currentScroll > hiddenPosition) { // ⬇️ & currentScroll > 530
                setIsHeaderTransition(true);
            }
            if (!isScrollingDown && currentScroll < hiddenPosition) { // ⬆️ & currentScroll < 530
                setIsHeaderTransition(false);
            }
            setIsHidden(isHeaderHidden);  // 530 < currentScroll < 590
            setIsSticky(isHeaderSticky); //  currentScroll > 590
            setPrevScroll(currentScroll);
        };

        window.addEventListener('scroll', handleScroll);
        if (scrollCallback) {
            window.addEventListener('scroll', () => {
                const { stickyPosition } = calculateScrollOffset();
                return scrollCallback(window.pageYOffset > stickyPosition);
            });
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('scroll', scrollCallback);
        };
    }, [scrollCallback, showAd, prevScroll]);

    const headerWithClasses = classNames(styles.header, {
        [styles.sticky]: isSticky,
        [styles.hidden]: isHidden,
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
