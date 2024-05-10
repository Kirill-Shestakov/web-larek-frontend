import { IProduct } from '../../types';
import { handlePrice } from '../../utils';
import { IEvents, Component } from '../../components';

export interface ICart {
	list: HTMLElement[];
	price: number;
}

export class Basket extends Component<ICart> {
	protected _list: HTMLElement;
	protected _price: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(
		protected blockName: string,
		container: HTMLElement,
		protected events: IEvents
	) {
		super(container);

		this._button = container.querySelector(`.${blockName}__button`)!;
		this._price = container.querySelector(`.${blockName}__price`)!;
		this._list = container.querySelector(`.${blockName}__list`)!;

		if (!this._button || !this._price || !this._list) {
			throw new Error(
				'One or more essential elements are missing in the component'
			);
		}

		this._button.addEventListener('click', () =>
			this.events.emit('basket:order')
		);
	}

	set price(price: number) {
		this._price.textContent = `${handlePrice(price)} синапсов`;
	}

	set list(items: HTMLElement[]) {
		this._list.replaceChildren(...items);
		this._button.disabled = items.length === 0;
	}

	disableButton() {
		this._button.disabled = true;
	}

	refreshIndices() {
		Array.from(this._list.children).forEach((item, index) => {
			const indexElement = item.querySelector('.basket__item-index');
			if (indexElement) {
				indexElement.textContent = (index + 1).toString();
			}
		});
	}
}

export interface IProductBasket extends IProduct {
	index: number;
}

export interface IStoreItemBasketActions {
	onClick: (event: MouseEvent) => void;
}

export class StoreItemBasket extends Component<IProductBasket> {
	protected _index: HTMLElement;
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(
		protected blockName: string,
		container: HTMLElement,
		actions?: IStoreItemBasketActions
	) {
		super(container);

		this._title = container.querySelector(`.${blockName}__title`)!;
		this._index = container.querySelector('.basket__item-index')!;
		this._price = container.querySelector(`.${blockName}__price`)!;
		this._button = container.querySelector(`.${blockName}__button`)!;

		if (!this._title || !this._index || !this._price || !this._button) {
			throw new Error(
				'One or more essential elements are missing in the component'
			);
		}

		this._button.addEventListener('click', (evt) => {
			this.container.remove();
			actions?.onClick(evt);
		});
	}

	set title(value: string) {
		this._title.textContent = value;
	}

	set index(value: number) {
		this._index.textContent = value.toString();
	}

	set price(value: number) {
		this._price.textContent = `${handlePrice(value)} синапсов`;
	}
}
