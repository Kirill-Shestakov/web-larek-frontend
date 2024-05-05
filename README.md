# Проектная работа "Веб-ларек"

Web-ларёк - интернет-магазин для веб-разработчиков. Широкий выбор программных решений, скиллов и других инструментов для веб-разработки.

## Используемый стек

- **Frontend:** HTML, SCSS, TypeScript, Webpack

## Структура проекта

- `src/` — исходные файлы проекта
- `src/components/` — папка с компонентами на JavaScript
- `src/components/base/` — папка с базовым кодом

### Важные файлы:

- `src/pages/index.html` — HTML-файл главной страницы
- `src/types/index.ts` — файл с типами
- `src/index.ts` — точка входа приложения
- `src/scss/styles.scss` — корневой файл стилей
- `src/utils/constants.ts` — файл с константами
- `src/utils/utils.ts` — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## Архитектура проекта

## Основные типы данных

### CategoryType
Перечисление доступных категорий продуктов:
- `SoftSkill`: "софт-скил"
- `HardSkill`: "хард-скил"
- `Other`: "другое"
- `Button`: "кнопка"
- `Additional`: "дополнительное"

### IProduct
Интерфейс, описывающий продукт:
- `id`: Уникальный идентификатор продукта.
- `description`: Описание продукта.
- `image`: Ссылка на изображение.
- `title`: Название продукта.
- `category`: Категория из `CategoryType`.
- `price`: Цена, может быть `null`.
- `selected`: Опционально, указывает, добавлен ли товар в корзину.

### IAppState
Интерфейс состояния приложения:
- `basket`: Массив продуктов в корзине.
- `store`: Массив всех продуктов.
- `order`: Информация о текущем заказе.
- `formErrors`: Ошибки форм.

### IOrder
Интерфейс для заказа:
- `items`: Массив ID купленных товаров.
- `payment`: Способ оплаты.
- `total`: Сумма заказа.
- `address`: Адрес доставки.
- `email`: Электронная почта.
- `phone`: Телефон.

## Базовый код

### Class Api
Базовый класс для всех взаимодействий с API. Обеспечивает методы для выполнения HTTP-запросов.
- `constructor(baseUrl: string, options: RequestInit = {})`: Инициализирует экземпляр с базовым URL и настройками запроса.
- `get(uri: string)`: Выполняет GET-запрос.
- `post(uri: string, data: object, method: ApiPostMethods = 'POST')`: Выполняет POST-запрос, может также использоваться для PUT и DELETE.
- `handleResponse(response: Response)`: Обрабатывает ответ сервера, преобразуя его в JSON или генерируя ошибку.

### Class EventEmitter
Класс для управления событиями, реализует интерфейс `IEvents`.
- `on<T extends object>(eventName: EventName, callback: (data: T) => void)`: Подписывается на событие.
- `off(eventName: EventName, callback: Subscriber)`: Отписывается от события.
- `emit<T extends object>(eventName: string, data?: T)`: Генерирует событие, передавая данные подписчикам.
- `trigger<T extends object>(eventName: string, context?: Partial<T>)`: Создает функцию, которая при вызове инициирует событие с указанными данными.

### Abstract class Component<T>
Абстрактный базовый класс для всех UI компонентов. Предоставляет базовые методы для взаимодействия с DOM.
- Методы: `toggleClass`, `setText`, `setDisabled`, `setHidden`, `setVisible`, `setImage`, `render`.

### Abstract class Model<T>
Абстрактный базовый класс для всех моделей данных. Предоставляет методы для управления данными.
- Методы: `updateData`, `getData`.

## Классы модели данных (MODEL)

### Class Product
Класс `Product` расширяет базовую модель и представляет собой продукт в приложении.
- `constructor(data: IProduct, events: any)`: Инициализирует продукт с данными и системой событий. 
  - `data: IProduct`: Данные продукта.
  - `events: any`: Система событий для взаимодействия с другими частями приложения.

### Class AppState
Класс `AppState` управляет основным состоянием приложения, включая корзину, список продуктов, информацию о заказе и ошибки форм.
- `constructor(initialState: IAppState, events: any)`: Инициализирует состояние приложения.
  - `initialState: IAppState`: Начальное состояние приложения.
  - `events: any`: Система событий для взаимодействия.
- Методы:
  - `addToBasket(product: Product)`: Добавляет продукт в корзину.
  - `removeFromBasket(productId: string)`: Удаляет продукт из корзины.
  - `clearBasket()`: Очищает корзину.
  - `validateContacts()`: Проверяет контактные данные заказа.
  - `validateOrder()`: Проверяет данные заказа.

### VIEW

#### Class Card
Класс `Card` является компонентом для отображения карточек продуктов. Реализован на основе абстрактного класса `Component<IProduct>` и использует интерфейс `IProduct` для работы с данными продукта.

- `constructor(blockName: string, container: HTMLElement, actions?: ICardActions)`: Инициализирует карточку продукта с заданными настройками.
  - `blockName`: Базовое имя класса для элементов карточки.
  - `container`: HTML-контейнер, в который будет вставлена карточка.
  - `actions`: Объект событий, например клик по кнопке.
  
- Свойства:
  - `_title`: Название продукта.
  - `_image`: Изображение продукта.
  - `_category`: Категория продукта.
  - `_price`: Цена продукта.
  - `_button`: Кнопка действия (например, добавить в корзину).

- Методы:
  - `set id(value: string)`: Устанавливает идентификатор продукта в атрибут данных контейнера.
  - `get id()`: Возвращает идентификатор продукта из атрибута данных контейнера.
  - `set title(value: string)`: Устанавливает название продукта.
  - `get title()`: Возвращает название продукта.
  - `set image(value: string)`: Устанавливает изображение продукта.
  - `set selected(value: boolean)`: Управляет состоянием кнопки (активно/неактивно).
  - `set price(value: number | null)`: Устанавливает цену продукта и управляет состоянием кнопки в зависимости от наличия цены.
  - `set category(value: CategoryType)`: Устанавливает категорию продукта и соответствующие классы для стилизации.

## События в приложении

### Основные события

- **`items:changed`**: Инициируется при изменении списка товаров и вызывает перерисовку списка товаров на странице.
- **`card:select`**: Инициируется при клике на карточку товара, приводя к открытию модального окна с подробным описанием товара.
- **`card:toBasket`**: Инициируется при клике на кнопку "В корзину" на карточке товара, добавляет товар в корзину и обновляет счётчик на корзине.
- **`basket:open`**: Инициируется при клике на кнопку "корзина", открывая модальное окно, где отображаются товары, добавленные в корзину.
- **`basket:delete`**: Инициируется при клике на кнопку удаления товара в корзине, удаляет товар из корзины и обновляет сумму заказа.
- **`basket:order`**: Инициируется при клике на кнопку "Оформить" в корзине, открывая окно с формой для заполнения адреса и способа оплаты.
- **`order:submit`**: Инициируется при нажатии на кнопку "Далее" на стадии заполнения адреса и способа оплаты.
- **`contacts:submit`**: Инициируется при нажатии на кнопку "Оплатить" на стадии заполнения телефона и электронной почты.
- **`orderInput:change`**: Инициируется при вводе данных в форму заказа и начинает процесс валидации формы.
- **`orderFormErrors:change`**: Инициируется при вводе данных в форму заказа и обновляет ошибки формы.
- **`contactsFormErrors:change`**: Инициируется при вводе данных в форму контактов и обновляет ошибки формы.
- **`order:success`**: Инициируется при успешном ответе сервера при оплате товара, открывая модальное окно о успешной оплате.
- **`modal:close`**: Инициируется при клике на кнопку закрытия модального окна или при клике на свободное место вокруг модального окна.