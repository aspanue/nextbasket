import { Item } from '@typings/basket';

export type RenderWithBasketOptions = {
  basket?: Item;
  addToBasket?: (product: string) => void;
};
