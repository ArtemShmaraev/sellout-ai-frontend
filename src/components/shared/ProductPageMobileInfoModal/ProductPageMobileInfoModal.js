import React, {useEffect, useRef, useState} from 'react';
import sMob from './ProductPageMobileInfoModalMob.module.css'
import {Modal} from "react-bootstrap";
import Image from "next/image";
import close from "@/static/icons/x-lg.svg";
import logo from '@/static/img/sellout_logo.svg'
import ProductDetailsMob from "@/components/shared/ProductDetailsMob/ProductDetailsMob";
import {desktopStore} from "@/store/DesktopStore";
import s from "@/styles/OneProductPage.module.css";
import aboutUs from "@/static/icons/aboutus.svg";
import TextModalDesktopProductPage
    from "@/components/shared/UI/TextModalDesktopProductPage/TextModalDesktopProductPage";
import warranty from "@/static/icons/shield-check.svg";
import shield from "@/static/icons/shield-check 1.svg";
import Link from "next/link";
import igBlack from "@/static/icons/igImg.svg";
import tgBlack from "@/static/icons/tg_black.svg";
import patch from "@/static/icons/patch-check 1.svg";
import personCheck from "@/static/icons/person-check 1.svg";
import file from "@/static/icons/file-earmark-check 1.svg";
import creditCard from "@/static/icons/credit-card 2.svg";
import LoyaltyFAQ from "@/components/pages/account/LoyaltyFAQ/LoyaltyFAQ";
import imgUs4Mob from "@/static/img/Гарантии 1 mob.png";
import imgUs5Mob from "@/static/img/Гарантии 2 mob.png";
import imgUs6Mob from "@/static/img/Гарантии 3 mob.png";
import imgUs7Mob from "@/static/img/Гарантии 4 mob.png";
import imgUs8Mob from "@/static/img/Гарантии 5 mob.png";
import imgUs9Mob from "@/static/img/Гарантии 6 mob.png";
import imgUs10Mob from "@/static/img/Гарантии 7 mob.png";
import imgUs11Mob from "@/static/img/Гарантии 8 mob.png";
import HowWeWorkModal from "@/components/shared/HowWeWorkModal/HowWeWorkModal";
import truck from '@/static/icons/truck.svg';
import refund from '@/static/icons/arrow-return-left.svg';
import gift from '@/static/icons/gift-green.svg';
import how from '@/static/icons/question-circle.svg';
import payment from '@/static/icons/credit-card.svg';
import returnImg from '@/static/icons/arrow-return-left.svg'
import like from '@/static/icons/heart.svg'
import giftModal from "@/static/icons/gift.svg";
import gift_gard from "@/static/icons/gift-gard.svg";
import first from "@/static/icons/first.svg";
import good from "@/static/icons/good.svg";
import friend from "@/static/icons/friend.svg";
import birth from "@/static/icons/happybirthday.svg";
import smile from "@/static/icons/emoji-smile 1.svg";
import change from "@/static/icons/arrow-down-up.svg";
import map from "@/static/img/map.jpg";
import headphones from "@/static/icons/headphones-circle.svg";
import ContactModal from "@/components/shared/ContactModal/ContactModal";
const ProductPageMobileInfoModal = ({show, onHide, product}) => {
    const [isDesktop, setIsDesktop] = useState(true)
    useEffect(() => {
        const width = window.innerWidth
        if (width <= 1000) {
            setIsDesktop(false)
        }
    }, [isDesktop])

    const brandsDisplay = () => {
        if (product.collab) {
            return product.collab.name
        } else {
            return product.brands[0].name
        }
    }

    const [moreOpen, setMoreOpen] = useState(false)
    const [contentHeight, setContentHeight] = useState("250px");
    const contentRef = useRef(null);
    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(moreOpen ? contentRef.current.scrollHeight + "px" : desktopStore.isDesktop ? '145px' : "250px");
            setTimeout(() => {
                setContentHeight(moreOpen ? contentRef.current.scrollHeight + "px" : desktopStore.isDesktop ? '145px' : "250px");
            }, 400)

        }
    }, [moreOpen]);

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

    const [howOpen, setHowOpen] = useState(false)
    const toggleHow = () => {
        setHowOpen(!howOpen)
        setTimeout(() => {
            changeBrowserColor("#000000")
        }, 10)
    }
    const closeHow = () => {
        setHowOpen(false)
        changeBrowserColor("#ffffff")
    }

    const [contactOpen, setContactOpen] = useState(false);
    const toggleContact = () => {
        setContactOpen(!contactOpen);
    };

    const closeContact = () => {
        setContactOpen(false);
    };

    return (<>
        <Modal
            centered={true}
            fullscreen={true}
            show={show}
            onHide={onHide}
            contentClassName={sMob.modalContent}
        >
            <Modal.Body style={{padding: 0, position: 'relative', overflowX: 'hidden'}}>
                <div className={sMob.close}>
                    <Image src={close} alt="" onClick={onHide} style={{cursor: 'pointer'}}/>
                </div>

                {/* Логотип по центру сверху */}
                <div className={sMob.logoContainer}>
                    <Image src={logo} alt="Logo" className={sMob.logo}/>
                </div>

                {/* Контент модалки */}
                <div className={sMob.contentContainer}>
                    {/* Фото товара слева */}
                    <div className={sMob.productImageContainer}>
                        <Image
                            src={product.bucket_link[0].url}
                            alt="Product Image"
                            className={sMob.productImage}
                            layout="responsive"
                            width={500}
                            height={500}
                        />
                    </div>

                    {/* Информация о бренде, модели и расцветке справа */}
                    <div className={sMob.productInfoContainer}>
                        <div className={sMob.brand}>{brandsDisplay()}</div>
                        <div className={sMob.model}>{product.model}</div>
                        <div className={sMob.colorway}>{product.colorway}</div>
                    </div>
                </div>
                <div style={{marginRight: '10px', marginLeft: '10px'}}>
                    <ProductDetailsMob key={product.id} product={product} ref={contentRef}
                                       style={{maxHeight: contentHeight}}></ProductDetailsMob>
                    <hr style={{marginTop: '0'}}/>
                    <button
                        className={s.how_btn}
                        onClick={toggleHow}
                    >
                        <Image src={aboutUs} alt="" className={s.icon_about_us}/>
                        <div className={s.label}>
                            Откуда у нас выбор из 2’000’000+ товаров и
                            выгоднейшие цены: на 30-70% ниже всех в РФ
                        </div>
                    </button>
                    <TextModalDesktopProductPage title={'Гарантии оригинальности и отзывы'} img={warranty}>
                        <Image src={shield} alt='' width={60}/>
                        <h4 className={'my-3'}>Гарантии оригинальности и качества</h4>
                        <p className={s.text}>
                            На SELLOUT продаются только 100% оригинальные и новые вещи. Мы бережно относимся
                            к своей репутации и не допускаем подделок. Мы сотрудничаем только с проверенными
                            бутиками, магазинами и продавцами. Каждый товар перед отправкой покупателю
                            проходит тщательные проверки на оригинальность и качество. Наша команда состоит
                            из специалистов, которые уже более 5 лет занимаются проверкой подлинности
                            одежды, обуви и прочих аксессуаров, а также использует передовые технологии
                            искусственного интеллекта, чтобы исключить человеческий фактор.

                        </p>
                        <h5 className={'mb-3 mt-5'}>Вы можете найти нас во всех соц. сетях и посмотреть
                            отзывы, подробнее прочитать <Link href={'/about'} className={s.link}
                                                              target={'_blank'}>про нашу компанию</Link>, а
                            также изучить отзывы на интернет ресурсах:</h5>
                        <div className={s.icons_block}>
                            <div className={s.socialsCont}>
                                <a style={{height: '45px'}}>
                                    <Image src={igBlack} height={45} alt="" className={s.icon}/>
                                </a>
                                <span className={s.mainSocialsText}>
                                                  Запретграм: <br/> @sellout_platform
                                            </span>
                            </div>

                            <div className={s.socialsCont}>
                                <a href={'https://t.me/selloutsu'} style={{height: '45px'}}>
                                    <Image src={tgBlack} height={45} alt="" className={s.icon}/>
                                </a>
                                <span className={s.mainSocialsText}>
                                                  Телеграм: <br/>
                                                  @<a href="https://t.me/selloutsu" className={s.linkTgSocials}>
                                                    selloutsu
                                                  </a>
                                            </span>
                            </div>
                        </div>
                        <div className={s.icons_block}>
                            <iframe
                                src="https://www.yandex.ru/sprav/widget/rating-badge/108238948174?type=rating&theme=dark"
                                width="150" height="50" frameBorder="0"></iframe>
                            {/*<a id="zoon_widget_210x40_dark"*/}
                            {/*   href="https://zoon.ru/service/657ee85a79a80027cf0274d7/">*/}
                            {/*    <img src="https://zoon.ru/wg/210x40/657ee85a79a80027cf0274d7/dark/"*/}
                            {/*         alt="Интернет-магазин Sellout" title="Интернет-магазин Sellout"*/}
                            {/*         width="210" height="40"/>*/}
                            {/*</a>*/}
                        </div>
                        <Image src={patch} alt='' width={60} className={'mt-3'}/>
                        <h5 className={'my-3'}>Какие этапы проверки проходит каждый товар?</h5>
                        <Image src={personCheck} alt='' width={60}/>
                        <h5 className={'my-3'}>Проверка партнера</h5>
                        <p className={s.text}>
                            Перед тем как оказаться на платформе SELLOUT, мы тщательно проверяем наших
                            контрагентов. Мы работаем только с крупнейшими международными ресурсами с
                            многомиллиардными оборотами и годами проверенными продавцами, а также частными
                            коллекционерами, деятелями искусства и моды и публичными персонами.

                        </p>
                        <Image src={file} alt='' width={60}/>
                        <h5 className={'my-3'}>Многоэтапная проверка</h5>
                        <p className={s.text}>
                            Несмотря на надёжность каждого партнера, мы дополнительно проверяем каждый товар
                            по прибытии к нам на склад. Мы можем запросить дополнительную проверку у
                            независимых экспертов, если сомневаемся в оригинальности товара. Лишь после
                            этого мы приложим к товару сертификат подлинности и сопутствующий комплект,
                            подтверждающий оригинальность (пломбы, наклейки и.т.д) и отправим вам заказ!

                        </p>
                        <Image src={creditCard} alt='' width={60}/>
                        <h5 className={'my-3'}>Безопасная оплата</h5>
                        <p className={s.text}>
                            Деньги на вашем счету замораживаются и списываются лишь после того, как ваш
                            заказ повторно успешно пройдет все проверки на оригинальность и качество! В ином
                            случае деньги будут незамедлительно разморожены и станут доступными на вашем
                            счете.
                        </p>
                        <div className={s.faq_block}>
                            <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                            <LoyaltyFAQ
                                title={'Что делать, если сомневаетесь в оригинальности или качестве?'}>
                                Если вы считаете, что вам привезли подделку или бракованный товар, можете
                                смело обращаться в службу поддержки, и мы разберемся в вашей ситуации. Мы
                                проведем ряд дополнительных проверок, а также призовем независимых экспертов
                                для вынесения объективного вердикта. Мы настоятельно рекомендуем фиксировать
                                на видео факт получения и вскрытия заказа, чтобы избежать двояких ситуаций!
                                Согласно нашим правилам, за попытку продажи через платформу Sellout
                                неоригинального товара следуют большие штрафы, конфискация товара и отказ от
                                сотрудничества с партнером. Торговля контрафактом карается законом, наша
                                компания занимается исключительно легальным и прозрачным бизнесом.

                            </LoyaltyFAQ>
                        </div>
                        <h5 style={{marginBottom: '30px'}}>Ответы на большинство вопросов вы найдете
                            здесь: <Link href={'/faq'}
                                         className={s.link}
                                         target={'_blank'}>FAQ</Link>
                        </h5>
                        <div className={s.page2}>
                            <Image src={imgUs4Mob} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs5Mob} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs6Mob} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs7Mob} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs8Mob} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs9Mob} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs10Mob} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                        <div className={s.page2}>
                            <Image src={imgUs11Mob} alt="Img" width={6000} height={2000}
                                   className={s.page2Img}/>
                        </div>
                    </TextModalDesktopProductPage>
                    <div style={{display: 'flex', width: '100%'}}>
                        <div style={{width: '50%'}}>
                            <TextModalDesktopProductPage title={'Доставка'} img={truck}>
                                <Image src={truck} alt='' width={60}/>
                                <h4 className={'my-3'}>Доставка</h4>
                                <p className={s.text}>
                                    Обратите внимание, на кнопке на странице товара указано количество дней,
                                    необходимое для доставки от
                                    продавца до нашего склада в Москве. Доставка со склада занимает от 1 дня в
                                    зависимости вашего от местоположения.<br/><br/>Мы собираем десятки миллионов
                                    предложений со всего мира: от различных бутиков,
                                    магазинов и частных коллекционеров. В связи с этим мы можем предложить вам
                                    разные
                                    условия доставки: от самых быстрых до более длительных и при этом выгодных.
                                    Выбрав
                                    размер или конфигурацию товара, вам предстоит выбрать срок доставки и
                                    соответствующую цену. Обычно мы укладываемся сильно раньше, чем указанный
                                    крайний
                                    срок, однако мы берем время с запасом, чтобы учесть все непредвиденные
                                    обстоятельства.

                                </p>
                                <div className={s.faq_block}>
                                    <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                                    <LoyaltyFAQ
                                        title={'Какие существуют варианты доставок с нашего склада в Москве до вас?'}>
                                        При оформлении заказа вы указываете адрес и способ доставки. Мы доставляем,
                                        используя курьерскую службу Boxberry
                                        {/*, а также на данный момент доставка по*/}
                                        {/*Москве бесплатная!*/}
                                        <br/>
                                        Вы можете выбрать доставку до Пункта Выдачи Заказов (ПВЗ) Boxberry, отметив
                                        на
                                        карте нужный ПВЗ, или выбрать доставку курьером до двери.
                                        <br/>
                                        Самовывоза на данный момент нет, но скоро появится!

                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Как рассчитывается стоимость доставки?'}>
                                        Стоимость доставки рассчитываются автоматически на этапе оформления заказа.
                                        Она
                                        зависит от количества и веса
                                        товаров, способа и типа доставки, а также от адреса.

                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Куда мы доставляем?'}>
                                        Мы доставляем по всей России службой курьерской доставки Boxberry. Очень
                                        скоро
                                        появится доставка в страны СНГ!

                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Какая скорость доставки со склада в Москве?'}>
                                        В зависимости от вашего города доставка занимает
                                        от одного до нескольких дней после прибытия вашего заказа на наш склад в
                                        Москве.
                                        Подробнее вы сможете отслеживать на сайте или в приложении Boxberry.

                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Как отслеживать доставку?'}>
                                        Как только ваш заказ приедет на наш склад в Москве и будет отправлен
                                        курьерской
                                        службой Boxberry, вам
                                        придет уведомление на почту с информацией о трек-номере отправления, а также
                                        трек-номер появится в
                                        личном кабинете в информации о вашем заказе.
                                        <br/>
                                        Отследить заказ можно по
                                        этой <a href="https://boxberry.ru/tracking-page" className={'text-black'}
                                                target={'_blank'}>ссылке</a> или в мобильном приложении Boxberry.
                                        Отправление
                                        автоматически появляется в приложении, если авторизоваться под теми
                                        же данными, под которыми был выполнен заказ на нашем сайте.

                                    </LoyaltyFAQ>
                                </div>
                            </TextModalDesktopProductPage>
                        </div>
                        <div style={{width: '50%'}}>
                            <TextModalDesktopProductPage title={'Оплата'} img={payment}>
                                <Image src={payment} alt='' width={60}/>
                                <h4 className={'my-3'}>Оплата</h4>
                                <p className={s.text}>
                                    При оплате товара средства с вашей карты замораживаются эквайрингом, а не
                                    списываются. Далее мы должны подтвердить ваш заказ, провести дополнительный ряд
                                    проверок, если требуется, и только после этого деньги поступят к нам. Обычно
                                    подтверждение заказа происходит в кратчайшие сроки. Обо всех изменениях статуса
                                    заказа вы можете получать уведомления удобным для вас способом, а также следить
                                    за
                                    ними в личном кабинете. В случае, если заказ не удастся подтвердить, вся сумма
                                    будет
                                    незамедлительно разморожена и снова станет доступной на вашем счету.

                                </p>
                                <div className={s.faq_block}>
                                    <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                                    <LoyaltyFAQ title={'Безопасная оплата'}>
                                        При оплате заказа банковской картой, обработка платежа (включая ввод номера
                                        карты) происходит на защищенной странице процессинговой системы, которая
                                        прошла
                                        международную сертификацию. Это значит, что Ваши конфиденциальные данные
                                        (реквизиты карты, регистрационные данные и др.) не поступают в
                                        интернет-магазин,
                                        их обработка полностью защищена и никто, в том числе наш интернет-магазин,
                                        не
                                        может получить персональные и банковские данные клиента. При работе с
                                        карточными
                                        данными применяется стандарт защиты информации, разработанный международными
                                        платёжными системами Visa и Masterсard-Payment Card Industry Data Security
                                        Standard (PCI DSS), что обеспечивает безопасную обработку реквизитов
                                        Банковской
                                        карты Держателя. Применяемая технология передачи данных гарантирует
                                        безопасность
                                        по сделкам с Банковскими картами путем использования протоколов Secure
                                        Sockets
                                        Layer (SSL), Verifiedby Visa, Secure Code, и закрытых банковских сетей,
                                        имеющих
                                        высшую степень защиты.
                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Какие есть способы оплаты?'}>
                                        Мы принимаем всевозможные способы оплаты: МИР, Visa, Mastercard, СБП.
                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Безопасность данных'}>
                                        Мы собираем и не разглашаем третьим лицам конфиденциальную информацию. Более
                                        подробно с политикой обработки персональных данных можно
                                        ознакомиться <a href="/docs/Политика%20конфиденциальности.pdf"
                                                        target={"_blank"}
                                                        className={'text-black'}>
                                        здесь</a>
                                        <br/>
                                        Все платежи проходят через интернет-эквайринг с использованием защиты
                                        3d-secure.
                                        <br/>
                                        Интернет-эквайринг защищен всеми нужными протоколами и имеет сертификации
                                        для
                                        создания безопасной связи между доменами при оплате. Более того,
                                        интернет-эквайринг позволяет отслеживать данные по каждой транзакции (пункт
                                        товара, сумма транзакции, статус транзакции, данные покупателя) и вовремя
                                        заподозрить вредоносные операции со стороны сотрудников, покупателей или
                                        сторонних людей (мошенников).
                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ
                                        title={'Включены ли таможенные пошлины и налоги в стоимость заказа?'}>
                                        Да, цена окончательная, никаких дополнительных платежей не потребуется!
                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Возврат средств в случае отмены заказа'}>
                                        В большинстве случаев средства при оплате не списываются, а замораживаются
                                        на
                                        вашем счете и списываются лишь после окончательного подтверждения заказа.
                                        Если
                                        нам не удастся подтвердить заказ, то деньги моментально разморозятся и
                                        вернутся
                                        на ваш счет. Вам для этого ничего делать не потребуется. Если деньги уже
                                        списались с вашего счета, то при отмене заказа деньги вернутся в течение
                                        3-10
                                        рабочих дней в зависимости от банка.

                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Правила возврата средств при частичной отмене заказа'}>
                                        В большинстве случаев средства при оплате не списываются, а замораживаются
                                        на
                                        вашем счете и списываются лишь после окончательного подтверждения заказа.
                                        Если
                                        нам не удастся подтвердить заказ частично, то часть денег, которая подлежит
                                        возврату, моментально разморозится и вернется на ваш счет. Вам для этого
                                        ничего
                                        делать не потребуется. Если деньги уже списались с вашего счета, то при
                                        частичной отмене заказа часть денег вернется в течение 3-10 рабочих дней в
                                        зависимости от банка.
                                        <br/>
                                        Оплата за ту часть заказа, которая успешна подтверждена, будет списана с
                                        вашего
                                        счета.
                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Возможна ли оплата криптовалютой?'}>
                                        На сайте не предусмотрена оплата криптовалютой. В Российской Федерации
                                        запрещено
                                        принимать цифровые деньги.
                                    </LoyaltyFAQ>
                                </div>
                            </TextModalDesktopProductPage>
                        </div>
                    </div>
                    <div style={{display: 'flex', width: '100%'}}>
                        <div style={{width: '50%'}}>
                            <TextModalDesktopProductPage title={'Бонусы'} img={giftModal} imgSize={32}>
                                <Image src={gift_gard} alt='' width={60}/>
                                <h4 className={'my-3'}>Получайте бонусы</h4>
                                <div className={'d-flex justify-content-evenly'} style={{marginTop: '30px', marginBottom: '20px'}}>
                                    <div className={s.point_block}>
                                        <Image src={first} alt='' width={60}/>
                                        <div>за первый заказ</div>
                                        <div className={s.line}/>
                                        до 5000 ₽
                                    </div>
                                    <div className={s.point_block}>
                                        <Image src={good} alt='' width={60}/>
                                        <div>за каждый товар</div>
                                        <div className={s.line}/>
                                        до 1500 ₽
                                    </div>
                                </div>
                                <div className={'d-flex justify-content-evenly'} style={{marginBottom: '20px'}}>
                                    <div className={s.point_block}>
                                        <Image src={friend} alt='' width={60}/>
                                        <div>за приглашенного друга</div>
                                        <div className={s.line}/>
                                        до 7000 ₽
                                    </div>
                                    <div className={s.point_block}>
                                        <Image src={birth} alt='' width={60}/>
                                        <div>на день рождения</div>
                                        <div className={s.line}/>
                                        1000 ₽
                                    </div>
                                </div>
                                <div className={'d-block'}>
                                    <Image src={smile} alt='' width={60}/>
                                    <div className={'my-3'}>И оплачивайте ими 100% от стоимости заказа!</div>
                                </div>
                                <p className={s.text}>
                                    Мы стараемся всячески благодарить вас за покупки на платформе SELLOUT, поэтому
                                    за
                                    каждую совершенную покупку мы будем начислять вам бонусы в соответствии с вашим
                                    статусом. Конкретное число бонусов за каждый товар вы сможете увидеть на
                                    странице
                                    товара, а также в корзине. Также мы дарим 1000 бонусных рублей за первую покупку
                                    и
                                    на ваш день рождения и регулярно начисляем бонусы в честь различных праздников!

                                </p>
                                <div className={s.faq_block}>
                                    <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                                    <LoyaltyFAQ title={'Чему равны бонусы?'}>
                                        Каждый один бонус приравнивается к одному рублю! Вы можете оплачивать до
                                        100%
                                        заказа, тем самым сводя стоимость заказа к нулю!

                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Как воспользоваться бонусами?'}>
                                        Чтобы оплатить заказ целиком или частично бонусами, в корзине или на любом
                                        этапе
                                        оформления заказа введите количество бонусов, которое хотите списать, и
                                        скидка
                                        будет автоматически применена!
                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Как быстро после совершения покупки начисляются бонусы?'}>
                                        Обратите внимание, бонусы на ваш баланс будут начислены не сразу, а по
                                        прошествии некоторого времени. Нам требуется обработать заказ, подтвердить
                                        корректность всех данных и после этого начислить бонусы. Если вы считаете,
                                        что
                                        бонусы слишком долго не начисляются и произошла какая-то ошибка, обязательно
                                        напишите нам и мы вам поможем!

                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ
                                        title={'Как получить бонусы по реферальной программе, приглашая друзей?'}>
                                        Реферальная программа - это специальная возможность для вас поделиться
                                        удовлетворением от покупок с друзьями и получить взамен уникальные бонусы
                                        размером до 7000₽! Просто пригласите своих знакомых стать частью нашего
                                        сообщества, и вы оба сможете наслаждаться эксклюзивными преимуществами,
                                        такими
                                        как скидки и бонусы, созданными специально для участников нашей реферальной
                                        программы. Благодарим за доверие и ваш вклад в наше расширяющееся
                                        сообщество!
                                        Подробнее про реферальную программу
                                        смотрите <Link href={'/faq'} style={{color: 'inherit'}}>здесь</Link>
                                    </LoyaltyFAQ>
                                </div>

                                <div className={s.faq_block}>
                                    <h5 className={`text-center ${s.questions_text}`}>Ответы на большинство вопросов
                                        вы найдете здесь: <Link href={'/faq'} className={'text-black'}
                                                                target={'_blank'}>FAQ</Link></h5>
                                    <h5 className={`text-center ${s.questions_text}`}>Если у вас остались вопросы,
                                        вы
                                        всегда
                                        можете обратиться в службу поддержки и мы будем
                                        рады вам помочь!</h5>
                                </div>
                            </TextModalDesktopProductPage>
                        </div>
                        <div style={{width: '50%'}}>
                            <TextModalDesktopProductPage title={'Возврат'} img={returnImg}>
                                <Image src={refund} alt='' width={60}/>
                                <h4 className={'my-3'}>Возврат</h4>
                                <p className={s.text}>
                                    Многие представленные на нашей платформе товары выкупаются специально под
                                    вас у
                                    частных продавцов, коллекционеров или из разных иностранных бутиков и
                                    магазинов,
                                    поэтому мы не способны предложить вам возврат товара после подтверждения
                                    заказа
                                    на
                                    все позиции.
                                </p>
                                <p className={s.text} style={{color: '#057e48'}}>
                                    Если вам необходимо посмотреть товар вживую, померить, определиться с
                                    размером и так далее, обязательно <span onClick={toggleContact} style={{
                                    textDecoration: 'underline',
                                    cursor: 'pointer'
                                }}>напишите нам</span> и мы оперативно найдем решения: подберем индивидуально
                                    для вас другие предложения с возможностью примерки/возврата, подскажем по
                                    размеру или где можно посмотреть товар вживую :)
                                </p>
                                <p className={s.text}>
                                    Вскоре некоторые позиции будут подлежать
                                    возврату, в
                                    том
                                    числе даже эксклюзивные коллекции. Они будут помечены
                                    значком <Image src={returnImg} alt={''}/>. Обращаем внимание, что по
                                    правилам
                                    зарубежных продавцов, возврат
                                    возможен в течение 7 - 30 календарных дней с момента поставки товара на
                                    зарубежный
                                    склад. Однако срок доставки
                                    заказов от склада за рубежом до получателя в РФ может быть больше в связи с
                                    ограничениями
                                    и особенностями международной логистики. Кроме того, условия возврата могут
                                    быть
                                    связаны с
                                    особенностями законов страны, из которой товар был для вас выкуплен.
                                    Несмотря на
                                    это, SELLOUT
                                    всячески содействует по организации возврата товаров. В случае обнаружения
                                    брака
                                    или
                                    ненадлежащего качества вам необходимо связаться с нами для решения проблемы.
                                    Мы
                                    постоянно стремимся увеличить ассортимент товаров, подлежащих возврату,
                                    чтобы ваши покупки с нами стали еще более удобными!
                                </p>
                                <div className={s.faq_block}>
                                    <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                                    <LoyaltyFAQ title={'Что делать, если пришел не тот товар?'}>
                                        Если вам пришёл поврежденный или несоответствующий заказу товар, откажитесь
                                        от
                                        него при получении и свяжитесь с нами для выяснения обстоятельств и
                                        урегулирования вопроса. Также мы настоятельно рекомендуем снимать процесс
                                        вскрытия товара, чтобы избежать
                                        недопониманий!
                                        <ul>
                                            <li>Попросите у сотрудника «акт несоответствия», заполните его и
                                                сфотографируйте.
                                            </li>
                                            <li>Верните товар сотруднику службы доставки и приложите к нему акт.
                                            </li>
                                            <li>Незамедлительно напишите нам в службу поддержки по электронному
                                                адресу <a href={'mailto:customerservice@sellout.su'}
                                                          className={'text-black'}>customerservice@sellout.su</a>,
                                                прикрепите к письму фотографию акта несоответствия и укажите
                                                проблему.
                                            </li>
                                            <li>Проверка заявления и возврат денежных средств осуществляются в срок
                                                до
                                                10 календарных дней с момента отказа от товара при получении.
                                            </li>
                                        </ul>
                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Что делать с неподошедшим товаром?'}>
                                        Мы искренне стараемся помочь вам в такой ситуации, поэтому обязательно
                                        напишите
                                        нам, если вам не подошел товар. Мы попробуем продать его через нашу
                                        платформу и
                                        иные каналы продажи на особых условиях для вас, и, возможно, вам даже
                                        удастся
                                        заработать!

                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Можно ли вернуть только часть заказа?'}>
                                        На частичный возврат товаров распространяются точно такие же правила, как и
                                        описано выше.
                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Как быстро вернутся деньги за возврат?'}>
                                        В большинстве случаев средства при оплате не списываются, а замораживаются
                                        на
                                        вашем счете и списываются лишь после окончательного подтверждения заказа.
                                        Если
                                        нам не удастся подтвердить заказ или придется его вернуть, то деньги
                                        моментально
                                        разморозятся и вернутся на ваш счет. Вам для этого ничего делать не
                                        потребуется.
                                        Если деньги уже списались с вашего счета, то при отмене или возврате заказа
                                        деньги вернутся в течение 3-10 рабочих дней в зависимости от банка.

                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Можно ли отказаться от заказа до его получения?'}>
                                        Это возможно только в том случае, если заказ еще не был подтвержден и
                                        передан в
                                        обработку. Сообщите о своем желании отказаться от заказа как можно скорее на
                                        нашу почту <a href={'mailto:customerservice@sellout.su'}
                                                      className={'text-black'}>customerservice@sellout.su</a>
                                    </LoyaltyFAQ>
                                </div>
                                <h5>Ответы на большинство вопросов вы найдете здесь: <Link href={'/faq'}
                                                                                           className={s.link}
                                                                                           target={'_blank'}>FAQ</Link>
                                </h5>

                            </TextModalDesktopProductPage>
                        </div>
                    </div>
                    <div style={{display: 'flex', width: '100%', marginBottom: '50px'}}>
                        <div style={{width: '50%'}}>
                            <TextModalDesktopProductPage title={'Изменилась цена?'} img={change} imgSize={30}><Image src={change} alt='' width={60}/>
                                <h4 className={'my-3'}>Почему изменилась цена или модель оказалась
                                    распроданной?</h4>
                                <div className={s.img_cont}>
                                    <Image src={map} alt='' className={s.img} fill={true}/>
                                </div>
                                <p className={s.text}>
                                    Многие представленные модели являются лимитированными и находятся в наличии в
                                    ограниченном количестве, поэтому может произойти такое, что кто-то другой купит
                                    эту
                                    позицию и данное ценовое предложение перестанет быть доступным. Мы собираем
                                    десятки
                                    миллионов предложений со всего мира, поэтому даже в короткие промежутки времени
                                    цена
                                    может меняться. В том числе на цену могут сказываться прочие внешние факторы, не
                                    зависящие от нас, такие как курс, стоимость доставки и многое другое.

                                </p>
                                <div className={s.faq_block}>
                                    <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                                    <LoyaltyFAQ title={'После чего цена меняться не будет?'}>
                                        После того, как вы оформите заказ, цена для вас будет зафиксирована и
                                        никаким
                                        изменениям не подлежит. Добавление товара в корзину или избранное, к
                                        сожалению,
                                        не позволяет нам зафиксировать цену по объективным причинам. Мы стараемся в
                                        каждый момент времени предлагать вам наилучшую цену из возможных и делать
                                        ваш
                                        шопинг с нами еще более удобным и выгодным, поэтому не откладывайте ваши
                                        покупки
                                        на потом, чтобы не упустить приятные цены!

                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Как часто могут меняться цены?'}>
                                        Цена может не меняться как на протяжении долгого времени, так и постоянно
                                        оставаться волатильной. Она может как повыситься, так и понизиться. Вскоре
                                        мы
                                        добавим возможность следить за изменением цен, а также получать уведомления
                                        о
                                        появлении более выгодного предложения на интересующий вас лот!

                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Почему модель оказалась распроданной?'}>
                                        Так как многие размещенные на нашей платформе лоты являются коллекционными и
                                        редкими, может произойти такое, что какой-то конкретный размер или вся
                                        модель
                                        пропадет из наличия, поэтому не откладывайте свои покупки, чтобы успеть
                                        приобрести желанную модель!

                                    </LoyaltyFAQ>
                                </div>
                                <h5>Ответы на большинство вопросов вы найдете здесь: <Link href={'/faq'}
                                                                                           className={s.link}
                                                                                           target={'_blank'}>FAQ</Link>
                                </h5>
                            </TextModalDesktopProductPage>
                        </div>
                        <div style={{width: '50%'}}>
                            <TextModalDesktopProductPage title={'Остались вопросы?'} img={how}>
                                <div className={s.content}>
                                    <Image src={headphones} alt='' width={60}/>
                                    <div className={s.text_cont}>
                                        <h5>Если у вас остались вопросы в том числе по данному товару, вы всегда
                                            можете
                                            написать в службу поддержки, и мы будем рады вам помочь!</h5>
                                        <div>
                                            <div>
                                                Почта: <a href={'mailto:customerservice@sellout.su'}
                                                          className={s.link}>customerservice@sellout.su</a>
                                            </div>
                                            <div>
                                                WhatsApp: <a href={'https://wa.me/message/L2OINP6KNMNLA1'}
                                                             target={'_blank'}
                                                             className={s.link}>+7 993 896-92-27</a>
                                            </div>
                                            <div>
                                                Telegram: <a href={'https://t.me/sellout_official'}
                                                             target={'_blank'}
                                                             className={s.link}>@sellout_official</a>
                                            </div>
                                        </div>
                                        <div>
                                        <h5>Мы в социальных сетях:</h5>
                                        <div className={s.icons_block}>
                                            <div className={s.socialsCont}>
                                                <a style={{height: '45px'}}>
                                                    <Image src={igBlack} height={40} alt=""
                                                           className={s.icon}/>
                                                </a>
                                                <span className={s.mainSocialsText}>
                                                  Запретграм: <br/> @sellout_platform
                                            </span>
                                            </div>

                                            <div className={s.socialsCont}>
                                                <a href={'https://t.me/selloutsu'} style={{height: '37px'}}>
                                                    <Image src={tgBlack} height={37} alt=""
                                                           className={s.icon}/>
                                                </a>
                                                <span className={s.mainSocialsText}>
                                                  Телеграм: <br/>
                                                  @<a href="https://t.me/selloutsu" className={s.linkTgSocials}>
                                                    selloutsu
                                                  </a>
                                            </span>
                                            </div>
                                        </div>
                                    </div>
                                        <div className={s.faq_block}>
                                            <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                                            <LoyaltyFAQ
                                                title={'Что делать, если у выбранного товара отсутствует ваш размер?'}>
                                                Так как многие представленные на нашей платформе товары являются
                                                лимитированными, некоторые размеры
                                                товара могут отсутствовать. Однако не стоит отчаиваться, вы
                                                всегда
                                                можете написать нам в службу поддержки, и мы постараемся найти
                                                желанный лот в вашем размере или предложить похожий товар в
                                                качестве
                                                альтернативы!

                                            </LoyaltyFAQ>
                                            <LoyaltyFAQ
                                                title={'Можно ли оформить заказ, позвонив или написав нам?'}>
                                                Да, вы всегда можете написать нам в службу поддержки, и мы
                                                поможем
                                                вам и
                                                выбрать, и оформить заказ.
                                                Вы также можете написать нам, какой товар ищете, и мы сами
                                                найдем
                                                его
                                                для вас и предложим к заказу!

                                            </LoyaltyFAQ>
                                            <LoyaltyFAQ title={'Где узнать больше информации о товаре?'}>
                                                Если вы хотите узнать больше о составе, комплектации и иных
                                                характеристиках товара, вы всегда можете обратиться к нам, и
                                                наши
                                                специалисты ответят на все вопросы и
                                                предоставят исчерпывающую информацию о товаре!

                                            </LoyaltyFAQ>
                                            <LoyaltyFAQ title={'Можно ли примерить товар перед приобретением?'}>
                                                К сожалению, на данный момент услуга примерки товара недоступна.
                                                Мы
                                                собираем предложения со всего мира, поэтому предоставить
                                                возможность
                                                примерить товар перед покупкой не получится. Мы ежедневно
                                                работаем
                                                над
                                                тем, чтобы улучшить сервис и сделать примерку осуществимой!
                                                Однако
                                                вы
                                                можете самостоятельно посетить другой магазин или бутик бренда и
                                                примерить интересующую модель или похожую, чтобы
                                                определиться с размером, а затем заказать на нашей платформе по
                                                лучшей
                                                цене ;)

                                            </LoyaltyFAQ>
                                            <LoyaltyFAQ
                                                title={'Где можно примерить товар перед приобретением?'}>
                                                Вы всегда можете обратиться в службу поддержки, и наши
                                                специалисты
                                                постараются помочь вам с выбором размера и подскажут, где можно
                                                померить
                                                интересующую модель
                                                или похожую, чтобы затем заказать на нашей платформе по лучшей
                                                цене
                                                ;)

                                            </LoyaltyFAQ>
                                        </div>
                                        <h5>Ответы на большинство вопросов вы найдете здесь: <Link href={'/faq'}
                                                                                                   className={s.link}
                                                                                                   target={'_blank'}>FAQ</Link>
                                        </h5>

                                    </div>
                                </div>
                            </TextModalDesktopProductPage>
                        </div>
                    </div>
                </div>

                <HowWeWorkModal show={howOpen} onHide={closeHow}/>
                <ContactModal isOpen={contactOpen} handleClose={closeContact}/>
            </Modal.Body>
        </Modal>
    </>);
};

export default ProductPageMobileInfoModal;