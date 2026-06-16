import { Preferences } from '@capacitor/preferences';
import { Sale } from '../types';

const SALES_KEY = 'kasir.sales.v1';

// Capacitor Preferences works on web (localStorage-backed) and native.
export async function loadSales(): Promise<Sale[]> {
  try {
    const { value } = await Preferences.get({ key: SALES_KEY });
    if (!value) return [];
    const parsed = JSON.parse(value) as Sale[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveSale(sale: Sale): Promise<Sale[]> {
  const sales = await loadSales();
  const next = [sale, ...sales];
  await Preferences.set({ key: SALES_KEY, value: JSON.stringify(next) });
  return next;
}

export async function clearSales(): Promise<void> {
  await Preferences.remove({ key: SALES_KEY });
}
