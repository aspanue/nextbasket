'use client';
import React, { useMemo } from 'react';

import styles from './basket.module.css';
import BasketItem from '@components/BasketItem';
import { useBasketContext } from '@context/Basket';
import { getTotalQuantity, getBasketItems } from '@utils/basket';

const Basket: React.FC = () => {
  const { basket } = useBasketContext();

  const totalQuantity = useMemo(() => getTotalQuantity(basket), [basket]);
  const basketItems = useMemo(() => getBasketItems(basket), [basket]);

  const shouldRenderBasketItems = basketItems.length > 0;
  const ariaLabel = `Go to checkout, ${totalQuantity} items in basket`;

  return (
    <div>
      <button type="button" className={styles.basket} aria-label={ariaLabel}>
        Basket: {totalQuantity} items
      </button>
      {shouldRenderBasketItems && (
        <ul className={styles.basketList} aria-label="Basket items">
          {basketItems.map(([name, item]) => {
            const quantity = item?.quantity || 0;

            return <BasketItem key={name} name={name} count={quantity} />;
          })}
        </ul>
      )}
    </div>
  );
};

export default React.memo(Basket);
