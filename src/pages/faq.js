import React from 'react';
import MainLayout from "@/layout/MainLayout";
import {Container} from "react-bootstrap";
import s from '@/styles/FAQ.module.css'
import FaqDropdown from "@/components/pages/faq/FaqDropdown/FaqDropdown";

const Faq = () => {
    return (
        <MainLayout>
            <Container className={s.cont}>
                <h4>FAQs</h4>
                <hr/>
                <h6 className={s.h}>Раздел</h6>
                <FaqDropdown label={'Вопрос'}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab asperiores beatae cumque
                    cupiditate dicta eius,
                    fugiat impedit nemo, nostrum perferendis quibusdam, reprehenderit repudiandae
                    sunt suscipit vero. Amet mollitia qui quos!
                </FaqDropdown>
                <FaqDropdown label={'Вопрос'}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab asperiores beatae cumque
                    cupiditate dicta eius,
                    fugiat impedit nemo, nostrum perferendis quibusdam, reprehenderit repudiandae
                    sunt suscipit vero. Amet mollitia qui quos!
                </FaqDropdown>
                <FaqDropdown label={'Вопрос'}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab asperiores beatae cumque
                    cupiditate dicta eius,
                    fugiat impedit nemo, nostrum perferendis quibusdam, reprehenderit repudiandae
                    sunt suscipit vero. Amet mollitia qui quos!
                </FaqDropdown>
                <FaqDropdown label={'Вопрос'}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab asperiores beatae cumque
                    cupiditate dicta eius,
                    fugiat impedit nemo, nostrum perferendis quibusdam, reprehenderit repudiandae
                    sunt suscipit vero. Amet mollitia qui quos!
                </FaqDropdown>
                <FaqDropdown label={'Вопрос'}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab asperiores beatae cumque
                    cupiditate dicta eius,
                    fugiat impedit nemo, nostrum perferendis quibusdam, reprehenderit repudiandae
                    sunt suscipit vero. Amet mollitia qui quos!
                </FaqDropdown>
                <hr/>
                <h6 className={s.h}>Раздел</h6>
                <FaqDropdown label={'Вопрос'}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab asperiores beatae cumque
                    cupiditate dicta eius,
                    fugiat impedit nemo, nostrum perferendis quibusdam, reprehenderit repudiandae
                    sunt suscipit vero. Amet mollitia qui quos!
                </FaqDropdown>
                <FaqDropdown label={'Вопрос'}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab asperiores beatae cumque
                    cupiditate dicta eius,
                    fugiat impedit nemo, nostrum perferendis quibusdam, reprehenderit repudiandae
                    sunt suscipit vero. Amet mollitia qui quos!
                </FaqDropdown>
                <FaqDropdown label={'Вопрос'}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab asperiores beatae cumque
                    cupiditate dicta eius,
                    fugiat impedit nemo, nostrum perferendis quibusdam, reprehenderit repudiandae
                    sunt suscipit vero. Amet mollitia qui quos!
                </FaqDropdown>
                <FaqDropdown label={'Вопрос'}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab asperiores beatae cumque
                    cupiditate dicta eius,
                    fugiat impedit nemo, nostrum perferendis quibusdam, reprehenderit repudiandae
                    sunt suscipit vero. Amet mollitia qui quos!
                </FaqDropdown>
                <FaqDropdown label={'Вопрос'}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab asperiores beatae cumque
                    cupiditate dicta eius,
                    fugiat impedit nemo, nostrum perferendis quibusdam, reprehenderit repudiandae
                    sunt suscipit vero. Amet mollitia qui quos!
                </FaqDropdown>
            </Container>
        </MainLayout>
    );
};

export default Faq;