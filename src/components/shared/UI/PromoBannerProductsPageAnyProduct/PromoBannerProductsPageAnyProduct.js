import React, {useContext, useEffect, useState} from 'react';
import styles from './PromoBannerProductsPageAnyProduct.module.css'
import {desktopStore} from "@/store/DesktopStore";
import ModalSocialNets from "@/components/shared/ModalSocialNets/ModalSocialNets";
import BuyoutModal from "@/components/shared/BuyoutModal/BuyoutModal";

const PromoBannerProductsPageAnyProduct = () => {
    const [show, setShow] = useState(false);

    const toggle = () => {
        setShow((prev) => !prev);
        document.body.classList.add('body-scroll-clip')
    };

    const handleClose = () => {
        setShow(false); // Закрытие модалки извне
        document.body.classList.remove('body-scroll-clip')
    };

    return (
        <>
            {desktopStore.isDesktop ?
                <div className={styles.socialCont}>
                    <div className={styles.social}>
                        <div className={styles.socialText} onClick={toggle}>
                            Не нашли то, что искали? Привезем любой лот по гарантированно лучшей цене!
                        </div>
                        <div className={styles.socialButton} onClick={toggle}>
                            Подробнее
                        </div>
                    </div>
                </div>
                :
                <div className={styles.socialContMob}>
                    <div className={styles.socialTextMob} onClick={toggle}>
                        Не нашли то, что искали? Привезем любой лот по гарантированно лучшей цене!
                    </div>
                    <div className={styles.socialButtonMob} onClick={toggle}>
                        Подробнее
                    </div>
                </div>
            }
            <BuyoutModal show={show} handleClose={handleClose}/>
        </>
    );
};

export default PromoBannerProductsPageAnyProduct;