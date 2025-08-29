import { screen } from '@testing-library/react';

import Basket from '@components/Basket';
import { renderWithBasketContext } from '@testing/utils/render';

describe('Basket', () => {
  it('renders an empty basket', () => {
    renderWithBasketContext(<Basket />);

    const basketButton = screen.getByRole('button', {
      name: /Go to checkout, 0 items in basket$/,
    });

    expect(basketButton).toHaveTextContent(/Basket: 0 items$/);
  });

  it('renders a non-empty basket', () => {
    const basket = {
      'Item 1': {
        quantity: 1,
      },
    };

    renderWithBasketContext(<Basket />, {
      basket,
    });

    const basketButton = screen.getByRole('button', {
      name: /Go to checkout, 1 items in basket$/,
    });

    expect(basketButton).toHaveTextContent(/Basket: 1 items$/);
  });

  it('renders a basket list', () => {
    const basket = {
      'Item 1': {
        quantity: 1,
      },
    };

    renderWithBasketContext(<Basket />, {
      basket,
    });

    const basketList = screen.getByRole('list', {
      name: /Basket items$/,
    });

    expect(basketList).toBeInTheDocument();
  });

  it('renders an item in the basket', () => {
    const itemOneKey = 'Item 1';
    const itemOne = { [itemOneKey]: { quantity: 1 } };

    const basket = itemOne;

    renderWithBasketContext(<Basket />, {
      basket,
    });

    const basketListItem = screen.getByText(
      new RegExp(`${itemOneKey} count: ${itemOne[itemOneKey].quantity}$`),
      {
        selector: 'li',
      },
    );

    expect(basketListItem).toHaveTextContent(
      new RegExp(`${itemOneKey} count: ${itemOne[itemOneKey].quantity}$`),
    );
  });

  it('renders multiple items in the basket', () => {
    const itemOneKey = 'Item 1';
    const itemTwoKey = 'Item 2';
    const itemOne = { [itemOneKey]: { quantity: 1 } };
    const itemTwo = { [itemTwoKey]: { quantity: 2 } };

    const basket = {
      ...itemOne,
      ...itemTwo,
    };

    renderWithBasketContext(<Basket />, {
      basket,
    });

    const basketListItems = screen.getAllByRole('listitem');

    expect(basketListItems[0]).toHaveTextContent(
      new RegExp(`${itemOneKey} count: ${itemOne[itemOneKey].quantity}$`),
    );
    expect(basketListItems[1]).toHaveTextContent(
      new RegExp(`${itemTwoKey} count: ${itemTwo[itemTwoKey].quantity}$`),
    );
  });

  it('applies the correct CSS class to the basket button', () => {
    renderWithBasketContext(<Basket />);

    const basketButton = screen.getByRole('button', {
      name: /Go to checkout, 0 items in basket$/,
    });

    expect(basketButton).toHaveClass('basket');
  });

  it('applies the correct CSS class to the basket list', () => {
    const basket = {
      'Item 1': {
        quantity: 1,
      },
    };

    renderWithBasketContext(<Basket />, {
      basket,
    });

    const basketList = screen.getByRole('list', {
      name: /Basket items$/,
    });

    expect(basketList).toHaveClass('basketList');
  });
});
