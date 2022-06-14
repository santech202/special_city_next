export const routes = {
    add: '/add',
    profile: '/profile',
    main: '/',
    search: '/search',
    edit: '/edit'
}

export const titles = {
    profile: "Личный кабинет",
    add: "Добавить объявление",
    edit: "Редактировать объявление"
}

export const NO_IMAGE = '/images/no-image.jpeg'

export const SEO_TITLE = 'Доска объявлений города Иннополис';
export const SEO_DESCRIPTION = 'Доска объявлений – объявления города Иннополис о продаже и покупке товаров всех категорий. Самый простой способ продать или купить вещи.'
export const SEO_IMAGE = '/icons/icon-192x192.png'
export const ACCEPTED_IMAGE_FORMAT = ".jpg, .jpeg, .png"

export type InputType = 'category' | 'price' | 'title' | 'body'
export interface ErrorProps {
    name: InputType
}
