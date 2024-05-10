import {
	IOrder,
	IProduct,
	FormErrors,
	IOrderForm,
	IAppState,
	CategoryType,
} from '../../types';
import { Model } from '../../components';

export class Product extends Model<IProduct> {
	id: string;
	description: string;
	image: string;
	title: string;
	category: CategoryType;
	price: number | null;
	selected: boolean;
}
export class AppState extends Model<IAppState> {
	basket: Product[] = [];
	store: Product[];
	order: IOrder;
	formErrors: FormErrors;
	private basketIds = new Set<string>();
	addToBasket(product: Product) {
		if (!this.basketIds.has(product.id)) {
			this.basket.push(product);
			this.basketIds.add(product.id);
		}
	}

	removeFromBasket(id: string) {
		this.basket = this.basket.filter((product) => {
			const keep = product.id !== id;
			if (!keep) {
				this.basketIds.delete(id);
			}
			return keep;
		});
	}

	clearBasket() {
		this.basket = [];
	}

	validateContacts() {
		const errors: typeof this.formErrors = {};
		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}
		this.formErrors = errors;
		this.events.emit('contactsFormErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	validateOrder() {
		const errors: typeof this.formErrors = {};
		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
		}
		if (!this.order.payment) {
			errors.payment = 'Необходимо указать способ оплаты';
		}
		this.formErrors = errors;
		this.events.emit('orderFormErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	setOrderField(field: keyof IOrderForm, value: string) {
		this.order[field] = value;
		this.validateForm();
	}

	validateForm() {
		this.validateContacts();
		this.validateOrder();
	}

	updateOrder() {
		this.order = {
			items: [],
			total: null,
			address: '',
			email: '',
			phone: '',
			payment: '',
		};
	}

	getCartAmount() {
		return this.basket.length;
	}

	setItems() {
		this.order.items = this.basket.map((item) => item.id);
	}
	getFullBasketPrice() {
		return this.basket.reduce((sum, next) => sum + (next.price || 0), 0);
	}

	resetSelected() {
		this.store.forEach((item) => (item.selected = false));
	}

	setStore(items: IProduct[]) {
		this.store = items.map(
			(item) => new Product({ ...item, selected: false }, this.events)
		);
		this.updateData('items:changed', { store: this.store });
	}
}
