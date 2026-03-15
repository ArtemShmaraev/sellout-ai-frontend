import React, {useContext, useEffect, useState} from 'react';
import s from './Footer.module.css'
import {Col, Row} from "react-bootstrap";
import tg from '@/static/icons/tg.svg'
import vk from '@/static/icons/vk.svg'
import tgBlack from '@/static/icons/tg_black.svg'
import igBlack from '@/static/icons/igImg.svg'
import vkBlack from '@/static/icons/vk_black.svg'
import MailingInput from "../UI/MailingInput/MailingInput";
import FooterDropdown from "../UI/FooterDropdown/FooterDropdown";
import Image from 'next/image'
import Link from "next/link";
import visa from '@/static/icons/payment/visa.svg'
import mastercard from '@/static/icons/payment/mastercard.svg'
import mir from '@/static/icons/payment/mir.svg'
// import payKeeper from '@/static/icons/payment/paykeeper.png'
import ContactModal from "@/components/shared/ContactModal/ContactModal";
import TextModal from "@/components/shared/UI/TextModal/TextModal";
import how from "@/static/icons/question-circle.svg";
import warranty from "@/static/icons/warranty.svg";
import igWhite from "@/static/icons/igImgWhite.svg";
import payment from "@/static/icons/payment.svg";
import ret from "@/static/icons/return.svg";
import refund from "@/static/icons/arrow-return-left.svg";
import shield from "@/static/icons/shield-check 1.svg";
import patch from "@/static/icons/patch-check 1.svg";
import personCheck from "@/static/icons/person-check 1.svg";
import file from "@/static/icons/file-earmark-check 1.svg";
import creditCard from "@/static/icons/credit-card 2.svg";
import LoyaltyFAQ from "@/components/pages/account/LoyaltyFAQ/LoyaltyFAQ";
import truck from "@/static/icons/truck.svg";
import returnImg from "@/static/icons/arrow-return-left.svg";
import HowWeWorkModal from "@/components/shared/HowWeWorkModal/HowWeWorkModal";
import inst_star from "@/static/icons/instagram_star.svg";
import inst_star_white from "@/static/icons/instagram_star_white.svg";
import {Context} from "@/context/AppWrapper";
import {$host} from "@/http";
import imgUs3 from "@/static/img/Гарантии 1.png";
import imgUs4 from "@/static/img/гарантии 2.png";
import imgUs5 from "@/static/img/Гарантии 3.png";
import imgUs6 from "@/static/img/Гарантии 4.png";
import imgUs7 from "@/static/img/Гарантии 5.png";
import imgUs8 from "@/static/img/Гарантии 6.png";
import imgUs4Mob from "@/static/img/Гарантии 1 mob.png";
import imgUs5Mob from "@/static/img/Гарантии 2 mob.png";
import imgUs6Mob from "@/static/img/Гарантии 3 mob.png";
import imgUs7Mob from "@/static/img/Гарантии 4 mob.png";
import imgUs8Mob from "@/static/img/Гарантии 5 mob.png";
import imgUs9Mob from "@/static/img/Гарантии 6 mob.png";
import imgUs10Mob from "@/static/img/Гарантии 7 mob.png";
import imgUs11Mob from "@/static/img/Гарантии 8 mob.png";
import HowToChoose from "@/components/pages/oneProduct/HowToChoose/HowToChoose";


const Footer = ({textData}) => {

    const {desktopStore} = useContext(Context);
    const [contactOpen, setContactOpen] = useState(false);
    const [howOpen, setHowOpen] = useState(false);

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

    const toggleContact = () => {
        setContactOpen(!contactOpen);
    };

    const closeContact = () => {
        setContactOpen(false);
    };

    const toggleHow = () => {
        setHowOpen(!howOpen);
        changeBrowserColor("#000000")
    };

    const closeHow = () => {
        setHowOpen(false);
        changeBrowserColor("#ffffff")
    };


    return (
        <footer className={s.footer}>
            <div className={'custom_cont'}>
                {desktopStore.isDesktop
                    ?
                    <Row>
                        <Col lg={4} className={s.footer_col}>
                            <h4>Sellout</h4>
                            <div>
                                <Link href="/about" className={s.footer_link}>О нас</Link>
                            </div>
                            <div>
                                <Link href="https://t.me/selloutsu" className={s.footer_link}
                                      target={'_blank'}>Блог</Link>
                            </div>
                            <div>
                                <span className={s.footer_link}
                                      onClick={toggleContact}
                                >Контакты</span>
                            </div>
                        </Col>
                        <Col lg={4} className={s.footer_col}>
                            <h4>Помощь</h4>
                            <div>
                                <span className={s.footer_link} onClick={toggleHow}>Как мы работаем?</span>
                            </div>
                            <TextModal title={'Гарантии оригинальности и отзывы'} img={warranty}
                                       titleClassname={s.footer_link}>
                                <>
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
                                    <h5 className={'mb-5 mt-5'}>Вы можете найти нас во всех соц. сетях и посмотреть
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
                                    <h5 style={{marginBottom: '50px'}}>Ответы на большинство вопросов вы найдете
                                        здесь: <Link href={'/faq'}
                                                     className={s.link}
                                                     target={'_blank'}>FAQ</Link>
                                    </h5>
                                    <div className={s.page2}>
                                        <Image src={imgUs3} alt="Img" width={6000} height={2000}
                                               className={s.page2Img}/>
                                    </div>
                                    <div className={s.page2}>
                                        <Image src={imgUs4} alt="Img" width={6000} height={2000}
                                               className={s.page2Img}/>
                                    </div>
                                    <div className={s.page2}>
                                        <Image src={imgUs5} alt="Img" width={6000} height={2000}
                                               className={s.page2Img}/>
                                    </div>
                                    <div className={s.page2}>
                                        <Image src={imgUs6} alt="Img" width={6000} height={2000}
                                               className={s.page2Img}/>
                                    </div>
                                    <div className={s.page2}>
                                        <Image src={imgUs7} alt="Img" width={6000} height={2000}
                                               className={s.page2Img}/>
                                    </div>
                                    <div className={s.page2}>
                                        <Image src={imgUs8} alt="Img" width={6000} height={2000}
                                               className={s.page2Img}/>
                                    </div>
                                </>
                            </TextModal>
                            <TextModal title={'Доставка, оплата, возврат'} img={payment} titleClassname={s.footer_link}>
                                <Image src={truck} alt='' width={60}/>
                                <h4 className={'my-3'}>Доставка</h4>
                                <p className={s.text}>
                                    Обратите внимание, на кнопке на странице товара указано количество дней, необходимое
                                    для доставки от
                                    продавца до нашего склада в Москве. Доставка со склада занимает от 1 дня в
                                    зависимости от вашего местоположения.
                                    <br/><br/>Мы собираем десятки миллионов предложений со всего мира: от различных
                                    бутиков,
                                    магазинов и частных коллекционеров. В связи с этим мы можем предложить вам разные
                                    условия доставки: от самых быстрых до более длительных и при этом выгодных. Выбрав
                                    размер или конфигурацию товара, вам предстоит выбрать срок доставки и
                                    соответствующую цену. Обычно мы укладываемся сильно раньше, чем указанный крайний
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
                                        Вы можете выбрать доставку до Пункта Выдачи Заказов (ПВЗ) Boxberry, отметив на
                                        карте нужный ПВЗ, или выбрать доставку курьером до двери.
                                        <br/>
                                        Самовывоза на данный момент нет, но скоро появится!

                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Как рассчитывается стоимость доставки?'}>
                                        Стоимость доставки рассчитываются автоматически на этапе оформления заказа. Она
                                        зависит от количества и веса
                                        товаров, способа и типа доставки, а также от адреса.

                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Куда мы доставляем?'}>
                                        Мы доставляем по всей России службой курьерской доставки Boxberry. Очень скоро
                                        появится доставка в страны СНГ!

                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Какая скорость доставки со склада в Москве?'}>
                                        В зависимости от вашего города доставка занимает
                                        от одного до нескольких дней после прибытия вашего заказа на наш склад в Москве.
                                        Подробнее вы сможете отслеживать на сайте или в приложении Boxberry.

                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Как отслеживать доставку?'}>
                                        Как только ваш заказ приедет на наш склад в Москве и будет отправлен курьерской
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


                                <Image src={payment} alt='' width={60}/>
                                <h4 className={'my-3'}>Оплата</h4>
                                <p className={s.text}>
                                    При оплате товара средства с вашей карты замораживаются эквайрингом, а не
                                    списываются. Далее мы должны подтвердить ваш заказ, провести дополнительный ряд
                                    проверок, если требуется, и только после этого деньги поступят к нам. Обычно
                                    подтверждение заказа происходит в кратчайшие сроки. Обо всех изменениях статуса
                                    заказа вы можете получать уведомления удобным для вас способом, а также следить за
                                    ними в личном кабинете. В случае, если заказ не удастся подтвердить, вся сумма будет
                                    незамедлительно разморожена и снова станет доступной на вашем счету.

                                </p>
                                <div className={s.faq_block}>
                                    <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                                    <LoyaltyFAQ title={'Безопасная оплата'}>
                                        При оплате заказа банковской картой, обработка платежа (включая ввод номера
                                        карты) происходит на защищенной странице процессинговой системы, которая прошла
                                        международную сертификацию. Это значит, что Ваши конфиденциальные данные
                                        (реквизиты карты, регистрационные данные и др.) не поступают в интернет-магазин,
                                        их обработка полностью защищена и никто, в том числе наш интернет-магазин, не
                                        может получить персональные и банковские данные клиента. При работе с карточными
                                        данными применяется стандарт защиты информации, разработанный международными
                                        платёжными системами Visa и Masterсard-Payment Card Industry Data Security
                                        Standard (PCI DSS), что обеспечивает безопасную обработку реквизитов Банковской
                                        карты Держателя. Применяемая технология передачи данных гарантирует безопасность
                                        по сделкам с Банковскими картами путем использования протоколов Secure Sockets
                                        Layer (SSL), Verifiedby Visa, Secure Code, и закрытых банковских сетей, имеющих
                                        высшую степень защиты.
                                        Уважаемые клиенты, информируем Вас о том, что при запросе возврата денежных
                                        средств при отказе от покупки, возврат производится исключительно на ту же
                                        банковскую карту, с которой была произведена оплата.
                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Какие есть способы оплаты?'}>
                                        Мы принимаем всевозможные способы оплаты: МИР, Visa, Mastercard, СБП.
                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Безопасность данных'}>
                                        Мы собираем и не разглашаем третьим лицам конфиденциальную информацию. Более
                                        подробно с политикой обработки персональных данных можно
                                        ознакомиться <a href="/docs/Политика%20конфиденциальности.pdf" target={"_blank"}
                                                        className={'text-black'}>
                                        здесь</a>
                                        <br/>
                                        Все платежи проходят через интернет-эквайринг с использованием защиты
                                        3d-secure.
                                        <br/>
                                        Интернет-эквайринг защищен всеми нужными протоколами и имеет
                                        сертификации для создания безопасной связи между доменами при оплате. Более
                                        того, интернет-эквайринг позволяет отслеживать данные по каждой
                                        транзакции (пункт товара, сумма транзакции, статус транзакции, данные
                                        покупателя) и вовремя заподозрить вредоносные операции со стороны сотрудников,
                                        покупателей или сторонних людей (мошенников).
                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Включены ли таможенные пошлины и налоги в стоимость заказа?'}>
                                        Да, цена окончательная, никаких дополнительных платежей не потребуется!
                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Возврат средств в случае отмены заказа'}>
                                        В большинстве случаев средства при оплате не списываются, а замораживаются на
                                        вашем счете и списываются лишь после окончательного подтверждения заказа. Если
                                        нам не удастся подтвердить заказ, то деньги моментально разморозятся и вернутся
                                        на ваш счет. Вам для этого ничего делать не потребуется. Если деньги уже
                                        списались с вашего счета, то при отмене заказа деньги вернутся в течение 3-10
                                        рабочих дней в зависимости от банка.

                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Правила возврата средств при частичной отмене заказа'}>
                                        В большинстве случаев средства при оплате не списываются, а замораживаются на
                                        вашем счете и списываются лишь после окончательного подтверждения заказа. Если
                                        нам не удастся подтвердить заказ частично, то часть денег, которая подлежит
                                        возврату, моментально разморозится и вернется на ваш счет. Вам для этого ничего
                                        делать не потребуется. Если деньги уже списались с вашего счета, то при
                                        частичной отмене заказа часть денег вернется в течение 3-10 рабочих дней в
                                        зависимости от банка.
                                        <br/>
                                        Оплата за ту часть заказа, которая успешна подтверждена, будет списана с вашего
                                        счета.
                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Возможна ли оплата криптовалютой?'}>
                                        На сайте не предусмотрена оплата криптовалютой. В Российской Федерации запрещено
                                        принимать цифровые деньги.
                                    </LoyaltyFAQ>
                                </div>


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
                                        Если вам пришёл поврежденный или несоответствующий заказу товар, откажитесь от
                                        него при получении и свяжитесь с нами для выяснения обстоятельств и
                                        урегулирования вопроса. Также мы настоятельно рекомендуем снимать процесс
                                        вскрытия товара, чтобы избежать
                                        недопониманий!
                                        <ul>
                                            <li>Попросите у сотрудника «акт несоответствия», заполните его и
                                                сфотографируйте.
                                            </li>
                                            <li>Верните товар сотруднику службы доставки и приложите к нему акт.</li>
                                            <li>Незамедлительно напишите нам в службу поддержки по электронному
                                                адресу <a href={'mailto:customerservice@sellout.su'}
                                                          className={'text-black'}>customerservice@sellout.su</a>,
                                                прикрепите к письму фотографию акта несоответствия и укажите проблему.
                                            </li>
                                            <li>Проверка заявления и возврат денежных средств осуществляются в срок до
                                                10 календарных дней с момента отказа от товара при получении.
                                            </li>
                                        </ul>
                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Что делать с неподошедшим товаром?'}>
                                        Мы искренне стараемся помочь вам в такой ситуации, поэтому обязательно напишите
                                        нам, если вам не подошел товар. Мы попробуем продать его через нашу платформу и
                                        иные каналы продажи на особых условиях для вас, и, возможно, вам даже удастся
                                        заработать!

                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Можно ли вернуть только часть заказа?'}>
                                        На частичный возврат товаров распространяются точно такие же правила, как и
                                        описано выше.
                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Как быстро вернутся деньги за возврат?'}>
                                        В большинстве случаев средства при оплате не списываются, а замораживаются на
                                        вашем счете и списываются лишь после окончательного подтверждения заказа. Если
                                        нам не удастся подтвердить заказ или придется его вернуть, то деньги моментально
                                        разморозятся и вернутся на ваш счет. Вам для этого ничего делать не потребуется.
                                        Если деньги уже списались с вашего счета, то при отмене или возврате заказа
                                        деньги вернутся в течение 3-10 рабочих дней в зависимости от банка.

                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Можно ли отказаться от заказа до его получения?'}>
                                        Это возможно только в том случае, если заказ еще не был подтвержден и передан в
                                        обработку. Сообщите о своем желании отказаться от заказа как можно скорее на
                                        нашу почту <a href={'mailto:customerservice@sellout.su'}
                                                      className={'text-black'}>customerservice@sellout.su</a>
                                    </LoyaltyFAQ>
                                </div>
                                <h5>Ответы на большинство вопросов вы найдете здесь: <Link href={'/faq'}
                                                                                           className={s.link}
                                                                                           target={'_blank'}>FAQ</Link>
                                </h5>

                            </TextModal>
                        </Col>
                        <Col lg={4} className={s.footer_col}>
                            <h4>Остались вопросы?</h4>
                            <div>
                                <Link href="/faq" className={s.footer_link} target={'_blank'}>Ответы на большинство из
                                    них: FAQ</Link>
                            </div>
                            <div>
                                <p className={s.footer_text}>Или напишите нам:</p>
                            </div>
                            <div>
                                <a href={'mailto:customerservice@sellout.su'}
                                   className={s.footer_link}>Почта: customerservice@sellout.su</a>
                            </div>
                            <div>
                                <a href={'https://wa.me/message/L2OINP6KNMNLA1'}
                                   target={'_blank'}
                                   className={s.footer_link}>WhatsApp: +7 993 896-92-27</a>
                            </div>
                            <div>
                                <a href={'https://t.me/sellout_official'}
                                   target={'_blank'}
                                   className={s.footer_link}>Telegram: @sellout_official</a>
                            </div>
                        </Col>
                    </Row>
                    :
                    <>
                        <div style={{fontSize: 27, fontWeight: 500, marginTop: 20}}>
                            Sellout
                        </div>
                        <div>
                            <Link href="/about" className={s.footer_link}>О нас</Link>
                        </div>
                        <div className={s.footer_link}>
                            <span className={s.footer_link} onClick={toggleHow}>Как мы работаем?</span>
                        </div>
                        <TextModal title={'Гарантии оригинальности и отзывы'} img={warranty}
                                   titleClassname={s.footer_link}>
                            <>
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
                            </>
                        </TextModal>
                        <TextModal title={'Доставка, оплата, возврат'} img={payment} titleClassname={s.footer_link}>
                            <Image src={truck} alt='' width={60}/>
                            <h4 className={'my-3'}>Доставка</h4>
                            <p className={s.text}>
                                Обратите внимание, на кнопке на странице товара указано количество дней, необходимое для
                                доставки от
                                продавца до нашего склада в Москве. Доставка со склада занимает от 1 дня в зависимости
                                вашего от местоположения.<br/><br/>Мы собираем десятки миллионов предложений со всего
                                мира: от различных бутиков,
                                магазинов и частных коллекционеров. В связи с этим мы можем предложить вам разные
                                условия доставки: от самых быстрых до более длительных и при этом выгодных. Выбрав
                                размер или конфигурацию товара, вам предстоит выбрать срок доставки и
                                соответствующую цену. Обычно мы укладываемся сильно раньше, чем указанный крайний
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
                                    Вы можете выбрать доставку до Пункта Выдачи Заказов (ПВЗ) Boxberry, отметив на
                                    карте нужный ПВЗ, или выбрать доставку курьером до двери.
                                    <br/>
                                    Самовывоза на данный момент нет, но скоро появится!

                                </LoyaltyFAQ>
                                <LoyaltyFAQ title={'Как рассчитывается стоимость доставки?'}>
                                    Стоимость доставки рассчитываются автоматически на этапе оформления заказа. Она
                                    зависит от количества и веса
                                    товаров, способа и типа доставки, а также от адреса.

                                </LoyaltyFAQ>
                                <LoyaltyFAQ title={'Куда мы доставляем?'}>
                                    Мы доставляем по всей России службой курьерской доставки Boxberry. Очень скоро
                                    появится доставка в страны СНГ!

                                </LoyaltyFAQ>
                                <LoyaltyFAQ title={'Какая скорость доставки со склада в Москве?'}>
                                    В зависимости от вашего города доставка занимает
                                    от одного до нескольких дней после прибытия вашего заказа на наш склад в Москве.
                                    Подробнее вы сможете отслеживать на сайте или в приложении Boxberry.

                                </LoyaltyFAQ>
                                <LoyaltyFAQ title={'Как отслеживать доставку?'}>
                                    Как только ваш заказ приедет на наш склад в Москве и будет отправлен курьерской
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


                            <Image src={payment} alt='' width={60}/>
                            <h4 className={'my-3'}>Оплата</h4>
                            <p className={s.text}>
                                При оплате товара средства с вашей карты замораживаются эквайрингом, а не
                                списываются. Далее мы должны подтвердить ваш заказ, провести дополнительный ряд
                                проверок, если требуется, и только после этого деньги поступят к нам. Обычно
                                подтверждение заказа происходит в кратчайшие сроки. Обо всех изменениях статуса
                                заказа вы можете получать уведомления удобным для вас способом, а также следить за
                                ними в личном кабинете. В случае, если заказ не удастся подтвердить, вся сумма будет
                                незамедлительно разморожена и снова станет доступной на вашем счету.

                            </p>
                            <div className={s.faq_block}>
                                <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                                <LoyaltyFAQ title={'Безопасная оплата'}>
                                    При оплате заказа банковской картой, обработка платежа (включая ввод номера
                                    карты) происходит на защищенной странице процессинговой системы, которая прошла
                                    международную сертификацию. Это значит, что Ваши конфиденциальные данные
                                    (реквизиты карты, регистрационные данные и др.) не поступают в интернет-магазин,
                                    их обработка полностью защищена и никто, в том числе наш интернет-магазин, не
                                    может получить персональные и банковские данные клиента. При работе с карточными
                                    данными применяется стандарт защиты информации, разработанный международными
                                    платёжными системами Visa и Masterсard-Payment Card Industry Data Security
                                    Standard (PCI DSS), что обеспечивает безопасную обработку реквизитов Банковской
                                    карты Держателя. Применяемая технология передачи данных гарантирует безопасность
                                    по сделкам с Банковскими картами путем использования протоколов Secure Sockets
                                    Layer (SSL), Verifiedby Visa, Secure Code, и закрытых банковских сетей, имеющих
                                    высшую степень защиты.
                                </LoyaltyFAQ>
                                <LoyaltyFAQ title={'Какие есть способы оплаты?'}>
                                    Мы принимаем всевозможные способы оплаты: МИР, Visa, Mastercard, СБП.
                                </LoyaltyFAQ>
                                <LoyaltyFAQ title={'Безопасность данных'}>
                                    Мы собираем и не разглашаем третьим лицам конфиденциальную информацию. Более
                                    подробно с политикой обработки персональных данных можно
                                    ознакомиться <a href="/docs/Политика%20конфиденциальности.pdf" target={"_blank"}
                                                    className={'text-black'}>
                                    здесь</a>
                                    <br/>
                                    Все платежи проходят через интернет-эквайринг с использованием защиты
                                    3d-secure.
                                    <br/>
                                    Интернет-эквайринг защищен всеми нужными протоколами и имеет
                                    сертификации для создания безопасной связи между доменами при оплате. Более
                                    того, интернет-эквайринг позволяет отслеживать данные по каждой
                                    транзакции (пункт товара, сумма транзакции, статус транзакции, данные
                                    покупателя) и вовремя заподозрить вредоносные операции со стороны сотрудников,
                                    покупателей или сторонних людей (мошенников).
                                </LoyaltyFAQ>
                                <LoyaltyFAQ title={'Включены ли таможенные пошлины и налоги в стоимость заказа?'}>
                                    Да, цена окончательная, никаких дополнительных платежей не потребуется!
                                </LoyaltyFAQ>
                                <LoyaltyFAQ title={'Возврат средств в случае отмены заказа'}>
                                    В большинстве случаев средства при оплате не списываются, а замораживаются на
                                    вашем счете и списываются лишь после окончательного подтверждения заказа. Если
                                    нам не удастся подтвердить заказ, то деньги моментально разморозятся и вернутся
                                    на ваш счет. Вам для этого ничего делать не потребуется. Если деньги уже
                                    списались с вашего счета, то при отмене заказа деньги вернутся в течение 3-10
                                    рабочих дней в зависимости от банка.

                                </LoyaltyFAQ>
                                <LoyaltyFAQ title={'Правила возврата средств при частичной отмене заказа'}>
                                    В большинстве случаев средства при оплате не списываются, а замораживаются на
                                    вашем счете и списываются лишь после окончательного подтверждения заказа. Если
                                    нам не удастся подтвердить заказ частично, то часть денег, которая подлежит
                                    возврату, моментально разморозится и вернется на ваш счет. Вам для этого ничего
                                    делать не потребуется. Если деньги уже списались с вашего счета, то при
                                    частичной отмене заказа часть денег вернется в течение 3-10 рабочих дней в
                                    зависимости от банка.
                                    <br/>
                                    Оплата за ту часть заказа, которая успешна подтверждена, будет списана с вашего
                                    счета.
                                </LoyaltyFAQ>
                                <LoyaltyFAQ title={'Возможна ли оплата криптовалютой?'}>
                                    На сайте не предусмотрена оплата криптовалютой. В Российской Федерации запрещено
                                    принимать цифровые деньги.
                                </LoyaltyFAQ>
                            </div>


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
                                    Если вам пришёл поврежденный или несоответствующий заказу товар, откажитесь от
                                    него при получении и свяжитесь с нами для выяснения обстоятельств и
                                    урегулирования вопроса. Также мы настоятельно рекомендуем снимать процесс
                                    вскрытия товара, чтобы избежать
                                    недопониманий!
                                    <ul>
                                        <li>Попросите у сотрудника «акт несоответствия», заполните его и
                                            сфотографируйте.
                                        </li>
                                        <li>Верните товар сотруднику службы доставки и приложите к нему акт.</li>
                                        <li>Незамедлительно напишите нам в службу поддержки по электронному
                                            адресу <a href={'mailto:customerservice@sellout.su'}
                                                      className={'text-black'}>customerservice@sellout.su</a>,
                                            прикрепите к письму фотографию акта несоответствия и укажите проблему.
                                        </li>
                                        <li>Проверка заявления и возврат денежных средств осуществляются в срок до
                                            10 календарных дней с момента отказа от товара при получении.
                                        </li>
                                    </ul>
                                </LoyaltyFAQ>
                                <LoyaltyFAQ title={'Что делать с неподошедшим товаром?'}>
                                    Мы искренне стараемся помочь вам в такой ситуации, поэтому обязательно напишите
                                    нам, если вам не подошел товар. Мы попробуем продать его через нашу платформу и
                                    иные каналы продажи на особых условиях для вас, и, возможно, вам даже удастся
                                    заработать!

                                </LoyaltyFAQ>
                                <LoyaltyFAQ title={'Можно ли вернуть только часть заказа?'}>
                                    На частичный возврат товаров распространяются точно такие же правила, как и
                                    описано выше.
                                </LoyaltyFAQ>
                                <LoyaltyFAQ title={'Как быстро вернутся деньги за возврат?'}>
                                    В большинстве случаев средства при оплате не списываются, а замораживаются на
                                    вашем счете и списываются лишь после окончательного подтверждения заказа. Если
                                    нам не удастся подтвердить заказ или придется его вернуть, то деньги моментально
                                    разморозятся и вернутся на ваш счет. Вам для этого ничего делать не потребуется.
                                    Если деньги уже списались с вашего счета, то при отмене или возврате заказа
                                    деньги вернутся в течение 3-10 рабочих дней в зависимости от банка.

                                </LoyaltyFAQ>
                                <LoyaltyFAQ title={'Можно ли отказаться от заказа до его получения?'}>
                                    Это возможно только в том случае, если заказ еще не был подтвержден и передан в
                                    обработку. Сообщите о своем желании отказаться от заказа как можно скорее на
                                    нашу почту <a href={'mailto:customerservice@sellout.su'}
                                                  className={'text-black'}>customerservice@sellout.su</a>
                                </LoyaltyFAQ>
                            </div>
                            <h5>Ответы на большинство вопросов вы найдете здесь: <Link href={'/faq'}
                                                                                       className={s.link}
                                                                                       target={'_blank'}>FAQ</Link>
                            </h5>

                        </TextModal>


                        <div style={{fontSize: 21, fontWeight: 500, marginTop: 20}}>
                            Остались вопросы?
                        </div>
                        <div>
                            <Link href="/faq" className={s.footer_link} target={'_blank'}>Ответы на большинство: <span
                                style={{textDecoration: "underline", textUnderlineOffset: 4}}>FAQ</span></Link>
                        </div>
                        <div className={s.footer_link}>
                    <span
                        onClick={toggleContact}
                    >Контакты службы поддержки</span>
                        </div>


                    </>
                }
                <Row className={'w-100'}>
                    <Col lg={4}>
                        <div className={s.social_media2}>
                            <h4 className={s.row2} style={desktopStore.isDesktop ? {} : {fontSize: 24}}>Мы в социальных
                                сетях:</h4>
                            <div className={s.icons_block3}>
                                <div className={s.socialsCont}>
                                    <a>
                                        <Image src={igWhite} height={desktopStore.isDesktop ? 33 : 35} alt=""
                                               className={s.icon}/>
                                    </a>
                                    <span className={s.mainSocialsText2}>
                                      Запретграм: <br/> @sellout_platform
                                </span>
                                </div>
                                <div className={s.socialsCont}>
                                    <a href={'https://t.me/selloutsu'}>
                                        <Image src={tg} height={desktopStore.isDesktop ? 33 : 35} alt=""
                                               className={s.icon}/>
                                    </a>
                                    <span className={s.mainSocialsText2}>
                                      Телеграм: <br/>
                                      @<a href="https://t.me/selloutsu" className={s.linkTgSocials2}>
                                        selloutsu
                                      </a>
                                </span>
                                </div>

                            </div>
                        </div>
                    </Col>
                    <Col lg={8}>
                        <h4 className={s.row2}>Получите доступ к уникальным предложениям и
                            акциям:</h4>
                        <MailingInput/>
                    </Col>
                </Row>
            </div>


            <hr/>
            <div className={'custom_cont'}>
                <div className={s.footer_bottom}>
                    <div>
                        <p className={s.footer_text}>&#9400; SELLOUT - Интернет-магазин обуви, одежды и аксессуаров,
                            2024</p>
                    </div>
                    <div className={s.footer_bottom}>
                        <a href="/docs/Агентский%20договор%20SELLOUT.pdf" target={"_blank"}
                           className={s.dark_links}>
                            Агентский договор</a>
                        <a href="/docs/Пользовательское_соглашение_SELLOUT.pdf" target={"_blank"}
                           className={s.dark_links}>
                            Пользовательское соглашение</a>
                        <a href="/docs/Политика%20конфиденциальности.pdf" target={"_blank"}
                           className={s.dark_links}>
                            Политика конфиденциальности</a>
                    </div>
                </div>
                {textData ? (
                    <div>
                        {/*<hr/>*/}
                        <br/>
                        <div className={'keywords-block'}>

                            <h6>{textData.title}</h6>
                            <p>{textData.description}</p></div>
                    </div>
                ) : ""}
                <div className={s.payment_block}>
                    <Image src={mastercard} alt=''/>
                    <Image src={visa} alt=''/>
                    <Image src={mir} alt=''/>
                    {/*<Image src={payKeeper} alt='' height={14}/>*/}
                </div>
            </div>

            <ContactModal isOpen={contactOpen} handleClose={closeContact}/>
            <HowWeWorkModal show={howOpen} onHide={closeHow}/>

        </footer>
    );
};

export default Footer;