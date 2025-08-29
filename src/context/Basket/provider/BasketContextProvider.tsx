'use client';
import React, { useState, useCallback } from 'react';
import type { ReactNode } from 'react';

import { initialBasketState, BasketContext } from '@context/Basket';
import type { Item } from '@typings/basket';

type BasketContextProviderProps = {
  children: ReactNode;
};

const BasketContextProvider: React.FC<BasketContextProviderProps> = ({
  children,
}) => {
  const [basket, setBasket] = useState<Item>(initialBasketState.basket);

  const addToBasket = useCallback((product: string) => {
    setBasket((prevBasket) => {
      const existingItem = prevBasket[product];

      return {
        ...prevBasket,
        [product]: {
          quantity: existingItem ? existingItem.quantity + 1 : 1,
        },
      };
    });
  }, []);

  return (
    <BasketContext.Provider value={{ basket, addToBasket }}>
      {children}
    </BasketContext.Provider>
  );
};

export default BasketContextProvider;
