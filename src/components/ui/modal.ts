import { ensureElement } from '../../utils';
import { IEvents, Component } from '../../components';

interface IPopupData {
	content: HTMLElement;
}

export class Popup extends Component<IPopupData> {
	protected _closeButton: HTMLButtonElement;
	protected _content: HTMLElement;
	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);
		this._closeButton = ensureElement<HTMLButtonElement>(
			'.modal__close',
			container
		);
		this._content = ensureElement<HTMLElement>('.modal__content', container);
		this._closeButton.addEventListener('click', () => this.close());
		this.container.addEventListener('click', () => this.close());
		this._content.addEventListener('click', (event) => event.stopPropagation());
	}

	set content(value: HTMLElement) {
		this._content.replaceChildren(value);
	}

	open() {
		this.container.classList.add('modal_active');
		this.events.emit('modal:open');
	}

	close() {
		this.container.classList.remove('modal_active');
		this._content.innerHTML = '';
		this.events.emit('modal:close');
	}

	render(data: IPopupData): HTMLElement {
		super.render(data);
		this.content = data.content;
		this.open();
		return this.container;
	}
}
