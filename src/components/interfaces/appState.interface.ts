import { Product } from "../models/product";
import { IOrder } from "./order.interface";
import { FormErrors } from '../interfaces/formErrors.interface';

export interface IAppState {
  store: Product[];
  basket: Product[];
  order: IOrder;
  formErrors: FormErrors;
}