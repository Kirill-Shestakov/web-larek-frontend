import { Product } from '../components/AppData';

// Определение типа для категорий продуктов
export enum CategoryType {
    SoftSkill = "софт-скил",
    HardSkill = "хард-скил",
    Other = "другое",
    Button = "кнопка",
    Additional = "дополнительное"
}


// Интерфейс, описывающий структуру данных продукта
export interface IProduct {
    id: string;               // Уникальный ID продукта
    description: string;      // Описание продукта
    image: string;            // Ссылка на изображение продукта
    title: string;            // Название продукта
    category: CategoryType;   // Категория товара
    price: number | null;     // Цена товара, может быть null
    selected?: boolean;        // Был ли данный товар добавлен в корзину
}

// Интерфейс, описывающий внутреннее состояние приложения
export interface IAppState {
    basket: Product[];       // Корзина с товарами
    store: Product[];        // Массив карточек товара
    order: IOrder;            // Информация о заказе при покупке товара
    formErrors: FormErrors;   // Ошибки при заполнении форм
}

// Интерфейс, описывающий поля заказа товара
export interface IOrder {
    items: string[];          // Массив ID купленных товаров
    payment: string;          // Способ оплаты
    total: number;            // Сумма заказа
    address: string;          // Адрес доставки
    email: string;            // Электронная почта
    phone: string;            // Телефон
}

// Интерфейс для формы заказа
type IOrderForm = Omit<IOrder, 'total' | 'items'>;

// Интерфейс для ошибок форм
export type FormErrors = Partial<Record<keyof IOrder, string>>;

// Интерфейс для ответа сервера
export interface OrderResponse {
    id: string;
    total: number;
}