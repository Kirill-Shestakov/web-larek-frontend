import './scss/styles.scss';
import {
	API,
	EventEmitter,
	Popup,
	ShopItem,
	ShopItemPreview,
	StoreItemBasket,
	AppState,
	PageContainer,
	Basket,
	Order,
	ContactForm,
	Purchased,
	Product,
	ApiListResponse,
} from './components';
import { IOrderForm, IProduct } from './types';
import { API_URL, ensureElement, cloneTemplate } from './utils';

const api = new API(API_URL);
const events = new EventEmitter();
type ApiResponse = ApiListResponse<IProduct>;

const templates = {
	storeProduct: ensureElement<HTMLTemplateElement>('#card-catalog'),
	cardPreview: ensureElement<HTMLTemplateElement>('#card-preview'),
	basket: ensureElement<HTMLTemplateElement>('#basket'),
	cardBasket: ensureElement<HTMLTemplateElement>('#card-basket'),
	order: ensureElement<HTMLTemplateElement>('#order'),
	contacts: ensureElement<HTMLTemplateElement>('#contacts'),
	success: ensureElement<HTMLTemplateElement>('#success'),
};

const appData = new AppState({}, events);
const pageContainer = new PageContainer(document.body, events);
const modal = new Popup(ensureElement<HTMLElement>('#modal-container'), events);
const order = new Order('order', cloneTemplate(templates.order), events);
const contacts = new ContactForm(cloneTemplate(templates.contacts), events);
const basket = new Basket('basket', cloneTemplate(templates.basket), events);
const success = new Purchased(
	'order-success',
	cloneTemplate(templates.success),
	{
		onClick: () => {
			events.emit('modal:close');
			modal.close();
		},
	}
);

api
	.get<ApiResponse>('/product')
	.then((res: ApiResponse) => {
		appData.setStore(res.items);
	})
	.catch((err: Error) => {
		console.error(err.message);
	});

events.on('items:changed', () => {
	pageContainer.store = appData.store.map((item) => {
		const product = new ShopItem(cloneTemplate(templates.storeProduct), {
			onClick: () => events.emit('card:select', item),
		});
		return product.render({
			id: item.id,
			title: item.title,
			image: item.image,
			category: item.category,
			price: item.price,
		});
	});
});

events.on('card:select', (item: Product) => {
	pageContainer.locked = true;
	const product = new ShopItemPreview(cloneTemplate(templates.cardPreview), {
		onClick: () => {
			events.emit('card:toBasket', item);
		},
	});
	modal.render({
		content: product.render({
			id: item.id,
			title: item.title,
			image: item.image,
			category: item.category,
			description: item.description,
			price: item.price,
			selected: item.selected,
		}),
	});
});

events.on('card:toBasket', (item: Product) => {
	item.selected = true;
	appData.addToBasket(item);
	pageContainer.counter = appData.getCartAmount();
	modal.close();
});

events.on('orderFormErrors:change', (errors: Partial<IOrderForm>) => {
	const { payment, address } = errors;
	order.valid = !payment && !address;
	order.errors = Object.values({ payment, address })
		.filter((i) => !!i)
		.join('; ');
});

events.on(
	'orderInput:change',
	(data: { field: keyof IOrderForm; value: string }) => {
		appData.setOrderField(data.field, data.value);
	}
);

events.on('basket:open', () => {
	pageContainer.locked = true;
	const basketItems = appData.basket.map((item, index) => {
		const storeItem = new StoreItemBasket(
			'card',
			cloneTemplate(templates.cardBasket),
			{
				onClick: () => events.emit('basket:delete', item),
			}
		);
		return storeItem.render({
			title: item.title,
			price: item.price,
			index: index + 1,
		});
	});
	modal.render({
		content: basket.render({
			list: basketItems,
			price: appData.getFullBasketPrice(),
		}),
	});
});

events.on('basket:delete', (item: Product) => {
	appData.removeFromBasket(item.id);
	item.selected = false;
	basket.price = appData.getFullBasketPrice();
	pageContainer.counter = appData.getCartAmount();
	basket.refreshIndices();
	if (!appData.basket.length) {
		basket.disableButton();
	}
});

events.on('basket:order', () => {
	modal.render({
		content: order.render({
			address: '',
			valid: false,
			errors: [],
		}),
	});
});

events.on('order:submit', () => {
	appData.order.total = appData.getFullBasketPrice();
	appData.setItems();
	modal.render({
		content: contacts.render({
			valid: false,
			errors: [],
		}),
	});
});

events.on('order:success', (res: ApiListResponse<string>) => {
	modal.render({
		content: success.render({
			description: res.total,
		}),
	});
});

events.on('contacts:submit', () => {
	api
		.post<ApiResponse>('/order', appData.order)
		.then((res: ApiResponse) => {
			events.emit('order:success', res);
			appData.clearBasket();
			appData.updateOrder();
			order.disableButtons();
			pageContainer.counter = 0;
			appData.resetSelected();
		})
		.catch((err: Error) => {
			console.log(err.message);
		});
});

events.on('contactsFormErrors:change', (errors: Partial<IOrderForm>) => {
	const { email, phone } = errors;
	contacts.valid = !email && !phone;
	contacts.errors = Object.values({ phone, email })
		.filter((i) => !!i)
		.join('; ');
});

events.on('modal:close', () => {
	pageContainer.locked = false;
	appData.updateOrder();
});
