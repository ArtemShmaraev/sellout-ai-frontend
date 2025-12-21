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
            const {pathname} = router
            const query = {...router.query}
            query.page = currentPage-1
            router.push({pathname, query}, undefined, {scroll: false})
            filterStore.handleScrollTo()
        }
    }
    const nextPage = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (currentPage < 100000) {
            const {pathname} = router
            const query = {...router.query}
            query.page = currentPage+1
            router.push({pathname, query}, undefined, {scroll: false})
            filterStore.handleScrollTo()
        }
    }
    return (
        <div className={s.container + ' custom_cont'}>
            <div className='d-flex justify-content-between'>
                <a className={s.previous} href=''
                   onClick={(e) => previousPage(e)}
                   style={currentPage > 1 ? {color: '#000'} : {color: '#E6E6E6'}}
                >{'< Предыдущая'}</a>
                <div className={s.page}>{`${currentPage} из ${totalProducts}`}</div>
                <a className={s.next}
                   onClick={(e) => nextPage(e)}
                   style={currentPage < 100000 ? {color: '#000'} : {color: '#E6E6E6'}}
                >{'Следующая >'}</a>
            </div>
        </div>
    );
};

export default PageSwitch;