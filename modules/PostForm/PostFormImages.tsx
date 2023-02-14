import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React, { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react'
import {clsx} from 'clsx'
import { HTMLInputEvent } from 'types'
import { ACCEPTED_IMAGE_FORMAT, imageErrors, NO_IMAGE } from 'utils/constants'
import getCompressedImagesLinks from 'utils/image/getCompressedImagesLinks'
import { handleDeleteImage } from 'utils/image/handleDeleteImage'
import { MoveImage, moveImage } from 'utils/image/moveImage'

import Icon from 'components/Icon'
import Input from 'components/Input'

import classes from 'styles/classes.module.css'

interface PostFormImagesProps {
    images: string[]
    setImages: Dispatch<SetStateAction<string[]>>
}

const PostFormImages = ({ images, setImages }: PostFormImagesProps) => {
    const router = useRouter()
    const isMobile = useMemo(() => router.query['viewport'] === 'mobile', [router.query])
    const ref = useRef<HTMLInputElement>(null)
    const [error, setError] = useState('')
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!loading) {
            imagesValidate()
        }
    }, [loading])

    const imagesValidate = () => {
        if (images.length === 0) {
            setError(imageErrors.noImages)
        } else if (images.length > 4) {
            setError(imageErrors.manyImages)
        } else {
            setError('')
        }
    }

    const imageHandler = async (event: HTMLInputEvent) => {
        setLoading(true)
        try {
            if (event.target.files) {
                const imagesFromInput = event.target.files
                const length = imagesFromInput.length + images.length
                if (length > 4) {
                    return setError(imageErrors.manyImages)
                }
                await getCompressedImagesLinks(imagesFromInput, setImages)
            }
        } catch (e) {
            console.log('e', e)
        } finally {
            setLoading(false)
        }
    }

    const deleteImage = async (current: string) => {
        setLoading(true)
        try {
            const res = images.filter((image) => image !== current)
            setImages(res)
            return await handleDeleteImage(current)
        } catch (e) {
            console.log('e', e)
        } finally {
            setLoading(false)
        }

    }

    return (
        <>
            <div>
                <div>
                    <h4>{t('addPhoto')}</h4>
                    <div
                        className={clsx({
                            [classes.image]: !isMobile,
                            [classes.imageMobile]: isMobile,
                        })}
                        onClick={() => {
                            if (ref.current) {
                                ref.current.click()
                            }
                        }}
                    >
                        <Image
                            alt='image'
                            src={NO_IMAGE}
                            fill={true}
                            style={{
                                objectFit: 'cover',
                            }}
                        />
                    </div>
                </div>
                <Input
                    id='upload'
                    type='file'
                    onChange={imageHandler}
                    hidden
                    multiple
                    accept={ACCEPTED_IMAGE_FORMAT}
                    ref={ref}
                />
            </div>
            <h4>{t('preview')}</h4>
            <ul
                className={clsx({
                    [classes.images]: !isMobile,
                    [classes.imagesMobile]: isMobile,
                })}
            >
                {images.map((image: string, index: number) => {
                    return (
                        <li
                            key={image}
                            className={clsx({
                                [classes.image]: !isMobile,
                                [classes.imageMobile]: isMobile,
                            })}
                        >
                            <Image
                                alt={image}
                                src={image}
                                style={{
                                    objectFit: 'cover',
                                }}
                                fill={true}
                                placeholder='blur'
                                blurDataURL={NO_IMAGE}
                            />
                            <Icon
                                className={classes.leftArrow}
                                onClick={(e: MouseEvent) => {
                                    moveImage(
                                        e,
                                        images,
                                        index,
                                        MoveImage.left,
                                        setImages,
                                    )
                                }}
                            >
                                &larr;
                            </Icon>
                            <Icon
                                className={classes.rightArrow}
                                onClick={(e: MouseEvent) => {
                                    moveImage(
                                        e,
                                        images,
                                        index,
                                        MoveImage.right,
                                        setImages,
                                    )
                                }}
                            >
                                &rarr;
                            </Icon>
                            <Icon
                                className={classes.deleteIcon}
                                onClick={async () => {
                                    await deleteImage(image)
                                }}
                            >
                                &times;
                            </Icon>
                        </li>
                    )
                })}
                {loading && (
                    <li
                        className={clsx({
                            [classes.image]: !isMobile,
                            [classes.imageMobile]: isMobile,
                        })}
                    >
                        <p className={classes.loadingImage}>
                            Загружаем изображение
                        </p>
                    </li>
                )}
            </ul>
            {!loading && <span style={{
                color: 'red',
                fontSize: 14,
            }}>{error}</span>}
        </>
    )
}

export default PostFormImages
