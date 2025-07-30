import React, {useContext, useEffect, useRef, useState} from 'react';
import s from '@/styles/OneProductPage.module.css'
import truck from '@/static/icons/truck.svg'
import refund from '@/static/icons/arrow-return-left.svg'
import ret from '@/static/icons/arrow-return-left.svg'
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
import {
    fetchOneProduct,
    fetchPrices,
    fetchProductsByArray,
    fetchShippings,
    fetchSimilarProducts, updateOneProduct
} from "@/http/productsApi";
import MainLayout from "@/layout/MainLayout";
import {Context} from "@/context/AppWrapper";
import {observer} from "mobx-react-lite";
import AuthModal from "@/components/shared/AuthModal/AuthModal";
import Cookies from "js-cookie";
import {addToWishlist, removeFromWishlist} from "@/http/wishlistAPI";
import {parse} from "cookie";
import RenderBtns from "@/components/pages/oneProduct/RenderBtns/RenderBtns";
import {addToCart} from "@/http/cartApi";
import {addLastSeen, fetchLastSeen, fetchLastSeen2} from "@/http/userApi";
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
import how from '@/static/icons/question-circle.svg'
import warranty from '@/static/icons/shield-check.svg'
import payment from '@/static/icons/credit-card.svg'
import {useRouter} from "next/router";
import parseHtml from 'html-react-parser'
import change from "@/static/icons/arrow-down-up.svg";
import map from "@/static/img/map.jpg";
import LoyaltyFAQ from "@/components/pages/account/LoyaltyFAQ/LoyaltyFAQ";
import gift_gard from "@/static/icons/gift-gard.svg";
import first from "@/static/icons/first.svg";
import good from "@/static/icons/good.svg";
import friend from "@/static/icons/friend.svg";
import birth from "@/static/icons/happybirthday.svg";
import smile from "@/static/icons/emoji-smile 1.svg";
import giftModal from "@/static/icons/gift.svg";
import headphones from "@/static/icons/headphones-circle.svg";
import tg from "@/static/icons/tg_black.svg";
import vk from "@/static/icons/vk_black.svg";
import Text from "@/components/pages/faq/Text/Text";
import returnImg from "@/static/icons/arrow-return-left.svg";
import cashStack from "@/static/icons/cash-stack.svg";
import cashStack1 from "@/static/icons/cash-stack 1.svg";
import twoArrows from "@/static/icons/two_arrows.svg";
import ffIcon from '@/static/icons/ff.png'
import selloutIcon from '@/static/icons/favicon.svg'
import ImgSlider from "@/components/pages/oneProduct/ImgSlider/ImgSlider";
export const getServerSideProps = async (context) => {
    const cookies = parse(context.req.headers.cookie || '')
    const token = cookies['access_token']
    const product = await fetchOneProduct(context.params.slug, token)
    const {id} = product
    const prices = await fetchPrices(id, token)
    return { props: {product, prices} }
}

const OneProductPage = ({product, prices}) => {
    const router = useRouter()
    const [moreOpen, setMoreOpen] = useState(true)
    const [isDesktop, setIsDesktop] = useState(true)
    const [bonuses, setBonuses] = useState(`до ${product.price.bonus}`)

    const [compilations, setCompilations] = useState([])
    const [lastSeen, setLastSeen] = useState([])
    const {productStore, userStore, cartStore} = useContext(Context)
    useEffect(() => {
        productStore.clearAll()
        if (prices.length === 1) {
            productStore.setShipps([])
            productStore.setSizeChosen(prices[0])
        }
    }, [router.asPath])
    useEffect(() => {
        const token = Cookies.get('access_token')
        fetchSimilarProducts(product.id, token).then(res => {
            setCompilations(res)
        })


        if (token) {
            const {user_id} = jwtDecode(token)
            fetchLastSeen2(token, user_id).then(res => setLastSeen(res))
        } else {
            let arr
            if (Cookies.get('last_seen')) {
                arr = Cookies.get('last_seen').trim().split(' ')
                console.log(arr)
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
        if (!product.actual_platform_price) {
            const token = Cookies.get('access_token')
            const {slug} = router.query
            const interval = setInterval(() => {
                console.log('load')
                updateOneProduct(slug, token)
                    .then(product => {
                        if (product.actual_platform_price) {
                            console.log('ok')
                            clearInterval(interval)
                            const chosenSize = productStore.sizeChosen
                            if (chosenSize) {
                                fetchShippings(product.id, chosenSize.size_for_api, token)
                                    .then(ships => {
                                        productStore.setShipps(ships)
                                        productStore.setAnim(true)
                                        setTimeout(() => {
                                            productStore.setAnim(false)
                                        }, 1000)
                                    })
                            }
                            fetchPrices(product.id, token).then((prices) => {
                                const {view_size} = chosenSize
                                if (view_size) {
                                    let foundSelected = false
                                    prices.forEach(el => {
                                        if (el.view_size === view_size) {
                                            productStore.setSizeChosen(el)
                                            foundSelected = true
                                        }
                                    })
                                    if (!foundSelected) {
                                        productStore.setSizeChosen(null)
                                    }
                                }
                                router.push(`${router.asPath}`, undefined, {scroll: false})
                            })
                        }
                    })
                    .catch(err => console.log(err))
            }, 4000)

            return () => {
                clearInterval(interval)
                productStore.setAnim(false)
            }
        }
    }, [router.asPath])
    const changeBonusesString = (value) => {
        setBonuses(value)
    }
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
        const paramsObj = product.parameters
        const order = paramsObj.parameters_order
        if (order) {
            const params = {}
            for (const param of order) {
                if (param in product.parameters.parameters) {
                    params[param] = paramsObj.parameters[param]
                }
            }

            for (const key in params) {
                res.push(
                    <p className={s.characteristics}>{key}:
                        <span className={s.characteristics_text}>{params[key].join(', ')}</span>
                    </p>
                )
            }
        } else {
            for (const key in paramsObj) {
                res.push(
                    <p className={s.characteristics}>{key}:
                        <span className={s.characteristics_text}>{paramsObj[key].join(', ')}</span>
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
    }, [router.asPath])

    const buttonRef = useRef(null)
    // useEffect(() => {
    //     if (product.bucket_link.length > 1) {
    //         buttonRef.current.focus()
    //     }
    // }, [])
    const shouldRenderBonuses = () => {
        return Number(product.price.bonus) > 0;
    }
    const hasOneTable = () => {
        let bool = false
        Object.values(product.size_table_platform.tables).forEach(table => {
            if (Object.keys(table).length > 0) {
                bool = true
            }
        })
        return bool
    }
    const infoRef = useRef(null)
    const [infoBtn, setInfoBtn] = useState(false)
    useEffect(() => {
        setInfoBtn(false)
        setMoreOpen(true)
        setTimeout(() => {
            if (infoRef && infoRef.current.clientHeight > 200) {
                setInfoBtn(true)
            }
            setMoreOpen(false)
        }, 200)
    }, [router.asPath])
    return (
        <MainLayout>
            <Head>
                <title>{`Заказать ${brandsDisplay()} ${product.model} ${product.colorway} по выгодной цене на SELLOUT!`}</title>
                <meta property="og:image" content={product.bucket_link[0].url}/>
                {/*<meta name={'description'} content={`Закажите ${brandsDisplay()} ${product.model} ${product.colorway} в интернет-магазине SELLOUT. Выгодные цены. Доставка по всей России. Бонусы к первому заказу.`}/>*/}
                <meta name={'description'} content={`Выберите стиль, выберите SELLOUT. ${brandsDisplay()} ${product.model} ${product.colorway} доступны для заказа. Выгодные цены и бонусы ждут вас. Сделайте свой шаг в мир моды.`}/>
                <meta property="og:image" content="https://cdn-images.farfetch-contents.com/21/02/94/60/21029460_51154091_1000.jpg"/>
            </Head>
            <div className={s.container + ' custom_cont'}>
                {isDesktop && <BreadcrumbC list={product.list_lines}/>}
                <div className={s.row}>
                    <div className={s.col1}>
                        {!isDesktop &&
                            <>
                                <Link href={clickBrand()} className={s.brand}
                                >{brandsDisplay()}</Link>
                                <div className={s.model}>{product.model}</div>
                                <div className={s.color}>{product.colorway}</div>
                            </>
                        }
                        {
                            product.bucket_link.length > 1
                            ?
                                <div className={s.slider}>
                                    {/*<Splide aria-label="My Favorite Images"*/}
                                    {/*        options={{*/}
                                    {/*            type: 'loop',*/}
                                    {/*            pagination: false,*/}
                                    {/*            paginationKeyboard: true,*/}
                                    {/*            keyboard: true,*/}
                                    {/*            focus: 'center',*/}
                                    {/*            speed: isDesktop ? 800 : 400*/}
                                    {/*        }}*/}
                                    {/*        hasTrack={false}*/}
                                    {/*>*/}
                                    {/*    <SplideTrack>*/}
                                    {/*        {*/}
                                    {/*            product.bucket_link.map(el =>*/}
                                    {/*                <SplideSlide className={s.photo} key={el.id}>*/}
                                    {/*                    <Image src={el.url}*/}
                                    {/*                           alt={`${brandsDisplay()} ${product.model} ${product.colorway}`}*/}
                                    {/*                           fill={true}*/}
                                    {/*                           loading={'eager'}*/}
                                    {/*                           style={{objectFit: 'contain'}}*/}
                                    {/*                    />*/}
                                    {/*                </SplideSlide>*/}
                                    {/*            )*/}
                                    {/*        }*/}
                                    {/*    </SplideTrack>*/}
                                    {/*    <div className="splide__arrows">*/}
                                    {/*        <button className="splide__arrow splide__arrow--prev">*/}
                                    {/*            <Image src={left} alt='' width={20}/>*/}
                                    {/*        </button>*/}
                                    {/*        <button className="splide__arrow splide__arrow--next" ref={buttonRef}>*/}
                                    {/*            <Image src={right} alt='' width={20}/>*/}
                                    {/*        </button>*/}
                                    {/*    </div>*/}
                                    {/*</Splide>*/}
                                    <ImgSlider photos={product.bucket_link}/>
                                </div>
                                :
                                <div className={s.slider}
                                >
                                    <div className={s.photo}>
                                        <Image src={product.bucket_link[0].url} alt={`${brandsDisplay()} ${product.model} ${product.colorway}`}
                                               fill={true}
                                               loading={'eager'}
                                               style={{objectFit: 'contain'}}
                                        />
                                    </div>
                                </div>

                        }
                        {!isDesktop &&
                            <>
                                {
                                    prices.length > 0 &&
                                    <>
                                        <div
                                            className={s.price_default}
                                            style={product.is_sale
                                                ? {textDecoration: 'line-through', fontSize: '16px'}
                                                : {textDecoration: 'none', fontSize: '19px'}}
                                        >от {product.price.start_price} ₽</div>
                                        <div className='d-flex align-items-center'>
                                            {product.is_sale &&
                                                <div className={s.price_sale}>
                                                    от {product.price.final_price} ₽
                                                </div>
                                            }
                                            {product.is_fast_shipping && <Image src={truck} alt="" className={s.icons}/>}
                                            {product.is_return && <Image src={refund} alt="" className={s.icons}/>}
                                        </div>
                                        {
                                            shouldRenderBonuses() &&
                                            <p className={s.bonuses_block}>
                                                <Image src={gift} alt='' className={s.bonus_icon}/> <span className={s.bonuses}> {bonuses}₽</span> бонусов
                                                в подарок!
                                            </p>
                                        }
                                    </>
                                }
                                {
                                    prices.length > 0 &&
                                    <div className={s.modals_block}>
                                        {
                                            hasOneTable() &&
                                            <SizeTable tables={product.size_table_platform.tables} photo={product.bucket_link[0].url}/>
                                        }
                                        <SizeHelp model={`${brandsDisplay()} ${product.model}`}
                                                  imgSrc={product.bucket_link[0].url} manySizes={product.has_many_sizes}
                                                  str={product.size_table_platform?.size_fit_recommendation ?? ''}/>
                                    </div>
                                }
                                {
                                    prices.length > 0
                                    ?
                                    <SizeChoice prices={prices} productId={product.id}
                                                config={product.size_row_name} manySizes={product.has_many_sizes}/>
                                    :
                                    <p className={s.grey_text}>Товара нет в наличии</p>
                                }
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
                                                    <div>{isInWishlist ? 'В избранном' : 'В избранное'}</div>
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
                        <div className={s.more} style={moreOpen ? {height: 'fit-content'} : {height: '200px'}} ref={infoRef}>
                            <div className={s.row}>
                                <div className={s.col50}>
                                    {!isDesktop && <BreadcrumbC list={product.list_lines}/>}
                                    <div className={s.model}>{brandsDisplay()}</div>
                                    <div className={s.more_color}>{product.colorway}</div>
                                    <div className={s.more_color}>{parseHtml(product.extra_name)}</div>
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
                        {
                            infoBtn &&
                            <div className='d-flex justify-content-center'>
                                <button
                                    className={s.more_btn}
                                    onClick={()=> setMoreOpen(!moreOpen)}>
                                    <div className={s.more_text}>
                                        Подробнее
                                        <Arrow isOpen={moreOpen}/>
                                    </div>
                                </button>
                            </div>
                        }
                    </div>
                    <div className={s.col2}>
                        {isDesktop &&
                            <>
                                <Link href={clickBrand()} className={s.brand}
                                >{brandsDisplay()}</Link>
                                <div className={s.model}>{product.model}</div>
                                <div className={s.color}>{product.colorway}</div>
                                {
                                    prices.length > 0 &&
                                    <>
                                        <div
                                            className={s.price_default}
                                            style={product.is_sale
                                                ? {textDecoration: 'line-through', fontSize: '16px'}
                                                : {textDecoration: 'none', fontSize: '19px'}}
                                        >от {product.price.start_price} ₽</div>
                                        <div className='d-flex align-items-center'>
                                            {product.is_sale &&
                                                <div className={s.price_sale}>
                                                    от {product.price.final_price} ₽
                                                </div>
                                            }
                                            {product.is_fast_shipping && <Image src={truck} alt="" className={s.icons}/>}
                                            {product.is_return && <Image src={refund} alt="" className={s.icons}/>}
                                        </div>
                                        {
                                            shouldRenderBonuses() &&
                                            <p className={s.bonuses_block}>
                                                <Image src={gift} alt='' className={s.bonus_icon}/> <span className={s.bonuses}> {bonuses}₽</span> бонусов
                                                в подарок!
                                            </p>
                                        }
                                    </>
                                }
                                {
                                    prices.length > 0 &&
                                    <div className={s.modals_block}>
                                        {
                                            hasOneTable() &&
                                            <SizeTable tables={product.size_table_platform.tables} photo={product.bucket_link[0].url}/>
                                        }
                                        <SizeHelp model={`${brandsDisplay()} ${product.model}`}
                                                  imgSrc={product.bucket_link[0].url} manySizes={product.has_many_sizes}
                                                  str={product.size_table_platform?.size_fit_recommendation ?? ''}
                                        />
                                    </div>
                                }
                                {
                                    prices.length > 0
                                    ?
                                    <SizeChoice prices={prices} productId={product.id}
                                                config={product.size_row_name} manySizes={product.has_many_sizes}/>
                                    :
                                    <p className={s.grey_text}>Товара нет в наличии</p>
                                }
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
                                                    <div>{isInWishlist ? 'В избранном' : 'В избранное'}</div>
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
                            <TextModal title={'Как мы работаем?'} img={how}>
                                <p>SELLOUT - инновационная онлайн-платформа, предлагающая широчайший ассортимент
                                    брендовой одежды и обуви, аксессуаров и прочих товаров. У нас Вы сможете найти как лимитированные и
                                    труднодоступные модели и коллекции, так и отобранные нашими стилистами товары со всего мира.
                                    Мы сотрудничаем только с проверенными бутиками, магазинами и продавцами,
                                    а также сами проводим проверку на оригинальность. Только после этого мы доставляем Ваш заказ. </p>
                                <p>
                                    Подробнее Вы можете прочитать в разделе <a href="" className={s.link}>О нас</a>
                                </p>
                            </TextModal>
                            <TextModal title={'Гарантии оригинальности и качества'} img={warranty}>
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
                            <TextModal title={'Нашли тот же товар дешевле?'} img={cashStack}>
                                <Image src={cashStack1} alt='' width={80}/>
                                <h4 className={'my-3'}>Нашли тот же товар дешевле?</h4>
                                <div className={s.arrows_section}>
                                    <Image src={ffIcon} alt='' width={100}/>
                                    <div className={s.arrows_block}>
                                        <div>
                                            Информация о конкуренте
                                        </div>
                                        <div className={s.arrows_cont}>
                                            <Image src={twoArrows} alt='' fill={true} className={s.arrow_img}/>
                                        </div>
                                        <div>
                                            Лучшая цена
                                        </div>
                                    </div>
                                    <Image src={selloutIcon} alt='' width={70}/>
                                </div>
                                <p className={s.text}>
                                    Мы стараемся держать лидирующую позицию на российском рынке брендовой одежды и обуви, поэтому тщательно мониторим конкурентов и стремимся предлагать нашим клиентам лучшие цены! Одна из наших ключевых ценностей - это самые выгодные цены на широчайший ассортимент брендовой, стильной, премиальной одежды, обуви и аксессуаров. Поэтому если Вы нашли более низкую цену у наших конкурентов, смело пишите нам, и мы обязательно сделаем для Вас наилучшее предложение!

                                </p>
                                <div className={s.faq_block}>
                                    <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                                    <LoyaltyFAQ title={'Цена в другом месте слишком низкая, и Вы думаете, что там продают подделки, что делать?'}>
                                        Да, если цена разительно ниже нашей, то это явный признак неоригинального товара, однако все равно присылайте нам, где Вы наткнулись на подозрительное предложения, а мы в свою очередь расскажем Вам и объективно докажем, является ли данный магазин магазином подделок. Не стесняйтесь писать нам об этом, быть может, наши опытные специалисты
                                        уберегут Вас от покупки подделки!

                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Куда присылать информацию о том, что Вы нашли более выгодное предложение?'}>
                                        Вы можете написать нам любым удобным для Вас способом и прислать в любом формате информацию о предложении конкурентов: ссылка,  контакы в соц. сетях, скриншот и.т.д.
                                        <br/>
                                        Наши контакты:
                                        <div>
                                            <div>
                                                Почта: <a href={'mailto:customerservice@sellout.su'}
                                                          className={'text-black'}>customerservice@sellout.su</a>
                                            </div>
                                            <div>
                                                WhatsApp: <a href={'https://wa.me/message/L2OINP6KNMNLA1'}
                                                             target={'_blank'}
                                                             className={'text-black'}>+7 993 896-92-27</a>
                                            </div>
                                            <div>
                                                Telegram: <a href={'https://t.me/sellout_official'}
                                                             target={'_blank'}
                                                             className={'text-black'}>@sellout_official</a>
                                            </div>
                                        </div>
                                    </LoyaltyFAQ>
                                </div>
                                <h5>Ответы на большинство вопросов Вы найдете здесь: <Link href={'/faq'} className={s.link} target={'_blank'}>FAQ</Link></h5>
                            </TextModal>
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
                            <TextModal title={'Бонусы'} img={giftModal}>
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
                            <TextModal title={'Доставка, оплата, возврат'} img={payment}>
                                <Image src={truck} alt='' width={60}/>
                                <h4 className={'my-3'}>Доставка</h4>
                                <p className={s.text}>
                                    Мы собираем десятки миллионов предложений со всего мира: от различных бутиков, магазинов и частных коллекционеров. В связи с этим мы можем предложить Вам разные условия доставки: от самых быстрых до более длительных и при этом выгодных. Выбрав размер или конфигурацию товара, Вам предстоит выбрать срок доставки и соответствующую цену. Обычно мы укладываемся сильно раньше, чем указанный крайний срок, однако мы берем время с запасом, чтобы учесть все непредвиденные обстоятельства. На кнопке указано то количество дней, которое занимает доставка от продавца до нашего
                                    склада в Москве.

                                </p>
                                <div className={s.faq_block}>
                                    <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                                    <LoyaltyFAQ title={'Какие существуют варианты доставок с нашего склада в Москве до Вас?'}>
                                        При оформлении заказа Вы указываете адрес и способ доставки. Мы доставляем, используя курьерскую службу Boxberry, а также на данный момент доставка по Москве бесплатная!
                                        <br/>
                                        Вы можете выбрать доставку до Пункта Выдачи Заказов (ПВЗ) Boxberry, отметив на карте нужный ПВЗ, или выбрать доставку курьером до двери.
                                        <br/>
                                        Самовывоза на данный момент нет, но скоро появится!

                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Как рассчитывается стоимость доставки?'}>
                                        Стоимость доставки рассчитываются автоматически на этапе оформления заказа. Она зависит от количества и веса
                                        товаров, способа и типа доставки, а также от адреса.

                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Куда мы доставляем?'}>
                                        Мы доставляем по всей России службой курьерской доставки Boxberry. Очень скоро появится доставка в страны СНГ!

                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Какая скорость доставки со склада в Москве?'}>
                                        В зависимости от Вашего города доставка занимает
                                        от одного до нескольких дней после прибытия Вашего заказа на наш склад в Москве. Подробнее Вы сможете отслеживать на сайте или в приложении Boxberry.

                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Как отслеживать доставку?'}>
                                        Как только Ваш заказ приедет на наш склад в Москве и будет отправлен курьерской службой Boxberry, Вам
                                        придет уведомление на почту с информацией о трек-номере отправления, а также трек-номер появится в
                                        личном кабинете в информации о Вашем заказе.
                                        <br/>
                                        Отследить заказ можно по
                                        этой <a href="https://boxberry.ru/tracking-page" className={'text-black'} target={'_blank'}>ссылке</a> или в мобильном приложении Boxberry. Отправление
                                        автоматически появляется в приложении, если авторизоваться под теми
                                        же данными, под которыми был выполнен заказ на нашем сайте.

                                    </LoyaltyFAQ>
                                </div>


                                <Image src={payment} alt='' width={60}/>
                                <h4 className={'my-3'}>Оплата</h4>
                                <p className={s.text}>
                                    При оплате товара средства с Вашей карты замораживаются эквайрингом, а не списываются. Далее мы должны подтвердить Ваш заказ, провести дополнительный ряд проверок, если требуется, и только после этого деньги поступят к нам. Обычно подтверждение заказа происходит в кратчайшие сроки. Обо всех изменениях статуса заказа Вы можете получать уведомления удобным для Вас способом, а также следить за ними в личном кабинете. В случае, если заказ не удастся подтвердить, вся сумма будет незамедлительно разморожена и снова станет доступной на Вашем счету.

                                </p>
                                <div className={s.faq_block}>
                                    <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                                    <LoyaltyFAQ title={'Какие есть способы оплаты?'}>
                                        Мы принимаем всевозможные способы оплаты: МИР, Visa, Mastercard, Yandex Pay, СБП. Возможна оплата частями от сервиса BNPL.
                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Безопасность данных'}>
                                        Мы собираем и не разглашаем третьим лицам конфиденциальную информацию. Более подробно с политикой обработки персональных данных можно
                                        ознакомиться <a href="/docs/Политика%20конфиденциальности.pdf" target={"_blank"}
                                                        className={'text-black'}>
                                        здесь</a>
                                        <br/>
                                        Все платежи проходят через интернет-эквайринг LIFE PAY с использованием защиты 3d-secure.
                                        <br/>
                                        Интернет-эквайринг от LIFE PAY защищен всеми нужными протоколами и имеет сертификации для создания безопасной связи между доменами при оплате. Более того, интернет-эквайринг от LIFE PAY позволяет отслеживать данные по каждой транзакции (пункт товара, сумма транзакции, статус транзакции, данные покупателя) и вовремя заподозрить вредоносные операции со стороны сотрудников, покупателей или левых людей (мошенников).
                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Включены ли таможенные пошлины и налоги в стоимость заказа?'}>
                                        Да, цена окончательная, никаких дополнительных платежей не потребуется!
                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Возврат средств в случае отмены заказа'}>
                                        В большинстве случаев средства при оплате не списываются, а замораживаются на Вашем счете и списываются лишь после окончательного подтверждения заказа. Если нам не удастся подтвердить заказ, то деньги моментально разморозятся и вернутся на Ваш счет. Вам для этого ничего делать не потребуется. Если деньги уже списались с Вашего счета, то при отмене заказа деньги вернутся в течение 3-10 рабочих дней в зависимости от банка.

                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Правила возврата средств при частичной отмене заказа'}>
                                        В большинстве случаев средства при оплате не списываются, а замораживаются на Вашем счете и списываются лишь после окончательного подтверждения заказа. Если нам не удастся подтвердить заказ частично, то часть денег, которая подлежит возврату, моментально разморозится и вернется на Ваш счет. Вам для этого ничего делать не потребуется. Если деньги уже списались с Вашего счета, то при частичной отмене заказа часть денег вернется в течение 3-10 рабочих дней в зависимости от банка.
                                        <br/>
                                        Оплата за ту часть заказа, которая успешна подтверждена, будет списана с Вашего счета.
                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Возможна ли оплата криптовалютой?'}>
                                        На сайте не предусмотрена оплата криптовалютой. В Российской Федерации запрещено принимать цифровые деньги.
                                    </LoyaltyFAQ>
                                </div>



                                <Image src={refund} alt='' width={60}/>
                                <h4 className={'my-3'}>Возврат</h4>
                                <p className={s.text}>
                                    Многие представленные на нашей платформе товары выкупаются специально под Вас у частных продавцов, коллекционеров или из разных иностранных бутиков и магазинов, поэтому мы не способны предложить Вам возврат товара после подтверждения заказа на все позиции. Однако есть ряд моделей, которые вскоре будут подлежать возврату, в том числе даже некоторые эксклюзивные коллекции. Они будут помечены
                                    значком <Image src={returnImg} alt={''}/>. Обращаем внимание, что по правилам зарубежных продавцов, возврат
                                    возможен в течение 7 - 30 календарных дней с момента поставки товара на зарубежный склад. Однако срок доставки
                                    заказов от склада за рубежом до получателя в РФ может быть больше в связи с ограничениями
                                    и особенностями международной логистики. Кроме того, условия возврата могут быть связаны с
                                    особенностями законов страны, из которой товар был для Вас выкуплен. Несмотря на это SELLOUT
                                    всячески содействует по организации возврата товаров. В случае обнаружения брака или
                                    ненадлежащего качества Вам необходимо связаться с нами для решения проблемы. Мы
                                    постоянно стремимся увеличить ассортимент товаров, подлежащих возврату,
                                    чтобы Ваши покупки с нами стали еще более удобными!

                                </p>
                                <div className={s.faq_block}>
                                    <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                                    <LoyaltyFAQ title={'Что делать, если пришел не тот товар?'}>
                                        Если вам пришёл поврежденный или несоответствующий заказу товар, откажитесь от него при получении и свяжитесь с нами для выяснения обстоятельств и урегулирования вопроса. Также мы настоятельно рекомендуем снимать процесс вскрытия товара, чтобы избежать
                                        недопониманий!
                                        <ul>
                                            <li>Попросите у сотрудника «акт несоответствия», заполните его и сфотографируйте.</li>
                                            <li>Верните товар сотруднику службы доставки и приложите к нему акт. </li>
                                            <li>Незамедлительно напишите нам в службу поддержки по электронному адресу <a href={'mailto:customerservice@sellout.su'} className={'text-black'}>customerservice@sellout.su</a>, прикрепите к письму фотографию акта несоответствия и укажите проблему.</li>
                                            <li>Проверка заявления и возврат денежных средств осуществляются в срок до 10 календарных дней с момента отказа от товара при получении.</li>
                                        </ul>
                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Что делать с неподошедшим товаром?'}>
                                        Мы искренне стараемся помочь Вам в такой ситуации, поэтому обязательно напишите нам, если Вам не подошел товар. Мы попробуем продать его через нашу платформу и иные каналы продажи на особых условиях для Вас, и, возможно, Вам даже удастся заработать!

                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Можно ли вернуть только часть заказа?'}>
                                        На частичный возврат товаров распространяются точно такие же правила, как и описано выше.
                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Как быстро вернутся деньги за возврат?'}>
                                        В большинстве случаев средства при оплате не списываются, а замораживаются на Вашем счете и списываются лишь после окончательного подтверждения заказа. Если нам не удастся подтвердить заказ или придется его вернуть, то деньги моментально разморозятся и вернутся на Ваш счет. Вам для этого ничего делать не потребуется. Если деньги уже списались с Вашего счета, то при отмене или возврате заказа деньги вернутся в течение 3-10 рабочих дней в зависимости от банка.

                                    </LoyaltyFAQ>
                                    <LoyaltyFAQ title={'Можно ли отказаться от заказа до его получения?'}>
                                        Это возможно только в том случае, если заказ еще не был подтвержден и передан в обработку. Сообщите о своем желании отказаться от заказа как можно скорее на нашу почту <a href={'mailto:customerservice@sellout.su'} className={'text-black'}>customerservice@sellout.su</a>
                                    </LoyaltyFAQ>
                                </div>
                                <h5>Ответы на большинство вопросов Вы найдете здесь: <Link href={'/faq'} className={s.link} target={'_blank'}>FAQ</Link></h5>

                            </TextModal>
                            <TextModal title={'Остались вопросы?'} img={how}>
                                <div className={s.content}>
                                    <Image src={headphones} alt='' width={60}/>
                                    <div className={s.text_cont}>
                                        <h5>Если у Вас остались вопросы в том числе по данному товару, Вы всегда можете
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
                                        <div className={s.faq_block}>
                                            <h5 className={'text-center'}>Часто задаваемые вопросы</h5>
                                            <LoyaltyFAQ title={'Что делать, если у выбранного товара отсутствует Ваш размер?'}>
                                                Так как многие представленные на нашей платформе товары являются лимитированными, некоторые размеры
                                                товара могут отсутствовать. Однако не стоит отчаиваться, Вы всегда можете написать нам в службу поддержки, и мы постараемся найти
                                                желанный лот в Вашем размере или предложить похожий товар в качестве альтернативы!

                                            </LoyaltyFAQ>
                                            <LoyaltyFAQ title={'Можно ли оформить заказ, позвонив или написав нам?'}>
                                                Да, Вы всегда можете написать нам в службу поддержки, и мы поможем Вам и выбрать, и оформить заказ.
                                                Вы также можете написать нам, какой товар ищете, и мы сами найдем его для Вас и предложим к заказу!

                                            </LoyaltyFAQ>
                                            <LoyaltyFAQ title={'Где узнать больше информации о товаре?'}>
                                                Если Вы хотите узнать больше о составе, комплектации и иных характеристиках товара, Вы всегда можете обратиться к нам, и наши специалисты ответят на все вопросы и
                                                предоставят исчерпывающую информацию о товаре!

                                            </LoyaltyFAQ>
                                            <LoyaltyFAQ title={'Можно ли примерить товар перед приобретением?'}>
                                                К сожалению, на данный момент услуга примерки товара недоступна. Мы собираем предложения со всего мира, поэтому предоставить возможность примерить товар перед покупкой не получится. Мы ежедневно работаем над тем, чтобы улучшить сервис и сделать примерку осуществимой! Однако Вы можете самостоятельно посетить другой магазин или бутик бренда и примерить интересующую модель или похожую, чтобы
                                                определиться с размером, а затем заказать на нашей платформе по лучшей цене ;)

                                            </LoyaltyFAQ>
                                            <LoyaltyFAQ title={'Где можно примерить товар перед приобретением?'}>
                                                Вы всегда можете обратиться в службу поддержки, и наши специалисты постараются помочь Вам с выбором размера и подскажут, где можно померить интересующую модель
                                                или похожую, чтобы затем заказать на нашей платформе по лучшей цене ;)

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
                            {/*<QuestionsDropdown/>*/}
                        </div>
                    </div>
                </div>
                {
                    compilations.map(el =>
                        <Compilation arr={el.products} title={el.name}/>
                    )
                }
                {lastSeen.length > 0 &&
                    <Compilation arr={lastSeen} title={'Ранее просмотренные'}/>
                }
            </div>
        </MainLayout>
    );
};

export default observer(OneProductPage);