import { useEffect, useRef } from 'react';
import { Zuck } from 'sellout_zuck.js';
// import '@/components/shared/zuck2/src/styles/index.css'
// import '@/components/shared/zuck2/dist/skins/snapgram.min.css;
import 'sellout_zuck.js/css';
// // import 'zuck.js/dist/zuck.css';
import 'sellout_zuck.js/skins/snapgram';
// import {TimelineItem} from "zuck.js/types";

const Stories = () => {
    const storiesRef = useRef(null);

    useEffect(() => {
        const timestamp = new Date().getTime() / 1000;

        if (storiesRef.current) {
            const stories = new Zuck(storiesRef.current, {
                autoFullScreen: false,
                rtl: false,
                skin: 'snapgram',
                // openEffect: true,
                avatars: true,
                list: false,
                // slideEffect: true,
                cubeEffect: false,
                // zoomEffect: false,
                localStorage: true,
                paginationArrows: false,
                backNative: true,
                previousTap: true,
                backButton: true,

                stories: [
                    {
                        id: 'username1',
                        photo: 'https://i.pinimg.com/564x/d2/15/a9/d215a9d830504a547bd226ae12550c3b.jpg',
                        name: '',
                        lastUpdated: timestamp,
                        items: [
                            {
                                id: 'id1',
                                type: 'photo',
                                length: 5,
                                src: 'https://i.pinimg.com/564x/d2/15/a9/d215a9d830504a547bd226ae12550c3b.jpg',
                                link: "https://sellout.su/products/new-balance-9060-sea-salt-surf-798245",
                                linkText: "Смотреть подборку",
                                seen: false,
                                time: timestamp
                            },
                            {
                                id: 'id11',
                                type: 'photo',
                                length: 5,
                                src: 'https://i.pinimg.com/564x/23/95/fc/2395fc131e5e09505a4eeb79f8ecec00.jpg',
                                linkText: false,
                                seen: false,
                                time: timestamp
                            },
                        ]
                    },
                    {
                        id: 'username2',
                        photo: 'https://i.pinimg.com/564x/c5/f8/66/c5f8663dacf159ee10634a5478710972.jpg',
                        name: '',
                        lastUpdated: timestamp,
                        items: [
                            {
                                id: 'id2',
                                type: 'photo',
                                length: 5,
                                src: 'https://i.pinimg.com/564x/c5/f8/66/c5f8663dacf159ee10634a5478710972.jpg',
                                linkText: false,
                                seen: false,
                                time: timestamp
                            },
                        ]
                    },
                    {
                        id: 'username3',
                        photo: 'https://i.pinimg.com/564x/23/95/fc/2395fc131e5e09505a4eeb79f8ecec00.jpg',
                        name: '',
                        lastUpdated: timestamp,
                        items: [
                            {
                                id: 'id3',
                                type: 'photo',
                                length: 5,
                                src: 'https://i.pinimg.com/564x/23/95/fc/2395fc131e5e09505a4eeb79f8ecec00.jpg',
                                linkText: false,
                                seen: false,
                                time: timestamp
                            },
                        ]
                    },
                    {
                        id: 'username32',
                        photo: 'https://cdn.poizon.com/pro-img/origin-img/20230607/c4845bf2afed4e0d955a99ea315f615b.jpg',
                        name: '',
                        lastUpdated: timestamp,
                        items: [
                            {
                                id: 'id32',
                                type: 'photo',
                                length: 5,
                                src: 'https://static-cse.canva.com/blob/576173/23.png',
                                linkText: false,
                                seen: false,
                                time: timestamp
                            },
                        ]
                    },
                    {
                        id: 'username4',
                        photo: 'https://i.pinimg.com/564x/55/f8/1b/55f81b105ba18876360429f0f315e654.jpg',
                        name: '',
                        lastUpdated: timestamp,
                        items: [
                            {
                                id: 'id4',
                                type: 'photo',
                                length: 5,
                                src: 'https://i.pinimg.com/564x/55/f8/1b/55f81b105ba18876360429f0f315e654.jpg',
                                linkText: false,
                                seen: true,
                                time: timestamp
                            },
                        ]
                    }
                ]
            });

            // Настройка кликабельной ссылки для каждого элемента истории



            // // Изменение стиля всех элементов .item-preview
            // const itemPreviews = document.querySelectorAll('.item-preview');
            // itemPreviews.forEach(itemPreview => {
            //     itemPreview.style.background = '#940a0a';
            //
            // });

            const item2Previews = document.querySelectorAll('.story.seen');

            item2Previews.forEach(itemPreview => {
                itemPreview.style.opacity = 1;
            });




            const itemTexts = document.querySelectorAll('.name');
            itemTexts.forEach(itemText => {
                itemText.style.color = 'black';
            });



        }

        // Очистка для предотвращения дублирования
        return () => {
            if (storiesRef.current) {
                storiesRef.current.innerHTML = ''; // Очистка контейнера историй
            }
        };
    }, []);

    // useEffect(() => {
    //     const itemABack = document.querySelectorAll('.back');
    //     itemABack.forEach(ABack => {
    //         ABack.style.color = 'black';
    //     });
    // })

    return (
        <>

            <div style={{fontSize: "15px"}} ref={storiesRef} id="stories"></div>
        </>
    );
};

export default Stories;
