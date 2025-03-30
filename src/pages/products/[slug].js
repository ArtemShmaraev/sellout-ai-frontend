import React, {useCallback, useContext, useEffect, useState} from 'react';
import s from '@/styles/OneProductPage.module.css'
import {Carousel, Col, Container, Row} from "react-bootstrap";
import shoe from "@/static/img/shoe.png";
import shoe2 from '@/static/img/shoe2.png'
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
import Recommendations from "@/components/shared/Recommendations/Recommendations";
import Image from 'next/image'
import {fetchOneProduct, fetchPrices} from "@/http/productsApi";
import MainLayout from "@/layout/MainLayout";
import {useRouter} from "next/router";
import {Context} from "@/context/AppWrapper";
import {observer} from "mobx-react-lite";
import AuthModal from "@/components/shared/AuthModal/AuthModal";
import Cookies from "js-cookie";
import {addToWishlist, removeFromWishlist} from "@/http/wishlistAPI";
import {parse} from "cookie";
import RenderBtns from "@/components/pages/oneProduct/RenderBtns/RenderBtns";
import {addToCart} from "@/http/cartApi";

export const getServerSideProps = async (context) => {
    const cookies = parse(context.req.headers.cookie || '')
    const token = cookies['access_token']
    const product = await fetchOneProduct(context.params.slug, token)
    const {id} = product
    const prices = await fetchPrices(id)
    return { props: {product, prices} }
}

const OneProductPage = ({product, prices}) => {
    const [moreOpen, setMoreOpen] = useState(false)
    const [isDesktop, setIsDesktop] = useState(true)
    const {productStore, userStore} = useContext(Context)
    const router = useRouter()
    useEffect(() => {
        productStore.clearAll()
    }, [])
    const brandsDisplay = (brands) => {
        if (!brands) {
            return 'No brand'
        }
        for (let i = 0; i < brands.length; i++) {
            if (brands[i].name === 'Yeezy') {
                return 'Adidas Yeezy'
            }
        }
        if (brands.length > 1) {
            let str = brands[0].name
            for (let i = 1; i < brands.length; i++) {
                str += ` x ${brands[i].name}`
            }
            return str
        }
        return brands[0].name
    }
    const clickBrand = (brands) => {
        const query = {}
        if (brands.length > 1) {
            query.brand = []
            for (let i = 0; i < brands.length; i++) {
                query.brand.push(brands[i].name)
            }
        } else {
            query.line = brands[0].name
        }
        router.push({
            pathname: '/products',
            query: query
        })
    }
    useEffect(() => {
        const width = window.innerWidth
        if (width <= 1000) {
            setIsDesktop(false)
        }
    }, [isDesktop])
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
        Cookies.set('cart', cart + productStore.shipChosen + ' ')
        productStore.setText(Cookies.get('cart').trim().split(' '), productStore.shipChosen)
        if (userStore.isLogged) {
            const token = Cookies.get('access_token')
            const userId = userStore.id
            const data = await addToCart(userId, productStore.shipChosen, token)
        }
    }
    return (
        <MainLayout>
            <Container className={s.container}>
                <Row>
                    <Col lg={7}>
                        {!isDesktop &&
                            <>
                                <a className={s.brand}
                                   onClick={() => clickBrand(product.brands)}
                                >{brandsDisplay(product.brands)}</a>
                                <div className={s.model}>{product.model}</div>
                                <div className={s.color}>{product.colorway}</div>
                                <div
                                    className={s.price_default}
                                    style={product.is_sale
                                        ? {textDecoration: 'line-through', fontSize: '16px'}
                                        : {textDecoration: 'none', fontSize: '19px'}}
                                >от {product.min_price}</div>
                                <div className='d-flex align-items-center'>
                                    {product.is_sale &&
                                        <div className={s.price_sale}>
                                            от 100 $
                                        </div>
                                    }
                                    {product.is_fast_shipping && <Image src={truck} alt="" className={s.icons}/>}
                                    {product.is_return && <Image src={refund} alt="" className={s.icons}/>}
                                </div>
                            </>
                        }
                        <Carousel
                            variant='dark'
                            indicators={false}
                            interval={null}
                        >
                            <Carousel.Item>
                                <Image className={s.photo}
                                       src={shoe} alt="shoe"/>
                            </Carousel.Item>
                            <Carousel.Item>
                                <Image className={s.photo}
                                       src={shoe2} alt="shoe"/>
                            </Carousel.Item>
                        </Carousel>
                        {!isDesktop &&
                            <>
                                <div className={s.modals_block}>
                                    <SizeTable/>
                                    <SizeHelp/>
                                </div>
                                <SizeChoice prices={prices} productId={product.id}/>
                                {
                                    productStore.sizeChosen &&
                                    <div className={s.btn_group}>
                                        <RenderBtns btns={productStore.shipps}/>
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
                            <Row>
                                <Col lg={6}>
                                    <div className={s.model}>{brandsDisplay(product.brands)}</div>
                                    <div className={s.more_color}>{product.colorway}</div>
                                    <p className={s.description}>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto debitis eos
                                        esse facere,
                                        impedit incidunt neque non officiis quis totam. A accusamus adipisci animi, dolorem
                                        doloremque facere
                                        magni natus nobis quam, repellendus reprehenderit repudiandae.
                                        Adipisci aperiam deserunt eveniet non quibusdam ratione repudiandae soluta unde velit vero?
                                        Cumque deserunt quo vero.
                                    </p>
                                </Col>
                                <Col lg={6}>
                                    <div className={s.characteristics_title}>Характеристики товара:</div>
                                    <p className={s.characteristics}>Артикул:
                                        <span className={s.characteristics_text}>{product.manufacturer_sku}</span>
                                    </p>
                                    <p className={s.characteristics}>Цвет:
                                        <span className={s.characteristics_text}>{product.main_color.russian_name}</span><
                                    /p>
                                </Col>
                            </Row>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <button
                                className={s.more_btn}
                                onClick={()=> setMoreOpen(!moreOpen)}>
                                <div className={s.more_text}>Подробнее</div>
                                <Arrow isOpen={moreOpen}/>
                            </button>
                        </div>
                    </Col>
                    <Col lg={5}>
                        {isDesktop &&
                            <>
                                <a className={s.brand}
                                   onClick={() => clickBrand(product.brands)}
                                >{brandsDisplay(product.brands)}</a>
                                <div className={s.model}>{product.model}</div>
                                <div className={s.color}>{product.colorway}</div>
                                <div
                                    className={s.price_default}
                                    style={product.is_sale
                                        ? {textDecoration: 'line-through', fontSize: '16px'}
                                        : {textDecoration: 'none', fontSize: '19px'}}
                                >от {product.min_price}</div>
                                <div className='d-flex align-items-center'>
                                    {product.is_sale &&
                                        <div className={s.price_sale}>
                                            от 100 $
                                        </div>
                                    }
                                    {product.is_fast_shipping && <Image src={truck} alt="" className={s.icons}/>}
                                    {product.is_return && <Image src={refund} alt="" className={s.icons}/>}
                                </div>
                                <div className={s.modals_block}>
                                    <SizeTable/>
                                    <SizeHelp model={`${brandsDisplay(product.brands)} ${product.model}`}/>
                                </div>
                                <SizeChoice prices={prices} productId={product.id}/>
                                {
                                    productStore.sizeChosen &&
                                    <div className={s.btn_group}>
                                        <RenderBtns btns={productStore.shipps}/>
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
                    </Col>
                </Row>
                <Recommendations/>
            </Container>
        </MainLayout>
    );
};
//Денис Феоктистов хуесос
export default observer(OneProductPage);