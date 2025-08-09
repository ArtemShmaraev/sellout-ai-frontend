import React, {useState} from 'react';
import s from './QuestionDropdown.module.css'
import Arrow from "@/components/shared/UI/Arrow/Arrow";
import Link from "next/link";

const QuestionsDropdown = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className={s.dropdown}>
            <button className={s.toggle_btn} onClick={() => setIsOpen(!isOpen)}>
                <div className={s.btn_block}>
                    <div>Остались вопросы?</div>
                    <Arrow isOpen={isOpen}/>
                </div>
            </button>
            {isOpen &&
                <div className={s.text_block}>
                    <p className={s.text}>Ответы на большинство вопросов вы сможете найти здесь: <Link href="/faq" className={s.link}>FAQ</Link></p>
                    <p className={s.text}>Если у вас остались вопросы, напишите в поддержку, мы обязательно вам поможем:</p>
                    <div>
                        <a href={'mailto:customerservice@sellout.su'}
                           className={s.text}>Почта: customerservice@sellout.su</a>
                    </div>
                    <div>
                        <a href={'https://wa.me/message/L2OINP6KNMNLA1'}
                           target={'_blank'}
                           className={s.text}>WhatsApp: +7 993 896-92-27</a>
                    </div>
                    <div>
                        <a href={'https://t.me/sellout_official'}
                           target={'_blank'}
                           className={s.text}>Telegram: @sellout_official</a>
                    </div>
                </div>
            }
        </div>
    );
};

export default QuestionsDropdown;