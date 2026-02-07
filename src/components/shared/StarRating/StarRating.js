import React, {useContext} from 'react';
import styles from './StarRating.module.css';
import {Context} from "@/context/AppWrapper";

const StarRating = ({rating, n}) => {

    rating = Math.min(
        4.3 + Math.round(Math.min(rating / 700, 10)) / 10 + (0.1 * (n % 2)),
        5
    ).toFixed(1);
    const {desktopStore} = useContext(Context)
    const getStarClass = (index) => {

        if (index + 1 <= rating) {
            return styles.fullStar;
        } else if (index + 0.9 <= rating) {
            return styles.ninetyPercentStar;
        } else if (index + 0.8 <= rating) {
            return styles.eightyPercentStar;
        } else if (index + 0.7 <= rating) {
            return styles.seventyPercentStar;
        } else if (index + 0.6 <= rating) {
            return styles.sixtyPercentStar;
        } else if (index + 0.5 <= rating) {
            return styles.fiftyPercentStar;
        } else if (index + 0.4 <= rating) {
            return styles.fortyPercentStar;
        } else if (index + 0.3 <= rating) {
            return styles.thirtyPercentStar;
        } else if (index + 0.2 <= rating) {
            return styles.twentyPercentStar;
        } else if (index + 0.1 <= rating) {
            return styles.tenPercentStar;
        } else {
            return styles.emptyStar;
        }
    };

    return (
        <div className={styles.starRating}>
            {[...Array(5)].map((_, index) => (
                <div key={index} style={{fontSize: desktopStore.isDesktop ? "22px" : "18px"}}
                     className={`${styles.star} ${getStarClass(index)}`}>
                    ★
                </div>
            ))}
            <span className={styles.tooltip_mobile}>{Math.round(Math.max((n / 1000)))}</span>
            {desktopStore.isDesktop &&
                <span className={styles.tooltip}>{`Рейтинг: ${rating}`}</span>}


        </div>
    );
};

export default StarRating;
