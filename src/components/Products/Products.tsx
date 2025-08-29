'use client';
import React from 'react';

import { useBasketContext } from '@context/Basket';
import Product from '@components/Product';
import products from '@data/products/products.json';

const Products: React.FC = () => {
  const { addToBasket } = useBasketContext();

  return (
    <>
      {products.map(({ name, description }) => (
        <Product
          key={name}
          name={name}
          description={description}
          onClick={() => addToBasket(name)}
        />
      ))}
    </>
  );
};

export default React.memo(Products);
