import React, {useContext, useEffect, useRef, useState} from 'react';
import s from '@/styles/OneProductPage.module.css'
import truck from '@/static/icons/truck.svg'
import refund from '@/static/icons/arrow-return-left.svg'
import like from '@/static/icons/heart.svg'
import like_fill from '@/static/icons/heart-fill.svg'
import SizeTable from "@/components/pages/oneProduct/SizeTable/SizeTable";
import SizeHelp from "@/components/pages/oneProduct/SizeHelp/SizeHelp";
import SizeChoice from "@/components/pages/oneProduct/SizeChoice/SizeChoice";
import HowToChoose from "@/components/pages/oneProduct/HowToChoose/HowToChoose";
import TextModal from "@/components/shared/UI/TextModal/TextModal";
import QuestionsDropdown from "@/components/pages/oneProduct/QuestionsDropdown/QuestionsDropdown";
import Arrow from "@/components/shared/UI/Arrow/Arrow";
import Image from 'next/image'
import {fetchOneProduct, fetchPrices, fetchProductsByArray, fetchSimilarProducts} from "@/http/productsApi";
import MainLayout from "@/layout/MainLayout";
import {Context} from "@/context/AppWrapper";
import {observer} from "mobx-react-lite";
import AuthModal from "@/components/shared/AuthModal/AuthModal";
import Cookies from "js-cookie";
import {addToWishlist, removeFromWishlist} from "@/http/wishlistAPI";
import {parse} from "cookie";
import RenderBtns from "@/components/pages/oneProduct/RenderBtns/RenderBtns";
import {addToCart} from "@/http/cartApi";
import {addLastSeen, fetchLastSeen} from "@/http/userApi";
import jwtDecode from "jwt-decode";
import Link from "next/link";
import BreadcrumbC from "@/components/shared/BreadcrumbC/BreadcrumbC";
import Compilation from "@/components/shared/Compilation/Compilation";
import {Splide, SplideSlide, SplideTrack} from '@splidejs/react-splide';
import '@splidejs/react-splide/css'
import right from '@/static/icons/chevron-right.svg'
import left from '@/static/icons/chevron-left.svg'
import Head from "next/head";
import gift from '@/static/icons/gift-green.svg'

export const getServerSideProps = async (context) => {
    const cookies = parse(context.req.headers.cookie || '')
    const token = cookies['access_token']
    const product = await fetchOneProduct(context.params.slug, token)
    const {id} = product
    const prices = await fetchPrices(id, token)

    let lastSeen = []
    if (token) {
        const {user_id} = jwtDecode(token)
        lastSeen = await fetchLastSeen(context.req.headers.cookie, user_id)
    } else {
        let arr
        if (cookies.last_seen) {
            arr = cookies['last_seen'].trim().split(' ')
            if (arr[0] !== '') {
                lastSeen = await fetchProductsByArray(arr, token)
            }
        }
    }
    const compilations = await fetchSimilarProducts(product.id, token)
    return { props: {product, prices, lastSeen, compilations} }
}

const OneProductPage = ({product, prices, lastSeen, compilations}) => {
    const [moreOpen, setMoreOpen] = useState(false)
    const [isDesktop, setIsDesktop] = useState(true)
    const [bonuses, setBonuses] = useState(`до ${product.max_bonus}`)
    const {productStore, userStore, cartStore} = useContext(Context)
    console.log(product)
    const changeBonusesString = (value) => {
        setBonuses(value)
    }
    useEffect(() => {
        productStore.clearAll()
    }, [])
    const brandsDisplay = () => {
        if (product.collab) {
            return product.collab.name
        } else {
            return product.brands[0].name
        }
    }
    const clickBrand = () => {
        const query = {}
        if (product.collab) {
            query.collab = product.collab.query_name
        } else {
            query.line = product.brands[0].query_name
        }
        return {
            pathname: '/products',
            query: query
        }
    }
    const renderParams = () => {
        const res = []
        res.push(
            <p className={s.characteristics}>Артикул:
                <span className={s.characteristics_text}>{product.manufacturer_sku}</span>
            </p>
        )
        res.push(
            <p className={s.characteristics}>Дата релиза:
                <span className={s.characteristics_text}>{product.approximate_date}</span>
            </p>
        )
        const params = product.parameters
        for (const key in params) {
            if (params[key].length === 1) {
                res.push(
                    <p className={s.characteristics}>{key}:
                        <span className={s.characteristics_text}>{params[key][0]}</span>
                    </p>
                )
            }
            if (params[key].length > 1) {
                res.push(
                    <p className={s.characteristics}>{key}:
                        <span className={s.characteristics_text}>{params[key].join(', ')}</span>
                    </p>
                )
            }
        }
        return res
    }
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
    const [isInWishlist, setIsInWishlist] = useState(product.in_wishlist)
    const addToWL = async () => {
        const token = Cookies.get('access_token')
        const userId = userStore.id
        const data = await addToWishlist(userId, product.id, token)
        setIsInWishlist(true)
    }
    const deleteFromWL = async () => {
        const token = Cookies.get('access_token')
        const userId = userStore.id
        const data = await removeFromWishlist(userId, product.id, token)
        setIsInWishlist(false)
    }
    const cartAdd = async () => {
        let cart = Cookies.get('cart')
        Cookies.set('cart', cart + ' ' + productStore.shipChosen, {expires: 2772})
        const arr = Cookies.get('cart').trim().split(' ')
        productStore.setText(arr, productStore.shipChosen)
        console.log(productStore.shipChosen)
        console.log(arr)
        //TODO delete log
        if (userStore.isLogged) {
            const token = Cookies.get('access_token')
            const userId = userStore.id
            const data = await addToCart(userId, productStore.shipChosen, token)
        }
        cartStore.setCartCnt(cartStore.cartCnt + 1)
    }

    useEffect(() => {
        if (userStore.isLogged) {
            const token = Cookies.get('access_token')
            const userId = userStore.id
            addLastSeen(token, userId, product.id)
        }
        if (!Cookies.get('last_seen')) {
            Cookies.set('last_seen', '', {expires: 2772})
        }
        let currArr = Cookies.get('last_seen').trim().split(' ')
        const id = String(product.id)
        if (currArr.includes(id)) {
            let ind = currArr.indexOf(id)
            currArr.splice(ind, 1)
        } else {
            if (currArr.length > 7) {
                currArr.pop()
            }
        }
        currArr.unshift(id)
        const newStr = currArr.join(' ')
        Cookies.set('last_seen', newStr, {expires: 2772})
    }, [])

    const buttonRef = useRef(null)
    useEffect(() => {
        if (product.bucket_link.length > 1) {
            buttonRef.current.focus()
        }
    }, [])
    return (
        <MainLayout>
            <Head>
                <title>{product.model}</title>
            </Head>
            <div className={s.container + ' custom_cont'}>
                <BreadcrumbC list={product.list_lines}/>
                <div className={s.row}>
                    <div className={s.col1}>
                        {!isDesktop &&
                            <>
                                <Link href={clickBrand()} className={s.brand}
                                >{brandsDisplay()}</Link>
                                <div className={s.model}>{product.model}</div>
                                <div className={s.color}>{product.colorway}</div>
                                <div
                                    className={s.price_default}
                                    style={product.is_sale
                                        ? {textDecoration: 'line-through', fontSize: '16px'}
                                        : {textDecoration: 'none', fontSize: '19px'}}
                                >от {product.min_price_without_sale} ₽</div>
                                <div className='d-flex align-items-center'>
                                    {product.is_sale &&
                                        <div className={s.price_sale}>
                                            от {product.min_price} ₽
                                        </div>
                                    }
                                    {product.is_fast_shipping && <Image src={truck} alt="" className={s.icons}/>}
                                    {product.is_return && <Image src={refund} alt="" className={s.icons}/>}
                                </div>
                                <p className={s.bonuses_block}>
                                    <Image src={gift} alt='' className={s.bonus_icon}/> <span className={s.bonuses}> {bonuses}</span> бонусов
                                    в подарок!
                                </p>
                            </>
                        }
                        {
                            product.bucket_link.length > 1
                            ?
                                <Splide aria-label="My Favorite Images"
                                        options={{
                                            type: 'loop',
                                            pagination: false,
                                            paginationKeyboard: true,
                                            keyboard: true,
                                            focus: 'center',
                                            speed: isDesktop ? 800 : 400
                                        }}
                                        hasTrack={false}
                                >
                                    <SplideTrack>
                                        {
                                            product.bucket_link.map(el =>
                                                <SplideSlide className={s.photo} key={el.id}>
                                                    <Image src={el.url} alt=''
                                                           fill={true}
                                                           loading={'eager'}
                                                           style={{objectFit: 'contain'}}
                                                    />
                                                </SplideSlide>
                                            )
                                        }
                                    </SplideTrack>
                                    <div className="splide__arrows">
                                        <button className="splide__arrow splide__arrow--prev">
                                            <Image src={left} alt='' width={20}/>
                                        </button>
                                        <button className="splide__arrow splide__arrow--next" ref={buttonRef}>
                                            <Image src={right} alt='' width={20}/>
                                        </button>
                                    </div>
                                </Splide>
                                :
                                <div style={{position: "relative"}}
                                >
                                    <div className={s.photo}>
                                        <Image src={product.bucket_link[0].url} alt=''
                                               fill={true}
                                               loading={'eager'}
                                               style={{objectFit: 'contain'}}
                                        />
                                    </div>
                                </div>

                        }
                        {!isDesktop &&
                            <>
                                <div className={s.modals_block}>
                                    <SizeTable tables={product.size_table_platform.tables}/>
                                    <SizeHelp model={`${brandsDisplay()} ${product.model}`}
                                              imgSrc={product.bucket_link[0].url}/>
                                </div>
                                <SizeChoice prices={prices} productId={product.id} config={product.main_size_row}/>
                                {
                                    productStore.sizeChosen &&
                                    <div className={s.btn_group}>
                                        <RenderBtns btns={productStore.shipps} changeBonuses={changeBonusesString}/>
                                    </div>
                                }
                                <div className={s.how}>
                                    <HowToChoose/>
                                </div>
                                <div className={s.btn_group}>
                                    <button className={s.cart_btn}
                                            disabled={!productStore.shipChosen || productStore.text[0] === 'У'}
                                            onClick={cartAdd}
                                    >
                                        {productStore.text}
                                    </button>
                                    {
                                        userStore.isLogged
                                            ?
                                            <button className={s.fav_btn}
                                                    onClick={() => {
                                                        isInWishlist ? deleteFromWL() : addToWL()
                                                    }}
                                            >
                                                <div className={s.icon_block}>
                                                    <Image src={isInWishlist ? like_fill : like} alt="" className={s.icons}/>
                                                    <div>В избранное</div>
                                                </div>
                                            </button>
                                            :
                                            <div className={s.fav_btn2}>
                                                <AuthModal fromWishlist={true}>
                                                    <div className={s.icon_block}>
                                                        <Image src={like} alt="" className={s.icons}/>
                                                        <div>В избранное</div>
                                                    </div>
                                                </AuthModal>
                                            </div>
                                    }
                                </div>
                            </>
                        }
                        <div className={s.more} style={moreOpen ? {height: 'fit-content'} : {height: '200px'}}>
                            <div className={s.row}>
                                <div className={s.col50}>
                                    <div className={s.model}>{brandsDisplay()}</div>
                                    <div className={s.more_color}>{product.colorway}</div>
                                    <div className={s.more_color}>{product.unit_common_name}</div>
                                    <p className={s.description}>
                                        {product.description}
                                    </p>
                                </div>
                                <div className={s.col50}>
                                    <div className={s.characteristics_title}>Характеристики товара:</div>
                                    {renderParams()}
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <button
                                className={s.more_btn}
                                onClick={()=> setMoreOpen(!moreOpen)}>
                                <div className={s.more_text}>Подробнее</div>
                                <Arrow isOpen={moreOpen}/>
                            </button>
                        </div>
                    </div>
                    <div className={s.col2}>
                        {isDesktop &&
                            <>
                                <Link href={clickBrand()} className={s.brand}
                                >{brandsDisplay()}</Link>
                                <div className={s.model}>{product.model}</div>
                                <div className={s.color}>{product.colorway}</div>
                                <div
                                    className={s.price_default}
                                    style={product.is_sale
                                        ? {textDecoration: 'line-through', fontSize: '16px'}
                                        : {textDecoration: 'none', fontSize: '19px'}}
                                >от {product.min_price_without_sale} ₽</div>
                                <div className='d-flex align-items-center'>
                                    {product.is_sale &&
                                        <div className={s.price_sale}>
                                            от {product.min_price} ₽
                                        </div>
                                    }
                                    {product.is_fast_shipping && <Image src={truck} alt="" className={s.icons}/>}
                                    {product.is_return && <Image src={refund} alt="" className={s.icons}/>}
                                </div>
                                <p className={s.bonuses_block}>
                                    <Image src={gift} alt='' className={s.bonus_icon}/> <span className={s.bonuses}> {bonuses}</span> бонусов
                                    в подарок!
                                </p>
                                <div className={s.modals_block}>
                                    <SizeTable tables={product.size_table_platform.tables}/>
                                    <SizeHelp model={`${brandsDisplay()} ${product.model}`}
                                              imgSrc={product.bucket_link[0].url}/>
                                </div>
                                <SizeChoice prices={prices} productId={product.id} config={product.main_size_row}/>
                                {
                                    productStore.shipps.length > 0 &&
                                    <div className={s.btn_group}>
                                        <RenderBtns btns={productStore.shipps} changeBonuses={changeBonusesString}/>
                                    </div>
                                }
                                <div className={s.how}>
                                    <HowToChoose/>
                                </div>
                                <div className={s.btn_group}>
                                    <button className={s.cart_btn}
                                            disabled={!productStore.shipChosen || productStore.text[0] === 'У'}
                                            onClick={cartAdd}
                                    >
                                        {productStore.text}
                                    </button>
                                    {
                                        userStore.isLogged
                                        ?
                                            <button className={s.fav_btn}
                                                    onClick={() => {
                                                        isInWishlist ? deleteFromWL() : addToWL()
                                                    }}
                                            >
                                                <div className={s.icon_block}>
                                                    <Image src={isInWishlist ? like_fill : like} alt="" className={s.icons}/>
                                                    <div>В избранное</div>
                                                </div>
                                            </button>
                                            :
                                            <div className={s.fav_btn2}>
                                                <AuthModal fromWishlist={true}>
                                                    <div className={s.icon_block}>
                                                        <Image src={like} alt="" className={s.icons}/>
                                                        <div>В избранное</div>
                                                    </div>
                                                </AuthModal>
                                            </div>
                                    }
                                </div>
                            </>
                        }
                        <div className={s.link_block}>
                            <TextModal title={'Как мы работаем?'} img={like}>
                                <p>SELLOUT - инновационная онлайн-платформа, предлагающая широчайший ассортимент
                                    брендовой одежды и обуви, аксессуаров и прочих товаров. У нас Вы сможете найти как лимитированные и
                                    труднодоступные модели и коллекции, так и отобранные нашими стилистами товары со всего мира.
                                    Мы сотрудничаем только с проверенными бутиками, магазинами и продавцами,
                                    а также сами проводим проверку на оригинальность. Только после этого мы доставляем Ваш заказ. </p>
                                <p>
                                    Подробнее Вы можете прочитать в разделе <a href="" className={s.link}>О нас</a>
                                </p>
                            </TextModal>
                            <TextModal title={'Гарантии оригинальности и качества'} img={like}>
                                <>
                                    <p>
                                        SELLOUT продает только 100% оригинальные и новые вещи
                                    </p>
                                    <p>
                                        Мы бережно относимся к своей репутации и не допускаем подделок
                                    </p>
                                    <p>
                                        Мы сотрудничаем только с проверенными бутиками, магазинами и продавцами. Каждый товар перед отправкой покупателю
                                        проходит тщательные проверки на оригинальность и качество. Наша команда состоит из специалистов, которые
                                        уже более 5 лет занимаются проверкой подлинности одежды, обуви и
                                        прочих аксессуаров, а также использует передовые технологии искусственного интеллекта, чтобы исключить человеческий фактор.
                                    </p>
                                </>
                            </TextModal>
                            <TextModal title={'Оплата'} img={like}>
                                <p>
                                    При оплате товара средства на Вашей карте замораживаются, а не списываются. Далее мы должны подтвердить
                                    Ваш заказ, провести дополнительный ряд проверок, если требуется, и только после этого деньги с Вашего счета
                                    будут списаны. Обычно подтверждение заказа происходит в кратчайшие сроки. Обо всех изменениях статуса заказа
                                    Вы можете получать уведомления удобным для Вас способом, а также следить
                                    за ними в Личном Кабинете. В случае, если заказ не удастся подтвердить, вся сумма будет незамедлительно разморожена.
                                </p>
                            </TextModal>
                            <TextModal title={'Возврат'} img={like}>
                                <p>
                                    Многие представленные на нашей платформе товары выкупаются специально под Вас у частных продавцов,
                                    коллекционеров или из разных иностранных бутиков и магазинов, поэтому мы не
                                    способны предложить Вам возврат товара после подтверждения заказа на все позиции.
                                    Однако есть ряд моделей, которые подлежат возврату. Они помечены
                                    значком <Image src={refund} alt=""/>. Мы уже предоставляем возврат даже на некоторые
                                    эксклюзивные коллекции и постоянно стремимися увеличить ассортимент товаров, подлежащих возврату,
                                    чтобы Ваши покупки с нами стали еще более удобными!
                                    Подробнее про правила возврата читайте <a href="" className={s.link}>тут</a>
                                </p>
                            </TextModal>
                            <QuestionsDropdown/>
                        </div>
                    </div>
                </div>
                {lastSeen.length > 0 &&
                    <Compilation arr={lastSeen} title={'Ранее просмотренные'}/>
                }
                {
                    compilations.map(el =>
                        <Compilation arr={el.products} title={el.name}/>
                    )
                }
            </div>
        </MainLayout>
    );
};

export default observer(OneProductPage);