import React from 'react';

import styles from './basketItem.module.css';

type BasketItemProps = {
  name: string;
  count: number;
};

const BasketItem: React.FC<BasketItemProps> = ({ name, count }) => (
  <li className={styles.basketItem}>
    {name} count: {count}
  </li>
);

export default React.memo(BasketItem);
