export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  sku?: string;
  emoji?: string;
  image?: string;
  stock?: number;
}

export interface CartItem {
  product: Product;
  qty: number;
}

export type PaymentMethod = 'cash' | 'card' | 'qris';

export interface Sale {
  id: string;
  createdAt: string; // ISO timestamp
  items: CartItem[];
  subtotal: number;
  discount: number; // absolute amount
  taxRate: number; // e.g. 0.11
  tax: number;
  total: number;
  paymentMethod: PaymentMethod;
  amountPaid: number;
  change: number;
}
