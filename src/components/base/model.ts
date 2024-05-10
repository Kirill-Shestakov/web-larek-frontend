import { IEvents } from '../../components';

export class Model<T> {
	constructor(data: Partial<T>, protected events: IEvents) {
		Object.assign(this, data);
	}

	updateData(update: string, payload: Record<string, any> = {}): void {
		this.events.emit(update, payload);
	}
}
