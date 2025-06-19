import React from 'react';
import MainLayout from "@/layout/MainLayout";
import s from '@/styles/FAQ.module.css'
import FaqDropdown from "@/components/pages/faq/FaqDropdown/FaqDropdown";
import Head from "next/head";
import Section from "@/components/pages/faq/Section/Section";

const Faq = () => {
    return (
        <MainLayout>
            <Head>
                <title>FAQ</title>
            </Head>
            <div className={s.cont + ' custom_cont'}>
                <h4>FAQs</h4>
                <Section label={'Банальный вопрос - анальный ответ'}>
                    <FaqDropdown label={'Вопрос'}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab asperiores beatae cumque
                        cupiditate dicta eius,
                        fugiat impedit nemo, nostrum perferendis quibusdam, reprehenderit repudiandae
                        sunt suscipit vero. Amet mollitia qui quos!
                    </FaqDropdown>
                </Section>
                <Section label={'Банальный вопрос - анальный ответ'}>
                    <FaqDropdown label={'Вопрос'}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab asperiores beatae cumque
                        cupiditate dicta eius,
                        fugiat impedit nemo, nostrum perferendis quibusdam, reprehenderit repudiandae
                        sunt suscipit vero. Amet mollitia qui quos!
                    </FaqDropdown>
                </Section>

            </div>
        </MainLayout>
    );
};

export default Faq;