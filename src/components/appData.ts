import { Model } from './base/model';
import { IAppState, IOrder, FormErrors, IProduct } from '../types';


export class Product extends Model<IProduct> {
    id: string;
    constructor(data: IProduct, events: any) {
        super(data, events);
    }
}
export class AppState extends Model<IAppState> {
    basket: Product[];
    store: Product[];
    order: IOrder;
    formErrors: FormErrors;

    constructor(initialState: IAppState, events: any) {
        super(initialState, events);
        this.store = initialState.store;
        this.basket = initialState.basket;
        this.order = initialState.order;
        this.formErrors = initialState.formErrors;
    }

    addToBasket(product: Product): void {
        this.basket.push(product);
        this.events.emit('basketUpdated', this.basket);
    }

    removeFromBasket(productId: string): void {
        this.basket = this.basket.filter(product => product.id !== productId);
        this.events.emit('basketUpdated', this.basket);
    }

    clearBasket(): void {
        this.basket = [];
        this.events.emit('basketCleared');
    }

    validateContacts(): boolean {
        const errors: FormErrors = {};
        if (!this.order.email) {
            errors.email = 'Необходимо указать email';
        }
        if (!this.order.phone) {
            errors.phone = 'Необходимо указать телефон';
        }
        this.formErrors = errors;
        this.events.emit('formErrorsUpdated', this.formErrors);
        return Object.keys(errors).length === 0;
    }

    validateOrder(): boolean {
        const errors: FormErrors = {};
        if (!this.order.address) {
            errors.address = 'Необходимо указать адрес';
        }
        if (!this.order.payment) {
            errors.payment = 'Необходимо указать способ оплаты';
        }
        this.formErrors = errors;
        this.events.emit('formErrorsUpdated', this.formErrors);
        return Object.keys(errors).length === 0;
    }
}