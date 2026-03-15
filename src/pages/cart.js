import React, {useContext, useEffect, useState} from 'react';
import s from '@/styles/Cart.module.css'
import MainLayout from "@/layout/MainLayout";
import CartItem from "@/components/pages/cart/CartItem/CartItem";
import {useRouter} from "next/router";
import {parse} from "cookie";
import parseHTML from 'html-react-parser'
import {
    fetchCart,
    fetchCart2,
    fetchCartPrice,
    fetchProductUnits,
    promoAuth,
    promoUnauth, updateCart2,
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
import {fetchLastSeen2, fetchUserInfo} from "@/http/userApi";
import how from "@/static/icons/question-circle.svg";
import change from "@/static/icons/arrow-down-up.svg";
import gift from "@/static/icons/gift.svg";
import green_gift from "@/static/icons/gift-green.svg"
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
import inst_star from "@/static/icons/instagram_star.svg";
import Compilation from "@/components/shared/Compilation/Compilation";
import {fetchProductsByArray, fetchSimilarProducts} from "@/http/productsApi";
import igBlack from "@/static/icons/igImg.svg";
import tgBlack from "@/static/icons/tg_black.svg";


export const getServerSideProps = async (context) => {
    const cookies = parse(context.req.headers.cookie || '')
    const token = cookies['access_token']
    let productUnits
    let bonus
    let promoBonus
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
    let bonusSale
    let promoSale
    let totalSale
    let userData = {}
    let defaultPromo
    let firstOrder = 0
    if (token) {
        const {user_id} = jwtDecode(token)
        const cart = await fetchCart(user_id, context.req.headers.cookie)
        defaultPrice = cart.total_amount
        finalPrice = cart.final_amount
        sale = cart.sale
        promoSale = cart.promo_sale
        bonusSale = cart.bonus_sale
        totalSale = cart.total_sale
        productUnits = cart
        bonus = cart.bonus
        promoBonus = cart.promo_bonus
        firstOrder = cart.first_order_bonus
        userData = await fetchUserInfo(context.req.headers.cookie, user_id)
        defaultPromo = cart.promo_code ? cart.promo_code.string_representation : ''
    } else {
        defaultPromo = ''
        const promoStr = cookies['promo']
        if (promoStr) {
            defaultPromo = promoStr
        }
        const res = await fetchCartPrice(cartArr, promoStr)
        defaultPrice = res.total_amount
        finalPrice = res.final_amount
        bonus = res.bonus
        promoBonus = 0
        sale = res.sale
        promoSale = 0
        bonusSale = 0
        totalSale = res.sale
        firstOrder = 1000

    }
    return {
        props: {
            productUnits,
            defaultPrice,
            finalPrice,
            sale,
            bonusSale,
            promoSale,
            totalSale,
            userData,
            bonus,
            promoBonus,
            defaultPromo,
            firstOrder
        }
    }
}
const Cart = ({
                  productUnits,
                  defaultPrice,
                  finalPrice,
                  sale,
                  bonusSale,
                  promoSale,
                  totalSale,
                  userData,
                  bonus,
                  promoBonus,
                  defaultPromo,
                  firstOrder
              }) => {
    const router = useRouter()
    const [lastSeen, setLastSeen] = useState([])
    const {userStore, cartStore, desktopStore} = useContext(Context)
    const [promo, setPromo] = useState(defaultPromo)

    const [defAmount, setDefAmount] = useState(defaultPrice)
    const [finAmount, setFinAmount] = useState(finalPrice)
    const [saleAmount, setSaleAmount] = useState(sale)
    const [promoSaleAmount, setPromoSaleAmount] = useState(promoSale)
    const [bonusSaleAmount, setBonusSaleAmount] = useState(bonusSale)
    const [totalSaleAmount, setTotalSaleAmount] = useState(totalSale)

    const [promoRes, setPromoRes] = useState(null)
    const [bonusAmount, setBonusAmount] = useState(bonus)
    const [promoBonusAmount, setPromoBonusAmount] = useState(promoBonus)
    const [firstOrderBonus, setFirstOrderBonus] = useState(firstOrder)

    const [totalBonus, setTotalBonus] = useState(promoBonus + bonus + firstOrder)

    useEffect(() => {
        const token = Cookies.get('access_token')
        if (token) {
            const {user_id} = jwtDecode(token)
            fetchLastSeen2(token, user_id).then(res => setLastSeen(res))
        } else {
            let arr
            if (Cookies.get('last_seen')) {
                arr = Cookies.get('last_seen').trim().split(' ')
                if (arr[0] !== '') {
                    fetchProductsByArray(arr, token).then(res => setLastSeen(res))
                }
            }
        }
    }, [router.asPath])
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
                    const cart = await updateCart2(user_id, token)
                    console.log(cart.actual_platform_price)
                    //TODO log
                    if (cart.actual_platform_price) {
                        clearInterval(interval)
                        router.push('/cart', undefined, {scroll: false})
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
        setPromoSaleAmount(promoSale)
        setBonusSaleAmount(bonusSale > 0 ? bonusSale : "")
        setTotalSaleAmount(totalSale)
        setBonusAmount(bonus)
        setPromoBonusAmount(promoBonus)
        setFirstOrderBonus(firstOrder)
        setTotalBonus(bonus + promoBonus + firstOrder)
        // setWillPromoBonuses()
        const promo = Cookies.get('promo')
        const token = Cookies.get('access_token')
        // if (promo && !token) {
        //     const cartArr = Cookies.get('cart').trim().split(' ')
        //     const res = promoUnauth(promo, cartArr).then(res => {
        //         if (res.status) {
        //             setFinAmount(res.final_amount)
        //             setSaleAmount(res.total_sale)
        //         }
        //         setPromoRes(res)
        //     })
        // }
        checkPromo()

        // sendPromo(e)

    }, [Cookies.get('cart'), productUnits, Cookies.get('promo')]);

    const checkPromo = async () => {
        const token = Cookies.get('access_token')
        let res
        if (promo) {
            if (userStore.isLogged) {
                res = await promoAuth(promo, userStore.id, token)
                // router.push('/cart', undefined, {scroll: false})
                setFinAmount(Math.max(res.final_amount, 1))
                setTotalSaleAmount(Math.min(res.promo_sale + saleAmount + bonusSaleAmount, defAmount))
                setPromoSaleAmount(res.promo_sale)
                setPromoBonusAmount(res.promo_bonus)
                // setFirstOrderBonus(0)
                if (res.promo_bonus > 0) {
                    setFirstOrderBonus(0)
                }
                setPromoRes(res)
                setBonusAmount(res.bonus)
                setTotalBonus(promoBonusAmount + bonusAmount + firstOrderBonus)

            } else {
                const cartArr = Cookies.get('cart').trim().split(' ')
                res = await promoUnauth(promo, cartArr)

                setFinAmount(Math.max(res.final_amount, 1))
                setTotalSaleAmount(Math.min(res.promo_sale + saleAmount + bonusSaleAmount, defAmount))
                setPromoSaleAmount(res.promo_sale)
                setPromoBonusAmount(res.promo_bonus)
                setFirstOrderBonus(1000)
                if (res.promo_bonus > 0) {
                    setFirstOrderBonus(0)
                }

                setPromoRes(res)
                setBonusAmount(res.bonus)
                setTotalBonus(promoBonusAmount + bonusAmount + firstOrderBonus)
                // router.push('/cart', undefined, {scroll: false})
                // router.push('/cart', undefined, {scroll: false})
            }
        }

    }

    const sendPromo = async (e) => {
        e.preventDefault()
        checkPromo()
    }
    const changeBonuses = (value) => {
        const maxBonuses = userData.bonuses.total_amount
        if (Number(value) <= Number(maxBonuses)) {
            setBonusSaleAmount(Number(value))
        }
    }
    const spendBonuses = async (e) => {
        e.preventDefault()
        const token = Cookies.get('access_token')
        const res = await useBonuses(bonusSaleAmount, token)
        setFinAmount(res.final_amount)
        setBonusSaleAmount(bonusSaleAmount)

        // setSaleAmount(res.total_sale)
        setTotalSaleAmount(bonusSaleAmount + saleAmount + promoSaleAmount)
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

    const addSpacesToNumber = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

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
                                чтобы ваша корзина сохранялась, а также получать специальные предложения и бонусы.
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
                                productUnits.product_units.slice().reverse().map((el, ind) =>
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


                            <div className={s.left_right}>
                                <p className={'mb-0'}>Cтоимость товаров:</p>
                                <p className={s.right_text}>{addSpacesToNumber(defAmount)}₽</p>
                            </div>

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
                                <PromoInput
                                    placeholder={`Списать бонусы (Доступно: ${userData.bonuses.total_amount} ₽)`}
                                    onChange={(e) => changeBonuses(e.target.value)}
                                    value={bonusSaleAmount}
                                    onClick={e => spendBonuses(e)}
                                />
                            }

                            {

                                Number(totalSaleAmount) > 0 &&
                                <div className={s.left_right}>
                                    <p className={'mb-0'}>Скидка: </p>
                                    <p className={s.right_text}>
                                    <span
                                        className={s.bonuses}> -{addSpacesToNumber(totalSaleAmount)}₽</span></p>
                                    {/*<p className={'mb-0'}>-{addSpacesToNumber(saleAmount)}₽</p>*/}
                                </div>
                            }

                            {Number(firstOrderBonus) > 0 &&
                                <div className={s.left_right}>
                                    <p className={'mb-0'}>

                                        Подарок за первый заказ:
                                    </p>
                                    <p className={s.right_text}>
                                        <Image src={green_gift} alt='' className={s.bonus_icon}/>
                                        <span
                                            className={s.bonuses}> {addSpacesToNumber(firstOrderBonus)}₽</span>
                                    </p>
                                </div>
                                // Number(willBonuses) > 0 &&
                                // <p className={'mt-2 mb-0'}>Будет начислено бонусов: {willBonuses} ₽</p>
                            }
                            {!isNaN(Number(totalBonus)) && Number(totalBonus) > 0 &&

                                <div className={s.left_right}>
                                    <p className={'mb-0'}>

                                        Всего будет начислено бонусов:
                                    </p>
                                    <p className={s.right_text}>
                                        <Image src={green_gift} alt='' className={s.bonus_icon}/>
                                        <span
                                            className={s.bonuses}> {addSpacesToNumber(totalBonus)}₽</span>
                                    </p>
                                </div>
                                // Number(willBonuses) > 0 &&
                                // <p className={'mt-2 mb-0'}>Будет начислено бонусов: {willBonuses} ₽</p>
                            }

                            <hr/>
                            <div className={s.left_right}>
                                <p className={s.big_text}>Промежуточный итог: </p>
                                <p className={s.big_text}>{addSpacesToNumber(finAmount)}₽</p>
                            </div>
                            {
                                userStore.isLogged
                                    ?
                                    <button className={s.order_btn}
                                            onClick={goToCheckout}
                                    >Перейти к оформлению заказа</button>
                                    :
                                    <AuthModal order={true} style={{width: '100%'}}>
                                        <div className={s.order_btn}
                                        >Перейти к оформлению заказа
                                        </div>
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
                                    Внимание! Ваша корзина обновилась
                                </p>
                            }
                            {desktopStore.isDesktop &&
                                <div className={s.questions_block}>
                                    <TextModal title={'Почему изменилась цена или модель оказалась распроданной?'}
                                               img={change}>
                                        <Image src={change} alt='' width={60}/>
                                        <h4 className={'my-3'}>Почему изменилась цена или модель оказалась
                                            распроданной?</h4>
                                        <div className={s.img_cont}>
                                            <Image src={map} alt='' className={s.img} fill={true}/>
                                        </div>
                                        <p className={s.text}>
                                            Многие представленные модели являются лимитированными и находятся в наличии
                                            в ограниченном количестве, поэтому может произойти такое, что кто-то другой
                                            купит эту позицию и данное ценовое предложение перестанет быть доступным. Мы
                                            собираем десятки миллионов предложений со всего мира, поэтому даже в
                                            короткие промежутки времени цена может меняться. В том числе на цену могут
                                            сказываться прочие внешние факторы, не зависящие от нас, такие как курс,
                                            стоимость доставки и многое другое.

                                        </p>
                                        <div className={s.faq_block}>
                                            <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                                            <LoyaltyFAQ title={'После чего цена меняться не будет?'}>
                                                После того, как вы оформите заказ, цена для вас будет зафиксирована и
                                                никаким изменениям не подлежит. Добавление товара в корзину или
                                                избранное, к сожалению, не позволяет нам зафиксировать цену по
                                                объективным причинам. Мы стараемся в каждый момент времени предлагать
                                                вам наилучшую цену из возможных и делать ваш шопинг с нами еще более
                                                удобным и выгодным, поэтому не откладывайте ваши покупки на потом, чтобы
                                                не упустить приятные цены!

                                            </LoyaltyFAQ>
                                            <LoyaltyFAQ title={'Как часто могут меняться цены?'}>
                                                Цена может не меняться как на протяжении долгого времени, так и
                                                постоянно оставаться волатильной. Она может как повыситься, так и
                                                понизиться. Вскоре мы добавим возможность следить за изменением цен, а
                                                также получать уведомления о появлении более выгодного предложения на
                                                интересующий вас лот!

                                            </LoyaltyFAQ>
                                            <LoyaltyFAQ title={'Почему модель оказалась распроданной?'}>
                                                Так как многие размещенные на нашей платформе лоты являются
                                                коллекционными и редкими, может произойти такое, что какой-то конкретный
                                                размер или вся модель пропадет из наличия, поэтому не откладывайте свои
                                                покупки, чтобы успеть приобрести желанную модель!

                                            </LoyaltyFAQ>
                                        </div>
                                        <h5>Ответы на большинство вопросов вы найдете здесь: <Link href={'/faq'}
                                                                                                   className={s.link}>FAQ</Link>
                                        </h5>
                                    </TextModal>
                                    <TextModal title={'Бонусы'} img={gift}>
                                        <Image src={gift_gard} alt='' width={80}/>
                                        <h4 className={'my-3'}>Получайте бонусы</h4>
                                        <div className={'d-flex justify-content-evenly'}>
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
                                        <div className={'d-flex justify-content-evenly'}>
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
                                            Мы стараемся всячески благодарить вас за покупки на платформе SELLOUT,
                                            поэтому за каждую совершенную покупку мы будем начислять вам бонусы в
                                            соответствии с вашим статусом. Конкретное число бонусов за каждый товар вы
                                            сможете увидеть на странице товара, а также в корзине. Также мы дарим 1000
                                            бонусных рублей за первую покупку и на ваш день рождения и регулярно
                                            начисляем бонусы в честь различных праздников!

                                        </p>
                                        <div className={s.faq_block}>
                                            <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                                            <LoyaltyFAQ title={'Чему равны бонусы?'}>
                                                Каждый один бонус приравнивается к одному рублю! Вы можете оплачивать до
                                                100% заказа, тем самым сводя стоимость заказа к нулю!

                                            </LoyaltyFAQ>
                                            <LoyaltyFAQ title={'Как воспользоваться бонусами?'}>
                                                Чтобы оплатить заказ целиком или частично бонусами, в корзине или на
                                                любом этапе оформления заказа введите количество бонусов, которое хотите
                                                списать, и скидка будет автоматически применена!
                                            </LoyaltyFAQ>
                                            <LoyaltyFAQ
                                                title={'Как быстро после совершения покупки начисляются бонусы?'}>
                                                Обратите внимание, бонусы на ваш баланс будут начислены не сразу, а по
                                                прошествии некоторого времени. Нам требуется обработать заказ,
                                                подтвердить корректность всех данных и после этого начислить бонусы.
                                                Если вы считаете, что бонусы слишком долго не начисляются и произошла
                                                какая-то ошибка, обязательно напишите нам и мы вам поможем!

                                            </LoyaltyFAQ>
                                            <LoyaltyFAQ
                                                title={'Как получить бонусы по реферальной программе, приглашая друзей?'}>
                                                Реферальная программа - это специальная возможность для вас поделиться
                                                удовлетворением от покупок с друзьями и получить взамен уникальные
                                                бонусы размером до 7000₽! Просто пригласите своих знакомых стать частью
                                                нашего сообщества, и вы оба сможете наслаждаться эксклюзивными
                                                преимуществами, такими как скидки и бонусы, созданными специально для
                                                участников нашей реферальной программы. Благодарим за доверие и ваш
                                                вклад в наше расширяющееся сообщество! Подробнее про реферальную
                                                программу
                                                смотрите <Link href={'/faq'} style={{color: 'inherit'}}>здесь</Link>
                                            </LoyaltyFAQ>
                                        </div>

                                        <div className={s.faq_block}>
                                            <h5 className={`text-center ${s.questions_text}`}>Ответы на большинство
                                                вопросов
                                                вы найдете здесь: <Link href={'/faq'}
                                                                        className={'text-black'}>FAQ</Link></h5>
                                            <h5 className={`text-center ${s.questions_text}`}>Если у вас остались
                                                вопросы, вы всегда
                                                можете обратиться в службу поддержки и мы будем
                                                рады вам помочь!</h5>
                                        </div>
                                    </TextModal>
                                    <TextModal title={'Остались вопросы?'} img={how}>
                                        <div className={s.content}>
                                            <Image src={headphones} alt='' width={60}/>
                                            <div className={s.text_cont}>
                                                <h5>Вы всегда можете написать в службу поддержки и мы будем рады вам
                                                    помочь</h5>
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
                                                    <LoyaltyFAQ
                                                        title={'Нужно ли авторизовываться в аккаунт для совершения заказа?'}>
                                                        Да, для оформления заказа требуется либо войти в свой аккаунт,
                                                        либо создать новый, а также подтвердить свою почту. Благодаря
                                                        этому вы всегда сможете с легкостью отслеживать статусы заказов
                                                        в личном кабинете, а также вы точно не перепутаете указанные
                                                        данные и мы всегда сможем связаться с вами!

                                                    </LoyaltyFAQ>
                                                    <LoyaltyFAQ title={'Почему не работает промокод?'}>
                                                        Пожалуйста, убедитесь, что вы выполнили все условия для
                                                        применения промокода и время действия промокода еще не
                                                        закончилось. Зачастую промокоды выдаются на первую покупку или
                                                        на покупки от определенной суммы, проверьте, что вы вошли в
                                                        правильный аккаунт. Если вы все же считаете, что произошла
                                                        какая-то ошибка, напишите нам в службу поддержки, и мы
                                                        обязательно поможем вам разобраться в ситуации!

                                                    </LoyaltyFAQ>
                                                </div>
                                                <h5>Ответы на большинство вопросов вы найдете здесь: <Link href={'/faq'}
                                                                                                           className={s.link}>FAQ</Link>
                                                </h5>
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
                                            </div>
                                        </div>
                                    </TextModal>
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>
            {desktopStore.isDesktop && lastSeen.length > 0 && (
                <div>
                    <Compilation arr={lastSeen} title={'Ранее просмотренные'} paddings={'regular'}/>
                </div>
            )}
            {!desktopStore.isDesktop &&
                <div className={s.questions_block}>
                    <TextModal title={'Почему изменилась цена или модель оказалась распроданной?'} img={change}>
                        <Image src={change} alt='' width={60}/>
                        <h4 className={'my-3'}>Почему изменилась цена или модель оказалась распроданной?</h4>
                        <div className={s.img_cont}>
                            <Image src={map} alt='' className={s.img} fill={true}/>
                        </div>
                        <p className={s.text}>
                            Многие представленные модели являются лимитированными и находятся в наличии в ограниченном
                            количестве, поэтому может произойти такое, что кто-то другой купит эту позицию и данное
                            ценовое предложение перестанет быть доступным. Мы собираем десятки миллионов предложений со
                            всего мира, поэтому даже в короткие промежутки времени цена может меняться. В том числе на
                            цену могут сказываться прочие внешние факторы, не зависящие от нас, такие как курс,
                            стоимость доставки и многое другое.

                        </p>
                        <div className={s.faq_block}>
                            <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                            <LoyaltyFAQ title={'После чего цена меняться не будет?'}>
                                После того, как вы оформите заказ, цена для вас будет зафиксирована и никаким изменениям
                                не подлежит. Добавление товара в корзину или избранное, к сожалению, не позволяет нам
                                зафиксировать цену по объективным причинам. Мы стараемся в каждый момент времени
                                предлагать вам наилучшую цену из возможных и делать ваш шопинг с нами еще более удобным
                                и выгодным, поэтому не откладывайте ваши покупки на потом, чтобы не упустить приятные
                                цены!

                            </LoyaltyFAQ>
                            <LoyaltyFAQ title={'Как часто могут меняться цены?'}>
                                Цена может не меняться как на протяжении долгого времени, так и постоянно оставаться
                                волатильной. Она может как повыситься, так и понизиться. Вскоре мы добавим возможность
                                следить за изменением цен, а также получать уведомления о появлении более выгодного
                                предложения на интересующий вас лот!

                            </LoyaltyFAQ>
                            <LoyaltyFAQ title={'Почему модель оказалась распроданной?'}>
                                Так как многие размещенные на нашей платформе лоты являются коллекционными и редкими,
                                может произойти такое, что какой-то конкретный размер или вся модель пропадет из
                                наличия, поэтому не откладывайте свои покупки, чтобы успеть приобрести желанную модель!

                            </LoyaltyFAQ>
                        </div>
                        <h5>Ответы на большинство вопросов вы найдете здесь: <Link href={'/faq'} className={s.link}
                                                                                   target={'_blank'}>FAQ</Link></h5>
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
                            Мы стараемся всячески благодарить вас за покупки на платформе SELLOUT, поэтому за каждую
                            совершенную покупку мы будем начислять вам бонусы в соответствии с вашим статусом.
                            Конкретное число бонусов за каждый товар вы сможете увидеть на странице товара, а также в
                            корзине. Также мы дарим 1000 бонусных рублей за первую покупку и на ваш день рождения и
                            регулярно начисляем бонусы в честь различных праздников!

                        </p>
                        <div className={s.faq_block}>
                            <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                            <LoyaltyFAQ title={'Чему равны бонусы?'}>
                                Каждый один бонус приравнивается к одному рублю! Вы можете оплачивать до 100% заказа,
                                тем самым сводя стоимость заказа к нулю!

                            </LoyaltyFAQ>
                            <LoyaltyFAQ title={'Как воспользоваться бонусами?'}>
                                Чтобы оплатить заказ целиком или частично бонусами, в корзине или на любом этапе
                                оформления заказа введите количество бонусов, которое хотите списать, и скидка будет
                                автоматически применена!
                            </LoyaltyFAQ>
                            <LoyaltyFAQ title={'Как быстро после совершения покупки начисляются бонусы?'}>
                                Обратите внимание, бонусы на ваш баланс будут начислены не сразу, а по прошествии
                                некоторого времени. Нам требуется обработать заказ, подтвердить корректность всех данных
                                и после этого начислить бонусы. Если вы считаете, что бонусы слишком долго не
                                начисляются и произошла какая-то ошибка, обязательно напишите нам и мы вам поможем!

                            </LoyaltyFAQ>
                            <LoyaltyFAQ title={'Как получить бонусы по реферальной программе, приглашая друзей?'}>
                                Реферальная программа - это специальная возможность для вас поделиться удовлетворением
                                от покупок с друзьями и получить взамен уникальные бонусы размером до 7000₽! Просто
                                пригласите своих знакомых стать частью нашего сообщества, и вы оба сможете наслаждаться
                                эксклюзивными преимуществами, такими как скидки и бонусы, созданными специально для
                                участников нашей реферальной программы. Благодарим за доверие и ваш вклад в наше
                                расширяющееся сообщество! Подробнее про реферальную программу
                                смотрите <Link href={'/faq'} style={{color: 'inherit'}}>здесь</Link>
                            </LoyaltyFAQ>
                        </div>

                        <div className={s.faq_block}>
                            <h5 className={`text-center ${s.questions_text}`}>Ответы на большинство вопросов
                                вы найдете здесь: <Link href={'/faq'} className={'text-black'}
                                                        target={'_blank'}>FAQ</Link></h5>
                            <h5 className={`text-center ${s.questions_text}`}>Если у вас остались вопросы, вы всегда
                                можете обратиться в службу поддержки и мы будем
                                рады вам помочь!</h5>
                        </div>
                    </TextModal>
                    <TextModal title={'Остались вопросы?'} img={how}>
                        <div className={s.content}>
                            <Image src={headphones} alt='' width={60}/>
                            <div className={s.text_cont}>
                                <h5>Вы всегда можете написать в службу поддержки, и мы будем рады вам помочь!</h5>
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
                                        Да, для оформления заказа требуется либо войти в свой аккаунт, либо создать
                                        новый, а также подтвердить свою почту. Благодаря этому вы всегда сможете с
                                        легкостью отслеживать статусы заказов в личном кабинете, а также вы точно не
                                        перепутаете указанные данные и мы всегда сможем связаться с вами!

                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Почему не работает промокод?'}>
                                        Пожалуйста, убедитесь, что вы выполнили все условия для применения промокода и
                                        время действия промокода еще не закончилось. Зачастую промокоды выдаются на
                                        первую покупку или на покупки от определенной суммы, проверьте, что вы вошли в
                                        правильный аккаунт. Если вы все же считаете, что произошла какая-то ошибка,
                                        напишите нам в службу поддержки, и мы обязательно поможем вам разобраться в
                                        ситуации!

                                    </LoyaltyFAQ>
                                </div>
                                <h5>Ответы на большинство вопросов вы найдете здесь: <Link href={'/faq'}
                                                                                           className={s.link}
                                                                                           target={'_blank'}>FAQ</Link>
                                </h5>
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
                            </div>
                        </div>
                    </TextModal>
                </div>

            }

            {!desktopStore.isDesktop && lastSeen.length > 0 && (
                <div className={s.cont + ' custom_cont'}>
                    {/*<hr/>*/}
                    <Compilation arr={lastSeen} title={'Ранее просмотренные'}/>

                </div>
            )}


        </MainLayout>
    );
};

export default observer(Cart);