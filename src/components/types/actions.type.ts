import { Product } from '../models/product';

export type CartActionType = 'ADD_PRODUCT' | 'REMOVE_PRODUCT';

export interface CartAction {
    type: CartActionType;
    payload: {
        product?: Product;
        productId?: number;
    };
}
