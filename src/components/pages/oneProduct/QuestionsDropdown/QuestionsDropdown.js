import React, {useState} from 'react';
import s from './QuestionDropdown.module.css'
import Arrow from "@/components/shared/UI/Arrow/Arrow";

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
                    <p className={s.text}>Ответы на большинство вопросов Вы сможете найти здесь: <a href="" className={s.link}>FAQ</a></p>
                    <p className={s.text}>Если у Вас остались вопросы, обратитесь в поддержку, мы обязательно Вам поможем:</p>
                    <p className={s.text}>Email: support@sellout.su</p>
                </div>
            }
        </div>
    );
};

export default QuestionsDropdown;