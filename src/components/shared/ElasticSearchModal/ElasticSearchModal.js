import React, {useState} from 'react';
import s from './ElasticSearchModal.module.css'
import search from '@/static/icons/search.svg'
import close from '@/static/icons/x-lg.svg'
import Image from "next/image";
import {Container} from "react-bootstrap";
import SearchInput from "@/components/shared/UI/SearchInput/SearchInput";
import {useRouter} from "next/router";

const ElasticSearchModal = () => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState('')
    const q = () => {
        const query = router.query
        query.q = value
        const pathname = '/products'
        router.push({pathname, query})
        setIsOpen(false)
    }
    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={s.toggle_btn}
            >
                <div className={s.btn_text}>
                    Поиск
                    <Image src={search} alt=''/>
                </div>
            </button>
            {isOpen &&
                <div className={s.modal} onClick={() => setIsOpen(false)}>
                    <div className={s.search_block} onClick={(e) => e.stopPropagation()}>
                        <Container>
                            <div className={s.close_block}>
                                <Image src={close}
                                       alt=''
                                       onClick={() => setIsOpen(false)}
                                       className={s.icon}
                                />
                            </div>
                            <div className='d-flex justify-content-center'>
                                <div className={s.main_block}>
                                    <SearchInput w100={true}
                                                 value={value}
                                                 onChange={e => {
                                                     setValue(e.target.value)
                                                 }}
                                    />
                                </div>
                            </div>
                            <button onClick={q}>Поиск</button>
                        </Container>
                    </div>
                </div>
            }
        </>
    );
};

export default ElasticSearchModal;