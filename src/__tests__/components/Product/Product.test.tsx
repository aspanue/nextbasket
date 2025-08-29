import { render, screen } from '@testing-library/react';

import Product from '@components/Product';

describe('Product', () => {
  const name = 'Item 1';
  const description = 'Foo';

  let handleClick: jest.Mock;

  beforeEach(() => {
    handleClick = jest.fn();

    render(
      <Product name={name} description={description} onClick={handleClick} />,
    );
  });

  it('renders the product', () => {
    const heading = screen.getByRole('heading', {
      level: 2,
      name: new RegExp(`${name} ->$`),
    });

    const paragraph = screen.getByText(new RegExp(`${description}$`));

    expect(heading).toHaveTextContent(/Item 1 ->$/);
    expect(paragraph).toHaveTextContent(/Foo$/);
  });

  it('calls the click handler on click', () => {
    const productButton = screen.getByRole('button', {
      name: new RegExp(`Add ${name} to basket$`),
    });

    productButton.click();

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders the name in the aria-label', () => {
    const productButton = screen.getByRole('button', {
      name: new RegExp(`Add ${name} to basket$`),
    });

    expect(productButton).toHaveAttribute(
      'aria-label',
      expect.stringMatching(new RegExp(`Add ${name} to basket$`)),
    );
  });

  it('applies the correct CSS class to the product button', () => {
    const productButton = screen.getByRole('button', {
      name: new RegExp(`Add ${name} to basket$`),
    });

    expect(productButton).toHaveClass('product');
  });
});
