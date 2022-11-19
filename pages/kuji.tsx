import MainLayout from '../components/MainLayout/MainLayout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import { GetStaticProps } from 'next/types'
import React, { useEffect, useState } from 'react'

const Kuji = () => {
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])
    if (!mounted) return null
    return (
        <MainLayout>
            <Image
                src={'/kuji/kuji.jpg'}
                height={300}
                width={300}
                style={{ objectFit: 'cover' }}
                alt={'kuji'}
            />

            <div>
                <h1>Kuji</h1>
                <p>🍣Настоящая паназиатская кухня в Иннополисе 🚀</p>
                <p>🌌Технопарк им. Лобачевского</p>
                <p>
                    📲Для заказа пиши{' '}
                    <a
                        href={'https:t.me/kuji_admin'}
                        style={{ cursor: 'pointer', color: 'teal' }}
                    >
                        @kuji_admin
                    </a>
                </p>
                <h3>Вкусный сытный обед за 450₽</h3>
                <span>*предложение действует в зале с 12:00 до 15:00</span>
            </div>

            <div>
                <ul>
                    <li>
                        <h5>Понедельник 25.07</h5>
                        <ul>
                            <li>🔸Крем-суп с шиитаке</li>
                            <li>🔸Запечённый ролл с лососем</li>
                        </ul>
                    </li>
                    <li>
                        <h5>Вторник 26.07</h5>
                        <ul>
                            <li>🔸Том кха</li>
                            <li>🔸Темпурный ролл с тунцом</li>
                        </ul>
                    </li>
                    <li>
                        <h5>Среда 27.07</h5>
                        <ul>
                            <li>🔸Суимоно с курицей</li>
                            <li>🔸Запечённый ролл с лососем</li>
                        </ul>
                    </li>
                    <li>
                        <h5>Четверг 28.07</h5>
                        <ul>
                            <li>🔸Крем-суп с шиитаке</li>
                            <li>🔸Ролл Цезарь</li>
                        </ul>
                    </li>
                    <li>
                        <h5>Пятница 29.07</h5>
                        <ul>
                            <li>🔸Том кха</li>
                            <li>🔸Тяхан с курицей</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </MainLayout>
    )
}

export default Kuji

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale as string, ['common'])),
        },
    }
}
