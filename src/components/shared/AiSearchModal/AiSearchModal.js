import React, {useContext, useEffect, useRef, useState} from 'react';
import {Modal} from 'react-bootstrap';
import {observer} from 'mobx-react-lite';
import s from './AiSearchModal.module.css';
import {Context} from '@/context/AppWrapper';
import ProductCard from '@/components/shared/ProductCard/ProductCard';

const CHIP_SUGGESTIONS = [
    'белые Nike до 15000',
    'кроссовки со скидкой',
    'чёрные дерби из кожи',
    'Yeezy 350',
    'сумки через плечо',
    'винтажные кеды',
]

const PROCESSING_PHRASES = [
    'Обрабатываю запрос',
    'Выбираю лучшие товары',
    'Смотрю, что вам подойдёт',
]

const SparkleIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2l2.09 6.26L20 10l-5.91 2.09L12 18l-2.09-5.91L4 10l5.91-1.74L12 2zm6 12l1.17 3.35L22 18l-2.83.83L18 22l-1.17-3.17L14 18l2.83-.65L18 14zM5 14l.83 2.35L8 17l-2.17.83L5 20l-.83-2.17L2 17l2.17-.65L5 14z"/>
    </svg>
)

const CloseIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
)

const SendIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <line x1="22" y1="2" x2="11" y2="13"/>
        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
)

function useRotatingIndex(length, active, intervalMs = 1700) {
    const [idx, setIdx] = useState(0)
    useEffect(() => {
        if (!active || length <= 1) {
            setIdx(0)
            return
        }
        const id = setInterval(() => {
            setIdx((i) => (i + 1) % length)
        }, intervalMs)
        return () => clearInterval(id)
    }, [active, length, intervalMs])
    return idx
}

function useTypedText(text, msPerWord = 30) {
    const [shown, setShown] = useState(text || '')
    useEffect(() => {
        if (!text) {
            setShown('')
            return
        }
        setShown('')
        const words = text.split(' ')
        let i = 0
        const id = setInterval(() => {
            i++
            setShown(words.slice(0, i).join(' '))
            if (i >= words.length) clearInterval(id)
        }, msPerWord)
        return () => clearInterval(id)
    }, [text, msPerWord])
    return shown
}

const ProductsScroll = ({products, onProductClick}) => {
    const scrollRef = useRef(null)

    const handleWheel = (e) => {
        const el = scrollRef.current
        if (!el) return
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            el.scrollLeft += e.deltaY
            e.preventDefault()
        }
    }

    const scrollBy = (dx) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({left: dx, behavior: 'smooth'})
        }
    }

    return (
        <div className={s.productsWrap}>
            <button
                type="button"
                className={`${s.scrollBtn} ${s.scrollBtnLeft}`}
                onClick={() => scrollBy(-320)}
                aria-label="Назад"
            >
                ‹
            </button>
            <div
                ref={scrollRef}
                className={s.productsRow}
                onWheel={handleWheel}
                onClick={onProductClick}
            >
                {products.map((p, i) => (
                    <div key={p.id} className={s.productItem} style={{'--i': i}}>
                        <ProductCard product={p}/>
                    </div>
                ))}
            </div>
            <button
                type="button"
                className={`${s.scrollBtn} ${s.scrollBtnRight}`}
                onClick={() => scrollBy(320)}
                aria-label="Вперёд"
            >
                ›
            </button>
        </div>
    )
}

const AssistantMessage = ({message, onProductClick}) => {
    const typed = useTypedText(message.content, 120)
    const fullyTyped = typed === message.content
    return (
        <div className={`${s.msgRow} ${s.assistant}`}>
            <div className={s.assistantText}>
                {typed}
                {!fullyTyped && <span className={s.caret}>▍</span>}
            </div>
            {fullyTyped && message.count === 0 && (
                <div className={s.emptyHit}>Товары не найдены</div>
            )}
            {fullyTyped && message.count > 0 && message.products && message.products.length > 0 && (
                <ProductsScroll products={message.products} onProductClick={onProductClick}/>
            )}
        </div>
    )
}

const UserMessage = ({message}) => (
    <div className={`${s.msgRow} ${s.user}`}>
        <div className={s.userBubble}>{message.content}</div>
    </div>
)

const AiSearchModal = () => {
    const {aiSearchStore} = useContext(Context)
    const [draft, setDraft] = useState('')
    const scrollRef = useRef(null)
    const inputRef = useRef(null)
    const processingIdx = useRotatingIndex(PROCESSING_PHRASES.length, aiSearchStore.loading, 1700)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [aiSearchStore.messages.length, aiSearchStore.loading])

    useEffect(() => {
        if (aiSearchStore.isOpen && inputRef.current) {
            setTimeout(() => inputRef.current && inputRef.current.focus(), 150)
        }
        if (!aiSearchStore.isOpen) {
            setDraft('')
        }
    }, [aiSearchStore.isOpen])

    const handleSubmit = (e) => {
        if (e) e.preventDefault()
        const value = draft.trim()
        if (!value || aiSearchStore.loading) return
        setDraft('')
        aiSearchStore.send(value)
    }

    const handleChipClick = (text) => {
        if (aiSearchStore.loading) return
        aiSearchStore.send(text)
    }

    const handleProductClick = () => {
        aiSearchStore.close()
    }

    return (
        <Modal
            show={aiSearchStore.isOpen}
            onHide={() => aiSearchStore.close()}
            dialogClassName={s.dialog}
            size="xl"
            centered
            scrollable
        >
            <Modal.Body className={s.body}>
                <div className={s.header}>
                    <div className={s.title}>
                        <SparkleIcon/>
                        AI-поиск
                    </div>
                    <div className={s.headerActions}>
                        {!aiSearchStore.isEmpty && (
                            <button
                                type="button"
                                className={s.resetBtn}
                                onClick={() => aiSearchStore.resetChat()}
                                aria-label="Новый чат"
                            >
                                Новый чат
                            </button>
                        )}
                        <button
                            type="button"
                            className={s.closeBtn}
                            onClick={() => aiSearchStore.close()}
                            aria-label="Закрыть"
                        >
                            <CloseIcon/>
                        </button>
                    </div>
                </div>

                {aiSearchStore.isEmpty ? (
                    <div className={s.empty}>
                        <div className={s.emptyIcon}>
                            <SparkleIcon/>
                        </div>
                        <h2 className={s.emptyTitle}>Найду то, что нужно</h2>
                        <p className={s.emptySubtitle}>
                            Опишите товар своими словами — цвет, бренд, цену, повод. Я подберу подходящее из каталога.
                        </p>
                        <div className={s.chips}>
                            {CHIP_SUGGESTIONS.map((chip, i) => (
                                <button
                                    key={chip}
                                    type="button"
                                    className={s.chip}
                                    style={{'--i': i}}
                                    onClick={() => handleChipClick(chip)}
                                    disabled={aiSearchStore.loading}
                                >
                                    {chip}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className={s.scroll} ref={scrollRef}>
                        {aiSearchStore.messages.map((m, i) => (
                            m.role === 'user'
                                ? <UserMessage key={i} message={m}/>
                                : <AssistantMessage key={i} message={m} onProductClick={handleProductClick}/>
                        ))}
                        {aiSearchStore.loading && (
                            <div className={`${s.msgRow} ${s.assistant}`}>
                                <div className={s.processing}>
                                    <span key={processingIdx} className={s.processingPhrase}>
                                        {PROCESSING_PHRASES[processingIdx]}
                                    </span>
                                    <span className={s.typing}>
                                        <span/><span/><span/>
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {aiSearchStore.error && (
                    <div className={s.errorBar}>{aiSearchStore.error}</div>
                )}

                <form className={s.inputBar} onSubmit={handleSubmit}>
                    <input
                        ref={inputRef}
                        className={s.input}
                        type="text"
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        placeholder="Спросите про бренд, цвет, цену…"
                        disabled={aiSearchStore.loading}
                        maxLength={300}
                    />
                    <button
                        type="submit"
                        className={s.sendBtn}
                        disabled={aiSearchStore.loading || !draft.trim()}
                        aria-label="Отправить"
                    >
                        <SendIcon/>
                    </button>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default observer(AiSearchModal)
