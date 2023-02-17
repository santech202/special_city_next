export interface Seo {
    title: string,
    description: string
}

export const seo: Record<string, Seo> = {
    default: {
        title: 'Доска объявлений города Иннополис',
        description: 'Здесь вы можете найти объяления о продаже и покупке товаров и об услугах города Иннополис. Бесплатно подать объявление.'
    },
    profile: {
        title: 'Личный кабинет',
        description: 'Здесь вы можете подать объявление, редактировать и удалять уже существующие'
    },
    add: {
        title: 'Добавить объявление',
        description: 'Самый простой способ подать объявление: укажите категорию, цену, фото и описание'
    },
    edit: {
        title: 'Редактировать объявление',
        description: 'В этой форме вы можете легко отредактировать уже существующее объявление'
    },
    auth: {
        title: 'На страницу авторизации',
        description: 'Вам нужно авторизоваться, прежде чем попасть в личный кабинет или подать объявление'
    },
    blog: {
        title: 'Блог',
        description: 'В этом разделе публикуется важная информация'
    },
    favourites: {
        title: 'Избранное',
        description: 'Страница с объяалениями, которые вам понравились'
    },
    search: {
        title: 'Поиск в InnoAds',
        description: 'Ищите объявления города Иннополис в бесплатной доске InnoAds'
    },
    notFound: {
        title: 'Страница не найдена',
        description: 'Перейдите на главную страницу или в личный кабинет'
    }
}

export const tgLink = 'https://t.me'

export const NO_IMAGE = '/images/no-image.jpeg'

export const SEO_TITLE = 'Доска объявлений города Иннополис'
export const SEO_DESCRIPTION =
    'Доска объявлений – объявления города Иннополис о продаже и покупке товаров всех категорий. Самый простой способ продать или купить вещи.'
export const SEO_IMAGE = '/icons/icon-192x192.png'
export const ACCEPTED_IMAGE_FORMAT = '.jpg, .jpeg, .png'

export type FormValues = {
    title: string,
    body: string,
    price: number | null,
    categoryId: number
}

export const defaultValues = {
    categoryId: 1,
    title: '',
    price: null,
    body: '',
}

export const messages = {
    forbiddenWords: 'Есть запрещенные слова!',
    postUpdated: 'Ваше объявление изменено!',
    somethingWentWrong: "Что-то пошло не так!"
}