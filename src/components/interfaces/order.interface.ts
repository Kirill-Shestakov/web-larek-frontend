export interface IOrder {
    items: string[];
    payment: string;
    total: number | null;
    address: string;
    email: string;
    phone: string;
}

export interface IOrderForm {
    address?: string;
    email?: string;
    phone?: string;
    payment?: string;
}
