import { Product } from '../types';

// Deterministic real photo per product (keyword-based). The `lock` param keeps
// the same image for each product across loads. Swap `img()` for your own CDN
// URLs or bundled assets in production.
const img = (keywords: string, lock: number) =>
  `https://loremflickr.com/400/400/${keywords}?lock=${lock}`;

// Seed catalog. Replace/extend freely — prices in IDR.
export const PRODUCTS: Product[] = [
  { id: 'p01', name: 'Kopi Hitam', category: 'Minuman', price: 12000, sku: 'DRK-001', emoji: '☕', image: img('coffee,black', 11), stock: 50 },
  { id: 'p02', name: 'Es Teh Manis', category: 'Minuman', price: 8000, sku: 'DRK-002', emoji: '🧊', image: img('iced,tea', 12), stock: 80 },
  { id: 'p03', name: 'Cappuccino', category: 'Minuman', price: 22000, sku: 'DRK-003', emoji: '☕', image: img('cappuccino', 13), stock: 40 },
  { id: 'p04', name: 'Jus Alpukat', category: 'Minuman', price: 18000, sku: 'DRK-004', emoji: '🥑', image: img('avocado,juice', 14), stock: 30 },
  { id: 'p05', name: 'Air Mineral', category: 'Minuman', price: 5000, sku: 'DRK-005', emoji: '💧', image: img('water,bottle', 15), stock: 120 },

  { id: 'p06', name: 'Nasi Goreng', category: 'Makanan', price: 25000, sku: 'FD-001', emoji: '🍚', image: img('fried,rice', 21), stock: 25 },
  { id: 'p07', name: 'Mie Ayam', category: 'Makanan', price: 20000, sku: 'FD-002', emoji: '🍜', image: img('noodle,soup', 22), stock: 25 },
  { id: 'p08', name: 'Ayam Goreng', category: 'Makanan', price: 23000, sku: 'FD-003', emoji: '🍗', image: img('fried,chicken', 23), stock: 30 },
  { id: 'p09', name: 'Sate Ayam', category: 'Makanan', price: 28000, sku: 'FD-004', emoji: '🍢', image: img('satay,skewer', 24), stock: 20 },
  { id: 'p10', name: 'Gado-Gado', category: 'Makanan', price: 19000, sku: 'FD-005', emoji: '🥗', image: img('vegetable,salad', 25), stock: 18 },

  { id: 'p11', name: 'Pisang Goreng', category: 'Snack', price: 10000, sku: 'SN-001', emoji: '🍌', image: img('fried,banana', 31), stock: 40 },
  { id: 'p12', name: 'Roti Bakar', category: 'Snack', price: 14000, sku: 'SN-002', emoji: '🍞', image: img('toast,bread', 32), stock: 35 },
  { id: 'p13', name: 'Kentang Goreng', category: 'Snack', price: 16000, sku: 'SN-003', emoji: '🍟', image: img('french,fries', 33), stock: 45 },
  { id: 'p14', name: 'Donat', category: 'Snack', price: 9000, sku: 'SN-004', emoji: '🍩', image: img('donut', 34), stock: 50 },

  { id: 'p15', name: 'Es Krim', category: 'Dessert', price: 15000, sku: 'DS-001', emoji: '🍦', image: img('ice,cream', 41), stock: 30 },
  { id: 'p16', name: 'Puding Coklat', category: 'Dessert', price: 12000, sku: 'DS-002', emoji: '🍮', image: img('chocolate,pudding', 42), stock: 25 },
];

export const CATEGORIES = ['Semua', 'Minuman', 'Makanan', 'Snack', 'Dessert'];
