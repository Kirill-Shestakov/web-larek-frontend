import { Component, IEvents } from '../../components';
import { ensureElement } from '../../utils';

interface IForm {
	valid: boolean;
	errors: string[];
}

export class Form<T> extends Component<IForm> {
	protected _submit: HTMLButtonElement;
	protected _errors: HTMLElement;

	constructor(protected container: HTMLFormElement, protected events: IEvents) {
		super(container);

		this._submit = ensureElement<HTMLButtonElement>(
			'button[type=submit]',
			this.container
		);
		this._errors = ensureElement<HTMLElement>('.form__errors', this.container);

		this.container.addEventListener('input', this.handleInput);
		this.container.addEventListener('submit', this.handleSubmit);
	}

	private handleInput = (e: Event): void => {
		const target = e.target as HTMLInputElement;
		const field = target.name as keyof T;
		const value = target.value;
		this.onInputChange(field, value);
	};

	private handleSubmit = (e: Event): void => {
		e.preventDefault();
		this.events.emit(`${this.container.name}:submit`);
	};

	protected onInputChange(field: keyof T, value: string): void {
		this.events.emit('orderInput:change', { field, value });
	}

	set valid(value: boolean) {
		this._submit.disabled = !value;
	}

	set errors(value: string) {
		this.setText(this._errors, value);
	}

	render(state: Partial<T> & IForm): HTMLFormElement {
		const { valid, errors, ...inputs } = state;
		super.render({ valid, errors });
		Object.assign(this, inputs);
		return this.container;
	}
}
