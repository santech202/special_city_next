import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {useTranslation} from 'next-i18next'
import React, {useCallback, useContext, useMemo, useState} from 'react'
import {clsx} from 'clsx'
import {FavouriteContext} from 'context/FavouritesContext'
import dayjs from 'dayjs'
import {useAuth} from 'hooks/useAuth'
import TransparentHeart from 'public/svg/heart.svg'
import RedHeart from 'public/svg/heart-red.svg'
import {PostInterface} from 'types'
import client from 'utils/api/createRequest'
import postTelegram from 'utils/api/postTelegram'
import updatePost from 'utils/api/updatePost'
import {NO_IMAGE} from 'utils/constants'
import {Routes} from 'utils/routes'

import Modal from 'components/Modal'
import Price from 'components/Price'

const sevenDays = 1000 * 60 * 60 * 24 * 7
const buttonStyle = 'absolute z-10 p-2 w-8 h-8 flex justify-center items-center'

interface ItemInterface {
    post: PostInterface
    edit?: boolean
}

const Item = ({post, edit = false}: ItemInterface): JSX.Element => {

    const {favourites, setFavourites} = useContext(FavouriteContext)
    const {id, slug, title, preview, price, updatedAt} = post

    const {t} = useTranslation('profile')
    const router = useRouter()
    const {token} = useAuth()
    const liked = useMemo(() => !!favourites.find(x => x.id === id), [favourites, id])

    const [visible, setVisible] = useState(false)
    const hideModal = useCallback(() => setVisible(false), [])

    const showModal = (text: ItemModalText) => {
        setModalText(text)
        setVisible(true)
    }

    const [modalText, setModalText] = useState<ItemModalText | undefined>()

    const handleFunction = useCallback(async () => {
        hideModal()
        try {
            switch (modalText) {
                case ItemModalText.edit: {
                    await router.push(Routes.edit + '/' + slug)
                    break
                }
                case ItemModalText.delete: {
                    await client.delete(`/posts/${id}`)
                    alert(success.deleted)
                    break
                }
                case ItemModalText.republish: {
                    const now = new Date().getTime()
                    const updated = new Date(updatedAt).getTime()

                    if (now - updated < sevenDays) {
                        alert(
                            `Объявление можно публиковать повторно не чаще раз в неделю! Можно подать повторно ${dayjs(
                                updated + sevenDays,
                            ).format('DD.MM.YYYY')}`,
                        )
                    } else {
                        await postTelegram(post)
                        await updatePost({...post, createdAt: new Date().toString()})
                        alert(success.updated)
                    }
                    break
                }
                default:
                    alert(errors.noCase)
            }
        } catch (e) {
            console.log(e)
            alert(errors.wentWrong)
        }
    }, [modalText, post, router, token, hideModal, id, slug, updatedAt])

    const handleFavourite = useCallback(
        (e: React.SyntheticEvent) => {
            e.preventDefault()
            const currentList = liked ? favourites.filter(x => x.id !== id) : [...favourites, post]
            localStorage.setItem('favourites', JSON.stringify(currentList))
            setFavourites(currentList)
        },
        [id, favourites, liked, post, setFavourites],
    )

    return (
        <>
            <Modal visible={visible}>
                <div className='flex flex-col'>
                    <h4>{modalText}</h4>
                    <hr/>
                    <div className='mt-12 flex justify-around'>
                        <button onClick={handleFunction} className='button min-w-[64px]'>Да</button>
                        <button onClick={hideModal} className='button min-w-[64px]'>Нет</button>
                    </div>
                </div>
            </Modal>

            <li key={slug} className='relative flex-col overflow-hidden rounded-2xl shadow'>
                {edit && (
                    <>
                        <button
                            className={clsx(
                                'button', buttonStyle, 'right-0 top-0 bg-none',
                            )}
                            onClick={() => {
                                showModal(ItemModalText.delete)
                            }}
                        >
                            &#10008;
                        </button>
                        <button
                            title={t('edit') as string}
                            className={clsx('button', buttonStyle, 'left-0 top-0 bg-none')}
                            onClick={() => {
                                showModal(ItemModalText.edit)
                            }}
                        >
                            &#10000;
                        </button>
                        <button
                            title={t('publishAgain') as string}
                            className={clsx('button', buttonStyle, 'right-0 bottom-0 bg-none')}
                            onClick={() => {
                                showModal(ItemModalText.republish)
                            }}
                        >
                            &#8679;
                        </button>
                    </>
                )}
                <Link href={`${Routes.post}/${slug}`} title={title}>
                    <div className='relative aspect-square transition-all hover:scale-105'>
                        <Image
                            fill={true}
                            style={{objectFit: 'cover'}}
                            sizes={'(max-width: 768px) 50vw,(max-width: 1024px) 25vw, 200px'}
                            alt={title}
                            src={preview || NO_IMAGE}
                            placeholder='blur'
                            blurDataURL={NO_IMAGE}
                            title={title}
                        />
                    </div>

                    <div className='relative mx-3 my-1 overflow-hidden whitespace-nowrap font-bold lg:mx-4 lg:my-2'>
                        <Price price={price}/>
                        <h2 className='mt-auto text-ellipsis whitespace-nowrap font-normal'>{title}</h2>
                        <div className='absolute top-0 right-0 z-10 cursor-pointer' onClick={handleFavourite}>
                            {liked ? <RedHeart/> : <TransparentHeart/>}
                        </div>
                    </div>

                </Link>
            </li>
        </>
    )
}

const success = {
    updated: 'Объявление поднято в поиске!',
    deleted: 'Объявление удалено! Перезагрузите страницу, чтобы вы увидели изменения',
}
const errors = {
    wentWrong: 'Что-то пошло не так!',
    noCase: 'Нет таких значений',
}

enum ItemModalText {
    edit = 'Редактировать объявление?',
    republish = 'Опубликовать повторно объявление в канале и поднять его на сайте?',
    delete = 'Удалить объявление?',
}

export default Item