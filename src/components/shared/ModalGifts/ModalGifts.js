import {useEffect, useState} from 'react';
import styles from './ModalGifts.module.css';
import stylesMob from './ModalGiftsMob.module.css';
import Image from "next/image";
import {useRef} from 'react';
import Cookies from "js-cookie";

export default function ModalGifts({show, onClose}) {
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

    const openModal = () => {
        setModalVisible(true);

        if (!isDesktop) {
            changeBrowserColor("#000000")
        }
    };

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
                setActiveSquare(null);
                setIsAnimating(false);
                setIsAnimatingFinished(false);
                setIsTelegramReceived(false);
                setIsRegisterPage(false);
                setIsRegistered(false);
                // Убираем классы после закрытия
                modalRef.current.classList.remove(styles.slideUp);
                backdropRef.current.classList.remove(styles.fadeOut);
                if (onClose) onClose();
            }, 500); // Должно совпадать с длительностью анимации
        } else {
            setModalVisible(false);
            setActiveSquare(null);
            setIsAnimating(false);
            setIsAnimatingFinished(false);
            setIsTelegramReceived(false);
            setIsRegisterPage(false);
            setIsRegistered(false);
            if (onClose) onClose();
        }
    };

    // Я думаю, что не хочу закрывать модалку путем нажатия на экран вне модалки, пусть нажимают на кнопку В модалке. В том числе через кнопку esc.
    const closeModalBackground = () => {
        setModalVisible(false);
        setActiveSquare(null);
        setIsAnimating(false);
        setIsAnimatingFinished(false);
        setIsTelegramReceived(false);
        setIsRegisterPage(false);
        setIsRegistered(false);
    };


    const [isDesktop, setIsDesktop] = useState(false)

    const [finalPositionsDesktop, setFinalPositionsDesktop] = useState([]); // Активный квадрат
    const [finalPositionsMob, setFinalPositionsMob] = useState([]); // Активный квадрат

    const checkIsDesktop = () => {
        const width = window.innerWidth
        const height = window.innerHeight
        if (width / height <= 0.77) {
            setIsDesktop(false)
        } else {
            setIsDesktop(true)
        }
        setFinalPositionsDesktop([
            {
                x: 0.16182572614 * (1205 / 650) * Math.min(window.innerHeight * 0.92, window.innerWidth * 0.8 * (650 / 1205)) + 0.01538461538 * Math.min(window.innerHeight * 0.92, window.innerWidth * 0.8 * (650 / 1205)),
                y: 0.11 * Math.min(window.innerHeight * 0.92, window.innerWidth * 0.8 * (650 / 1205))
            }, // Координаты для 1-го слота
            {x: 0, y: 0.11 * Math.min(window.innerHeight * 0.92, window.innerWidth * 0.8 * (650 / 1205))}, // Координаты для 2-го слота
            {
                x: -(0.16182572614 * (1205 / 650) * Math.min(window.innerHeight * 0.92, window.innerWidth * 0.8 * (650 / 1205)) + 0.01538461538 * Math.min(window.innerHeight * 0.92, window.innerWidth * 0.8 * (650 / 1205))),
                y: 0.11 * Math.min(window.innerHeight * 0.92, window.innerWidth * 0.8 * (650 / 1205))
            },
            {
                x: 0.16182572614 * (1205 / 650) * Math.min(window.innerHeight * 0.92, window.innerWidth * 0.8 * (650 / 1205)) + 0.01538461538 * Math.min(window.innerHeight * 0.92, window.innerWidth * 0.8 * (650 / 1205)),
                y: -(0.15384615384 * Math.min(window.innerHeight * 0.92, window.innerWidth * 0.8 * (650 / 1205)) - 0.04061538462 * Math.min(window.innerHeight * 0.92, window.innerWidth * 0.8 * (650 / 1205)))
            },
            {
                x: 0,
                y: -(0.15384615384 * Math.min(window.innerHeight * 0.92, window.innerWidth * 0.8 * (650 / 1205)) - 0.04061538462 * Math.min(window.innerHeight * 0.92, window.innerWidth * 0.8 * (650 / 1205)))
            },
            {
                x: -(0.16182572614 * (1205 / 650) * Math.min(window.innerHeight * 0.92, window.innerWidth * 0.8 * (650 / 1205)) + 0.01538461538 * Math.min(window.innerHeight * 0.92, window.innerWidth * 0.8 * (650 / 1205))),
                y: -(0.15384615384 * Math.min(window.innerHeight * 0.92, window.innerWidth * 0.8 * (650 / 1205)) - 0.04061538462 * Math.min(window.innerHeight * 0.92, window.innerWidth * 0.8 * (650 / 1205)))
            },
            {
                x: 0.16182572614 * (1205 / 650) * Math.min(window.innerHeight * 0.92, window.innerWidth * 0.8 * (650 / 1205)) + 0.01538461538 * Math.min(window.innerHeight * 0.92, window.innerWidth * 0.8 * (650 / 1205)),
                y: -2 * (0.15384615384 * Math.min(window.innerHeight * 0.92, window.innerWidth * 0.8 * (650 / 1205)) - 0.04061538462 * Math.min(window.innerHeight * 0.92, window.innerWidth * 0.8 * (650 / 1205)))
            },
            {
                x: 0,
                y: -2 * (0.15384615384 * Math.min(window.innerHeight * 0.92, window.innerWidth * 0.8 * (650 / 1205)) - 0.04061538462 * Math.min(window.innerHeight * 0.92, window.innerWidth * 0.8 * (650 / 1205)))
            },
            {
                x: -(0.16182572614 * (1205 / 650) * Math.min(window.innerHeight * 0.92, window.innerWidth * 0.8 * (650 / 1205)) + 0.01538461538 * Math.min(window.innerHeight * 0.92, window.innerWidth * 0.8 * (650 / 1205))),
                y: -2 * (0.15384615384 * Math.min(window.innerHeight * 0.92, window.innerWidth * 0.8 * (650 / 1205)) - 0.04061538462 * Math.min(window.innerHeight * 0.92, window.innerWidth * 0.8 * (650 / 1205)))
            }
        ])
        setFinalPositionsMob([
            {
                x: 0.33 * window.innerWidth,
                y: 0.1077 * window.innerHeight + 0.02 * window.innerWidth - 0.05 * window.innerHeight
            },
            {
                x: 0,
                y: 0.1077 * window.innerHeight + 0.02 * window.innerWidth - 0.05 * window.innerHeight
            },
            {
                x: -0.33 * window.innerWidth,
                y: 0.1077 * window.innerHeight + 0.02 * window.innerWidth - 0.05 * window.innerHeight
            },
            {
                x: 0.33 * window.innerWidth,
                y: 0 - 0.05 * window.innerHeight
            },
            {
                x: 0,
                y: 0 - 0.05 * window.innerHeight
            },
            {
                x: -0.33 * window.innerWidth,
                y: 0 - 0.05 * window.innerHeight
            },
            {
                x: 0.33 * window.innerWidth,
                y: -0.1077 * window.innerHeight - 0.02 * window.innerWidth - 0.05 * window.innerHeight
            },
            {
                x: 0,
                y: -0.1077 * window.innerHeight - 0.02 * window.innerWidth - 0.05 * window.innerHeight
            },
            {
                x: -0.33 * window.innerWidth,
                y: -0.1077 * window.innerHeight - 0.02 * window.innerWidth - 0.05 * window.innerHeight
            }
        ])
    }
    useEffect(() => {
        window.addEventListener("resize", checkIsDesktop);
        // Call handler right away so state gets updated with initial window size
        checkIsDesktop();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", checkIsDesktop);
    })

    const [activeSquare, setActiveSquare] = useState(null); // Активный квадрат
    const [isAnimating, setIsAnimating] = useState(false); // Флаг анимации
    const [isAnimatingFinished, setIsAnimatingFinished] = useState(false); // Флаг анимации

    const squares = Array.from({length: 9}, (_, i) => `Приз ${i + 1}`); // Призы

    const winningSquare = 0;

    // Функция для запуска анимации
    const startAnimation = () => {
        if (isAnimating) return;
        if (remainingTime <= 0) return;
        setIsAnimating(true);
        let iterations = 26; // Количество итераций (можно варьировать)

        const randomOrder = Array.from({length: iterations}, () =>
            Math.floor(Math.random() * 9)
        ); // Рандомный порядок обхода

        randomOrder.push(winningSquare); // Добавляем выигрышный квадрат в конец

        runAnimation(randomOrder)

        // randomOrder.forEach((squareIndex, i) => {
        //     setTimeout(() => {
        //         setActiveSquare(squareIndex); // Обновляем активный квадрат
        //         if (i === randomOrder.length - 1) {
        //             setIsAnimating(false); // Остановка анимации
        //         }
        //     }, interval);
        //     interval += i * 1000; // Замедляем
        // });
    };

    const runAnimation = (randomOrder, i = 0, interval = 7) => {
        if (i < randomOrder.length) {
            setActiveSquare(randomOrder[i]); // Обновляем активный квадрат
            setTimeout(() => {
                runAnimation(randomOrder, i + 1, interval + 17); // Вызываем снова с увеличенным интервалом
            }, interval);
        } else {
            // Анимация закончена, запускаем мигание победного квадрата
            blinkWinner(randomOrder[randomOrder.length - 1], 5); // 5 раз мигнет
        }
    };

    // Функция для мигания победного квадрата
    const blinkWinner = (winningSquare, count, delay = 200) => {
        if (count > 0) {
            setActiveSquare(prev => (prev === winningSquare ? null : winningSquare)); // Переключаем активный квадрат
            setTimeout(() => {
                blinkWinner(winningSquare, count - 1, delay); // Рекурсия для повторного мигания
            }, delay);
        } else {
            setIsAnimating(false); // Анимация окончена, останавливаем
            setIsAnimatingFinished(true)
        }
    };

    const selectedGender = Cookies.get('selected_gender')

    // Надо сделать динамически фотку (в зависимости от гендера + если хотим кастомную например под какую-то маркетинговую активность.) Сейчас для унисекса фотка: modalGiftsWomenNoGenderDesktop и modalGiftsWomenNoGenderMob, а для мужского: modalGiftsMenDesktop и modalGiftsMenMob
    const mainImgSrc = selectedGender === "M" ? "/img/Modals/modalGiftsMenDesktop.png" : "/img/Modals/modalGiftsWomenNoGenderDesktop.png"
    const mainImgSrcMob = selectedGender === "M" ? "/img/Modals/modalGiftsWomenNoGenderMob.png" : "/img/Modals/modalGiftsWomenNoGenderMob.png"
    const bloggerName = "Кристины"
    const text = bloggerName
        ? `Чтобы шопинг с нами стал еще выгоднее, успейте забрать один из сегодняшних подарков от нас и ${bloggerName}:`
        : 'Чтобы шопинг с нами стал еще выгоднее, успейте забрать один из сегодняшних подарков:';

    // Начальное время (допустим 23 часа, 12 минут и 36 секунд)
    const initialTime = 10 * 60 * 60 + 0 * 60 + 10; // Переводим в секунды

    const [remainingTime, setRemainingTime] = useState(initialTime);

    // Обновляем таймер каждую секунду
    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime((prevTime) => prevTime > 0 ? prevTime - 1 : 0); // Уменьшаем время на 1 секунду
        }, 1000);

        // Очищаем интервал при размонтировании компонента
        return () => clearInterval(interval);
    }, []);

    // Функция для преобразования времени из секунд в формат "Чч Мм Сс"
    const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;

        return `${hours}ч ${minutes}м ${seconds}с`;
    };

    // Надо передавать динамически. Пока что я сделал base и bloggerBase (стандартная и стандартная при рекламе у блогеров)
    const prizesType = "base"

    let x = 0; // Объявляем переменные вне блока if-else
    let y = 0;
    if (isDesktop) {
        ({x, y} = finalPositionsDesktop[winningSquare] || {x: 0, y: 0});
    } else {
        ({x, y} = finalPositionsMob[winningSquare] || {x: 0, y: 0});
    }

    // Если пользователь успешно активировал ТГ бота, то isTelegramReceived = true (это надо послать фронту с бекенда)
    const [isTelegramReceived, setIsTelegramReceived] = useState(false)

    // После того как пользователь успешно активировал ТГ бота ИЛИ нажал "Нет телеграма" переходим на вторую страницу, и одновременно с переходом вылазит модалка регистрации поверх модалки текущей. Модалки реги с параметром text = Завершите регистрацию, чтобы связать бонусы с вашим аккаунтом, а также получить дополнительные привилегии и удобства!
    // Если пользователь закрыл модалку с регой, то ничего страшного, он просто остается на этой второй странице. Если завершил регистрацию, то тоже смотрит на эту вторую страницу модалки (она слегка изменена), поэтому надо передать setIsRegistered = тру, ну и очев человек теперь войден в аккаунт.
    const [isRegisterPage, setIsRegisterPage] = useState(false)
    const [isRegistered, setIsRegistered] = useState(false)

    const promotext = "Ваш промокод на 5'000₽ бонусов к первому заказу:"
    const promocode = "kris_kJa8J"
    const promotime = "Промокод действует 1 неделю: До 16.10.2024 23:59:59"
    const promotimeMob = (
        <>
            Промокод действует 1 неделю:<br/>До 16.10.2024 23:59:59
        </>
    );
    const [isCopied, setIsCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(promocode).then(() => {
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false); // Убираем уведомление через 3 секунды
            }, 3000);
        });
    };

    return (<>{isDesktop ? (
            <>
                {/* Модальное окно */}
                {isModalVisible && (
                    <div className={styles.modalBackdrop} ref={backdropRef} onClick={closeModal}>
                        <div className={styles.modalContent} ref={modalRef} onClick={(e) => e.stopPropagation()}>
                            <div className={styles.leftSide}>
                                <Image
                                    src={mainImgSrc} // Укажите путь к изображению
                                    alt="Social Networks"
                                    className={styles.image}
                                    width={1920}  // Исходная ширина изображения
                                    height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                />
                            </div>
                            {!isRegisterPage ? (
                                <div className={styles.rightSide}>
                                    <div>
                                        <Image
                                            src="/img/Modals/cross.svg" // Укажите путь к изображению
                                            alt="Social Networks"
                                            className={`${isAnimatingFinished ? styles.cross : styles.invisible}`}
                                            width={1920}  // Исходная ширина изображения
                                            height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                            onClick={closeModal}
                                        />
                                    </div>

                                    <div>
                                        <Image
                                            src="/img/Modals/giftLogo.svg" // Укажите путь к изображению
                                            alt="Social Networks"
                                            className={styles.logo}
                                            width={1920}  // Исходная ширина изображения
                                            height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                        />
                                    </div>

                                    <div className={styles.title}>
                                        Добро пожаловать на платформу Sellout!
                                    </div>

                                    <div className={styles.text1}>
                                        {text}
                                    </div>

                                    <div className={`${isAnimatingFinished ? styles.text2Visible : styles.text2}`}>
                                        Поздравляем! Вы выиграли:
                                    </div>

                                    <div>
                                        <div className={styles.grid}>
                                            <div
                                                className={`${styles.square} ${activeSquare === 0 ? styles.active : ''} ${isAnimatingFinished ? winningSquare === 0 ? styles.winningSquare : styles.fadeOutSquare : ''}`}
                                                style={winningSquare === 0 ? {'--x': `${x}px`, '--y': `${y}px`} : {}}
                                            >
                                                {prizesType === "bloggerBase" ? (
                                                    <div className={styles["text-block"]}>
                                                        <div className={styles.price}>7'000₽</div>
                                                        <div className={styles.bonus}>бонусов к первому заказу</div>
                                                    </div>) : prizesType === "base" ?
                                                    (<div className={styles["text-block"]}>
                                                        <div className={styles.price}>5'000₽</div>
                                                        <div className={styles.bonus}>бонусов к первому заказу</div>
                                                    </div>) : (<>
                                                    </>)}
                                            </div>
                                            <div
                                                className={`${styles.square} ${activeSquare === 1 ? styles.active : ''} ${isAnimatingFinished ? winningSquare === 1 ? styles.winningSquare : styles.fadeOutSquare : ''}`}
                                                style={winningSquare === 1 ? {'--x': `${x}px`, '--y': `${y}px`} : {}}
                                            >
                                                <div className={styles["text-block"]}>
                                                    <Image
                                                        src="/img/Modals/giftImg2.png" // Укажите путь к изображению
                                                        alt="Social Networks"
                                                        className={styles.giftLogo}
                                                        width={1920}  // Исходная ширина изображения
                                                        height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                                    />
                                                    <div className={styles.bonus}>Любой лот до 15’000₽ <span
                                                        style={{color: '#940A0A'}}>бесплатно</span></div>
                                                </div>
                                            </div>
                                            <div
                                                className={`${styles.square} ${activeSquare === 2 ? styles.active : ''} ${isAnimatingFinished ? winningSquare === 2 ? styles.winningSquare : styles.fadeOutSquare : ''}`}
                                                style={winningSquare === 2 ? {'--x': `${x}px`, '--y': `${y}px`} : {}}
                                            >
                                                {prizesType === "bloggerBase" ? (
                                                    <div className={styles["text-block"]}>
                                                        <div className={styles.price}>2'000₽</div>
                                                        <div className={styles.bonus}>бонусов к первому заказу</div>
                                                    </div>) : prizesType === "base" ?
                                                    (<div className={styles["text-block"]}>
                                                        <div className={styles.price}>1'000₽</div>
                                                        <div className={styles.bonus}>бонусов к первому заказу</div>
                                                    </div>) : (<>
                                                    </>)}
                                            </div>
                                            <div
                                                className={`${styles.square} ${activeSquare === 3 ? styles.active : ''} ${isAnimatingFinished ? winningSquare === 3 ? styles.winningSquare : styles.fadeOutSquare : ''}`}
                                                style={winningSquare === 3 ? {'--x': `${x}px`, '--y': `${y}px`} : {}}
                                            >
                                                {prizesType === "bloggerBase" ? (
                                                    <div className={styles["text-block"]}>
                                                        <div className={styles.price}>1'000₽</div>
                                                        <div className={styles.bonus}>бонусов к первому заказу</div>
                                                    </div>) : prizesType === "base" ?
                                                    (<div className={styles["text-block"]}>
                                                        <div className={styles.price}>500₽</div>
                                                        <div className={styles.bonus}>бонусов к первому заказу</div>
                                                    </div>) : (<>
                                                    </>)}
                                            </div>
                                            <div
                                                className={`${styles.square} ${activeSquare === 4 ? styles.active : ''} ${isAnimatingFinished ? winningSquare === 4 ? styles.winningSquare : styles.fadeOutSquare : ''}`}
                                                style={winningSquare === 4 ? {'--x': `${x}px`, '--y': `${y}px`} : {}}
                                            >
                                                {prizesType === "bloggerBase" ? (
                                                    <div className={styles["text-block"]}>
                                                        <div className={styles.price}>7'000₽</div>
                                                        <div className={styles.bonus}>бонусов к первому заказу</div>
                                                    </div>) : prizesType === "base" ?
                                                    (<div className={styles["text-block"]}>
                                                        <div className={styles.price}>2'000₽</div>
                                                        <div className={styles.bonus}>бонусов к первому заказу</div>
                                                    </div>) : (<>
                                                    </>)}
                                            </div>
                                            <div
                                                className={`${styles.square} ${activeSquare === 5 ? styles.active : ''} ${isAnimatingFinished ? winningSquare === 5 ? styles.winningSquare : styles.fadeOutSquare : ''}`}
                                                style={winningSquare === 5 ? {'--x': `${x}px`, '--y': `${y}px`} : {}}
                                            >
                                                <div className={styles["text-block"]}>
                                                    <div className={styles.price}>20%</div>
                                                    <div className={styles.bonus}>скидка на первый заказ</div>
                                                </div>
                                            </div>
                                            <div
                                                className={`${styles.square} ${activeSquare === 6 ? styles.active : ''} ${isAnimatingFinished ? winningSquare === 6 ? styles.winningSquare : styles.fadeOutSquare : ''}`}
                                                style={winningSquare === 6 ? {'--x': `${x}px`, '--y': `${y}px`} : {}}
                                            >
                                                <div className={styles["text-block"]}>
                                                    <Image
                                                        src="/img/Modals/giftImg1.png" // Укажите путь к изображению
                                                        alt="Social Networks"
                                                        className={styles.giftLogo}
                                                        width={1920}  // Исходная ширина изображения
                                                        height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                                    />
                                                    <div className={styles.bonus}>Любой лот до 10’000₽ <span
                                                        style={{color: '#940A0A'}}>бесплатно</span></div>
                                                </div>
                                            </div>
                                            <div
                                                className={`${styles.square} ${activeSquare === 7 ? styles.active : ''} ${isAnimatingFinished ? winningSquare === 7 ? styles.winningSquare : styles.fadeOutSquare : ''}`}
                                                style={winningSquare === 7 ? {'--x': `${x}px`, '--y': `${y}px`} : {}}
                                            >
                                                <div className={styles["text-block"]}>
                                                    <div className={styles.price}>10%</div>
                                                    <div className={styles.bonus}>скидка на первый заказ</div>
                                                </div>
                                            </div>
                                            <div
                                                className={`${styles.square} ${activeSquare === 8 ? styles.active : ''} ${isAnimatingFinished ? winningSquare === 8 ? styles.winningSquare : styles.fadeOutSquare : ''}`}
                                                style={winningSquare === 8 ? {'--x': `${x}px`, '--y': `${y}px`} : {}}
                                            >
                                                <div className={styles["text-block"]}>
                                                    <Image
                                                        src="/img/Modals/giftImg3.svg" // Укажите путь к изображению
                                                        alt="Social Networks"
                                                        className={styles.giftLogo2}
                                                        width={1920}  // Исходная ширина изображения
                                                        height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                                    />
                                                    <div className={`${styles.bonus} ${styles.bonusExtra}`}>пожизненный
                                                        статус
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`${isAnimatingFinished ? styles.text3Visible : styles.text3}`}>
                                        Перейдите в Телеграм Бота и в два клика заберите ваш подарок
                                    </div>

                                    <div className={styles.buttonContainer}>
                                        {isAnimatingFinished ? (
                                            <div
                                                className={`${styles.twoButtons} ${isAnimatingFinished ? styles.animate : ''}`}>
                                                <button className={styles.buttonLeft}
                                                        onClick={() => {
                                                            setIsRegisterPage(true);
                                                            setIsTelegramReceived(true);
                                                        }}
                                                >Перейти в телеграм
                                                </button>
                                                <button className={styles.buttonRight}
                                                        onClick={() => setIsRegisterPage(true)}
                                                >Нет телеграма
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                className={`${styles.subscribeButton} ${isAnimating || remainingTime === 0 || isAnimatingFinished ? styles.disabledButton : ''}`}
                                                onClick={startAnimation}
                                                disabled={isAnimating || remainingTime === 0 || isAnimatingFinished}
                                            >
                                                {remainingTime === 0
                                                    ? 'Время на получение подарка вышло :('
                                                    : 'Получить свой подарок'}
                                            </button>
                                        )}
                                    </div>

                                    {!isAnimatingFinished && (<div
                                        className={styles.hideText}
                                    >
                                        Осталось {formatTime(remainingTime)}
                                    </div>)}
                                </div>
                            ) : !isRegistered ? (
                                <div className={styles.rightSide}>
                                    <div>
                                        <Image
                                            src="/img/Modals/cross.svg" // Укажите путь к изображению
                                            alt="Social Networks"
                                            className={`${isAnimatingFinished ? styles.cross : styles.invisible}`}
                                            width={1920}  // Исходная ширина изображения
                                            height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                            onClick={closeModal}
                                        />
                                    </div>

                                    <div>
                                        <Image
                                            src="/img/Modals/back.svg" // Укажите путь к изображению
                                            alt="back"
                                            className={`${!isTelegramReceived ? styles.back : styles.invisible}`}
                                            width={1920}  // Исходная ширина изображения
                                            height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                            onClick={() => setIsRegisterPage(false)}
                                        />
                                    </div>

                                    <div>
                                        <Image
                                            src="/img/Modals/giftLogo.svg" // Укажите путь к изображению
                                            alt="Social Networks"
                                            className={styles.logo}
                                            width={1920}  // Исходная ширина изображения
                                            height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                        />
                                    </div>

                                    <div className={styles.text11}>
                                        Завершите регистрацию, чтобы связать бонусы с вашим аккаунтом, а также получить
                                        дополнительные привилегии и удобства:
                                    </div>

                                    <div className={styles.contentCont}>
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
                                                    Скидки и лучшие предложения
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
                                                    Индивидуальные рекомендации и подборки товаров
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.contentRow}>
                                            <div className={styles.contentItem}>
                                                <Image
                                                    src="/img/Modals/modalPrivOffers.svg" // Укажите путь к изображению
                                                    alt="Social Networks"
                                                    className={styles.contentImage}
                                                    width={1920}  // Исходная ширина изображения
                                                    height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                                />
                                                <div className={styles.contentText}>
                                                    Информацию о падении цен на понравившиеся лоты
                                                </div>
                                            </div>
                                            <div className={styles.contentItem}>
                                                <Image
                                                    src="/img/Modals/modalPrivSpec.svg" // Укажите путь к изображению
                                                    alt="Social Networks"
                                                    className={styles.contentImage}
                                                    width={1920}  // Исходная ширина изображения
                                                    height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                                />
                                                <div className={styles.contentText}>
                                                    Розыгрыши и коллаборации с другими компаниями
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`${!isRegistered ? styles.buttonContainer : styles.invisible}`}>
                                        <button
                                            className={`${styles.subscribeButton}`}
                                            onClick={() => setIsRegistered(true)}
                                        >
                                            Завершить регистрацию
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className={styles.rightSide}>
                                    <div>
                                        <Image
                                            src="/img/Modals/cross.svg" // Укажите путь к изображению
                                            alt="Social Networks"
                                            className={`${isAnimatingFinished ? styles.cross : styles.invisible}`}
                                            width={1920}  // Исходная ширина изображения
                                            height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                            onClick={closeModal}
                                        />
                                    </div>

                                    <div>
                                        <Image
                                            src="/img/Modals/giftLogo.svg" // Укажите путь к изображению
                                            alt="Social Networks"
                                            className={styles.logo}
                                            width={1920}  // Исходная ширина изображения
                                            height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                        />
                                    </div>

                                    <div className={styles.text11}>
                                        Спасибо за регистрацию!
                                    </div>

                                    <div className={styles.text22}>
                                        {promotext}
                                    </div>

                                    <div className={styles.text33}>
                                        {promocode}
                                    </div>

                                    <div className={styles.text44}>
                                        {promotime}
                                    </div>

                                    <div className={styles.text55}>
                                        Чтобы воспользоваться промокодом, введите его в корзине во время оформления
                                        заказа
                                    </div>

                                    <div className={styles.text66}>
                                        Желаем самых стильных и выгодных покупок вместе с платформой Sellout!
                                    </div>

                                    <div className={styles.buttonContainer}>
                                        <button
                                            className={`${styles.subscribeButton}`}
                                            onClick={handleCopy}
                                        >
                                            Скопировать промокод
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {isCopied && (
                    <div className={styles.toast}>
                        Промокод скопирован
                    </div>
                )}
            </>
        ) : (
            <>
                {/* Модальное окно */}
                {isModalVisible && (
                    <div className={stylesMob.modalOpen}>
                        <div className={stylesMob.modalContent}>
                            <div className={stylesMob.img}>
                                <Image
                                    src={mainImgSrcMob}
                                    alt="Image 1"
                                    layout="responsive"
                                    width={1920}
                                    height={1080}
                                    quality={100}
                                    style={{display: 'block'}}
                                />
                            </div>
                            {!isRegisterPage ? (
                                <>
                                    <div>
                                        <Image
                                            src="/img/Modals/cross.svg" // Укажите путь к изображению
                                            alt="Social Networks"
                                            className={`${isAnimatingFinished ? stylesMob.cross : stylesMob.invisible}`}
                                            width={1920}  // Исходная ширина изображения
                                            height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                            onClick={closeModal}
                                        />
                                    </div>

                                    <div className={stylesMob.title}>
                                        Добро пожаловать на платформу Sellout!
                                    </div>

                                    <div className={stylesMob.text1}>
                                        {text}
                                    </div>

                                    <div
                                        className={`${isAnimatingFinished ? stylesMob.text2Visible : stylesMob.text2}`}>
                                        Поздравляем! Вы выиграли:
                                    </div>

                                    <div>
                                        <div className={stylesMob.grid}>
                                            <div
                                                className={`${stylesMob.square} ${activeSquare === 0 ? stylesMob.active : ''} ${isAnimatingFinished ? winningSquare === 0 ? stylesMob.winningSquare : stylesMob.fadeOutSquare : ''}`}
                                                style={winningSquare === 0 ? {'--x': `${x}px`, '--y': `${y}px`} : {}}
                                            >
                                                {prizesType === "bloggerBase" ? (
                                                    <div className={stylesMob["text-block"]}>
                                                        <div className={stylesMob.price}>7'000₽</div>
                                                        <div className={stylesMob.bonus}>бонусов к первому заказу</div>
                                                    </div>) : prizesType === "base" ?
                                                    (<div className={stylesMob["text-block"]}>
                                                        <div className={stylesMob.price}>5'000₽</div>
                                                        <div className={stylesMob.bonus}>бонусов к первому заказу</div>
                                                    </div>) : (<>
                                                    </>)}
                                            </div>
                                            <div
                                                className={`${stylesMob.square} ${activeSquare === 1 ? stylesMob.active : ''} ${isAnimatingFinished ? winningSquare === 1 ? stylesMob.winningSquare : stylesMob.fadeOutSquare : ''}`}
                                                style={winningSquare === 1 ? {'--x': `${x}px`, '--y': `${y}px`} : {}}
                                            >
                                                <div className={stylesMob["text-block"]}>
                                                    <Image
                                                        src="/img/Modals/giftImg2.png" // Укажите путь к изображению
                                                        alt="Social Networks"
                                                        className={stylesMob.giftLogo}
                                                        width={1920}  // Исходная ширина изображения
                                                        height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                                    />
                                                    <div className={stylesMob.bonus}>Любой лот до 15’000₽ <span
                                                        style={{color: '#940A0A'}}>бесплатно</span></div>
                                                </div>
                                            </div>
                                            <div
                                                className={`${stylesMob.square} ${activeSquare === 2 ? stylesMob.active : ''} ${isAnimatingFinished ? winningSquare === 2 ? stylesMob.winningSquare : stylesMob.fadeOutSquare : ''}`}
                                                style={winningSquare === 2 ? {'--x': `${x}px`, '--y': `${y}px`} : {}}
                                            >
                                                {prizesType === "bloggerBase" ? (
                                                    <div className={stylesMob["text-block"]}>
                                                        <div className={stylesMob.price}>2'000₽</div>
                                                        <div className={stylesMob.bonus}>бонусов к первому заказу</div>
                                                    </div>) : prizesType === "base" ?
                                                    (<div className={stylesMob["text-block"]}>
                                                        <div className={stylesMob.price}>1'000₽</div>
                                                        <div className={stylesMob.bonus}>бонусов к первому заказу</div>
                                                    </div>) : (<>
                                                    </>)}
                                            </div>
                                            <div
                                                className={`${stylesMob.square} ${activeSquare === 3 ? stylesMob.active : ''} ${isAnimatingFinished ? winningSquare === 3 ? stylesMob.winningSquare : stylesMob.fadeOutSquare : ''}`}
                                                style={winningSquare === 3 ? {'--x': `${x}px`, '--y': `${y}px`} : {}}
                                            >
                                                {prizesType === "bloggerBase" ? (
                                                    <div className={stylesMob["text-block"]}>
                                                        <div className={stylesMob.price}>1'000₽</div>
                                                        <div className={stylesMob.bonus}>бонусов к первому заказу</div>
                                                    </div>) : prizesType === "base" ?
                                                    (<div className={stylesMob["text-block"]}>
                                                        <div className={stylesMob.price}>500₽</div>
                                                        <div className={stylesMob.bonus}>бонусов к первому заказу</div>
                                                    </div>) : (<>
                                                    </>)}
                                            </div>
                                            <div
                                                className={`${stylesMob.square} ${activeSquare === 4 ? stylesMob.active : ''} ${isAnimatingFinished ? winningSquare === 4 ? stylesMob.winningSquare : stylesMob.fadeOutSquare : ''}`}
                                                style={winningSquare === 4 ? {'--x': `${x}px`, '--y': `${y}px`} : {}}
                                            >
                                                {prizesType === "bloggerBase" ? (
                                                    <div className={stylesMob["text-block"]}>
                                                        <div className={stylesMob.price}>7'000₽</div>
                                                        <div className={stylesMob.bonus}>бонусов к первому заказу</div>
                                                    </div>) : prizesType === "base" ?
                                                    (<div className={stylesMob["text-block"]}>
                                                        <div className={stylesMob.price}>2'000₽</div>
                                                        <div className={stylesMob.bonus}>бонусов к первому заказу</div>
                                                    </div>) : (<>
                                                    </>)}
                                            </div>
                                            <div
                                                className={`${stylesMob.square} ${activeSquare === 5 ? stylesMob.active : ''} ${isAnimatingFinished ? winningSquare === 5 ? stylesMob.winningSquare : stylesMob.fadeOutSquare : ''}`}
                                                style={winningSquare === 5 ? {'--x': `${x}px`, '--y': `${y}px`} : {}}
                                            >
                                                <div className={stylesMob["text-block"]}>
                                                    <div className={stylesMob.price}>20%</div>
                                                    <div className={stylesMob.bonus}>скидка на первый заказ</div>
                                                </div>
                                            </div>
                                            <div
                                                className={`${stylesMob.square} ${activeSquare === 6 ? stylesMob.active : ''} ${isAnimatingFinished ? winningSquare === 6 ? stylesMob.winningSquare : stylesMob.fadeOutSquare : ''}`}
                                                style={winningSquare === 6 ? {'--x': `${x}px`, '--y': `${y}px`} : {}}
                                            >
                                                <div className={stylesMob["text-block"]}>
                                                    <Image
                                                        src="/img/Modals/giftImg1.png" // Укажите путь к изображению
                                                        alt="Social Networks"
                                                        className={stylesMob.giftLogo}
                                                        width={1920}  // Исходная ширина изображения
                                                        height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                                    />
                                                    <div className={stylesMob.bonus}>Любой лот до 10’000₽ <span
                                                        style={{color: '#940A0A'}}>бесплатно</span></div>
                                                </div>
                                            </div>
                                            <div
                                                className={`${stylesMob.square} ${activeSquare === 7 ? stylesMob.active : ''} ${isAnimatingFinished ? winningSquare === 7 ? stylesMob.winningSquare : stylesMob.fadeOutSquare : ''}`}
                                                style={winningSquare === 7 ? {'--x': `${x}px`, '--y': `${y}px`} : {}}
                                            >
                                                <div className={stylesMob["text-block"]}>
                                                    <div className={stylesMob.price}>10%</div>
                                                    <div className={stylesMob.bonus}>скидка на первый заказ</div>
                                                </div>
                                            </div>
                                            <div
                                                className={`${stylesMob.square} ${activeSquare === 8 ? stylesMob.active : ''} ${isAnimatingFinished ? winningSquare === 8 ? stylesMob.winningSquare : stylesMob.fadeOutSquare : ''}`}
                                                style={winningSquare === 8 ? {'--x': `${x}px`, '--y': `${y}px`} : {}}
                                            >
                                                <div className={stylesMob["text-block"]}>
                                                    <Image
                                                        src="/img/Modals/giftImg3.svg" // Укажите путь к изображению
                                                        alt="Social Networks"
                                                        className={stylesMob.giftLogo2}
                                                        width={1920}  // Исходная ширина изображения
                                                        height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                                    />
                                                    <div
                                                        className={`${stylesMob.bonus} ${stylesMob.bonusExtra}`}>пожизненный
                                                        статус
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className={`${isAnimatingFinished ? stylesMob.text3Visible : stylesMob.text3}`}>
                                        Перейдите в Телеграм Бота и в два клика заберите ваш подарок
                                    </div>

                                    <div className={stylesMob.buttonContainer}>
                                        {isAnimatingFinished ? (
                                            <div
                                                className={`${stylesMob.twoButtons} ${isAnimatingFinished ? stylesMob.animate : ''}`}>
                                                <button className={stylesMob.buttonLeft}
                                                        onClick={() => {
                                                            setIsRegisterPage(true);
                                                            setIsTelegramReceived(true);
                                                        }}
                                                >Перейти в телеграм
                                                </button>
                                                <button className={stylesMob.buttonRight}
                                                        onClick={() => setIsRegisterPage(true)}
                                                >Нет телеграма
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                className={`${stylesMob.subscribeButton} ${isAnimating || remainingTime === 0 || isAnimatingFinished ? stylesMob.disabledButton : ''}`}
                                                onClick={startAnimation}
                                                disabled={isAnimating || remainingTime === 0 || isAnimatingFinished}
                                            >
                                                {remainingTime === 0
                                                    ? 'Время на получение подарка вышло :('
                                                    : 'Получить свой подарок'}
                                            </button>
                                        )}
                                    </div>

                                    {!isAnimatingFinished && (<div
                                        className={stylesMob.hideText}
                                    >
                                        Осталось {formatTime(remainingTime)}
                                    </div>)}
                                </>
                            ) : !isRegistered ? (
                                <>
                                    <div>
                                        <Image
                                            src="/img/Modals/cross.svg" // Укажите путь к изображению
                                            alt="Social Networks"
                                            className={`${isAnimatingFinished ? stylesMob.cross : stylesMob.invisible}`}
                                            width={1920}  // Исходная ширина изображения
                                            height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                            onClick={closeModal}
                                        />
                                    </div>

                                    <div>
                                        <Image
                                            src="/img/Modals/back2.svg" // Укажите путь к изображению
                                            alt="back"
                                            className={`${!isTelegramReceived ? stylesMob.back : stylesMob.invisible}`}
                                            width={1920}  // Исходная ширина изображения
                                            height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                            onClick={() => setIsRegisterPage(false)}
                                        />
                                    </div>

                                    <div className={stylesMob.text11}>
                                        Завершите регистрацию, чтобы связать бонусы с вашим аккаунтом, а также получить
                                        дополнительные привилегии и удобства:
                                    </div>

                                    <div className={stylesMob.contentCont}>
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
                                                Индивидуальные рекомендации и подборки товаров
                                            </div>
                                        </div>
                                        <div className={stylesMob.contentItem}>
                                            <Image
                                                src="/img/Modals/modalPrivOffers.svg" // Укажите путь к изображению
                                                alt="Social Networks"
                                                className={stylesMob.contentImage}
                                                width={1920}  // Исходная ширина изображения
                                                height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                            />
                                            <div className={stylesMob.contentText}>
                                                Информацию о падении цен на понравившиеся лоты
                                            </div>
                                        </div>
                                        <div className={stylesMob.contentItem}>
                                            <Image
                                                src="/img/Modals/modalPrivSpec.svg" // Укажите путь к изображению
                                                alt="Social Networks"
                                                className={stylesMob.contentImage}
                                                width={1920}  // Исходная ширина изображения
                                                height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                            />
                                            <div className={stylesMob.contentText}>
                                                Розыгрыши и коллаборации с другими компаниями
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className={`${!isRegistered ? stylesMob.buttonContainer : stylesMob.invisible}`}>
                                        <button
                                            className={`${stylesMob.subscribeButton}`}
                                            onClick={() => setIsRegistered(true)}
                                        >
                                            Завершить регистрацию
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <Image
                                            src="/img/Modals/cross.svg" // Укажите путь к изображению
                                            alt="Social Networks"
                                            className={`${isAnimatingFinished ? stylesMob.cross : stylesMob.invisible}`}
                                            width={1920}  // Исходная ширина изображения
                                            height={1080} // Исходная высота изображения (пропорции будут сохраняться)
                                            onClick={closeModal}
                                        />
                                    </div>

                                    <div className={stylesMob.text111}>
                                        Спасибо за регистрацию!
                                    </div>

                                    <div className={stylesMob.text22}>
                                        {promotext}
                                    </div>

                                    <div className={stylesMob.text33}>
                                        {promocode}
                                    </div>

                                    <div className={stylesMob.text44}>
                                        {promotimeMob}
                                    </div>

                                    <div className={stylesMob.text55}>
                                        Чтобы воспользоваться промокодом, введите его в корзине во время оформления
                                        заказа
                                    </div>

                                    <div className={stylesMob.text66}>
                                        Желаем самых стильных и выгодных покупок вместе с платформой Sellout!
                                    </div>

                                    <div className={stylesMob.buttonContainer}>
                                        <button
                                            className={`${stylesMob.subscribeButton}`}
                                            onClick={handleCopy}
                                        >
                                            Скопировать промокод
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {isCopied && (
                    <div className={styles.toast}>
                        Промокод скопирован
                    </div>
                )}
            </>
        )}
        </>
    );
}
