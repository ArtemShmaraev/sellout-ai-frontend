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
import {fetchFilter, fetchProductsByArray, fetchProductsPage, fetchSizes} from "@/http/productsApi";
import {useRouter} from "next/router";
import {Context} from "@/context/AppWrapper";
import {observer} from "mobx-react-lite";
import {parse} from "cookie";
import {fetchLastSeen} from "@/http/userApi";
import jwtDecode from "jwt-decode";
import Head from "next/head";
import PictureBlock from "@/components/shared/UI/PictureBlock/PictureBlock";

export const getServerSideProps = async (context) => {
    const cookies = parse(context.req.headers.cookie || '')
    const token = cookies['access_token']
    const products = await fetchProductsPage(context.query, token)
    const categories = await fetchFilter('tree_cat')
    const lines = await fetchFilter('tree_line')
    const colors = await fetchFilter('colors')
    const collections = await fetchFilter('collabs')
    const sizes = await fetchSizes(context.query, token)
    let lastSeen = []
    if (token) {
        const {user_id} = jwtDecode(token)
        lastSeen = await fetchLastSeen(context.req.headers.cookie, user_id)
    } else {
        const arr = cookies['last_seen'].trim().split(' ')
        if (arr[0] !== '') {
            lastSeen = await fetchProductsByArray(arr)
        }
    }
    return { props: {products, categories, lines, colors, collections, sizes, lastSeen} }
}
const Products = ({products, categories, lines, colors, collections, sizes, lastSeen}) => {
    const productListRef = useRef(null)
    const router = useRouter()
    const page = Number(router.query.page) || 1
    const totalProducts = Number(products.count) || 1
    const [isDesktop, setIsDesktop] = useState(true)
    const [isOpen , setIsOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const {filterStore} = useContext(Context)
    useEffect(() => {
        filterStore.fillCat(categories)
        if (!filterStore.lineQ) {
            filterStore.fillLines(lines)
        }
        filterStore.fillColors(colors)
        if (!filterStore.collabQ) {
            filterStore.fillCollections(collections)
        }
        filterStore.fillSizes(sizes)
        filterStore.deactivateFilters(filterStore.filters)
        filterStore.reactivateFilters(router.query)
        filterStore.setMinPrice(products.min_price)
        filterStore.setMaxPrice(products.max_price)
        filterStore.setRef(productListRef)
    }, [products])
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
    const handleClick = () => {
        if (isDesktop) {
            setIsOpen(!isOpen)
        } else {
            setModalOpen(!modalOpen)
        }
    }
    const clearFilters = () => {
        filterStore.deactivateFilters(filterStore.filters)
        router.push('/products', undefined, {scroll: false})
        filterStore.handleScrollTo()
    }
    return (
        <MainLayout>
            <Head>
                <title>Товары</title>
            </Head>
            <div className={`${s.cont} custom_cont`}>
                <PictureBlock obj={isDesktop ? products.desktop : products.mobile}/>
                {isDesktop &&
                    <div className={s.filter_sort_row}>
                        <Col lg={10} className='d-flex'>
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
                {!isDesktop &&
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
                    <ProductList products={products.results} isAdmin={false}/>
                </div>
                <PageSwitch currentPage={page} totalProducts={totalProducts}/>
                <BuyoutModal/>
                <Recommendations/>
                {lastSeen.length > 0 &&
                    <Viewed lastSeen={lastSeen}/>
                }



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
                                <svg onClick={handleClick}
                                     xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill=""
                                     className="bi bi-x-lg" viewBox="0 0 16 16" style={{cursor: 'pointer'}}>
                                    <path
                                        d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                                </svg>
                            </div>
                            <FiltersBlock/>
                            <FilterDropdowns/>
                            <div className='d-flex justify-content-center'>
                                <button className={s.results} onClick={handleClick}>Показать результаты</button>
                            </div>
                        </Container>
                    </div>
                }
            </div>
        </MainLayout>
    );
};

export default observer(Products);