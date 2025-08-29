import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import BasketContextProvider from '@context/Basket';
import Home from '@app/page';

describe('Home', () => {
  beforeEach(() => {
    render(
      <BasketContextProvider>
        <Home />
      </BasketContextProvider>,
    );
  });

  it('renders an empty basket', () => {
    const basketButton = screen.getByRole('button', {
      name: /Go to checkout, .* in basket/i,
    });

    expect(basketButton).toHaveTextContent(/Basket: 0 items$/);
  });

  it('renders a basket with 1 item', async () => {
    const buttons = screen.getAllByRole('button', {
      name: /Add .* to basket/i,
    });

    await act(async () => {
      await buttons[0].click();
    });

    const basketButton = screen.getByRole('button', {
      name: /Go to checkout, .* in basket/i,
    });

    expect(basketButton).toHaveTextContent(/Basket: 1 items$/);
  });

  it('renders a basket with 1 of item 1 and 2 of item 2', async () => {
    const buttons = screen.getAllByRole('button', {
      name: /Add .* to basket/i,
    });

    await act(async () => {
      await buttons[0].click();
      await buttons[1].click();
      await buttons[1].click();
    });

    const basketButton = screen.getByRole('button', {
      name: /Go to checkout, .* in basket/i,
    });

    expect(basketButton).toHaveTextContent(/Basket: 3 items$/);
  });
});
