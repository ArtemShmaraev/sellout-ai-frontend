import React, {useContext, useEffect, useState} from 'react';
import styles from './PromoBannerProductsPageGiftMobile.module.css'
import {desktopStore} from "@/store/DesktopStore";
import HowWeWorkModal from "@/components/shared/HowWeWorkModal/HowWeWorkModal";
import ModalGifts from "@/components/shared/ModalGifts/ModalGifts";

const PromoBannerProductsPageGiftMobile = () => {
    const [giftsModalOpen, setGiftsModalOpen] = useState(false);

    const toggleGifts = () => {
        setGiftsModalOpen((prev) => !prev);
        document.body.classList.add('body-scroll-clip')
    };

    const handleGiftsModalClose = () => {
        setGiftsModalOpen(false); // Закрытие модалки извне
        document.body.classList.remove('body-scroll-clip')
    };

    return (
        <>
            {desktopStore.isDesktop ?
                <></>
                :
                <div className={styles.giftContMob}>
                    <div className={styles.giftTextMob} onClick={toggleGifts}>
                        До 5000₽ в подарок
                    </div>
                    <div className={styles.giftButtonMob} onClick={toggleGifts}>
                        Получить
                    </div>
                </div>
            }
            <ModalGifts show={giftsModalOpen} onClose={handleGiftsModalClose}/>
        </>
    );
};

export default PromoBannerProductsPageGiftMobile;