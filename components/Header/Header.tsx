import Link from 'next/link'
import {useTranslation} from 'next-i18next'
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {isMobile} from 'react-device-detect'
import {useAuth} from 'hooks/useAuth'
import useOnClickOutsideRef from 'hooks/useOnClickOutsideRef'
import {Routes} from 'utils/routes'

import Button from 'components/Button/Button'
import Dropdown from 'components/Dropdown/Dropdown'

import LanguageSwitcher from "./LanguageSwitcher/LanguageSwitcher";

import classes from './Header.module.scss'

const Buttons = ({className}: { className?: string }) => {
    const {user} = useAuth()
    const {t} = useTranslation()
    const menu = useMemo(() => [
        {
            id: 'user',
            href: Routes.profile,
            children: t(user ? 'profile' : 'login'),
        },
        {
            id: 'favourite',
            href: Routes.favourites,
            children: t('favourite'),
        },
        {
            id: 'blog',
            href: Routes.blog,
            children: t('blog'),
        },
        {
            id: 'add',
            href: Routes.add,
            children: <Button>{t('addAd')}</Button>,
        },
    ], [user, t])

    return (
        <ul className={className}>
            {menu.map(({id, href, children}) =>
                <li key={id}>
                    <Link href={href}>{children}</Link>
                </li>)
            }
        </ul>
    )
}

const Header = (): JSX.Element | null => {
    const [mounted, setMounted] = useState(false)
    const {t} = useTranslation()

    const [dropdown, setDropdown] = useState(false)

    const openDropdown = useCallback(() => setDropdown(true), [])
    const closeDropdown = useCallback(() => setDropdown(false), [])

    const ref = useOnClickOutsideRef(closeDropdown)

    useEffect(() => setMounted(true), [])

    if (!mounted) {
        return null
    }

    return (
        <nav className={classes.header}>
            <div className={classes.headerWrap}>
                <Link
                    href={Routes.main}
                    className='flex'
                >
                    <span style={{fontSize: 24}}>INNOADS</span>
                    <span hidden={isMobile}>|</span>
                    <span hidden={isMobile}>{t('innopolisClassified')}</span>
                </Link>
                {isMobile ?
                    <div ref={ref}>
                        <Button
                            onClick={openDropdown}
                            className={classes.menu}
                        >
                            &#8801;
                        </Button>

                        {dropdown && (
                            <Dropdown closeToggle={() => openDropdown}>
                                <Buttons/>
                                <LanguageSwitcher/>
                            </Dropdown>
                        )}
                    </div> :
                    <div className='flex'>
                        <LanguageSwitcher/>
                        <Buttons className={'flex'}/>
                    </div>
                }
            </div>
        </nav>
    )
}

export default Header
