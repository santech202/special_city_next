import Link from 'next/link'
import { GetServerSideProps, GetStaticPaths, GetStaticProps, InferGetServerSidePropsType, NextPage } from 'next/types'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import { PostInterface } from 'types'
import fetchPosts from 'utils/api/fetchPosts'
import fetchUser from 'utils/api/fetchUser'
import { tgLink } from 'utils/constants'
import sortByCreatedAt from 'utils/sortByUpdatedAt'

import Button from 'components/Button/Button'
import Item from 'components/Item/Item'
import MainLayout from 'components/Layout/Layout'

import fetchUsers from '../../utils/api/fetchUsers'

import classes from 'styles/classes.module.scss'

const PublicProfile: NextPage = ({ posts, user }: any) => {
    const { t } = useTranslation('post')
    return (
        <MainLayout>
            <h1>{t('userProfile')}</h1>
            <p>
                {t('adsCount')}: <span>{posts.length}</span>
            </p>
            <div className={classes.mt40} />
            <ul className={classes.items}>
                {posts.map((post: PostInterface) => <Item post={post} key={post.slug} />)}
            </ul>
            <div className={classes.mt40} />
            <Link href={tgLink + '/' + user.username} passHref>
                <Button>{t('textAuthor')}</Button>
            </Link>
        </MainLayout>
    )
}

export default PublicProfile

interface Path {
    params: { id: string },
    locale: string
}

export const getStaticPaths: GetStaticPaths = async ({ locales = [] }) => {
    const users = await fetchUsers()
    const paths: Path[] = users.flatMap(user => locales.map(locale => ({
        params: { id: user.id.toString() },
        locale,
    })))
    return {
        paths,
        fallback: false,
    }
}
export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
    const userId = Number(params?.id)
    const user = await fetchUser(userId)
    const { content: posts } = await fetchPosts({
        size: 10, userId,
    })
    if (!posts || !user) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            posts: sortByCreatedAt(posts),
            user,
            ...(await serverSideTranslations(locale as string, [
                'common',
                'post',
            ])),
        },
    }
}

// export const getServerSideProps: GetServerSideProps = async ({
//                                                                  locale,
//                                                                  query,
//                                                              }) => {
//     const userId = Number(query.id)
//     const user = await fetchUser(userId)
//     const { content: posts } = await fetchPosts({
//         size: 10, userId,
//     })
//
//     if (!posts || !user) {
//         return {
//             notFound: true,
//         }
//     }
//
//     return {
//         props: {
//             posts: sortByCreatedAt(posts),
//             user,
//             ...(await serverSideTranslations(locale as string, [
//                 'common',
//                 'post',
//             ])),
//         },
//     }
// }
