import React, { useMemo, useState } from 'react';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  useIonToast,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useSales } from '../context/SalesContext';
import { PaymentMethod, Sale } from '../types';
import { formatIDR } from '../utils/format';

const QUICK_CASH = [50000, 100000, 150000, 200000];

const CheckoutPage: React.FC = () => {
  const history = useHistory();
  const { items, totals, discount, setDiscount, clear } = useCart();
  const { recordSale } = useSales();
  const [present] = useIonToast();

  const [method, setMethod] = useState<PaymentMethod>('cash');
  const [paid, setPaid] = useState<number>(0);

  const change = useMemo(() => Math.max(0, paid - totals.total), [paid, totals.total]);
  const canPay = items.length > 0 && (method !== 'cash' || paid >= totals.total);

  const handlePay = async () => {
    if (!canPay) {
      present({ message: 'Jumlah bayar kurang dari total', duration: 1500, color: 'danger' });
      return;
    }
    const amountPaid = method === 'cash' ? paid : totals.total;
    const sale: Sale = {
      id: `INV-${Date.now()}`,
      createdAt: new Date().toISOString(),
      items: items.map((i) => ({ ...i })),
      subtotal: totals.subtotal,
      discount: totals.discount,
      taxRate: totals.taxRate,
      tax: totals.tax,
      total: totals.total,
      paymentMethod: method,
      amountPaid,
      change: method === 'cash' ? amountPaid - totals.total : 0,
    };
    await recordSale(sale);
    clear();
    history.replace(`/receipt/${sale.id}`);
  };

  if (items.length === 0) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonBackButton defaultHref="/pos" />
            </IonButtons>
            <IonTitle>Pembayaran</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div className="empty-state">
            <p>Keranjang kosong. Tambahkan produk dulu.</p>
            <IonButton onClick={() => history.replace('/pos')}>Kembali ke Kasir</IonButton>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/pos" />
          </IonButtons>
          <IonTitle>Pembayaran</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList inset>
          {items.map((i) => (
            <IonItem key={i.product.id}>
              <IonLabel>
                {i.product.name}
                <p>
                  {formatIDR(i.product.price)} × {i.qty}
                </p>
              </IonLabel>
              <span slot="end">{formatIDR(i.product.price * i.qty)}</span>
            </IonItem>
          ))}
        </IonList>

        <IonList inset>
          <IonItem>
            <IonLabel>Diskon (Rp)</IonLabel>
            <IonInput
              slot="end"
              type="number"
              inputmode="numeric"
              value={discount || ''}
              placeholder="0"
              style={{ textAlign: 'right', maxWidth: 140 }}
              onIonInput={(e: CustomEvent) => setDiscount(Number(e.detail.value) || 0)}
            />
          </IonItem>
        </IonList>

        <div className="cart-summary" style={{ margin: '0 16px', borderRadius: 12, border: '1px solid rgba(0,0,0,0.06)' }}>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatIDR(totals.subtotal)}</span>
          </div>
          <div className="summary-row">
            <span>Diskon</span>
            <span>− {formatIDR(totals.discount)}</span>
          </div>
          <div className="summary-row">
            <span>PPN ({Math.round(totals.taxRate * 100)}%)</span>
            <span>{formatIDR(totals.tax)}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span className="summary-value">{formatIDR(totals.total)}</span>
          </div>
        </div>

        <div style={{ padding: '16px' }}>
          <IonLabel>
            <strong>Metode Pembayaran</strong>
          </IonLabel>
          <IonSegment
            value={method}
            onIonChange={(e: CustomEvent) => {
              setMethod((e.detail.value as PaymentMethod) || 'cash');
              setPaid(0);
            }}
            style={{ marginTop: 8 }}
          >
            <IonSegmentButton value="cash">Tunai</IonSegmentButton>
            <IonSegmentButton value="card">Kartu</IonSegmentButton>
            <IonSegmentButton value="qris">QRIS</IonSegmentButton>
          </IonSegment>
        </div>

        {method === 'cash' && (
          <div style={{ padding: '0 16px 16px' }}>
            <IonItem lines="none" style={{ '--background': 'var(--ion-card-background, #fff)', borderRadius: 12 }}>
              <IonLabel position="stacked">Uang Diterima</IonLabel>
              <IonInput
                type="number"
                inputmode="numeric"
                value={paid || ''}
                placeholder="0"
                onIonInput={(e: CustomEvent) => setPaid(Number(e.detail.value) || 0)}
              />
            </IonItem>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
              <IonButton size="small" fill="outline" onClick={() => setPaid(totals.total)}>
                Uang Pas
              </IonButton>
              {QUICK_CASH.filter((c) => c >= totals.total).slice(0, 4).map((c) => (
                <IonButton key={c} size="small" fill="outline" onClick={() => setPaid(c)}>
                  {formatIDR(c)}
                </IonButton>
              ))}
            </div>
            <div className="summary-row total" style={{ marginTop: 12 }}>
              <span>Kembalian</span>
              <span className="summary-value">{formatIDR(change)}</span>
            </div>
          </div>
        )}
      </IonContent>

      <IonToolbar>
        <div style={{ padding: '8px 16px' }}>
          <IonButton expand="block" color="success" disabled={!canPay} onClick={handlePay}>
            Selesaikan Pembayaran · {formatIDR(totals.total)}
          </IonButton>
        </div>
      </IonToolbar>
    </IonPage>
  );
};

export default CheckoutPage;
