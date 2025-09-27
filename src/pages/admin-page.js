import MainLayout from "@/layout/MainLayout";
import React, {useContext, useEffect, useRef, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import s from '../styles/products.module.css'
import Recommendations from "@/components/shared/Recommendations/Recommendations";
import BuyoutModal from "@/components/shared/BuyoutModal/BuyoutModal";
import PageSwitch from "@/components/pages/product/PageSwitch/PageSwitch";
import BigPicture from "@/components/shared/BigPicture/BigPicture";
import FiltersBlock from "@/components/pages/product/FiltersBlock/FiltersBlock";
import SortDropdown from "@/components/pages/product/SortDropdown/SortDropdown";
import FilterDropdowns from "@/components/pages/product/FilterDropdowns/FilterDropdowns";
import Viewed from "@/components/pages/product/Viewed/Viewed";
import ProductList from "@/components/pages/product/ProductList/ProductList";
import filter from '@/static/icons/filter.svg'
import Image from "next/image";
import {fetchFilter, fetchPagesCnt, fetchProductsByArray, fetchProductsPage} from "@/http/productsApi";
import {useRouter} from "next/router";
import {Context} from "@/context/AppWrapper";
import {observer} from "mobx-react-lite";
import Head from "next/head";
import PictureBlock from "@/components/shared/UI/PictureBlock/PictureBlock";
import Compilation from "@/components/shared/Compilation/Compilation";
import cross from "@/static/icons/x-lg.svg";
import jwtDecode from "jwt-decode";
import {fetchLastSeen} from "@/http/userApi";
import {parse} from "cookie";
import Cookies from "js-cookie";


export const getServerSideProps = async (context) => {
    const products = await fetchProductsPage(context.query)
    const categories = await fetchFilter('tree_cat')
    const lines = await fetchFilter('tree_line')
    const colors = await fetchFilter('colors')
    const collections = await fetchFilter('collections')
    const brandsArr = await fetchFilter('brands')
    const categoriesArr = await fetchFilter('categories')
    const linesArr = await fetchFilter('line_no_child')
    const cookies = parse(context.req.headers.cookie || '')
    const token = cookies['access_token']
    let lastSeen = []
    if (token) {
        const userData = await jwtDecode(token)
        const {user_id} = userData
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
    return { props: {products, categories, lines, colors, collections, brandsArr,
        categoriesArr, linesArr, lastSeen} }
}

const AdminPage = ({products, categories, lines, colors, collections, brandsArr, categoriesArr,
                   linesArr, lastSeen}) => {
    const productListRef = useRef(null)
    const router = useRouter()
    const page = Number(router.query.page) || 1
    const [totalProducts, setTotalProducts] = useState(' ')
    const [isOpen , setIsOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const {filterStore, desktopStore, adminStore} = useContext(Context)
    useEffect(() => {
        filterStore.fillCat(categories)
        if (!filterStore.lineQ) {
            filterStore.fillLines(lines)
        }
        filterStore.fillColors(colors)
        if (!filterStore.collabQ) {
            filterStore.fillCollections(collections)
        }
        filterStore.deactivateFilters(filterStore.filters)
        filterStore.reactivateFilters(router.query)
        filterStore.setMinPrice(products.min_price)
        filterStore.setMaxPrice(products.max_price)
        filterStore.setRef(productListRef)
        adminStore.setBrand(brandsArr)
        adminStore.setCategories(categoriesArr)
        adminStore.setLines(linesArr)
    }, [products])
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
        router.push('/products', undefined, {scroll: false})
        filterStore.handleScrollTo()
    }
    useEffect(() => {
        const token = Cookies.get('access_token')
        fetchPagesCnt(router.query, token).then(res => {
            setTotalProducts(res.count)
        })
    }, [router.asPath])
    return (
        <MainLayout>
            <Head>
                <title>Товары</title>
            </Head>
            <div className={`${s.cont} custom_cont`}>
                <PictureBlock obj={products.desktop} className={s.desktop}/>
                <PictureBlock obj={products.mobile} className={s.mobile}/>
                {desktopStore.isDesktop &&
                    <div className={s.filter_sort_row}>
                        <Col lg={10} className='d-flex align-items-stretch'>
                            <button className={s.border + ' fw-bold'}
                                    onClick={() => setIsOpen(!isOpen)}
                            >Фильтры
                            </button>
                            {(filterStore.activeFilters.length !== 0 || router.query.price_min) &&
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
                    <div className='d-flex justify-content-evenly align-items-center'>
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
                    {isOpen &&
                        <FilterDropdowns/>
                    }
                    <ProductList products={products.results} isAdmin={true}/>
                </div>
                <PageSwitch currentPage={page} totalProducts={totalProducts}/>
            </div>
            <div className={'custom_cont'}>
                {lastSeen.length > 0 &&
                    <Compilation arr={lastSeen} title={'Ранее просмотренные'}/>
                }
            </div>
            <BuyoutModal/>



            {modalOpen &&
                <div className={s.modal}>
                    <Container>
                        <div className='d-flex justify-content-between'>
                            <div className={s.modal_header}>
                                <div className='d-flex align-items-center'>
                                    <div className={s.modal_text}>Фильтры</div>
                                    <div className={s.number}>{filterStore.activeFilters.length}</div>
                                </div>
                                <button className={s.modal_btn}
                                        onClick={clearFilters}
                                >Сбросить все</button>
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

export default observer(AdminPage);