import React from 'react';

import styles from './product.module.css';

type ProductProps = {
  name: string;
  description: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const Product: React.FC<ProductProps> = ({ name, description, onClick }) => {
  const ariaLabel = `Add ${name} to basket`;

  return (
    <button
      type="button"
      className={styles.product}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      <h2>
        {name} <span>-&gt;</span>
      </h2>
      <p>{description}</p>
    </button>
  );
};

export default React.memo(Product);
