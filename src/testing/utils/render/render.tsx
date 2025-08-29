import React from 'react';
import { render } from '@testing-library/react';

import { RenderWithBasketOptions } from './types';
import { BasketContext } from '@context/Basket';

export const renderWithBasketContext = (
  component: React.ReactNode,
  { basket = {}, addToBasket = () => {} }: RenderWithBasketOptions = {},
) =>
  render(
    <BasketContext.Provider value={{ basket, addToBasket }}>
      {component}
    </BasketContext.Provider>,
  );
