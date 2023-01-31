import React from 'react'
import {clsx} from 'clsx'

import classes from './Button.module.scss'

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
    transparent?: boolean
}

const Button = ({
                    children,
                    className,
                    type,
                    transparent = false,
                    ...props
                }: ButtonProps): JSX.Element => {
    return (
        <button
            className={clsx(classes.button, className, {[classes.buttonTransparent]: transparent})}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button
