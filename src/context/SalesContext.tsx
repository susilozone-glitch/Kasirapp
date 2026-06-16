import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Sale } from '../types';
import { loadSales, saveSale as persistSale, clearSales } from '../storage/salesStore';

interface SalesContextValue {
  sales: Sale[];
  lastSale: Sale | null;
  loaded: boolean;
  recordSale: (sale: Sale) => Promise<void>;
  resetHistory: () => Promise<void>;
  getSale: (id: string) => Sale | undefined;
}

const SalesContext = createContext<SalesContextValue | undefined>(undefined);

export const SalesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [lastSale, setLastSale] = useState<Sale | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadSales().then((s) => {
      setSales(s);
      setLoaded(true);
    });
  }, []);

  const recordSale = useCallback(async (sale: Sale) => {
    const next = await persistSale(sale);
    setSales(next);
    setLastSale(sale);
  }, []);

  const resetHistory = useCallback(async () => {
    await clearSales();
    setSales([]);
  }, []);

  const getSale = useCallback(
    (id: string) => sales.find((s) => s.id === id) || (lastSale?.id === id ? lastSale : undefined),
    [sales, lastSale]
  );

  return (
    <SalesContext.Provider value={{ sales, lastSale, loaded, recordSale, resetHistory, getSale }}>
      {children}
    </SalesContext.Provider>
  );
};

export function useSales(): SalesContextValue {
  const ctx = useContext(SalesContext);
  if (!ctx) throw new Error('useSales must be used within SalesProvider');
  return ctx;
}
