import {options} from "assets/options";
import axios from "axios";
import cn from 'classnames'
import Button from "components/Button/Button";
import Item, {Price} from "components/Item/Item";
import MainLayout from "components/MainLayout/MainLayout";
import dayjs from 'dayjs'
import {getDictionary} from "functions/getDictionary";
import {getUrl} from "functions/getUrl";
import {PostInterface} from "interfaces";
import {useTranslation} from 'next-i18next';
import Link from "next/link";
import {GetServerSideProps} from "next/types";
import React, {useEffect, useMemo, useRef, useState} from "react";
import classes from 'styles/classes.module.scss'
import item from "styles/Post.module.scss";
import {Routes, tgLink} from "../../constants";
import Image from "next/image";
import {useDraggable} from "hooks/useDraggable";
import {isDesktop} from "react-device-detect";

interface PostProps {
    post: PostInterface
    related: PostInterface[]
    isMobile: boolean
}

export default function Post({post, related, isMobile}: PostProps) {
    const {t} = useTranslation()
    const [current, setCurrent] = useState(0)
    const [mounted, setMounted] = useState(false);

    const {
        title,
        body,
        preview,
        categoryId,
        price,
        createdAt,
        telegram,
        slug
    } = post;

    const images = useMemo(() => post.images.split("||"), [post]);
    const category = useMemo(() => options.find(option => option.value === categoryId) || options[0], [categoryId])
    const seoTitle = useMemo(() => `${t(category.label)} ${title.slice(0, 50)} в городе Иннополис`, [category.label, title, t])
    const seoDescription = useMemo(() => body.slice(0, 320), [body])
    const seoImage = useMemo(() => preview, [preview])
    const seoKeywords = useMemo(() => `innoads, Иннополис, доска объявлений, ${category.label}`, [category.label])
    const canonical = useMemo(() => `https://innoads.ru/post/${slug}`, [slug])
    const shareData = {
        title: 'InnoAds',
        text: 'Поделиться ссылкой:',
        url: process.env.NEXT_PUBLIC_NODE_ENV + '/post/' + slug
    }

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <MainLayout
            title={seoTitle}
            description={seoDescription}
            canonical={canonical}
            keywords={seoKeywords}
            image={seoImage}
            author={`https://t.me/${telegram}`}
        >
            <div className={item.post} itemScope itemType="https://schema.org/Offer">
                <div style={{position: 'relative'}}>
                    {isDesktop ?
                        <>
                            <ul className={item.carousel}>
                                <li key={images[current]} className={item.image}>
                                    <Image
                                        src={images[current]}
                                        alt="image"
                                        title={title}
                                        itemProp='image'
                                        width={300}
                                        height={300}
                                    />
                                </li>
                            </ul>
                            <button className={cn(item.button, item.buttonLeft)}
                                    disabled={current < 1}
                                    onClick={() => current > 0 && setCurrent(prevState => prevState - 1)}
                            >
                                &larr;
                            </button>
                            <button className={cn(item.button, item.buttonRight)}
                                    disabled={current + 1 >= images.length}
                                    onClick={() => current + 1 < images.length && setCurrent(prevState => prevState + 1)}
                            >
                                &rarr;
                            </button>
                        </>
                        : <ul className={item.carousel}

                        >
                            {images.map((image: string) => {
                                return (
                                    <li key={image} className={item.image}>
                                        <Image
                                            src={image}
                                            alt="image"
                                            title={title}
                                            itemProp='image'
                                            width={300}
                                            height={300}
                                        />
                                    </li>

                                );
                            })}
                        </ul>}
                </div>

                <Link href={`${Routes.main}search?category=${categoryId}`} passHref>
                    <p>{t('category', {ns: 'post'})}: <span itemProp="category">{t(category.label)}</span></p>
                </Link>
                <h1 itemProp='name'>{title}</h1>
                <p itemProp="price" className={item.price}><Price price={price}/></p>
                <hr/>
                <pre className={classes.paragraph} itemProp='description'>{body}</pre>
                {/*<p itemProp='description' className={item.postBody}>{subtitle}</p>*/}
                <p className={classes.mt20}>{t('published', {ns: 'post'})}: {dayjs(createdAt).format("DD.MM.YYYY")}</p>
                <div className={classes.mt40}>
                    <Link href={tgLink + '/' + telegram} itemProp="seller" passHref={true}>
                        <Button>
                            {t('textAuthor', {ns: 'post'})}
                        </Button>
                    </Link>
                </div>

                <div className={classes.mt40}>
                    <Link href={`/user/${post.tgId}`} passHref>
                        <Button>
                            {t('userAds', {ns: 'post'})}
                        </Button>
                    </Link>
                </div>

                {isMobile && <Button className={cn(classes.mt40, item.share)}
                                     onClick={async () => await (navigator.share(shareData))}>{t('share', {ns: 'post'})}<span>&#8631;</span></Button>}
                {related.length > 0 && (<div className={classes.mt40}>
                    <h2>Похожие объявления</h2>
                    <ul className={classes.related}>
                        {related.map((post: PostInterface) => {
                            return (
                                <Item post={post} key={post.slug}/>
                            );
                        })}
                    </ul>
                </div>)}

            </div>
        </MainLayout>

    );
}

export const getServerSideProps: GetServerSideProps = async (
    {
        locale, query, req
    }
) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post/${query.slug}`)

    const UA = req.headers['user-agent'];
    const isMobile = Boolean(UA?.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    ))

    if (!response) {
        return {
            notFound: true,
        };
    }
    const snapshot = response.data;

    const related = await axios.get(getUrl(snapshot.categoryId, 0, 5, encodeURIComponent(snapshot.title.split(' ')[0])))

    return {
        props: {
            post: snapshot,
            related: related.data.content.filter((x: PostInterface) => x.id !== snapshot.id),
            isMobile: isMobile,
            ...(await getDictionary(locale, ['post']))
        },
    };
}

// const [header, setHeader] = useState<string>(title)
// const [subtitle, setSubtitle] = useState<string>(body)
//
//
// useEffect(() => {
//     const translateTitle = async (): Promise<void> => {
//         const translate = await googleTranslateText(title);
//         if (translate) {
//             setHeader(translate)
//         }
//     };
//
//     const translateSubtitle = async (): Promise<void> => {
//         const translate = await googleTranslateText(body);
//         if (translate) {
//             setSubtitle(translate)
//         }
//     };
//     if (i18n.language === 'en') {
//         translateTitle();
//         translateSubtitle()
//     }
//
// }, [i18n, body, title]);
