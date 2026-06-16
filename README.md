# Kasir App

A point-of-sale (kasir) app built with **Ionic React + Capacitor**. Runs in the browser for development and as a native **Android / iOS** app on phone or tablet. Fully responsive: on tablets the cart sits in a side panel beside the product grid; on phones it opens as a bottom sheet.

## Features

- **Product catalog** — searchable grid with category filters and a seed catalog (`src/data/products.ts`), each product shown with a photo (emoji fallback).
- **Cart** — add/remove items, adjust quantity, live subtotal.
- **Checkout** — discount, PPN tax (11% default), payment method (Tunai / Kartu / QRIS), cash tendered with quick-cash buttons and automatic change.
- **Receipt** — formatted struk with print (`window.print()`) and share (Capacitor Share, with clipboard fallback on web).
- **Sales history** — transactions grouped by day, today's revenue / item / transaction summary, tap any sale to reopen its receipt.
- **Local storage** — sales persisted on-device via Capacitor Preferences (offline, no backend).

## Tech stack

Ionic React 8, React 18, Vite 5, TypeScript, Capacitor 6.

## Quick preview (no build)

Open `preview.html` in any browser — a self-contained vanilla-JS version of the app for instant viewing (uses localStorage; demo product photos need internet).

## Getting started

```bash
npm install
npm run dev          # http://localhost:5173
```

To preview a tablet layout, widen the browser past 768px. Below 768px the phone layout (bottom cart sheet) is used.

## Build for the web

```bash
npm run build        # type-checks then bundles to dist/
npm run preview
```

## Run as a native app (Android / iOS)

```bash
npm run build

# Add platforms (first time only)
npx cap add android
npx cap add ios          # macOS + Xcode required

# Sync web assets into native projects after each build
npx cap sync

# Open in the native IDE
npx cap open android     # Android Studio
npx cap open ios         # Xcode
```

## Project structure

```
src/
  data/products.ts        Seed product catalog + categories
  types.ts                Product, CartItem, Sale, PaymentMethod
  context/
    CartContext.tsx       Cart state + totals (subtotal, discount, tax)
    SalesContext.tsx      Sales list + persistence
  storage/salesStore.ts   Capacitor Preferences read/write
  utils/format.ts         IDR currency + date formatting
  components/
    ProductCard.tsx
    CartView.tsx          Reusable cart UI (side panel + phone modal)
  pages/
    PosPage.tsx           Catalog + cart (responsive)
    CheckoutPage.tsx      Payment, tax, discount, change
    ReceiptPage.tsx       Struk + print/share
    HistoryPage.tsx       Sales history + daily totals
  theme/
    variables.css         Ionic color theme (+ dark mode)
    app.css               Layout styles
```

## Customizing

- **Products** — edit `src/data/products.ts` (prices in IDR). Each product has an `image` URL (demo photos from loremflickr.com) and an `emoji` fallback. Swap `image` for your own CDN URLs or bundled assets for production.
- **Tax rate** — default 11% in `CartContext.tsx` (`useState(0.11)`).
- **Store info on receipt** — edit the `STORE` constant in `src/pages/ReceiptPage.tsx`.
- **Currency** — change locale/currency in `src/utils/format.ts`.
