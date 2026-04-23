import React, {useContext} from 'react';
import {observer} from 'mobx-react-lite';
import s from './AiSearchModal.module.css';
import {Context} from '@/context/AppWrapper';

const SparkleIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2l2.09 6.26L20 10l-5.91 2.09L12 18l-2.09-5.91L4 10l5.91-1.74L12 2zm6 12l1.17 3.35L22 18l-2.83.83L18 22l-1.17-3.17L14 18l2.83-.65L18 14zM5 14l.83 2.35L8 17l-2.17.83L5 20l-.83-2.17L2 17l2.17-.65L5 14z"/>
    </svg>
)

const AiSearchTrigger = ({variant = 'pill', label = 'AI-поиск'}) => {
    const {aiSearchStore} = useContext(Context)
    const handleClick = () => aiSearchStore.open()

    if (variant === 'icon') {
        return (
            <button
                type="button"
                className={s.triggerIconOnly}
                onClick={handleClick}
                aria-label={label}
            >
                <SparkleIcon/>
            </button>
        )
    }

    return (
        <button type="button" className={s.trigger} onClick={handleClick}>
            <SparkleIcon/>
            {label}
        </button>
    )
}

export default observer(AiSearchTrigger)
