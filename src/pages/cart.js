import React, {useContext, useEffect, useState} from 'react';
import s from '@/styles/Cart.module.css'
import MainLayout from "@/layout/MainLayout";
import CartItem from "@/components/pages/cart/CartItem/CartItem";
import {useRouter} from "next/router";
import {parse} from "cookie";
import {
    fetchCart,
    fetchCart2,
    fetchCartPrice,
    fetchProductUnits,
    promoAuth,
    promoUnauth,
    useBonuses
} from "@/http/cartApi";
import {Context} from "@/context/AppWrapper";
import AuthModal from "@/components/shared/AuthModal/AuthModal";
import PromoInput from "@/components/pages/cart/PromoInput/PromoInput";
import jwtDecode from "jwt-decode";
import {observer} from "mobx-react-lite";
import Cookies from "js-cookie";
import Head from "next/head";
import Link from "next/link";
import {fetchUserInfo} from "@/http/userApi";
import how from "@/static/icons/question-circle.svg";
import change from "@/static/icons/arrow-down-up.svg";
import gift from "@/static/icons/gift.svg";
import TextModal from "@/components/shared/UI/TextModal/TextModal";
import gift_gard from '@/static/icons/gift-gard.svg'
import smile from '@/static/icons/emoji-smile 1.svg'
import first from '@/static/icons/first.svg'
import good from '@/static/icons/good.svg'
import friend from '@/static/icons/friend.svg'
import birth from '@/static/icons/happybirthday.svg'
import Image from "next/image";
import LoyaltyFAQ from "@/components/pages/account/LoyaltyFAQ/LoyaltyFAQ";
import headphones from "@/static/icons/headphones-circle.svg";
import tg from "@/static/icons/tg_black.svg";
import vk from "@/static/icons/vk_black.svg";
import map from '@/static/img/map.jpg'


export const getServerSideProps = async (context) => {
    const cookies = parse(context.req.headers.cookie || '')
    const token = cookies['access_token']
    let productUnits
    let maxBonuses
    let cartArr = []
    if (cookies.cart) {
        cartArr = cookies['cart'].trim().split(' ')
    }
    if (cookies['cart']) {
        const obj = {
            product_unit_list: cartArr
        }
        const res = await fetchProductUnits(JSON.stringify(obj), token)
        productUnits = {product_units: res}
    } else {
        productUnits = {product_units: []}
    }
    let defaultPrice
    let finalPrice
    let sale
    let userData = {}
    let defaultPromo
    let firstOrder = 0
    if (token) {
        const {user_id} = jwtDecode(token)
        const cart = await fetchCart(user_id, context.req.headers.cookie)
        console.log(cart)
        defaultPrice = cart.total_amount
        finalPrice = cart.final_amount
        sale = cart.total_sale
        productUnits = cart
        maxBonuses = cart.bonus
        firstOrder = cart.first_order_bonus
        userData = await fetchUserInfo(context.req.headers.cookie, user_id)
        defaultPromo = cart.promo_code ? cart.promo_code.string_representation : ''
    } else {
        const res = await fetchCartPrice(cartArr)
        defaultPrice = res.total_amount
        finalPrice = defaultPrice
        maxBonuses = res.bonus
        sale = 0
        defaultPromo = ''
        const promoStr = cookies['promo']
        if (promoStr) {
            defaultPromo = promoStr
        }
    }
    return { props: {productUnits, defaultPrice, finalPrice, sale, userData, maxBonuses, defaultPromo, firstOrder} }
}
const Cart = ({productUnits, defaultPrice, finalPrice, sale, userData, maxBonuses, defaultPromo, firstOrder}) => {
    const router = useRouter()
    const {userStore, cartStore} = useContext(Context)
    const [promo, setPromo] = useState(defaultPromo)
    const [bonuses, setBonuses] = useState(Number(productUnits.bonus_sale) > 0 ? productUnits.bonus_sale : '')
    const [defAmount, setDefAmount] = useState(defaultPrice)
    const [finAmount, setFinAmount] = useState(finalPrice)
    const [saleAmount, setSaleAmount] = useState(sale)
    const [promoRes, setPromoRes] = useState(null)
    const [willBonuses, setWillBonuses] = useState(maxBonuses)
    useEffect(() => {
        const checkIsBot = () => {
            const userAgent = window.navigator.userAgent;
            const botRegex = /bot|crawler|spider|googlebot|/i;
            return botRegex.test(userAgent)
        }
        let intervalId
        const updatePrices = async () => {
            const token = Cookies.get('access_token')
            if (!productUnits.actual_platform_price && token) {
                const {user_id} = jwtDecode(token)
                const interval = setInterval(async () => {
                    const cart = await fetchCart2(user_id, token)
                    console.log(cart.actual_platform_price)
                    //TODO log
                    if (cart.actual_platform_price) {
                        clearInterval(interval)
                        router.push('/cart')
                    }

                }, 4000)
                intervalId = interval


                return () => clearInterval(interval)
            }
        }
        updatePrices()
        return () => clearInterval(intervalId)
    }, [])
    useEffect(() => {
        cartStore.setCartCnt(productUnits.product_units.length)
        setDefAmount(defaultPrice)
        setFinAmount(finalPrice)
        setSaleAmount(sale)
        setWillBonuses(maxBonuses)
        const promo = Cookies.get('promo')
        const token = Cookies.get('access_token')
        if (promo && !token) {
            const cartArr = Cookies.get('cart').trim().split(' ')
            const res = promoUnauth(promo, cartArr).then(res => {
                if (res.status) {
                    setFinAmount(res.final_amount)
                    setSaleAmount(res.total_sale)
                }
                setPromoRes(res)
            })
        }
    }, [Cookies.get('cart'), productUnits]);

    const sendPromo = async (e) => {
        e.preventDefault()
        const token = Cookies.get('access_token')
        let res
        if (userStore.isLogged) {
            res = await promoAuth(promo, userStore.id, token)
            setFinAmount(res.final_amount)
            setSaleAmount(res.total_sale)
            router.push('/cart', undefined, {scroll: false})
        } else {
            const cartArr = Cookies.get('cart').trim().split(' ')
            res = await promoUnauth(promo, cartArr)
            Cookies.set('promo', promo, {expires: 2772})
        }
        if (res.status) {
            setFinAmount(res.final_amount)
            setSaleAmount(res.total_sale)
        }
        setPromoRes(res)
    }
    const changeBonuses = (value) => {
        const maxBonuses = userData.bonuses.total_amount
        if (Number(value) <= Number(maxBonuses)) {
            setBonuses(value)
        }
    }
    const spendBonuses = async (e) => {
        e.preventDefault()
        const token = Cookies.get('access_token')
        const res = await useBonuses(bonuses, token)
        setFinAmount(res.final_amount)
        setSaleAmount(res.total_sale)
    }
    const [checkoutErr, setCheckoutErr] = useState('')
    const goToCheckout = () => {
        if (cartStore.isShipChosen) {
            setCheckoutErr('')
            router.push('/order')
        } else {
            setCheckoutErr('Пожалуйста, выберите доставку для всех товаров')
        }
    }
    const [isUpdate, setIsUpdate] = useState(false)
    useEffect(() => {
        if (productUnits.is_update) {
            setIsUpdate(true)
        }
    }, [productUnits])
    const [isDesktop, setIsDesktop] = useState(true)
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
        <MainLayout>
            <Head>
                <title>Корзина</title>
            </Head>
            <div className={s.cont + ' custom_cont'}>
                <div className={s.title_block}>
                    <h3>Корзина</h3>
                    <Link href={'/products'}
                       className={s.cart_link}
                    >Продолжить покупки</Link>
                </div>
                <div>
                    <div>
                        {!(productUnits.product_units.length) && 'Твоя корзина пуста.'}
                        {!userStore.isLogged &&
                            <div className={s.login_block}>
                                <AuthModal>
                                    <div className={s.text_underline}>Войдите или зарегистрируйтесь,&nbsp;</div>
                                </AuthModal>
                                чтобы Ваша корзина сохранялась, а также получать специальные предложения и бонусы.
                            </div>
                        }
                    </div>
                    {!(productUnits.product_units.length) &&
                        <Link
                            href={'/products'}
                            className={s.shop_button}
                        >За покупками</Link>
                    }
                </div>
                {
                    productUnits.product_units.length > 0 &&
                    <div className={s.main_block}>
                        <div className={s.items_block}>
                            {
                                productUnits.product_units.map((el, ind) =>
                                    <CartItem model={el.product.model}
                                              colorway={el.product.colorway}
                                              brand={el.product.collab?.name ? el.product.collab.name : el.product.brands[0].name}
                                              price={el.price.final_price}
                                              productId={el.product.id}
                                              unitId={el.id}
                                              sizeId={el.view_size_platform}
                                              cardId={ind}
                                              imgSrc={el.product.bucket_link[0].url}
                                              slug={el.product.slug}
                                              inWL={el.product.in_wishlist}
                                              product={el.product}
                                              available={el.availability}
                                              bonus={el.price.bonus}
                                              key={el.id}
                                    />
                                )
                            }
                        </div>
                        <div className={s.promos_block}>
                            <h4>Ваш заказ:</h4>
                            <p>Cтоимость: {defAmount} ₽</p>
                            <PromoInput placeholder={'Введите промокод'}
                                        onChange={(e) => setPromo(e.target.value)}
                                        value={promo}
                                        onClick={(e) => sendPromo(e)}
                            />
                            {
                                promoRes &&
                                <p className={promoRes.status ? s.green_text : s.red_text}>
                                    {promoRes.message}
                                </p>
                            }
                            {
                                userStore.isLogged &&
                                <PromoInput placeholder={`Списать бонусы (Доступно: ${userData.bonuses.total_amount})`}
                                            onChange={(e) => changeBonuses(e.target.value)}
                                            value={bonuses}
                                            onClick={e => spendBonuses(e)}
                                />
                            }
                            {
                                Number(firstOrder) > 0 && <p className={'mt-2 mb-0'}>Подарок за первый заказ: {1000} ₽</p>
                            }
                            {
                                Number(willBonuses) > 0 && <p className={'mt-2 mb-0'}>Всего будет начислено бонусов: {willBonuses} ₽</p>
                            }
                            {
                                Number(saleAmount) > 0 && <p className={'my-0'}>Суммарная скидка: {saleAmount} ₽</p>
                            }
                            <hr/>
                            <p className={s.big_text}>Промежуточный итог: {finAmount} ₽</p>
                            {
                                userStore.isLogged
                                    ?
                                    <button className={s.order_btn}
                                            onClick={goToCheckout}
                                    >Перейти к оформлению заказа</button>
                                    :
                                    <AuthModal order={true} style={{width: '100%'}}>
                                        <div className={s.order_btn}
                                        >Перейти к оформлению заказа</div>
                                    </AuthModal>
                            }
                            {
                                checkoutErr &&
                                <p className={s.red_text}>
                                    {checkoutErr}
                                </p>
                            }
                            {
                                isUpdate &&
                                <p className={s.red_text}>
                                    Внимание! Ваше корзина обновилась
                                </p>
                            }
                            {isDesktop &&
                                <div className={s.questions_block}>
                                    <TextModal title={'Почему изменилась цена или модель оказалась распроданной?'} img={change}>
                                        <Image src={change} alt='' width={60}/>
                                        <h4 className={'my-3'}>Почему изменилась цена или модель оказалась распроданной?</h4>
                                        <div className={s.img_cont}>
                                            <Image src={map} alt='' className={s.img} fill={true}/>
                                        </div>
                                        <p className={s.text}>
                                            Многие представленные модели являются лимитированными и находятся в наличии в ограниченном количестве, поэтому может произойти такое, что кто-то другой купит эту позицию и данное ценовое предложение перестанет быть доступным. Мы собираем десятки миллионов предложений со всего мира, поэтому даже в короткие промежутки времени цена может меняться. В том числе на цену могут сказываться прочие внешние факторы, не зависящие от нас, такие как курс, стоимость доставки и многое другое.

                                        </p>
                                        <div className={s.faq_block}>
                                            <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                                            <LoyaltyFAQ title={'После чего цена меняться не будет?'}>
                                                После того, как Вы оформите заказ, цена для Вас будет зафиксирована и никаким изменениям не подлежит. Добавление товара в корзину или избранное, к сожалению, не позволяет нам зафиксировать цену по объективным причинам. Мы стараемся в каждый момент времени предлагать Вам наилучшую цену из возможных и делать Ваш шопинг с нами еще более удобным и выгодным, поэтому не откладывайте Ваши покупки на потом, чтобы не упустить приятные цены!

                                            </LoyaltyFAQ>
                                            <LoyaltyFAQ title={'Как часто могут меняться цены?'}>
                                                Цена может не меняться как на протяжении долгого времени, так и постоянно оставаться волатильной. Она может как повыситься, так и понизиться. Вскоре мы добавим возможность следить за изменением цен, а также получать уведомления о появлении более выгодного предложения на интересующий Вас лот!

                                            </LoyaltyFAQ>
                                            <LoyaltyFAQ title={'Почему модель оказалась распроданной?'}>
                                                Так как многие размещенные на нашей платформе лоты являются коллекционными и редкими, может произойти такое, что какой-то конкретный размер или вся модель пропадет из наличия, поэтому не откладывайте свои покупки, чтобы успеть приобрести желанную модель!

                                            </LoyaltyFAQ>
                                        </div>
                                        <h5>Ответы на большинство вопросов Вы найдете здесь: <Link href={'/faq'} className={s.link}>FAQ</Link></h5>
                                    </TextModal>
                                    <TextModal title={'Бонусы'} img={gift}>
                                        <Image src={gift_gard} alt='' width={80}/>
                                        <h4 className={'my-3'}>Получайте бонусы</h4>
                                        <div className={'d-flex justify-content-evenly'}>
                                            <div className={s.point_block}>
                                                <Image src={first} alt='' width={60}/>
                                                <div>за первый заказ</div>
                                                <div className={s.line}/>
                                                1000 ₽
                                            </div>
                                            <div className={s.point_block}>
                                                <Image src={good} alt='' width={60}/>
                                                <div>за каждый товар</div>
                                                <div className={s.line}/>
                                                до 1500 ₽
                                            </div>
                                        </div>
                                        <div className={'d-flex justify-content-evenly'}>
                                            <div className={s.point_block}>
                                                <Image src={friend} alt='' width={60}/>
                                                <div>за приглашенного друга</div>
                                                <div className={s.line}/>
                                                до 3000 ₽
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
                                            Мы стараемся всячески благодарить Вас за покупки на платформе SELLOUT, поэтому за каждую совершенную покупку мы будем начислять Вам бонусы в соответствии с Вашим статусом. Конкретное число бонусов за каждый товар Вы сможете увидеть на странице товара, а также в корзине. Также мы дарим 1000 бонусных рублей за первую покупку и на Ваш день рождения и регулярно начисляем бонусы в честь различных праздников!

                                        </p>
                                        <div className={s.faq_block}>
                                            <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                                            <LoyaltyFAQ title={'Чему равны бонусы?'}>
                                                Каждый один бонус приравнивается к одному рублю! Вы можете оплачивать до 100% заказа, тем самым сводя стоимость заказа к нулю!

                                            </LoyaltyFAQ>
                                            <LoyaltyFAQ title={'Как воспользоваться бонусами?'}>
                                                Чтобы оплатить заказ целиком или частично бонусами, в корзине или на любом этапе оформления заказа введите количество бонусов, которое хотите списать, и скидка будет автоматически применена!
                                            </LoyaltyFAQ>
                                            <LoyaltyFAQ title={'Как быстро после совершения покупки начисляются бонусы?'}>
                                                Обратите внимание, бонусы на Ваш баланс будут начислены не сразу, а по прошествии некоторого времени. Нам требуется обработать заказ, подтвердить корректность всех данных и после этого начислить бонусы. Если Вы считаете, что бонусы слишком долго не начисляются и произошла какая-то ошибка, обязательно напишите нам и мы Вам поможем!

                                            </LoyaltyFAQ>
                                            <LoyaltyFAQ title={'Как получить бонусы по реферальной программе, приглашая друзей?'}>
                                                Реферальная программа - это специальная возможность для Вас поделиться удовлетворением от покупок с друзьями и получить взамен уникальные бонусы размером до 6000₽! Просто пригласите своих знакомых стать частью нашего сообщества, и вы оба сможете наслаждаться эксклюзивными преимуществами, такими как скидки и бонусы, созданными специально для участников нашей реферальной программы. Благодарим за доверие и Ваш вклад в наше расширяющееся сообщество! Подробнее про реферальную программу
                                                смотрите <Link href={'/faq'} style={{color: 'inherit'}}>здесь</Link>
                                            </LoyaltyFAQ>
                                        </div>

                                        <div className={s.faq_block}>
                                            <h5 className={`text-center ${s.questions_text}`}>Ответы на большинство вопросов
                                                Вы найдете здесь: <Link href={'/faq'} className={'text-black'}>FAQ</Link></h5>
                                            <h5 className={`text-center ${s.questions_text}`}>Если у Вас остались вопросы, Вы всегда
                                                можете обратиться в службу поддержки и мы будем
                                                рады Вам помочь!</h5>
                                        </div>
                                    </TextModal>
                                    <TextModal title={'Остались вопросы?'} img={how}>
                                        <div className={s.content}>
                                            <Image src={headphones} alt='' width={60}/>
                                            <div className={s.text_cont}>
                                                <h5>Вы всегда можете написать в службу поддержки и мы будем рады вам помочь</h5>
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
                                                <div className={s.faq_block}>
                                                    <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                                                    <LoyaltyFAQ title={'Нужно ли авторизовываться в аккаунт для совершения заказа?'}>
                                                        Да, для оформления заказа требуется либо войти в свой аккаунт, либо создать новый, а также подтвердить свою почту. Благодаря этому Вы всегда сможете с легкостью отслеживать статусы заказов в личном кабинете, а также Вы точно не перепутаете указанные данные и мы всегда сможем связаться с Вами!

                                                    </LoyaltyFAQ>
                                                    <LoyaltyFAQ title={'Почему не работает промокод?'}>
                                                        Пожалуйста, убедитесь, что Вы выполнили все условия для применения промокода и время действия промокода еще не закончилось. Зачастую промокоды выдаются на первую покупку или на покупки от определенной суммы, проверьте, что Вы вошли в правильный аккаунт. Если Вы все же считаете, что произошла какая-то ошибка, напишите нам в службу поддержки, и мы обязательно поможем Вам разобраться в ситуации!

                                                    </LoyaltyFAQ>
                                                </div>
                                                <h5>Ответы на большинство вопросов Вы найдете здесь: <Link href={'/faq'} className={s.link}>FAQ</Link></h5>
                                                <div>
                                                    <h5>Мы в социальных сетях:</h5>
                                                    <div className={s.icons_block}>
                                                        <a href={''}>
                                                            <Image src={tg} width={50} alt="" className={s.icon}/>
                                                        </a>
                                                        <a href={''}>
                                                            <Image src={vk} width={63} alt="" className={s.icon}/>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TextModal>
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>
            {!isDesktop &&
                <div className={s.questions_block}>
                    <TextModal title={'Почему изменилась цена или модель оказалась распроданной?'} img={change}>
                        <Image src={change} alt='' width={60}/>
                        <h4 className={'my-3'}>Почему изменилась цена или модель оказалась распроданной?</h4>
                        <div className={s.img_cont}>
                            <Image src={map} alt='' className={s.img} fill={true}/>
                        </div>
                        <p className={s.text}>
                            Многие представленные модели являются лимитированными и находятся в наличии в ограниченном количестве, поэтому может произойти такое, что кто-то другой купит эту позицию и данное ценовое предложение перестанет быть доступным. Мы собираем десятки миллионов предложений со всего мира, поэтому даже в короткие промежутки времени цена может меняться. В том числе на цену могут сказываться прочие внешние факторы, не зависящие от нас, такие как курс, стоимость доставки и многое другое.

                        </p>
                        <div className={s.faq_block}>
                            <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                            <LoyaltyFAQ title={'После чего цена меняться не будет?'}>
                                После того, как Вы оформите заказ, цена для Вас будет зафиксирована и никаким изменениям не подлежит. Добавление товара в корзину или избранное, к сожалению, не позволяет нам зафиксировать цену по объективным причинам. Мы стараемся в каждый момент времени предлагать Вам наилучшую цену из возможных и делать Ваш шопинг с нами еще более удобным и выгодным, поэтому не откладывайте Ваши покупки на потом, чтобы не упустить приятные цены!

                            </LoyaltyFAQ>
                            <LoyaltyFAQ title={'Как часто могут меняться цены?'}>
                                Цена может не меняться как на протяжении долгого времени, так и постоянно оставаться волатильной. Она может как повыситься, так и понизиться. Вскоре мы добавим возможность следить за изменением цен, а также получать уведомления о появлении более выгодного предложения на интересующий Вас лот!

                            </LoyaltyFAQ>
                            <LoyaltyFAQ title={'Почему модель оказалась распроданной?'}>
                                Так как многие размещенные на нашей платформе лоты являются коллекционными и редкими, может произойти такое, что какой-то конкретный размер или вся модель пропадет из наличия, поэтому не откладывайте свои покупки, чтобы успеть приобрести желанную модель!

                            </LoyaltyFAQ>
                        </div>
                        <h5>Ответы на большинство вопросов Вы найдете здесь: <Link href={'/faq'} className={s.link} target={'_blank'}>FAQ</Link></h5>
                    </TextModal>
                    <TextModal title={'Бонусы'} img={gift}>
                        <Image src={gift_gard} alt='' width={80}/>
                        <h4 className={'my-3'}>Получайте бонусы</h4>
                        <div className={'d-flex justify-content-evenly'}>
                            <div className={s.point_block}>
                                <Image src={first} alt='' width={60}/>
                                <div>за первый заказ</div>
                                <div className={s.line}/>
                                1000 ₽
                            </div>
                            <div className={s.point_block}>
                                <Image src={good} alt='' width={60}/>
                                <div>за каждый товар</div>
                                <div className={s.line}/>
                                до 1500 ₽
                            </div>
                        </div>
                        <div className={'d-flex justify-content-evenly'}>
                            <div className={s.point_block}>
                                <Image src={friend} alt='' width={60}/>
                                <div>за приглашенного друга</div>
                                <div className={s.line}/>
                                до 3000 ₽
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
                            Мы стараемся всячески благодарить Вас за покупки на платформе SELLOUT, поэтому за каждую совершенную покупку мы будем начислять Вам бонусы в соответствии с Вашим статусом. Конкретное число бонусов за каждый товар Вы сможете увидеть на странице товара, а также в корзине. Также мы дарим 1000 бонусных рублей за первую покупку и на Ваш день рождения и регулярно начисляем бонусы в честь различных праздников!

                        </p>
                        <div className={s.faq_block}>
                            <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                            <LoyaltyFAQ title={'Чему равны бонусы?'}>
                                Каждый один бонус приравнивается к одному рублю! Вы можете оплачивать до 100% заказа, тем самым сводя стоимость заказа к нулю!

                            </LoyaltyFAQ>
                            <LoyaltyFAQ title={'Как воспользоваться бонусами?'}>
                                Чтобы оплатить заказ целиком или частично бонусами, в корзине или на любом этапе оформления заказа введите количество бонусов, которое хотите списать, и скидка будет автоматически применена!
                            </LoyaltyFAQ>
                            <LoyaltyFAQ title={'Как быстро после совершения покупки начисляются бонусы?'}>
                                Обратите внимание, бонусы на Ваш баланс будут начислены не сразу, а по прошествии некоторого времени. Нам требуется обработать заказ, подтвердить корректность всех данных и после этого начислить бонусы. Если Вы считаете, что бонусы слишком долго не начисляются и произошла какая-то ошибка, обязательно напишите нам и мы Вам поможем!

                            </LoyaltyFAQ>
                            <LoyaltyFAQ title={'Как получить бонусы по реферальной программе, приглашая друзей?'}>
                                Реферальная программа - это специальная возможность для Вас поделиться удовлетворением от покупок с друзьями и получить взамен уникальные бонусы размером до 6000₽! Просто пригласите своих знакомых стать частью нашего сообщества, и вы оба сможете наслаждаться эксклюзивными преимуществами, такими как скидки и бонусы, созданными специально для участников нашей реферальной программы. Благодарим за доверие и Ваш вклад в наше расширяющееся сообщество! Подробнее про реферальную программу
                                смотрите <Link href={'/faq'} style={{color: 'inherit'}}>здесь</Link>
                            </LoyaltyFAQ>
                        </div>

                        <div className={s.faq_block}>
                            <h5 className={`text-center ${s.questions_text}`}>Ответы на большинство вопросов
                                Вы найдете здесь: <Link href={'/faq'} className={'text-black'} target={'_blank'}>FAQ</Link></h5>
                            <h5 className={`text-center ${s.questions_text}`}>Если у Вас остались вопросы, Вы всегда
                                можете обратиться в службу поддержки и мы будем
                                рады Вам помочь!</h5>
                        </div>
                    </TextModal>
                    <TextModal title={'Остались вопросы?'} img={how}>
                        <div className={s.content}>
                            <Image src={headphones} alt='' width={60}/>
                            <div className={s.text_cont}>
                                <h5>Вы всегда можете написать в службу поддержки и мы будем рады вам помочь</h5>
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
                                <div className={s.faq_block}>
                                    <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                                    <LoyaltyFAQ title={'Нужно ли авторизовываться в аккаунт для совершения заказа?'}>
                                        Да, для оформления заказа требуется либо войти в свой аккаунт, либо создать новый, а также подтвердить свою почту. Благодаря этому Вы всегда сможете с легкостью отслеживать статусы заказов в личном кабинете, а также Вы точно не перепутаете указанные данные и мы всегда сможем связаться с Вами!

                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Почему не работает промокод?'}>
                                        Пожалуйста, убедитесь, что Вы выполнили все условия для применения промокода и время действия промокода еще не закончилось. Зачастую промокоды выдаются на первую покупку или на покупки от определенной суммы, проверьте, что Вы вошли в правильный аккаунт. Если Вы все же считаете, что произошла какая-то ошибка, напишите нам в службу поддержки, и мы обязательно поможем Вам разобраться в ситуации!

                                    </LoyaltyFAQ>
                                </div>
                                <h5>Ответы на большинство вопросов Вы найдете здесь: <Link href={'/faq'} className={s.link} target={'_blank'}>FAQ</Link></h5>
                                <div>
                                    <h5>Мы в социальных сетях:</h5>
                                    <div className={s.icons_block}>
                                        <a href={''}>
                                            <Image src={tg} width={50} alt="" className={s.icon}/>
                                        </a>
                                        <a href={''}>
                                            <Image src={vk} width={63} alt="" className={s.icon}/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TextModal>
                </div>
            }
        </MainLayout>
    );
};

export default observer(Cart);