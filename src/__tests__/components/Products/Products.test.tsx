import { screen } from '@testing-library/react';

import Products from '@components/Products';
import { renderWithBasketContext } from '@testing/utils/render';

describe('Products', () => {
  let addToBasket: jest.Mock;

  beforeEach(() => {
    addToBasket = jest.fn();
  });

  it('renders the products', () => {
    const { container } = renderWithBasketContext(<Products />, {
      addToBasket,
    });

    const names = screen.getAllByRole('heading', {
      level: 2,
      name: /.* ->$/,
    });

    const descriptions = container.querySelectorAll('p');

    expect(names).toHaveLength(4);
    expect(descriptions).toHaveLength(4);
  });

  it('calls addToBasket on product click', () => {
    const name = 'Item 1';

    renderWithBasketContext(<Products />, {
      addToBasket,
    });

    const productButton = screen.getByRole('button', {
      name: new RegExp(`Add ${name} to basket$`),
    });

    productButton.click();

    expect(addToBasket).toHaveBeenCalledTimes(1);
  });

  it('calls addToBasket with the product name on click', () => {
    const name = 'Item 1';

    renderWithBasketContext(<Products />, {
      addToBasket,
    });

    const productButton = screen.getByRole('button', {
      name: new RegExp(`Add ${name} to basket$`),
    });

    productButton.click();

    const callArgs = addToBasket.mock.calls[0];

    expect(callArgs[0]).toEqual(name);
  });
});
