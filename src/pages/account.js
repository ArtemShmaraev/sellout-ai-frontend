import React from 'react';
import MainLayout from "@/layout/MainLayout";
import {Container} from "react-bootstrap";
import s from '@/styles/Account.module.css'

const Account = () => {
    return (
        <MainLayout>
            <Container style={{marginTop: '150px'}}>
                Account
            </Container>
        </MainLayout>
    );
};

export default Account;