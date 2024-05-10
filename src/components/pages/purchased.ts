import { Component } from '../../components';

interface IpurchasedActions {
	onClick: (event: MouseEvent) => void;
}

export interface IPurchased {
	description: number;
}

export class Purchased extends Component<IPurchased> {
	protected _button: HTMLButtonElement | null;
	protected _description: HTMLElement | null;

	constructor(
		protected blockName: string,
		container: HTMLElement,
		actions?: IpurchasedActions
	) {
		super(container);

		this._button = container.querySelector(`.${blockName}__close`);
		this._description = container.querySelector(`.${blockName}__description`);

		if (actions?.onClick) {
			this.initializeEventListeners(actions.onClick);
		}
	}

	private initializeEventListeners(onClick: (event: MouseEvent) => void): void {
		if (this._button) {
			this._button.addEventListener('click', onClick);
		}
	}

	set description(value: string) {
		if (this._description) {
			this._description.textContent = `Списано ${value} синапсов`;
		}
	}
}
