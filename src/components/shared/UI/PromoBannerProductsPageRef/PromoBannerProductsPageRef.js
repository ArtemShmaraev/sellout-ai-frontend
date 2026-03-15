import React, {useContext, useEffect, useState} from 'react';
import styles from './PromoBannerProductsPageRef.module.css'
import {desktopStore} from "@/store/DesktopStore";
import ModalRef from "@/components/shared/ModalRef/ModalRef";

const PromoBannerProductsPageRef = () => {
    const [refModalOpen, setRefModalOpen] = useState(false);

    const toggleRef = () => {
        setRefModalOpen((prev) => !prev);
        document.body.classList.add('body-scroll-clip')
    };

    const handleRefModalClose = () => {
        setRefModalOpen(false); // Закрытие модалки извне
        document.body.classList.remove('body-scroll-clip')
    };

    return (
        <>
            {desktopStore.isDesktop ?
                <div className={styles.refCont}>
                    <div className={styles.ref}>
                        <div className={styles.refText} onClick={toggleRef}>
                            До 7000₽ за приглашенного друга
                        </div>
                        <div className={styles.refButton} onClick={toggleRef}>
                            Получить
                        </div>
                    </div>
                </div>
                :
                <div className={styles.refContMob}>
                    <div className={styles.refTextMob} onClick={toggleRef}>
                        До 7000₽ за приглашенного друга
                    </div>
                    <div className={styles.refButtonMob} onClick={toggleRef}>
                        Получить
                    </div>
                </div>
            }
            <ModalRef show={refModalOpen} onClose={handleRefModalClose}/>
        </>
    );
};

export default PromoBannerProductsPageRef;