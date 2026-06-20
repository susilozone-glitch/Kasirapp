import { Product } from '../types';

// Placeholder product images (no external photo dependency). Generates a clean
// labeled placeholder in the brand palette. Swap for your own CDN URLs or
// bundled assets in production.
const img = (label: string) =>
  `https://placehold.co/400x400/eef2ff/2563eb?text=${encodeURIComponent(label)}`;

// Seed catalog. Replace/extend freely — prices in IDR.
export const PRODUCTS: Product[] = [
  { id: 'p01', name: 'Kopi Hitam', category: 'Minuman', price: 12000, sku: 'DRK-001', image: img('Kopi Hitam'), stock: 50 },
  { id: 'p02', name: 'Es Teh Manis', category: 'Minuman', price: 8000, sku: 'DRK-002', image: img('Es Teh Manis'), stock: 80 },
  { id: 'p03', name: 'Cappuccino', category: 'Minuman', price: 22000, sku: 'DRK-003', image: img('Cappuccino'), stock: 40 },
  { id: 'p04', name: 'Jus Alpukat', category: 'Minuman', price: 18000, sku: 'DRK-004', image: img('Jus Alpukat'), stock: 30 },
  { id: 'p05', name: 'Air Mineral', category: 'Minuman', price: 5000, sku: 'DRK-005', image: img('Air Mineral'), stock: 120 },

  { id: 'p06', name: 'Nasi Goreng', category: 'Makanan', price: 25000, sku: 'FD-001', image: img('Nasi Goreng'), stock: 25 },
  { id: 'p07', name: 'Mie Ayam', category: 'Makanan', price: 20000, sku: 'FD-002', image: img('Mie Ayam'), stock: 25 },
  { id: 'p08', name: 'Ayam Goreng', category: 'Makanan', price: 23000, sku: 'FD-003', image: img('Ayam Goreng'), stock: 30 },
  { id: 'p09', name: 'Sate Ayam', category: 'Makanan', price: 28000, sku: 'FD-004', image: img('Sate Ayam'), stock: 20 },
  { id: 'p10', name: 'Gado-Gado', category: 'Makanan', price: 19000, sku: 'FD-005', image: img('Gado-Gado'), stock: 18 },

  { id: 'p11', name: 'Pisang Goreng', category: 'Snack', price: 10000, sku: 'SN-001', image: img('Pisang Goreng'), stock: 40 },
  { id: 'p12', name: 'Roti Bakar', category: 'Snack', price: 14000, sku: 'SN-002', image: img('Roti Bakar'), stock: 35 },
  { id: 'p13', name: 'Kentang Goreng', category: 'Snack', price: 16000, sku: 'SN-003', image: img('Kentang Goreng'), stock: 45 },
  { id: 'p14', name: 'Donat', category: 'Snack', price: 9000, sku: 'SN-004', image: img('Donat'), stock: 50 },

  { id: 'p15', name: 'Es Krim', category: 'Dessert', price: 15000, sku: 'DS-001', image: img('Es Krim'), stock: 30 },
  { id: 'p16', name: 'Puding Coklat', category: 'Dessert', price: 12000, sku: 'DS-002', image: img('Puding Coklat'), stock: 25 },
];

export const CATEGORIES = ['Semua', 'Minuman', 'Makanan', 'Snack', 'Dessert'];
