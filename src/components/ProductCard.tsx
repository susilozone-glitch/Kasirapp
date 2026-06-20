import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { fastFoodOutline } from 'ionicons/icons';
import { Product } from '../types';
import { formatIDR } from '../utils/format';

interface Props {
  product: Product;
  onAdd: (p: Product) => void;
}

const ProductCard: React.FC<Props> = ({ product, onAdd }) => {
  const [imgError, setImgError] = useState(false);
  const showImg = product.image && !imgError;

  return (
    <div className="product-card" onClick={() => onAdd(product)} role="button">
      <div className="product-thumb">
        {showImg ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <IonIcon className="product-thumb-fallback" icon={fastFoodOutline} />
        )}
      </div>
      <span className="product-name">{product.name}</span>
      <span className="product-sku">{product.sku}</span>
      <span className="product-price">{formatIDR(product.price)}</span>
    </div>
  );
};

export default ProductCard;
