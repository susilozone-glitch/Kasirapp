import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { CartItem, Product } from '../types';

interface CartTotals {
  subtotal: number;
  discount: number;
  taxRate: number;
  tax: number;
  total: number;
  itemCount: number;
}

interface CartContextValue {
  items: CartItem[];
  discount: number;
  taxRate: number;
  totals: CartTotals;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  setDiscount: (amount: number) => void;
  setTaxRate: (rate: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [discount, setDiscountState] = useState(0);
  const [taxRate, setTaxRate] = useState(0.11); // PPN 11% default

  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      const found = prev.find((i) => i.product.id === product.id);
      if (found) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { product, qty: 1 }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const setQty = useCallback((productId: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.product.id !== productId)
        : prev.map((i) => (i.product.id === productId ? { ...i, qty } : i))
    );
  }, []);

  const setDiscount = useCallback((amount: number) => {
    setDiscountState(Math.max(0, amount));
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    setDiscountState(0);
  }, []);

  const totals = useMemo<CartTotals>(() => {
    const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
    const itemCount = items.reduce((s, i) => s + i.qty, 0);
    const cappedDiscount = Math.min(discount, subtotal);
    const taxable = subtotal - cappedDiscount;
    const tax = Math.round(taxable * taxRate);
    const total = taxable + tax;
    return { subtotal, discount: cappedDiscount, taxRate, tax, total, itemCount };
  }, [items, discount, taxRate]);

  const value: CartContextValue = {
    items,
    discount,
    taxRate,
    totals,
    addItem,
    removeItem,
    setQty,
    setDiscount,
    setTaxRate,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
