import React from 'react';
import Image from "next/image";
import s from './PictureBlock.module.css'
import logo from '@/static/img/sellout_logo.svg'
import nb from '@/static/img/zoom.png'
const PictureBlock = () => {
    return (
        <div className={s.main_block}>
            <div className={s.text_block}>
                <Image src={logo} alt='' className={s.logo} width={200}/>
                <div className={s.text_cont}>
                    На нашей платформе представлены сотни тысяч брендовой одежды и обуви,
                    аксессуаров и прочих товаров. Приобретайте знаковые коллаборации и модели, такие
                    как Air Jordan 1, Nike x Off-White, Nike x Travis Scott, Air Force 1, Nike Dunk, adidas Yeezy и другие.
                    Открывайте для себя новые бренды, коллекции и стили. У нас Вы найдете все: лимитированные кроссовки Nike,
                    Air Jordan и adidas, люксовые сумки Hermes и Chanel, классические образы Loro Piana и Brunello Cucinelli, обувь и одежду для
                    повседневной носки от New Balance и Puma, спортивную одежду и многое другое.
                </div>
            </div>
            <div className={s.img_block}>
                <div className={s.img_cont}>
                    <Image src={nb} alt='' fill={true} className={s.img}/>
                </div>
            </div>
        </div>
    );
};

export default PictureBlock;