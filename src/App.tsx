import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { cartOutline, receiptOutline } from 'ionicons/icons';

/* Core CSS required for Ionic components */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme */
import './theme/variables.css';
import './theme/app.css';

import { CartProvider } from './context/CartContext';
import { SalesProvider } from './context/SalesContext';

import PosPage from './pages/PosPage';
import CheckoutPage from './pages/CheckoutPage';
import ReceiptPage from './pages/ReceiptPage';
import HistoryPage from './pages/HistoryPage';

setupIonicReact({ mode: 'md' });

const App: React.FC = () => (
  <IonApp>
    <SalesProvider>
      <CartProvider>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/pos" component={PosPage} />
              <Route exact path="/checkout" component={CheckoutPage} />
              <Route exact path="/receipt/:id" component={ReceiptPage} />
              <Route exact path="/history" component={HistoryPage} />
              <Route exact path="/">
                <Redirect to="/pos" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="pos" href="/pos">
                <IonIcon icon={cartOutline} />
                <IonLabel>Kasir</IonLabel>
              </IonTabButton>
              <IonTabButton tab="history" href="/history">
                <IonIcon icon={receiptOutline} />
                <IonLabel>Riwayat</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </CartProvider>
    </SalesProvider>
  </IonApp>
);

export default App;
