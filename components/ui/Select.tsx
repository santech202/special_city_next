import useValidation from "@/hooks/useValidation";
import {categories} from "@/utils/categories";
import {clsx} from 'clsx'
import {useTranslation} from 'next-i18next'
import React, {useMemo} from 'react'
import ReactSelect from "react-select";

const Select = ({className, defaultValue, label, validations, value, name, ...props}: any) => {
  const error = useValidation(value, validations)
  const {t} = useTranslation()

  const options = useMemo(() => categories.map(({value, label}) => ({value, label: t(label)})), [t])

  return (
    <div className='grid'>
      {label && <label htmlFor={name}>{label}</label>}
      <ReactSelect
        id="select"
        data-testid={name}
        name={name}
        defaultValue={options.find(x => x.value === defaultValue)}
        className={clsx('z-20', className)}
        placeholder={t('chooseCategory')}
        aria-label='select'
        options={options}
        {...props}
      />
      {error && <span className="text-red">{error}</span>}
    </div>
  )
}

export default Select
