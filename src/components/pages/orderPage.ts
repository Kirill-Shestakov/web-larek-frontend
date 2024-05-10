import { Form, IEvents } from '../../components';

export interface IOrder {
	address: string;
	payment: string;
}

export class Order extends Form<IOrder> {
	protected _card: HTMLButtonElement;
	protected _cash: HTMLButtonElement;

	constructor(
		protected blockName: string,
		container: HTMLFormElement,
		protected events: IEvents
	) {
		super(container, events);

		this._card = container.elements.namedItem('card') as HTMLButtonElement;
		this._cash = container.elements.namedItem('cash') as HTMLButtonElement;

		this.initPaymentButtons();
	}

	private initPaymentButtons(): void {
		const buttons: { [key: string]: HTMLButtonElement } = {
			card: this._card,
			cash: this._cash,
		};

		Object.entries(buttons).forEach(([paymentMethod, button]) => {
			if (!button) {
				return;
			}

			button.addEventListener('click', () => {
				this.updatePaymentMethod(paymentMethod, buttons);
			});
		});
	}

	private updatePaymentMethod(
		selectedMethod: string,
		buttons: { [key: string]: HTMLButtonElement }
	): void {
		Object.entries(buttons).forEach(([method, button]) => {
			if (method === selectedMethod) {
				button.classList.add('button_alt-active');
				this.onInputChange('payment', method);
			} else {
				button.classList.remove('button_alt-active');
			}
		});
	}

	disableButtons(): void {
		this._cash.classList.remove('button_alt-active');
		this._card.classList.remove('button_alt-active');
	}
}
