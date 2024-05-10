import { IEvents, Form } from '../../components';

export interface IContactInfo {
	phone: string;
	email: string;
}

export class ContactForm extends Form<IContactInfo> {
	constructor(container: HTMLFormElement, eventHandlers: IEvents) {
		super(container, eventHandlers);
	}
}
