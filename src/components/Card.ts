import { Component } from './base/Component';
import { IProduct, CategoryType } from '../types';
import { ensureElement, handlePrice } from '../utils/utils';
import { CDN_URL, categoryMapping } from '../utils/constants';

interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

// Используем IProduct вместо ICard для соответствия вашим типам
export class Card extends Component<IProduct> {
  protected _title: HTMLElement;
  protected _image: HTMLImageElement;
  protected _category: HTMLElement;
  protected _price: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(
    protected blockName: string,
    container: HTMLElement,
    actions?: ICardActions
  ) {
    super(container);

    this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
    this._image = ensureElement<HTMLImageElement>(`.${blockName}__image`, container);
    this._button = container.querySelector(`.${blockName}__button`);
    this._category = container.querySelector(`.${blockName}__category`);
    this._price = container.querySelector(`.${blockName}__price`);

    if (actions?.onClick) {
      this._button.addEventListener('click', actions.onClick);
    }
  }

  set id(value: string) {
    this.container.dataset.id = value;
  }

  get id(): string {
    return this.container.dataset.id || '';
  }

  set title(value: string) {
    this._title.textContent = value;
  }

  get title(): string {
    return this._title.textContent || '';
  }

  set image(value: string) {
    this._image.src = `${CDN_URL}/${value}`;
  }

  set selected(value: boolean) {
    this._button.disabled = value;
  }

  set price(value: number | null) {
    this._price.textContent = handlePrice(value);
    if (value === null) {
        this._button.disabled = true;
    } else {
        this._button.disabled = false;
    }
}

set category(value: CategoryType) {
    this._category.textContent = value;
    this._category.className = `category ${value.toLowerCase()}`;
    this._category.classList.add(categoryMapping[value]);
    }
}
