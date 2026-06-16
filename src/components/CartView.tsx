import React from 'react';
import {
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
} from '@ionic/react';
import { add, remove, trashOutline, cartOutline } from 'ionicons/icons';
import { useCart } from '../context/CartContext';
import { formatIDR } from '../utils/format';

interface Props {
  onCheckout?: () => void;
  showCheckoutButton?: boolean;
}

const CartView: React.FC<Props> = ({ onCheckout, showCheckoutButton = true }) => {
  const { items, totals, setQty, removeItem, clear } = useCart();

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <IonIcon icon={cartOutline} />
        <p>Keranjang masih kosong</p>
        <IonNote>Tap produk untuk menambahkan</IonNote>
      </div>
    );
  }

  return (
    <>
      <div className="cart-scroll">
        <IonList>
          {items.map((item) => (
            <IonItem key={item.product.id} lines="full">
              {item.product.image && (
                <img
                  slot="start"
                  className="cart-thumb"
                  src={item.product.image}
                  alt=""
                  loading="lazy"
                  onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
                />
              )}
              <IonLabel>
                <h3>
                  {item.product.emoji} {item.product.name}
                </h3>
                <IonNote color="medium">
                  {formatIDR(item.product.price)} × {item.qty} ={' '}
                  {formatIDR(item.product.price * item.qty)}
                </IonNote>
              </IonLabel>
              <div className="qty-control" slot="end">
                <IonButton
                  size="small"
                  fill="clear"
                  color="medium"
                  onClick={() => setQty(item.product.id, item.qty - 1)}
                >
                  <IonIcon slot="icon-only" icon={remove} />
                </IonButton>
                <span className="qty-value">{item.qty}</span>
                <IonButton
                  size="small"
                  fill="clear"
                  color="primary"
                  onClick={() => setQty(item.product.id, item.qty + 1)}
                >
                  <IonIcon slot="icon-only" icon={add} />
                </IonButton>
                <IonButton
                  size="small"
                  fill="clear"
                  color="danger"
                  onClick={() => removeItem(item.product.id)}
                >
                  <IonIcon slot="icon-only" icon={trashOutline} />
                </IonButton>
              </div>
            </IonItem>
          ))}
        </IonList>
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal ({totals.itemCount} item)</span>
          <span className="summary-value">{formatIDR(totals.subtotal)}</span>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <span className="summary-value">{formatIDR(totals.subtotal)}</span>
        </div>
        {showCheckoutButton && (
          <>
            <IonButton expand="block" color="primary" onClick={onCheckout} style={{ marginTop: 8 }}>
              Bayar · {formatIDR(totals.subtotal)}
            </IonButton>
            <IonButton expand="block" fill="clear" color="medium" onClick={clear}>
              Kosongkan Keranjang
            </IonButton>
          </>
        )}
      </div>
    </>
  );
};

export default CartView;
