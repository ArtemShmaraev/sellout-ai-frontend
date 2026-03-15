import {useContext, useEffect, useState} from 'react';
import styles from './ModalRef.module.css';
import stylesMob from './ModalRefMob.module.css';
import Image from "next/image";
import {useRef} from 'react';
import Link from "next/link";
import {desktopStore} from "@/store/DesktopStore";
import {useRouter} from "next/router";
import {Context} from "@/context/AppWrapper";
import AuthModal from "@/components/shared/AuthModal/AuthModal";
import Cookies from "js-cookie";

export default function ModalReferral({show, onClose}) {
    const [isModalVisible, setModalVisible] = useState(show);

    useEffect(() => {
        setModalVisible(show);
    }, [show]);

    const {userStore} = useContext(Context)

    const modalRef = useRef(null);
    const backdropRef = useRef(null);
    const closeModal = () => {
        if (desktopStore.isDesktop && modalRef.current && backdropRef.current) {
            // Добавляем классы для анимации закрытия
            modalRef.current.classList.add(styles.slideUp);
            backdropRef.current.classList.add(styles.fadeOut);

            // Ждем окончания анимации и затем скрываем модалку
            setTimeout(() => {
                setModalVisible(false);
                // Убираем классы после закрытия
                modalRef.current.classList.remove(styles.slideUp);
                backdropRef.current.classList.remove(styles.fadeOut);
                if (onClose) onClose();
            }, 500); // Должно совпадать с длительностью анимации
        } else {
            setModalVisible(false);
            if (onClose) onClose();
        }
    };

    // Я думаю, что не хочу закрывать модалку путем нажатия на экран вне модалки, пусть нажимают на кнопку В модалке. В том числе через кнопку esc.
    const closeModalBackground = () => {
        setModalVisible(false);
    };

    const [isHideTextHovered, setIsHideTextHovered] = useState(false);

    return (<>
            {desktopStore.isDesktop ? (
                <>
                    {/* Модальное окно */}
                    {isModalVisible && (
                        <div className={styles.modalBackdrop} ref={backdropRef} onClick={closeModal}>
                            <div className={styles.modalContent} ref={modalRef} onClick={(e) => e.stopPropagation()}>
                                <div className={styles.leftSide}>
                                    <Image
                                        src="/img/Modals/modalReferralDesktop.png" // Укажите путь к изображению
                                        alt="Social Networks"
                                        className={styles.image}
                                        width={1920}  // Исходная ширина изображения
                                        height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                    />
                                </div>
                                <div className={styles.rightSide}>
                                    <>
                                        <div>
                                            <Image
                                                src="/img/Modals/refImg.svg" // Укажите путь к изображению
                                                alt="Social Networks"
                                                className={styles.logo}
                                                width={1920}  // Исходная ширина изображения
                                                height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                            />
                                        </div>

                                        <div className={styles.title}>
                                            Делись платформой Sellout и зарабатывай!
                                        </div>

                                        <div className={styles.text1}>
                                            Наши пользователи активно участвуют в реферальной программе,<br/>что
                                            позволяет
                                            им
                                            экономить до 100% на покупках на Sellout
                                        </div>

                                        <div className={styles.text2}>
                                            Почему выгодно приглашать людей на платформу Sellout?
                                        </div>

                                        <div className={styles.contentCont}>
                                            <div className={styles.contentItem}>
                                                <Image
                                                    src="/img/Modals/modalSocialsProduct.svg" // Укажите путь к изображению
                                                    alt="Social Networks"
                                                    className={styles.contentImage}
                                                    width={1920}  // Исходная ширина изображения
                                                    height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                                />
                                                <div className={styles.contentText}>
                                                    2’000’000+ товаров широчайшего спектра: от премиальных и
                                                    лимитированных<br/>релизов
                                                    до базовых и спортивных моделей по супер доступным ценам
                                                </div>
                                            </div>
                                            <div className={styles.contentItem}>
                                                <Image
                                                    src="/img/Modals/modalSocialsPrice.svg" // Укажите путь к изображению
                                                    alt="Social Networks"
                                                    className={styles.contentImage}
                                                    width={1920}  // Исходная ширина изображения
                                                    height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                                />
                                                <div className={styles.contentText}>
                                                    Наивыгоднейшие цены в Росси и гарантия самой низкой стоимости
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles.text3}>
                                            Каждый найдет для себя желанный лот и лучшее предложение<br/>на него, а
                                            вы
                                            гарантированно получите вознаграждение!
                                        </div>


                                        {userStore.isLogged
                                            ? (
                                                <Link className={styles.subscribeButton} href={'/account/referral'} onClick={closeModal}
                                                      style={{textDecoration: 'none'}}>
                                                    Изучить условия
                                                </Link>
                                            ) : (
                                                <AuthModal
                                                    text={'Войдите или зарегистрируйтесь и получите доступ к реферальной программе'}
                                                    urlToGo={'/account/referral'} extraTasks={closeModal}>
                                                    <button className={styles.subscribeButton}>
                                                        Изучить условия
                                                    </button>
                                                </AuthModal>

                                            )}
                                        <div
                                            className={styles.hideText}
                                            onMouseEnter={() => setIsHideTextHovered(true)}
                                            onMouseLeave={() => setIsHideTextHovered(false)}
                                            onClick={closeModal}
                                        >
                                <span
                                    className={styles.hideTextText}>Больше не показывать  </span> {isHideTextHovered &&
                                            <span className={styles.sadEmoji}>:(</span>}
                                        </div>
                                    </>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <>
                    {/* Модальное окно */}
                    {isModalVisible && (
                        <div className={stylesMob.modalOpen}>
                            <div className={stylesMob.modalContent}>
                                <>
                                    <div className={stylesMob.img}>
                                        <Image
                                            src="/img/Modals/refImgMob.png"
                                            alt="Image 1"
                                            layout="responsive"
                                            width={1920}
                                            height={1080}
                                            quality={100}
                                            style={{display: 'block'}}
                                        />
                                    </div>

                                    <div className={stylesMob.title}>
                                        Делись платформой Sellout и зарабатывай!
                                    </div>

                                    <div className={stylesMob.text1}>
                                        Наши пользователи активно участвуют в реферальной программе, что позволяет
                                        им
                                        экономить до 100% на покупках на Sellout
                                    </div>

                                    <div className={stylesMob.text1}
                                         style={{fontWeight: '500', marginBottom: '40px'}}>
                                        Почему выгодно приглашать людей на Sellout?
                                    </div>

                                    <div className={stylesMob.contentCont}>
                                        <div className={stylesMob.contentItem}>
                                            <Image
                                                src="/img/Modals/modalSocialsProduct.svg" // Укажите путь к изображению
                                                alt="Social Networks"
                                                className={stylesMob.contentImage}
                                                width={1920}  // Исходная ширина изображения
                                                height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                            />
                                            <div className={stylesMob.contentText}>
                                                2’000’000+ товаров: от премиальных и лимитированных релизов до
                                                базовых и
                                                спортивных моделей по супер доступным ценам
                                            </div>
                                        </div>
                                        <div className={stylesMob.contentItem}>
                                            <Image
                                                src="/img/Modals/modalSocialsPrice.svg" // Укажите путь к изображению
                                                alt="Social Networks"
                                                className={stylesMob.contentImage}
                                                width={1920}  // Исходная ширина изображения
                                                height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                            />
                                            <div className={stylesMob.contentText}>
                                                Наивыгоднейшие цены в Росси и гарантия самой низкой стоимости
                                            </div>
                                        </div>
                                    </div>

                                    <div className={stylesMob.text1} style={{fontWeight: '500'}}>
                                        Каждый найдет для себя желанный лот и лучшее предложение на него, а вы
                                        гарантированно получите вознаграждение!
                                    </div>

                                    {userStore.isLogged
                                        ? (
                                            <Link className={stylesMob.button} href={'/account/referral'}
                                                  style={{textDecoration: 'none'}} onClick={closeModal}>
                                                Изучить условия
                                            </Link>
                                        ) : (
                                            <AuthModal
                                                text={'Войдите или зарегистрируйтесь и получите доступ к реферальной программе'}
                                                urlToGo={'/account/referral'} extraTasks={closeModal} style={{justifyContent: 'center'}}>
                                                <button className={stylesMob.button}>
                                                    Изучить условия
                                                </button>
                                            </AuthModal>
                                        )}

                                    <div
                                        className={stylesMob.hideText}
                                        onClick={closeModal}
                                    >
                                        Больше не показывать
                                    </div>
                                </>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
}
