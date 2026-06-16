import React, { useMemo } from 'react';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from '@ionic/react';
import { trashOutline, receiptOutline, chevronForward } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useSales } from '../context/SalesContext';
import { formatIDR, formatDate, formatDateTime } from '../utils/format';
import { Sale } from '../types';

const HistoryPage: React.FC = () => {
  const history = useHistory();
  const { sales, resetHistory } = useSales();
  const [presentAlert] = useIonAlert();

  const today = new Date().toDateString();
  const todayStats = useMemo(() => {
    const todaySales = sales.filter((s) => new Date(s.createdAt).toDateString() === today);
    const revenue = todaySales.reduce((sum, s) => sum + s.total, 0);
    const itemsSold = todaySales.reduce(
      (sum, s) => sum + s.items.reduce((q, i) => q + i.qty, 0),
      0
    );
    return { count: todaySales.length, revenue, itemsSold };
  }, [sales, today]);

  const grouped = useMemo(() => {
    const map = new Map<string, Sale[]>();
    sales.forEach((s) => {
      const key = new Date(s.createdAt).toDateString();
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(s);
    });
    return Array.from(map.entries());
  }, [sales]);

  const confirmClear = () => {
    presentAlert({
      header: 'Hapus Riwayat?',
      message: 'Semua data transaksi akan dihapus permanen.',
      buttons: [
        { text: 'Batal', role: 'cancel' },
        { text: 'Hapus', role: 'destructive', handler: () => resetHistory() },
      ],
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Riwayat Penjualan</IonTitle>
          {sales.length > 0 && (
            <IonButtons slot="end">
              <IonButton onClick={confirmClear}>
                <IonIcon slot="icon-only" icon={trashOutline} />
              </IonButton>
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div style={{ display: 'flex', gap: 10, padding: 16, flexWrap: 'wrap' }}>
          <StatCard label="Transaksi Hari Ini" value={String(todayStats.count)} />
          <StatCard label="Item Terjual" value={String(todayStats.itemsSold)} />
          <StatCard label="Omzet Hari Ini" value={formatIDR(todayStats.revenue)} wide />
        </div>

        {sales.length === 0 ? (
          <div className="empty-state" style={{ height: 240 }}>
            <IonIcon icon={receiptOutline} />
            <p>Belum ada transaksi</p>
            <IonButton onClick={() => history.push('/pos')}>Mulai Jualan</IonButton>
          </div>
        ) : (
          grouped.map(([day, daySales]) => {
            const dayTotal = daySales.reduce((s, x) => s + x.total, 0);
            return (
              <IonList key={day} inset>
                <IonListHeader>
                  <IonLabel>
                    <strong>{formatDate(daySales[0].createdAt)}</strong>
                  </IonLabel>
                  <IonNote slot="end" color="primary" style={{ paddingRight: 8 }}>
                    {formatIDR(dayTotal)}
                  </IonNote>
                </IonListHeader>
                {daySales.map((s) => {
                  const qty = s.items.reduce((q, i) => q + i.qty, 0);
                  return (
                    <IonItem key={s.id} button detail={false} onClick={() => history.push(`/receipt/${s.id}`)}>
                      <IonLabel>
                        <h3>{s.id}</h3>
                        <IonNote color="medium">
                          {formatDateTime(s.createdAt)} · {qty} item
                        </IonNote>
                      </IonLabel>
                      <div slot="end" style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 700, color: 'var(--ion-color-primary)' }}>
                          {formatIDR(s.total)}
                        </div>
                      </div>
                      <IonIcon slot="end" icon={chevronForward} color="medium" />
                    </IonItem>
                  );
                })}
              </IonList>
            );
          })
        )}
      </IonContent>
    </IonPage>
  );
};

const StatCard: React.FC<{ label: string; value: string; wide?: boolean }> = ({ label, value, wide }) => (
  <div
    style={{
      flex: wide ? '1 1 100%' : '1 1 120px',
      background: 'var(--ion-card-background, #fff)',
      borderRadius: 14,
      padding: '14px 16px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      border: '1px solid rgba(0,0,0,0.05)',
    }}
  >
    <div style={{ fontSize: '0.78rem', color: 'var(--ion-color-medium)' }}>{label}</div>
    <div style={{ fontSize: wide ? '1.5rem' : '1.3rem', fontWeight: 800, color: 'var(--ion-color-primary)' }}>
      {value}
    </div>
  </div>
);

export default HistoryPage;
