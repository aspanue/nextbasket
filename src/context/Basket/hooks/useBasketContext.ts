import { useContext } from 'react';

import { BasketContext } from '@context/Basket';

export const useBasketContext = () => useContext(BasketContext);
