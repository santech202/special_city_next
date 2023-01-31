import type { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { InferGetServerSidePropsType, NextPage } from 'next/types'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {clsx} from 'clsx'
import { useAuth } from 'hooks/useAuth'
import PostFormImages from 'modules/PostForm/PostFormImages'
import { EditPostInterface } from 'types'
import getPostBySlug from 'utils/api/fetchPost'
import updatePost from 'utils/api/updatePost'
import { defaultValues, FormValues, messages, titles } from 'utils/constants'
import hasCurseWords from 'utils/curseWords'
import { options } from 'utils/options'
import { Routes } from 'utils/routes'

import Button from 'components/Button/Button'
import ErrorBlock from 'components/ErrorBlock/ErrorBlock'
import GoToProfile from 'components/GoToProfile/GoToProfile'
import Input from 'components/Input/Input'
import MainLayout from 'components/Layout/Layout'
import Modal from 'components/Modal/Modal'
import Spinner from 'components/Spinner/Spinner'

import classes from 'styles/classes.module.scss'
import selectStyles from 'styles/select.module.scss'


const Edit: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ post }) => {
    const { t } = useTranslation()
    const { categoryId, userId, title, body, price, id, slug, createdAt } = post
    const router = useRouter()
    const { user } = useAuth()
    const [images, setImages] = useState<string[]>(() => post.images.split('||'))
    const editValues: FormValues = {
        ...defaultValues, categoryId: options.find((x) => x.value === categoryId)?.value || 1, body, title, price,
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({ defaultValues: editValues })
    const [loading, setLoading] = useState(false)


    if (!user) {
        return <GoToProfile />
    }

    const onSubmit = async (data: FormValues) => {
        if (images.length === 0) {
            return
        }

        if (hasCurseWords(data)) {
            return alert(messages.forbiddenWords)
        }

        const { title, body, price, categoryId } = data

        const formData: EditPostInterface = {
            id,
            categoryId: Number(categoryId),
            price: Number(price),
            title,
            body: body.length > 800 ? body.substring(0, 800) + '...' : body,
            preview: images[0],
            images: images.join('||'),
            userId,
            slug,
            createdAt,
        }

        try {
            setLoading(true)
            await updatePost(formData)
            alert(messages.postUpdated)
            return router.push(Routes.profile)
        } catch (e) {
            console.log(e)
            alert(messages.somethingWentWrong)
        } finally {
            setLoading(false)
        }
    }


    return (
        <>
            <Modal visible={loading}>
                <Spinner />
            </Modal>
            <MainLayout title={titles.edit}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={classes.form}
                >
                    <h1>{t('editPost')}</h1>
                    <select
                        className={clsx(selectStyles.select, 'select-css')}
                        {...register('categoryId', { required: true })}
                    >
                        {options.map(({ value, label }) => <option key={value} value={value}>{t(label)}</option>)}
                    </select>
                    <ErrorBlock name={'categoryId'} errors={errors} />
                    <Input
                        type='number'
                        placeholder={t('price') as string}
                        register={register}
                        required={true}
                        name='price'
                    />
                    <ErrorBlock name={'price'} errors={errors} />
                    <Input
                        type='text'
                        placeholder={t('header') as string}
                        register={register}
                        required={true}
                        name='title'
                    />
                    <ErrorBlock name={'title'} errors={errors} />
                    <textarea
                        rows={5}
                        cols={5}
                        placeholder={t('description') as string}
                        {...register('body', { required: true })}
                        className={classes.textArea}
                    />
                    <ErrorBlock name={'body'} errors={errors} />
                    <PostFormImages images={images} setImages={setImages} />
                    <Button
                        className={classes.mt40}
                        type='submit'
                        disabled={loading}
                    >Сохранить изменения
                    </Button>
                </form>
            </MainLayout>
        </>
    )
}

export default Edit

export const getServerSideProps: GetServerSideProps = async ({
                                                                 locale,
                                                                 query,
                                                             }) => {
    const post = await getPostBySlug(query.slug as string)
    if (!post) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            post,
            ...(await serverSideTranslations(locale as string, ['common'])),
        },
    }
}
