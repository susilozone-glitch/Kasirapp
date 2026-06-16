import React from 'react';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { printOutline, shareSocialOutline, addCircleOutline } from 'ionicons/icons';
import { useHistory, useParams } from 'react-router-dom';
import { Share } from '@capacitor/share';
import { useSales } from '../context/SalesContext';
import { formatIDR, formatDateTime } from '../utils/format';
import { Sale } from '../types';

const STORE = {
  name: 'KASIR APP',
  address: 'Jl. Merdeka No. 123, Jakarta',
  phone: '021-555-0100',
};

function paymentLabel(m: Sale['paymentMethod']): string {
  return m === 'cash' ? 'Tunai' : m === 'card' ? 'Kartu' : 'QRIS';
}

function buildReceiptText(sale: Sale): string {
  const lines: string[] = [];
  lines.push(STORE.name);
  lines.push(STORE.address);
  lines.push(`No: ${sale.id}`);
  lines.push(formatDateTime(sale.createdAt));
  lines.push('--------------------------------');
  sale.items.forEach((i) => {
    lines.push(`${i.product.name}`);
    lines.push(`  ${i.qty} x ${formatIDR(i.product.price)} = ${formatIDR(i.product.price * i.qty)}`);
  });
  lines.push('--------------------------------');
  lines.push(`Subtotal: ${formatIDR(sale.subtotal)}`);
  if (sale.discount > 0) lines.push(`Diskon: -${formatIDR(sale.discount)}`);
  lines.push(`PPN (${Math.round(sale.taxRate * 100)}%): ${formatIDR(sale.tax)}`);
  lines.push(`TOTAL: ${formatIDR(sale.total)}`);
  lines.push(`Bayar (${paymentLabel(sale.paymentMethod)}): ${formatIDR(sale.amountPaid)}`);
  if (sale.paymentMethod === 'cash') lines.push(`Kembali: ${formatIDR(sale.change)}`);
  lines.push('--------------------------------');
  lines.push('Terima kasih atas kunjungan Anda!');
  return lines.join('\n');
}

const ReceiptPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { getSale } = useSales();
  const sale = getSale(id);

  const handlePrint = () => window.print();

  const handleShare = async () => {
    if (!sale) return;
    const text = buildReceiptText(sale);
    try {
      await Share.share({ title: `Struk ${sale.id}`, text });
    } catch {
      try {
        await navigator.clipboard.writeText(text);
        alert('Struk disalin ke clipboard');
      } catch {
        /* ignore */
      }
    }
  };

  if (!sale) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Struk</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div className="empty-state">
            <p>Struk tidak ditemukan.</p>
            <IonButton onClick={() => history.replace('/pos')}>Ke Kasir</IonButton>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Struk Pembayaran</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleShare}>
              <IonIcon slot="icon-only" icon={shareSocialOutline} />
            </IonButton>
            <IonButton onClick={handlePrint}>
              <IonIcon slot="icon-only" icon={printOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="receipt-paper" id="receipt">
          <div className="receipt-center">
            <h2 style={{ margin: '0 0 2px' }}>{STORE.name}</h2>
            <div style={{ fontSize: '0.78rem' }}>{STORE.address}</div>
            <div style={{ fontSize: '0.78rem' }}>{STORE.phone}</div>
          </div>
          <hr className="receipt-divider" />
          <div className="receipt-line">
            <span>No</span>
            <span>{sale.id}</span>
          </div>
          <div className="receipt-line">
            <span>Tanggal</span>
            <span>{formatDateTime(sale.createdAt)}</span>
          </div>
          <hr className="receipt-divider" />

          {sale.items.map((i) => (
            <div key={i.product.id} style={{ marginBottom: 4 }}>
              <div className="receipt-item-name">{i.product.name}</div>
              <div className="receipt-line receipt-item-detail">
                <span>
                  {i.qty} × {formatIDR(i.product.price)}
                </span>
                <span>{formatIDR(i.product.price * i.qty)}</span>
              </div>
            </div>
          ))}

          <hr className="receipt-divider" />
          <div className="receipt-line">
            <span>Subtotal</span>
            <span>{formatIDR(sale.subtotal)}</span>
          </div>
          {sale.discount > 0 && (
            <div className="receipt-line">
              <span>Diskon</span>
              <span>− {formatIDR(sale.discount)}</span>
            </div>
          )}
          <div className="receipt-line">
            <span>PPN ({Math.round(sale.taxRate * 100)}%)</span>
            <span>{formatIDR(sale.tax)}</span>
          </div>
          <div className="receipt-line" style={{ fontWeight: 700, fontSize: '1rem' }}>
            <span>TOTAL</span>
            <span>{formatIDR(sale.total)}</span>
          </div>
          <hr className="receipt-divider" />
          <div className="receipt-line">
            <span>Bayar ({paymentLabel(sale.paymentMethod)})</span>
            <span>{formatIDR(sale.amountPaid)}</span>
          </div>
          {sale.paymentMethod === 'cash' && (
            <div className="receipt-line">
              <span>Kembali</span>
              <span>{formatIDR(sale.change)}</span>
            </div>
          )}
          <hr className="receipt-divider" />
          <div className="receipt-center" style={{ fontSize: '0.8rem' }}>
            Terima kasih atas kunjungan Anda!
          </div>
        </div>

        <div style={{ padding: '0 16px 24px', maxWidth: 380, margin: '0 auto' }}>
          <IonButton expand="block" onClick={() => history.replace('/pos')}>
            <IonIcon slot="start" icon={addCircleOutline} />
            Transaksi Baru
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ReceiptPage;
