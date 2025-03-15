import React from 'react';
import s from './PageSwitch.module.css'
import {Container} from "react-bootstrap";
import {useRouter} from "next/router";

const PageSwitch = ({currentPage}) => {
    const router = useRouter()
    const previousPage = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (currentPage !== 1) {
            router.push(`/products?page=${currentPage-1}`)
        }
    }
    const nextPage = (e) => {
        e.preventDefault()
        e.stopPropagation()
        router.push(`/products?page=${currentPage+1}`)
    }
    return (
        <Container className={s.container}>
            <div className='d-flex justify-content-between'>
                <a className={s.previous} href=''
                   onClick={(e) => previousPage(e)}
                >{'< Предыдущая'}</a>
                <div className={s.page}>{`${currentPage} из n`}</div>
                <a className={s.next}
                   onClick={(e) => nextPage(e)}
                >{'Следующая >'}</a>
            </div>
        </Container>
    );
};

export default PageSwitch;