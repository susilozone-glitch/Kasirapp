import React, { useMemo, useState } from 'react';
import {
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { cartOutline, closeOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import CartView from '../components/CartView';
import { formatIDR } from '../utils/format';

const PosPage: React.FC = () => {
  const history = useHistory();
  const { addItem, totals } = useCart();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Semua');
  const [cartOpen, setCartOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const matchCat = category === 'Semua' || p.category === category;
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        (p.sku || '').toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, category]);

  const goCheckout = () => {
    setCartOpen(false);
    history.push('/checkout');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Kasir</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            value={search}
            debounce={150}
            placeholder="Cari produk atau SKU..."
            onIonInput={(e: CustomEvent) => setSearch(e.detail.value || '')}
          />
        </IonToolbar>
        <IonToolbar>
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', padding: '0 8px 6px' }}>
            {CATEGORIES.map((c) => (
              <IonChip
                key={c}
                color={category === c ? 'primary' : 'medium'}
                outline={category !== c}
                onClick={() => setCategory(c)}
              >
                {c}
              </IonChip>
            ))}
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="pos-layout">
          <div className="pos-products">
            <div className="product-grid">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} onAdd={addItem} />
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="empty-state" style={{ height: 200 }}>
                <p>Tidak ada produk ditemukan</p>
              </div>
            )}
          </div>

          <aside className="pos-cart-panel">
            <CartView onCheckout={goCheckout} />
          </aside>
        </div>

        {totals.itemCount > 0 && (
          <div className="mobile-cart-bar">
            <IonButton expand="block" color="light" onClick={() => setCartOpen(true)}>
              <IonIcon slot="start" icon={cartOutline} />
              {totals.itemCount} item · {formatIDR(totals.subtotal)}
            </IonButton>
          </div>
        )}

        <IonModal isOpen={cartOpen} onDidDismiss={() => setCartOpen(false)} breakpoints={[0, 0.9]} initialBreakpoint={0.9}>
          <IonHeader>
            <IonToolbar color="primary">
              <IonTitle>Keranjang</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setCartOpen(false)}>
                  <IonIcon slot="icon-only" icon={closeOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CartView onCheckout={goCheckout} />
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default PosPage;
