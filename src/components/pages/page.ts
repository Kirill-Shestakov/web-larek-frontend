import { ensureElement } from '../../utils';
import { IEvents, Component } from '../../components';

interface IPageContainer {
	counter: number;
	store: HTMLElement[];
	locked: boolean;
}

export class PageContainer extends Component<IPageContainer> {
	protected _counter: HTMLElement;
	protected _store: HTMLElement;
	protected _wrapper: HTMLElement;
	protected _basket: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._counter = ensureElement<HTMLElement>(
			'.header__basket-counter',
			container
		);
		this._store = ensureElement<HTMLElement>('.gallery', container);
		this._wrapper = ensureElement<HTMLElement>('.page__wrapper', container);
		this._basket = ensureElement<HTMLElement>('.header__basket', container);

		this.initializeEventListeners();
	}

	private initializeEventListeners(): void {
		this._basket.addEventListener('click', () => {
			this.events.emit('basket:open');
		});
	}

	set counter(value: number) {
		this._counter.textContent = String(value);
	}

	set store(items: HTMLElement[]) {
		this._store.replaceChildren(...items);
	}

	set locked(value: boolean) {
		this._wrapper.classList.toggle('page__wrapper_locked', value);
	}
}
