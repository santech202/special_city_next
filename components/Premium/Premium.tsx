import React, {useEffect, useState} from 'react';
import axios from "axios";
import {isMobile} from 'react-device-detect';
import {CarouselProvider, Slide, Slider} from 'pure-react-carousel';
import {PostInterface} from '../../interfaces';
import Item from '../Item/Item';
import 'pure-react-carousel/dist/react-carousel.es.css';
import classes from './../../styles/Home.module.scss'

import {orderBy} from "lodash";

const getPremiums = async () => {
    try {
        const getPremium = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post?category=5`)
        const premium = orderBy(getPremium.data.content, ['createdAt'], ['desc'])
        return premium
    } catch (e) {
        console.log(e)
        return []
    }
}

const posts = [
    {
        body: "Индивидуальные занятия онлайн для детей и взрослых.\n\nДля вас:\n-💎определение уровня \n-💎постановка цели\n-💎индивидуальная программа и длительность курса\n-💎помощь с домашними заданиями \n-💎развитие разговорной речи\n-💎результат\n- 💎помощь в поддержании уровня \n\nПервая консультация 15 мин. бесплатно. 💡\n\n#iSpeaker",
        categoryId: 3,
        createdAt: "2022-05-27T07:38:51.062Z",
        id: 800,
        images: "https://chamala.tatar/uploads/1653637130801-1653637129701.jpg",
        preview: "https://chamala.tatar/uploads/1653637130801-1653637129701.jpg",
        price: 700,
        slug: "individualnye-zanyatiya-po-anglijskomu-yazyku-70",
        telegram: "ispeaker_innopolis",
        tgId: 264222567,
        title: "Индивидуальные занятия по английскому языку.",
        updatedAt: "2022-06-03T14:14:24.808Z",
        vector: "'15':38 'ispeak':41 'английск':4 'бесплатн':40 'взросл':12 'дет':10 'длительн':22 'домашн':26 'задан':27 'занят':2,7 'индивидуальн':1,6,19 'консультац':37 'курс':23 'мин':39 'онлайн':8 'определен':15 'перв':36 'поддержан':34 'помощ':24,32 'постановк':17 'программ':20 'развит':28 'разговорн':29 'результат':31 'реч':30 'уровн':16,35 'цел':18 'язык':5"
    },
    {
        body: "✅ 1.Массаж:💆🏻‍♀️💆🏼‍♂️\n🔆Точечный\n🔆Шиацу\n🔆Рэйки \n🔆Баночный \n ❗️Выпрямление, разделение\n позвоночника входит\nв каждый сеанс\n\n    ✍🏻Сеансы провожу\n        ежедневно\nпо предварительной записи\n\n✅ 2. Практические сеансы\n        🙆🏻‍♂️ 🙆🏼‍♀️\n В них входят:\n🔆Практический курс\nпо развитию сознательного\nвнутреннего голоса\n🔆Рефлекторная мануальная гимнастика\n🔆Тайцзицуань\n⏰Длительность\nсеанса:1,5-2ч\n❗️При себе иметь\nбутылочку с водой\nи полотенце средних\nразмеров (примерно 35×70)\n\n✅ 3.Теоретико-практический\n    курс массажа💆🏼‍♀️🙆🏻‍♂\n  Программа курса включает\nизучение техник массажа:\n🔆Точечного \n🔆Шиацу \n🔆Рэйки \n🔆Баночного\n⏰Длительность\nсеанса:1,5-2ч\n     Количество необходимых\n  сеансов будет зависеть\nот практикующего.\n❗️Моделей для проведения\n сеансов по возможности\nприводите с собой.\n Сертификатов не выдаю,\n   могу оставить автограф 😎\n\n    Адрес: Спортивная 128\n    ZIMALETTO правая дверь\n    ✨Массажный кабинет✨\n            (ИОС)\nhttps://t.me/massageinnopolis",
        categoryId: 3,
        createdAt: "2022-05-13T09:10:53.301Z",
        id: 581,
        images: "https://firebasestorage.googleapis.com/v0/b/classified-b8322.appspot.com/o/20220417_171001.jpg?alt=media&token=9dd3708b-a099-4e9f-a095-d25f16ca5673",
        preview: "https://firebasestorage.googleapis.com/v0/b/classified-b8322.appspot.com/o/20220417_171001.jpg?alt=media&token=9dd3708b-a099-4e9f-a095-d25f16ca5673",
        price: 1500,
        slug: "predlagaemye-procedury-94",
        telegram: "NEIJO",
        tgId: 744555501,
        title: "❇️Предлагаемые процедуры:",
        updatedAt: "2022-06-03T14:14:29.613Z",
        vector: "'-2':43,78 '/massageinnopolis':113 '1':3,41,76 '128':104 '2':22 '3':58 '35':56 '5':42,77 '70':57 't.me':112 't.me/massageinnopolis':111 'zimaletto':105 'автограф':101 'адрес':102 'баночн':8,73 'бутылочк':48 'включа':66 'внутрен':33 'вод':50 'возможн':92 'вход':12,27 'выда':98 'выпрямлен':9 'гимнастик':37 'голос':34 'двер':107 'длительн':39,74 'ежедневн':18 'зависет':84 'запис':21 'изучен':67 'имет':47 'иос':110 'кабинет':109 'кажд':14 'количеств':80 'курс':29,62,65 'мануальн':36 'массаж':4,63,69 'массажн':108 'мог':99 'модел':87 'необходим':81 'остав':100 'позвоночник':11 'полотенц':52 'прав':106 'практик':86 'практическ':23,28,61 'предварительн':20 'предлага':1 'привод':93 'примерн':55 'проведен':89 'провож':17 'программ':64 'процедур':2 'развит':31 'разделен':10 'размер':54 'рефлекторн':35 'рэйк':7,72 'сеанс':15,16,24,40,75,82,90 'сертификат':96 'соб':95 'сознательн':32 'спортивн':103 'средн':53 'тайцзицуан':38 'теоретик':60 'теоретико-практическ':59 'техник':68 'точечн':5,70 'ч':44,79 'шиац':6,71"
    },
    {
        body: "работает c HDMI, VGA\nсветовой поток 2500 ANSI лм\nконтрастность 4000 : 1\n\n",
        categoryId: 3,
        createdAt: "2022-05-31T15:11:07.328Z",
        id: 917,
        images: "https://chamala.tatar/uploads/1654009760423-1654009760398.jpg",
        preview: "https://chamala.tatar/uploads/1654009760423-1654009760398.jpg",
        price: 400,
        slug: "arenda-proektora-benq-ms502-4",
        telegram: "maratfaizer",
        tgId: 71233480,
        title: "Аренда Проектора BenQ MS502",
        updatedAt: "2022-06-03T14:14:14.235Z",
        vector: "'1':16 '2500':11 '4000':15 'ansi':12 'benq':3 'c':6 'hdmi':7 'ms502':4 'vga':8 'аренд':1 'контрастн':14 'лм':13 'поток':10 'проектор':2 'работа':5 'светов':9"
    },
    {
        body: "Подробности в нашем чате https://t.me/ult_ramen",
        categoryId: 3,
        createdAt: "2022-05-18T12:14:08.253Z",
        id: 651,
        images: "https://firebasestorage.googleapis.com/v0/b/classified-b8322.appspot.com/o/1652876046486?alt=media&token=543e4d1c-c704-4d50-bb4f-e8242cd08b24",
        preview: "https://firebasestorage.googleapis.com/v0/b/classified-b8322.appspot.com/o/1652876046486?alt=media&token=543e4d1c-c704-4d50-bb4f-e8242cd08b24",
        price: 0,
        slug: "novoe-menyu-v-ultramen-66",
        telegram: "TimurYussupov",
        tgId: 55080988,
        title: "Новое меню в ultramen!",
        updatedAt: "2022-06-03T14:14:21.062Z",
        vector: "'/ult_ramen':11 't.me':10 't.me/ult_ramen':9 'ultramen':4 'мен':2 'наш':7 'нов':1 'подробн':5 'чат':8",
    }
]
const Premium = () => {
    const [premium, setPremium] = useState<PostInterface[]>(posts)

    // useEffect(() => {
    //     getPremiums().then((res) => setPremium(res))
    // }, [])

    return (
        <div>
            <h2 className={classes.title}>Недвижимость</h2>
            <CarouselProvider
                naturalSlideWidth={200}
                naturalSlideHeight={270}
                totalSlides={premium.length}
                visibleSlides={isMobile ? 2 : 4}
                isPlaying={true}
                interval={5000}
                infinite={true}
                hasMasterSpinner={premium.length === 0}
            >
                <Slider>
                    {premium.map((item, index) => {
                        return (
                            <Slide key={index} index={index} tabIndex={index}>
                                <div style={{margin: 4}}>
                                    <Item post={item}/>
                                </div>
                            </Slide>
                        )
                    })}
                </Slider>
            </CarouselProvider>
        </div>
    );
};

export default Premium;