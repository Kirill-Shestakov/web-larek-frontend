import { Model } from '../core/model';
import { IProduct } from '../interfaces/product.interface';

export class Product extends Model<IProduct> {
    id: string;
    constructor(data: IProduct, events: any) {
        super(data, events);
    }
}
