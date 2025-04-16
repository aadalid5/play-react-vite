import React from 'react'
import Header from '../Header/Header'
import styles from "./Article.module.scss"

function Article() {
    return (
        <>
            <div className={styles['top-container']}>
                <div className={styles['primary-ad-container']}>
                    <div className={styles['primary-ad']}>PRIMARY AD</div>
                </div>
                <div className={styles['header-container']}>
                    <Header
                        showAd={false}
                    />
                </div>
            </div>
            <main>
                <h1>Content title</h1>
                Lorem ipsum.
            </main>
        </>
    )
}

export default Article
