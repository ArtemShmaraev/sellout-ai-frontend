import React, {useContext} from 'react';
import s from './PageSwitch.module.css'
import {Container} from "react-bootstrap";
import {useRouter} from "next/router";
import {Context} from "@/context/AppWrapper";

const PageSwitch = ({currentPage, totalProducts}) => {
    const {filterStore} = useContext(Context)
    const router = useRouter()
    const getTotalPages = (totalProducts) => {
        return Math.ceil(totalProducts/60)
    }
    const previousPage = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (currentPage !== 1) {
            router.push(`/products?page=${currentPage-1}&${filterStore.getAllQuery(router)}`)
        }
    }
    const nextPage = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (currentPage < getTotalPages(totalProducts)) {
            router.push(`/products?page=${currentPage+1}&${filterStore.getAllQuery(router)}`)
        }
    }
    return (
        <Container className={s.container}>
            <div className='d-flex justify-content-between'>
                <a className={s.previous} href=''
                   onClick={(e) => previousPage(e)}
                   style={currentPage > 1 ? {color: '#000'} : {color: '#E6E6E6'}}
                >{'< Предыдущая'}</a>
                <div className={s.page}>{`${currentPage} из ${getTotalPages(totalProducts)}`}</div>
                <a className={s.next}
                   onClick={(e) => nextPage(e)}
                   style={currentPage < getTotalPages(totalProducts) ? {color: '#000'} : {color: '#E6E6E6'}}
                >{'Следующая >'}</a>
            </div>
        </Container>
    );
};

export default PageSwitch;