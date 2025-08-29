import { Item } from '@typings/basket';

export const getTotalQuantity = (basket: Item) => {
  const values = Object.values(basket);

  return values.reduce((sum, { quantity }) => sum + quantity, 0);
};

export const getBasketItems = (basket: Item) => Object.entries(basket);
