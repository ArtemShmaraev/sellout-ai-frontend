import MainLayout from "@/layout/MainLayout";
import {useContext, useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import s from '../styles/products.module.css'
import Recommendations from "@/components/shared/Recommendations/Recommendations";
import BuyoutModal from "@/components/shared/BuyoutModal/BuyoutModal";
import PageSwitch from "@/components/pages/product/PageSwitch/PageSwitch";
import BigPicture from "@/components/shared/BigPicture/BigPicture";
import BreadcrumbC from "@/components/shared/BreadcrumbC/BreadcrumbC";
import FiltersBlock from "@/components/pages/product/FiltersBlock/FiltersBlock";
import SortDropdown from "@/components/pages/product/SortDropdown/SortDropdown";
import FilterDropdowns from "@/components/pages/product/FilterDropdowns/FilterDropdowns";
import Viewed from "@/components/pages/product/Viewed/Viewed";
import ProductList from "@/components/pages/product/ProductList/ProductList";
import filter from '@/static/icons/filter.svg'
import Image from "next/image";
import {fetchProductsPage} from "@/http/productsApi";
import {useRouter} from "next/router";
import {Context} from "@/context/AppWrapper";

export const getServerSideProps = async (context) => {
    const products = await fetchProductsPage(context.query)
    return { props: { products } }
}
const Products = ({products}) => {
    const router = useRouter()
    const page = Number(router.query.page) || 1
    const totalProducts = Number(products.count) || 1
    const [isDesktop, setIsDesktop] = useState(true)
    const [isOpen , setIsOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const {filterStore} = useContext(Context)
    useEffect(() => {
        filterStore.dfsPath(filterStore.filters, [])
        const width = window.innerWidth
        if (width <= 1000) {
            setIsDesktop(false)
        }
    }, [isDesktop])
    const handleClick = () => {
        if (isDesktop) {
            setIsOpen(!isOpen)
        } else {
            setModalOpen(!modalOpen)
        }
    }
    return (
        <MainLayout>
            <Container style={{marginTop: '150px'}}>
                <BigPicture/>
                <BreadcrumbC/>
                {isDesktop && <Row className='d-flex justify-content-lg-between align-items-center'>
                    <Col lg={10} className='d-flex'>
                        <button className={s.border + ' fw-bold'}
                                onClick={() => setIsOpen(!isOpen)}
                        >Фильтры
                        </button>
                        <FiltersBlock/>
                    </Col>
                    <Col lg={2} className='mt-lg-0 mt-2 d-flex justify-content-lg-end'>
                        <SortDropdown/>
                    </Col>
                </Row>}
                {!isDesktop &&
                    <div className='d-flex justify-content-center align-items-center'>
                        <button className={s.filter_toggle}
                                onClick={handleClick}
                        >
                            <Image src={filter} alt="" className={s.filter_icon}/>
                            Фильтры
                        </button>
                        <SortDropdown/>
                    </div>
                }
                <div className='d-flex mt-5'>
                    {isOpen &&
                        <FilterDropdowns/>
                    }
                    <ProductList products={products.results}/>
                </div>
                <PageSwitch currentPage={page} totalProducts={totalProducts}/>
                <BuyoutModal/>
                <Recommendations/>
                <Viewed/>



                {modalOpen &&
                    <div className={s.modal}>
                        <Container>
                            <div className='d-flex justify-content-between'>
                                <div className={s.modal_header}>
                                    <div className='d-flex align-items-center'>
                                        <div className={s.modal_text}>Фильтры</div>
                                        <div className={s.number}>3</div>
                                    </div>
                                    <button className={s.modal_btn}>Сбросить все</button>
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
            </Container>
        </MainLayout>
    );
};

export default Products;