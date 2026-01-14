import React, {useContext, useEffect, useState} from 'react';
import s from './BigPicture.module.css'
import {Col, Row} from "react-bootstrap";
import pic from '@/static/img/shoe.png'
import Image from "next/image";
import {Context} from "@/context/AppWrapper";

const BigPicture = ({reversed = false, vertical = false}) => {
    const {desktopStore} = useContext(Context)
    return (
        <>
            {desktopStore.isDesktop && !vertical && !reversed &&
                <Row className={s.container + ' justify-content-between align-items-center'}>
                <Col lg={4}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus deleniti dolor
                        dolore dolorem doloribus et expedita in libero maiores modi, necessitatibus perferendis recusandae repudiandae rerum,
                        similique temporibus voluptatem voluptates. Asperiores doloremque natus rem. Alias amet deserunt eum quae sunt veniam.
                    </p>
                </Col>
                <Col lg={8} className={s.pic_col}>
                    <Image src={pic} alt='theme_pict'/>
                </Col>
            </Row>}
            {((!desktopStore.isDesktop || reversed) && !vertical) &&
                <Row className={s.container + ' justify-content-between align-items-center'}>
                    <Col lg={8} className={s.pic_col}>
                        <Image src={pic} alt='theme_pict'/>
                    </Col>
                    <Col lg={4}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus deleniti dolor
                            dolore dolorem doloribus et expedita in libero maiores modi, necessitatibus perferendis recusandae repudiandae rerum,
                            similique temporibus voluptatem voluptates. Asperiores doloremque natus rem. Alias amet deserunt eum quae sunt veniam.
                        </p>
                    </Col>
                </Row>
            }
            {vertical &&
                <Row className={s.container + ' justify-content-between align-items-center'}>
                    <Col lg={12} className={s.pic_col}>
                        <Image src={pic} alt='theme_pict'/>
                    </Col>
                    <Col lg={12}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus deleniti dolor
                            dolore dolorem doloribus et expedita in libero maiores modi, necessitatibus perferendis recusandae repudiandae rerum,
                            similique temporibus voluptatem voluptates. Asperiores doloremque natus rem. Alias amet deserunt eum quae sunt veniam.
                        </p>
                    </Col>
                </Row>
            }
        </>
    );
};

export default BigPicture;