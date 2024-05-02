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
- `src/styles/styles.scss` — корневой файл стилей
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

Проект использует архитектуру, основанную на модели MVP, включая следующие компоненты:

------------
[![UML](https://previews.dropbox.com/p/thumb/ACSYP5Ch1gyDn4LUA8Bh1r-fTYVcbN58fBonZiXTWbOugKmeWaILDYDzJO-zLAABJtapecTEh0JGMQoioFKEO005Ww8G3XLjw3mxsMsw69REHUAHDutK_JjP2gHbVZo7ynNwm1TmsNQeE9duyApMNwvCQBIeSFocVdPHutCDmTwc76_ZF7M7utF08o3Dc8KjwrkD8izQfRrHBhSCRvIMrHJh6mbOLkCDWc8TKCwsOm3BXnAmFCiFBQ0seIftvfy7NhQuBp5MwiAAA9jXfZTBbmTN_Gvp2YB3fVwWx0x_sHYkjpAtHkw8yljU9y_CeGsklc6tMPVEhom9jexOKFzsJf4a/p.jpeg "UML")](https://previews.dropbox.com/p/thumb/ACSYP5Ch1gyDn4LUA8Bh1r-fTYVcbN58fBonZiXTWbOugKmeWaILDYDzJO-zLAABJtapecTEh0JGMQoioFKEO005Ww8G3XLjw3mxsMsw69REHUAHDutK_JjP2gHbVZo7ynNwm1TmsNQeE9duyApMNwvCQBIeSFocVdPHutCDmTwc76_ZF7M7utF08o3Dc8KjwrkD8izQfRrHBhSCRvIMrHJh6mbOLkCDWc8TKCwsOm3BXnAmFCiFBQ0seIftvfy7NhQuBp5MwiAAA9jXfZTBbmTN_Gvp2YB3fVwWx0x_sHYkjpAtHkw8yljU9y_CeGsklc6tMPVEhom9jexOKFzsJf4a/p.jpeg "UML")
------------



### Класс Model
**Model** служит базовым классом для всех моделей данных в приложении. Он предоставляет общие методы и структуру, которые могут быть переиспользованы другими моделями, облегчая таким образом разработку и поддержку кода.

**Функции:**

**`updateData(update: Partial<T>): void`** - Метод позволяет обновить данные модели, принимая объект с частичными данными и объединяя его с текущими данными модели.

**`getData(): T`** - Метод для получения текущих данных модели.

------------


### Класс Product
**Product** представляет собой модель данных для товаров в интернет-магазине. Этот класс хранит всю необходимую информацию о товаре и предоставляет методы для управления этими данными.

**Функции:**

Конструктор класса инициализирует экземпляр продукта с заданными значениями свойств, таких как идентификатор, описание, изображение, название, категория, цена и статус выбора.

------------


### Класс AppState
**AppState** является центральным хранилищем всего состояния приложения. Он управляет коллекциями продуктов в магазине и корзине, информацией о заказах и потенциальными ошибками форм.

**Функции:**

**`addToBasket(product: Product): void`** - Добавляет продукт в корзину.

**`removeFromBasket(productId: string): void`** - Удаляет продукт из корзины по идентификатору.

**`clearBasket(): void`** - Очищает корзину от всех продуктов.

**`validateContacts(): boolean и validateOrder(): boolean`** - Проверяют корректность введенной пользователем информации в формах контактов и заказа соответственно.

------------


### Интерфейсы IProduct, IAppState, IOrder, FormErrors
Эти интерфейсы определяют структуру данных, которую должны соответствовать соответствующие классы и компоненты системы. Они служат "договором", который гарантирует, что данные будут содержать все необходимые поля.

**`IProduct`** - описывает структуру данных продукта.

**`IAppState`** -  описывает структуру основного состояния приложения.

**`IOrder`** - описывает структуру данных заказа.

**`FormErrors`** - описывает возможные ошибки, которые могут возникнуть в формах ввода данных.
