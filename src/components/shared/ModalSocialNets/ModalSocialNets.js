import {useEffect, useState} from 'react';
import styles from './ModalSocialNets.module.css';
import stylesMob from './ModalSocialNetsMob.module.css';
import Image from "next/image";
import {useRef} from 'react';

export default function ModalSocialNets({show, onClose}) {
    const [isModalVisible, setModalVisible] = useState(show);

    useEffect(() => {
        setModalVisible(show);
    }, [show]);


    function changeBrowserColor(color) {
        // Для Chrome, Firefox, Opera на Android
        const themeColorMeta = document.querySelector('meta[name="theme-color"]');
        if (themeColorMeta) {
            themeColorMeta.setAttribute('content', color);
        }

        // Для Safari на iOS (к сожалению, не все цвета поддерживаются)
        const statusBarMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
        if (statusBarMeta) {
            // Изменение цвета status-bar на iOS
            statusBarMeta.setAttribute('content', 'black-translucent'); // ограниченные возможности
        }

        // Для Microsoft Edge
        const msNavbuttonMeta = document.querySelector('meta[name="msapplication-navbutton-color"]');
        if (msNavbuttonMeta) {
            msNavbuttonMeta.setAttribute('content', color);
        }
    }

    const modalRef = useRef(null);
    const backdropRef = useRef(null);
    const closeModal = () => {
        if (isDesktop && modalRef.current && backdropRef.current) {
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

    const [isButtonHovered, setIsButtonHovered] = useState(false);
    const [isHideTextHovered, setIsHideTextHovered] = useState(false);

    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText('@sellout_platform').then(() => {
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false); // Убираем уведомление через 3 секунды
            }, 3000);
        });
    };

    const [isDesktop, setIsDesktop] = useState(false)
    const checkIsDesktop = () => {
        const width = window.innerWidth
        if (width <= 1200) {
            setIsDesktop(false)
        } else {
            setIsDesktop(true)
        }
    }
    useEffect(() => {
        window.addEventListener("resize", checkIsDesktop);
        // Call handler right away so state gets updated with initial window size
        checkIsDesktop();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", checkIsDesktop);
    })

    return (
        <>
            {isDesktop ? (
                <div>
                    {/* Модальное окно */}
                    {isModalVisible && (
                        <div className={styles.modalBackdrop} ref={backdropRef} onClick={closeModal}>
                            <div className={styles.modalContent} ref={modalRef} onClick={(e) => e.stopPropagation()}>
                                <div className={styles.leftSide}>
                                    <Image
                                        src="/img/Modals/modalSocialNetsDesktop.png" // Укажите путь к изображению
                                        alt="Social Networks"
                                        className={styles.image}
                                        width={1920}  // Исходная ширина изображения
                                        height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                    />
                                </div>
                                <div className={styles.rightSide}>
                                    <div className={styles.title}>
                                        Следите за нами в соц. сетях и не упускайте:
                                    </div>

                                    <div className={styles.contentCont}>
                                        <div className={styles.contentRow}>
                                            <div className={styles.contentItem}>
                                                <Image
                                                    src="/img/Modals/modalSocialsGift.svg" // Укажите путь к изображению
                                                    alt="Social Networks"
                                                    className={styles.contentImage}
                                                    width={1920}  // Исходная ширина изображения
                                                    height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                                />
                                                <div className={styles.contentText}>
                                                    Регулярные розыгрыши
                                                </div>
                                            </div>
                                            <div className={styles.contentItem}>
                                                <Image
                                                    src="/img/Modals/modalSocialsCollab.svg" // Укажите путь к изображению
                                                    alt="Social Networks"
                                                    className={styles.contentImage}
                                                    width={1920}  // Исходная ширина изображения
                                                    height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                                />
                                                <div className={styles.contentText}>
                                                    Коллаборации с<br/>другими компаниями
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.contentRow}>
                                            <div className={styles.contentItem}>
                                                <Image
                                                    src="/img/Modals/modalSocialsPrice.svg" // Укажите путь к изображению
                                                    alt="Social Networks"
                                                    className={styles.contentImage}
                                                    width={1920}  // Исходная ширина изображения
                                                    height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                                />
                                                <div className={styles.contentText}>
                                                    Скидки и лучшие<br/>предложения
                                                </div>
                                            </div>
                                            <div className={styles.contentItem}>
                                                <Image
                                                    src="/img/Modals/modalSocialsProduct.svg" // Укажите путь к изображению
                                                    alt="Social Networks"
                                                    className={styles.contentImage}
                                                    width={1920}  // Исходная ширина изображения
                                                    height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                                />
                                                <div className={styles.contentText}>
                                                    Подборки с избранными<br/>товарами
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.contentRow}>
                                            <div className={styles.contentItem}>
                                                <Image
                                                    src="/img/Modals/modalSocialsUpdates.svg" // Укажите путь к изображению
                                                    alt="Social Networks"
                                                    className={styles.contentImage}
                                                    width={1920}  // Исходная ширина изображения
                                                    height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                                />
                                                <div className={styles.contentText}>
                                                    Обновления, лайв<br/>контент и отзывы
                                                </div>
                                            </div>
                                            <div className={styles.contentItem}>
                                                <Image
                                                    src="/img/Modals/modalSocialsMemes.svg" // Укажите путь к изображению
                                                    alt="Social Networks"
                                                    className={styles.contentImage}
                                                    width={1920}  // Исходная ширина изображения
                                                    height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                                />
                                                <div className={styles.contentText}>
                                                    Мемы, эстетику и<br/>многое другое!)
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.SocialsCont}>
                                        <div className={styles.igTgImg}>
                                            <Image
                                                src="/img/Modals/igImg.svg" // Укажите путь к изображению
                                                alt="Social Networks"
                                                className={styles.image}
                                                width={1920}  // Исходная ширина изображения
                                                height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                            />
                                        </div>
                                        <span className={styles.mainSocialsText}>
                                      Запретграм: <br/> @sellout_platform
                                    </span>
                                        <div className={styles.copyImage} onClick={handleCopy}>
                                            <Image
                                                src="/img/Modals/copyImg.svg" // Укажите путь к изображению
                                                alt="Social Networks"
                                                className={styles.image}
                                                width={1920}  // Исходная ширина изображения
                                                height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                            />
                                        </div>
                                        <div className={styles.igTgImg}>
                                            <Image
                                                src="/img/Modals/tgImg.svg" // Укажите путь к изображению
                                                alt="Social Networks"
                                                className={styles.image}
                                                width={1920}  // Исходная ширина изображения
                                                height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                            />
                                        </div>
                                        <span className={styles.mainSocialsText}>
                                      Телеграм: <br/>
                                      <a href="https://t.me/selloutsu" className={styles.linkTgSocials}>
                                        @selloutsu
                                      </a>
                                </span>
                                    </div>
                                    <button className={styles.subscribeButton} onClick={closeModal}
                                            onMouseEnter={() => setIsButtonHovered(true)} // Устанавливаем состояние при наведении
                                            onMouseLeave={() => setIsButtonHovered(false)} // Сбрасываем состояние при уходе мыши
                                    >
                                        <span className={styles.subscribeText}>Подписался</span> {isButtonHovered &&
                                        <span className={styles.heart}>🤍</span>}
                                    </button>
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
                                </div>
                            </div>
                        </div>
                    )}

                    {isCopied && (
                        <div className={styles.toast}>
                            Никнейм запретграма скопирован
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    {/* Модальное окно */}
                    {isModalVisible && (
                        <div className={stylesMob.modalOpen}>
                            <div className={stylesMob.modalContent}>
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
                                    Следите за нами в соц. сетях и не упускайте:
                                </div>

                                <div className={stylesMob.contentCont}>
                                    <div className={stylesMob.contentRow}>
                                        <div className={stylesMob.contentItem}>
                                            <Image
                                                src="/img/Modals/modalSocialsGift.svg" // Укажите путь к изображению
                                                alt="Social Networks"
                                                className={stylesMob.contentImage}
                                                width={1920}  // Исходная ширина изображения
                                                height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                            />
                                            <div className={stylesMob.contentText}>
                                                Регулярные розыгрыши
                                            </div>
                                        </div>
                                        <div className={stylesMob.contentItem}>
                                            <Image
                                                src="/img/Modals/modalSocialsCollab.svg" // Укажите путь к изображению
                                                alt="Social Networks"
                                                className={stylesMob.contentImage}
                                                width={1920}  // Исходная ширина изображения
                                                height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                            />
                                            <div className={stylesMob.contentText}>
                                                Коллаборации с другими компаниями
                                            </div>
                                        </div>
                                    </div>
                                    <div className={stylesMob.contentRow}>
                                        <div className={stylesMob.contentItem}>
                                            <Image
                                                src="/img/Modals/modalSocialsPrice.svg" // Укажите путь к изображению
                                                alt="Social Networks"
                                                className={stylesMob.contentImage}
                                                width={1920}  // Исходная ширина изображения
                                                height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                            />
                                            <div className={stylesMob.contentText}>
                                                Скидки и лучшие предложения
                                            </div>
                                        </div>
                                        <div className={stylesMob.contentItem}>
                                            <Image
                                                src="/img/Modals/modalSocialsProduct.svg" // Укажите путь к изображению
                                                alt="Social Networks"
                                                className={stylesMob.contentImage}
                                                width={1920}  // Исходная ширина изображения
                                                height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                            />
                                            <div className={stylesMob.contentText}>
                                                Подборки с товарами
                                            </div>
                                        </div>
                                    </div>
                                    <div className={stylesMob.contentRow}>
                                        <div className={stylesMob.contentItem}>
                                            <Image
                                                src="/img/Modals/modalSocialsUpdates.svg" // Укажите путь к изображению
                                                alt="Social Networks"
                                                className={stylesMob.contentImage}
                                                width={1920}  // Исходная ширина изображения
                                                height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                            />
                                            <div className={stylesMob.contentText}>
                                                Обновления, лайв контент и отзывы
                                            </div>
                                        </div>
                                        <div className={stylesMob.contentItem}>
                                            <Image
                                                src="/img/Modals/modalSocialsMemes.svg" // Укажите путь к изображению
                                                alt="Social Networks"
                                                className={stylesMob.contentImage}
                                                width={1920}  // Исходная ширина изображения
                                                height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                            />
                                            <div className={stylesMob.contentText}>
                                                Мемы, эстетика и многое другое!)
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={stylesMob.grayLine}></div>

                                <div className={stylesMob.contentRow2}>
                                    <div className={stylesMob.contentItem2}>
                                        <Image
                                            src="/img/Modals/igImg.svg" // Укажите путь к изображению
                                            alt="Social Networks"
                                            className={stylesMob.contentImage}
                                            width={1920}  // Исходная ширина изображения
                                            height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                        />
                                        <div className={stylesMob.contentText2}>
                                            Запретграм:<br/>@sellout_platform
                                        </div>
                                        <Image
                                            src="/img/Modals/copyImgMob.svg" // Укажите путь к изображению
                                            alt="Social Networks"
                                            className={stylesMob.copyImageImg}
                                            width={1920}  // Исходная ширина изображения
                                            height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                            onClick={handleCopy}
                                        />
                                    </div>
                                    <div className={stylesMob.contentItem2}>
                                        <Image
                                            src="/img/Modals/tgImg.svg" // Укажите путь к изображению
                                            alt="Social Networks"
                                            className={stylesMob.contentImage}
                                            style={{marginLeft: '0'}}
                                            width={1920}  // Исходная ширина изображения
                                            height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                        />
                                        <div className={stylesMob.contentText2}>
                                            Телеграм: <br/>
                                            <a href="https://t.me/selloutsu" className={stylesMob.linkTgSocials}>
                                                @selloutsu
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <button className={stylesMob.button} onClick={closeModal}>
                                    Подписался
                                </button>

                                <div
                                    className={stylesMob.hideText}
                                    onClick={closeModal}
                                >
                                    Больше не показывать
                                </div>
                            </div>
                        </div>
                    )}

                    {isCopied && (
                        <div className={styles.toast}>
                            Никнейм запретграма скопирован
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
