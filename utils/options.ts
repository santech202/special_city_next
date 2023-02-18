type Category = 'sell' | 'services' | 'estate' | 'buy' | 'free' | 'clothes'

interface CategoryProps {
    value: number;
    label: Category;
    image: string;
}

export const categories: CategoryProps [] = [
    { value: 1, label: 'sell', image: '/images/sell.png' },
    { value: 3, label: 'services', image: '/images/services.png' },
    { value: 5, label: 'estate', image: '/images/estate.png' },
    { value: 2, label: 'buy', image: '/images/buy.png' },
    { value: 7, label: 'free', image: '/images/free.png' },
    { value: 6, label: 'clothes', image: '/images/clothes.png' },
]
