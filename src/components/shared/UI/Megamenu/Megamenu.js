import React, {useRef, useState} from 'react';
import s from './Megamenu.module.css'
import {Col, Container, Row} from "react-bootstrap";
import picture from '@/static/img/shoe2.png'
import Image from "next/image";

const Megamenu = ({children, className}) => {
    const ref = useRef(null)
    const [isShown, setIsShown] = useState(false)
    return (
        <div>
            <p
                className={className}
                ref={ref}
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}
            >
                {children}
            </p>
            {isShown &&
                <div className={s.all}
                >
                    <div className={s.megamenu}
                         ref={ref}
                         onMouseEnter={() => setIsShown(true)}
                         onMouseLeave={() => setIsShown(false)}
                    >
                        <Container>
                            <Row>
                                <Col lg={3}>
                                    <h4 className={s.h_text}>Заголовок</h4>
                                    <div>Что то</div>
                                    <div>Что то</div>
                                    <div>Что то</div>
                                    <div>Что то</div>
                                </Col>
                                <Col lg={3}>
                                    <h4 className={s.h_text}>Заголовок</h4>
                                    <div>Что то</div>
                                    <div>Что то</div>
                                    <div>Что то</div>
                                    <div>Что то</div>
                                </Col>
                                <Col lg={6} className={s.pic_block}>
                                    <Col lg={6}>
                                        <div className={s.img_col}>
                                            <Image src={picture} alt=""/>
                                            <a href="">Посмотреть все...</a>
                                        </div>
                                    </Col>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <div className={s.black_area}
                         onMouseEnter={() => setIsShown(false)}
                    ></div>
                </div>
            }
        </div>
    );
};

export default Megamenu;