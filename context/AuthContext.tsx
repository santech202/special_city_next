import { createContext, ReactNode, useState } from 'react'
import useEffectOnce from 'hooks/useEffectOnce'
import * as jose from 'jose'

import { secret } from '../utils/secret'

export interface UserProps {
    id: number,
    username: string
    first_name: string | null,
    last_name: string | null,
    photo_url: string | null,
}

type authContextType = {
    user: UserProps | undefined;
    login: (a: UserProps) => void;
    logout: () => void;
    token: string
};

const authContextDefaultValues: authContextType = {
    user: undefined,
    token: '',
    login: () => {
    },
    logout: () => {
    },
}
export const AuthContext = createContext<authContextType>(authContextDefaultValues)


type Props = {
    children: ReactNode;
};

export function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<UserProps | undefined>(undefined)
    const [token, setToken] = useState('')

    const checkToken = async () => {
        const token = localStorage.getItem('token')
        if (token) {
            try {
                const { payload } = await jose.jwtVerify(token, secret)
                // @ts-ignore
                setUser(payload)
                setToken(token)
            } catch
                (e) {
                console.log('e', e)
            }
        }
    }

// @ts-ignore
    useEffectOnce(() => {
        checkToken()
        return () => checkToken()
    })

    const login = (user: UserProps) => {
        setUser(user)
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser(undefined)
    }

    const value = {
        user,
        token,
        login,
        logout,
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
