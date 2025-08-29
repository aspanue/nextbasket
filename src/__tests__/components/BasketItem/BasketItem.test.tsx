import { render, screen } from '@testing-library/react';

import BasketItem from '@components/BasketItem';

describe('BasketItem', () => {
  const name = 'Item 1';
  const count = 1;

  beforeEach(() => {
    render(<BasketItem name={name} count={count} />);
  });

  it('renders a basket list item', () => {
    const basketListItem = screen.getByRole('listitem');

    expect(basketListItem).toBeInTheDocument();
  });

  it('renders no more than 1 list item', () => {
    const basketListItems = screen.getAllByRole('listitem');

    expect(basketListItems).toHaveLength(1);
  });

  it('renders the name and count', () => {
    const basketListItem = screen.getByText(
      new RegExp(`${name} count: ${count}$`),
      {
        selector: 'li',
      },
    );

    expect(basketListItem).toHaveTextContent(
      new RegExp(`${name} count: ${count}$`),
    );
  });

  it('applies the correct CSS class', () => {
    const basketListItem = screen.getByRole('listitem');

    expect(basketListItem).toHaveClass('basketItem');
  });
});
