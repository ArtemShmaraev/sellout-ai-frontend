import React, { useEffect } from 'react';
import s from './Notification.module.css';

const Notification = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 1500); // Уведомление будет видно 3 секунды
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={s.notification}>
            {message}
        </div>
    );
};

export default Notification;
