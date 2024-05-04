export class Model<T> {
    constructor(public data: T, protected events: any) {}

    // Метод для обновления данных
    updateData(update: Partial<T>): void {
        this.data = { ...this.data, ...update };
        this.events.emit('dataUpdated', this.data);
    }

    // Получение данных
    getData(): T {
        return this.data;
    }
}
