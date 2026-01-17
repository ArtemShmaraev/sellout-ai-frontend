import MainLayout from "@/layout/MainLayout";
import React, {useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import s from '../styles/products.module.css'
import BuyoutModal from "@/components/shared/BuyoutModal/BuyoutModal";
import PageSwitch from "@/components/pages/product/PageSwitch/PageSwitch";
import FiltersBlock from "@/components/pages/product/FiltersBlock/FiltersBlock";
import SortDropdown from "@/components/pages/product/SortDropdown/SortDropdown";
import FilterDropdowns from "@/components/pages/product/FilterDropdowns/FilterDropdowns";
import ProductList from "@/components/pages/product/ProductList/ProductList";
import filter from '@/static/icons/filter.svg'
import TitleAndDescriptionSEO from '@/components/shared/Products/seo_title_description.json'
import Image from "next/image";
import {
    fetchFilter,
    fetchPagesCnt,
    fetchProductsByArray,
    fetchProductsPage,
    fetchProductsPageFooterText, fetchProductsPageHeaderText,
    fetchSizes
} from "@/http/productsApi";
import {useRouter} from "next/router";
import {Context} from "@/context/AppWrapper";
import {observer} from "mobx-react-lite";
import {parse} from "cookie";
import {fetchLastSeen} from "@/http/userApi";
import jwtDecode from "jwt-decode";
import Head from "next/head";
import PictureBlock from "@/components/shared/UI/PictureBlock/PictureBlock";
import Compilation from "@/components/shared/Compilation/Compilation";
import cross from '@/static/icons/x-lg.svg'
import Cookies from "js-cookie";
import cn from "classnames";
import loading_products_data from '@/static/jsons/loading_products_data.json'
// import {cookies} from "next/headers";

export const getServerSideProps = async (context) => {
    const cookies = parse(context.req.headers.cookie || '')
    const token = cookies['access_token']
    const gender = cookies['selected_gender']; // Получаем 'gender' из куки или устанавливаем значение по умолчанию 'all'
    let products;
    // if (gender && !("gender" in context.query)) {
    //     products = await fetchProductsPage({...context.query, gender}, token);
    // } else {
    //     products = await fetchProductsPage(context.query, token)
    // }
    //
    products = []


    const categories = await fetchFilter('tree_cat')
    const lines = await fetchFilter('tree_line')
    const colors = await fetchFilter('colors')
    const collections = await fetchFilter('collabs')
    const materials = await fetchFilter('materials')
    const sizes = await fetchSizes(context.query, token)

    let header_text;
    if (gender && !("gender" in context.query)) {
        header_text = await fetchProductsPageHeaderText({...context.query, gender});
    } else {

        header_text = await fetchProductsPageHeaderText(context.query)
    }
    const footer_text = await fetchProductsPageFooterText({...context.query, gender});
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
    const url = context.query
    return {props: {products, categories, lines, colors, collections, materials, sizes, lastSeen, url, footer_text, header_text}
    }
}
const Products = ({productsList, categories, lines, colors, collections, materials, sizes, lastSeen, url, footer_text, header_text}) => {
    const productListRef = useRef(null)
    const router = useRouter()
    const page = Number(router.query.page) || 1
    const [totalProducts, setTotalProducts] = useState(' ')
    const [isOpen, setIsOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const {filterStore, desktopStore} = useContext(Context)
    const [products, setProducts] = useState(loading_products_data)


    useEffect(() => {
        setProducts(loading_products_data)
    }, [router.asPath])

    useEffect(() => {
        const fetchData = async () => {
            // const cookies = parse(context.req.headers.cookie || '')
            const token = Cookies.get('access_token')
            const gender = Cookies.get('selected_gender')
            let data_products
            if (gender && !("gender" in url)) {
                data_products = await fetchProductsPage({...url, gender}, token);
            } else {

                data_products = await fetchProductsPage(url, token)
            }
            setProducts(data_products)
        };
        fetchData();
    }, [router.asPath])



    useEffect(() => {

        filterStore.fillCat(categories)
        if (!filterStore.lineQ) {
            filterStore.fillLines(lines)
        }
        filterStore.fillColors(colors)
        if (!filterStore.collabQ) {
            filterStore.fillCollections(collections)
        }
        filterStore.fillMaterials(materials)
        filterStore.fillSizes(sizes)
        filterStore.deactivateFilters(filterStore.filters)
        filterStore.reactivateFilters(router.query)

        filterStore.setMinPrice(products.min_price)
        filterStore.setMaxPrice(products.max_price)
        filterStore.setRef(productListRef)
    }, [router.asPath])



    const handleClick = () => {
        if (desktopStore.isDesktop) {
            setIsOpen(!isOpen)
        } else {
            if (!modalOpen) {
                document.body.classList.add('body-scroll-clip')
            } else {
                document.body.classList.remove('body-scroll-clip')
            }
            setModalOpen(!modalOpen)
        }
    }
    const clearFilters = () => {
        filterStore.deactivateFilters(filterStore.filters)
        // if (!query.hasOwnProperty('gender'))
        // {
        //
        // }
        const selectedGender = Cookies.get('selected_gender');

        if (selectedGender === 'M' || selectedGender === 'F') {
            router.push(`/products?gender=${selectedGender}`, undefined, {scroll: false})
        }
        filterStore.handleScrollTo()
        filterStore.setPriceFrom('')
        filterStore.setPriceTo('')
    }
    useEffect(() => {
        const token = Cookies.get('access_token')
        fetchPagesCnt(router.query, token).then(res => {
            setTotalProducts(res.count)
        })
    }, [router.asPath])

    const [isSend, setIsSend] = useState(false)
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => {
        setShow(true)
        setIsSend(false)
    };
    const getTitle = () => {
        // console.log(products)
        let title = desktopStore.isDesktop ? header_text.desktop.title : header_text.mobile.title
        if (title === 'sellout' || title === "" || title === "Загрузка") {
            title = 'Sellout'
        }
        // console.log(title);
        return title

    }
    const [visible, setVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);

    const checkScroll = () => {
        const currentScrollPos = window.pageYOffset;
        const visible = prevScrollPos > currentScrollPos;

        setPrevScrollPos(currentScrollPos);
        setVisible(visible);
    };

    useEffect(() => {
        window.addEventListener('scroll', checkScroll);
        // setProducts([])
        return () => window.removeEventListener('scroll', checkScroll);
    }, [prevScrollPos]);


    // title_and_description = Взять из json файла (как это сделать)
    return (
        <MainLayout footerData={footer_text}>
            <Head>
                <title>

                    {/*{title_and_description[getTitle()]}*/}

                    {getTitle() in TitleAndDescriptionSEO ? (
                        TitleAndDescriptionSEO[getTitle()]['title']
                    ) : (header_text.desktop.title ? `Купите ${header_text.desktop.title} по лучшей цене в РФ на Sellout` :
                            // Заголовок для случая, когда getTitle() равно "sellout"
                            "Sellout: онлайн-платформа брендовой одежды и обуви"
                    )}
                </title>
                <meta name={'description'} content=
                    {getTitle() in TitleAndDescriptionSEO ? (
                        TitleAndDescriptionSEO[getTitle()]['description']
                    ) : (
                        // Заголовок для случая, когда getTitle() равно "sellout"
                        "1 000 000+ лотов по лучшим ценам с гарантией оригинальности: от премиальных и лимитированных релизов до более доступных, но не менее желанных позиций"
                    )}/>


            </Head>
            <div className={`${s.cont} custom_cont`}>
                <PictureBlock obj={header_text.desktop} className={s.desktop}/>
                <PictureBlock obj={header_text.mobile} className={s.mobile}/>
                {desktopStore.isDesktop &&
                    <div className={cn(s.filter_sort_row)}
                         style={desktopStore.navbarVisible ? {top: 150} : {top: 0}}
                    >
                        <Col lg={10} className='d-flex align-items-stretch'>
                            <button className={s.border + ' fw-bold'}
                                    onClick={() => desktopStore.setFilterOpen(!desktopStore.filtersOpen)}
                            >Фильтры
                            </button>
                            {(filterStore.activeFilters.length !== 0 &&
                                    filterStore.activeFilters.some(el => !["M", "F", "K"].includes(el.query)) || router.query.price_min) &&
                                <button
                                    className={s.border}
                                    onClick={clearFilters}
                                >
                                    Сбросить фильтры
                                </button>
                            }
                            <FiltersBlock/>
                        </Col>
                        <Col lg={2} className='mt-lg-0 mt-2 d-flex justify-content-lg-end'>
                            <SortDropdown/>
                        </Col>
                    </div>
                }
                {!desktopStore.isDesktop &&
                    <div className={['d-flex justify-content-evenly align-items-center', s.mobile_sort_row].join(' ')}
                         style={desktopStore.navbarVisible ? {top: 90} : {top: 0}}
                    >
                        <button className={s.filter_toggle}
                                onClick={handleClick}
                        >
                            <Image src={filter} alt="" className={s.filter_icon}/>
                            Фильтры
                        </button>
                        <SortDropdown/>
                    </div>
                }
                <div className={s.product_list_row} ref={productListRef}>
                    {desktopStore.filtersOpen &&
                        <FilterDropdowns/>
                    }
                    <ProductList products={products.results} isAdmin={false}/>
                </div>
                <PageSwitch currentPage={page} totalProducts={totalProducts}/>
            </div>
            <div className={'custom_cont'}>
                {lastSeen.length > 0 &&
                    <Compilation arr={lastSeen} title={'Ранее просмотренные'}/>
                }
            </div>
            <div className={s.text_container}>
                <div className={s.text}>
                    Не нашли то, что искали? <br/>
                    Мы привезем для вас желанный лот!
                </div>
                <div className={'d-flex justify-content-center'}>
                    <button onClick={handleShow} className={s.toggle_btn}>Оставить заявку</button>
                </div>
            </div>
            <BuyoutModal show={show} handleClose={handleClose} isSend={isSend}/>

            {modalOpen &&
                <div className={s.modal}
                     style={desktopStore.navbarVisible ? {top: 92} : {top: 0}}
                >
                    <Container>
                        <div className='d-flex justify-content-between'>
                            <div className={s.modal_header}>
                                <div className='d-flex align-items-center'>
                                    <div className={s.modal_text}>Фильтры</div>
                                    <div className={s.number}>{filterStore.activeFilters.length}</div>
                                </div>
                                <button className={s.modal_btn}
                                        onClick={clearFilters}
                                >Сбросить все
                                </button>
                            </div>
                            <Image src={cross} alt='' onClick={handleClick} className={'cursor-pointer'}/>
                        </div>
                        <FiltersBlock/>
                        <FilterDropdowns/>
                        <div className='d-flex justify-content-center'>
                            <button className={s.results} onClick={handleClick}>Показать результаты</button>
                        </div>
                    </Container>
                </div>
            }
        </MainLayout>
    );
};

export default observer(Products);