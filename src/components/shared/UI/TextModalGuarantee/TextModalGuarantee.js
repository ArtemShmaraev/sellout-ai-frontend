import React, {useContext, useEffect, useState} from 'react';
import s from './TextModalGuarantee.module.css'
import {Modal} from "react-bootstrap";
import close from "@/static/icons/x-lg.svg";
import Image from 'next/image'
import {Context} from "@/context/AppWrapper";
import warranty from "@/static/icons/warranty.svg";
import shield from "@/static/icons/shield-check 1.svg";
import Link from "next/link";
import igBlack from "@/static/icons/igImg.svg";
import tgBlack from "@/static/icons/tg_black.svg";
import patch from "@/static/icons/patch-check 1.svg";
import personCheck from "@/static/icons/person-check 1.svg";
import file from "@/static/icons/file-earmark-check 1.svg";
import creditCard from "@/static/icons/credit-card 2.svg";
import LoyaltyFAQ from "@/components/pages/account/LoyaltyFAQ/LoyaltyFAQ";
import imgUs3 from "@/static/img/Гарантии 1.png";
import imgUs4 from "@/static/img/гарантии 2.png";
import imgUs5 from "@/static/img/Гарантии 3.png";
import imgUs6 from "@/static/img/Гарантии 4.png";
import imgUs7 from "@/static/img/Гарантии 5.png";
import imgUs8 from "@/static/img/Гарантии 6.png";
import TextModal from "@/components/shared/UI/TextModal/TextModal";
import {desktopStore} from "@/store/DesktopStore";
import imgUs4Mob from "@/static/img/Гарантии 1 mob.png";
import imgUs5Mob from "@/static/img/Гарантии 2 mob.png";
import imgUs6Mob from "@/static/img/Гарантии 3 mob.png";
import imgUs7Mob from "@/static/img/Гарантии 4 mob.png";
import imgUs8Mob from "@/static/img/Гарантии 5 mob.png";
import imgUs9Mob from "@/static/img/Гарантии 6 mob.png";
import imgUs10Mob from "@/static/img/Гарантии 7 mob.png";
import imgUs11Mob from "@/static/img/Гарантии 8 mob.png";

const TextModalGuarantee = ({titleClassname, title}) => {
    return (
        <TextModal title={title} img={warranty}
                   titleClassname={titleClassname}>
            {desktopStore.isDesktop ?
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
                :
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
            }

        </TextModal>
    );
};

export default TextModalGuarantee;