import type { AppProps } from 'next/app'
import Script from 'next/script'
import { appWithTranslation } from 'next-i18next'
import React from 'react'
import { YMInitializer } from 'react-yandex-metrika'
import axios from 'axios'
import { AuthProvider } from 'context/AuthContext'

import 'styles/globals.scss'

axios.defaults.headers.common['Secret'] = `${process.env.NEXT_PUBLIC_SECRET}`

function MyApp({ Component, pageProps }: AppProps) {

    return (
            <AuthProvider>
                <Component {...pageProps} />
                <YMInitializer
                    accounts={[88487475]}
                    options={{ webvisor: true, defer: true }}
                    version="2"
                />
            </AuthProvider>
    )
}

export default appWithTranslation(MyApp)
