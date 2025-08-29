# NextBasket

## Table of Contents

- [Background](#background)
- [Challenge](#challenge)
- [Getting Started](#getting-started)
- [Solution Approach](#solution-approach)
  - [Project Structure](#project-structure)
  - [Code Quality](#code-quality)
  - [State Management](#state-management)
  - [Performance](#performance)
  - [UI/UX](#uiux)
  - [Accessibility](#accessibility)
  - [Testing](#testing)
- [Future Enhancements](#future-enhancements)
  - [Branching](#branching)
  - [State Management](#state-management-1)
  - [Docker](#docker)
  - [CICD](#cicd)
  - [Testing](#testing-1)
- [Changelog](#changelog)

## Background

This project was my submission for the technical round at a well-known fashion brand, which subsequently earned me an invitation to the final round.

## Challenge

Some newb has made a mess of this code. There are TODOs that need finishing off, broken and questionable tests and the code itself is inefficient.

Please fix up whatever mess you find to get this piece of work working well.

## Getting Started

First, `npm install`, then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Run the testing and linting with `npm run test` and `npm run lint`.

## Solution Approach

### Project Structure

One of the first few things I decided to do was switch the project to a flat modular folder structure. This type of folder structure allows for a clear separation of concerns and code reusability, as well as scalability and growth (e.g. it can easily accommodate new components, utils, constants, etc., without becoming complex or confusing).

### Code Quality

Code quality is incredibly important to me. I strive to write clean, maintainable code that developers in 10 years time can easily understand, maintain and extend. To improve code quality within this project, I:

-  Added `"next"` and `"prettier/recommended"` to `.eslintrc.json`. This will allow us to enforce best practices for Next.js projects and catch potential issues early, and also enforce consistent code formatting with Prettier
- Added path aliases to `tsconfig.json` for cleaner imports
- Transformed hardcoded logic into modular, reusable React components
- Increased type safety across the codebase by implementing TypeScript types for component props, function parameters, and state

### State Management

The new project structure and creation of reusable components introduced a risk of prop drilling, which would have been inefficient and hard to maintain, especially with deeply nested components.

To solve this, I utilised React's Context API to centralise the basket state. Components that need access to the basket can now subscribe to the context directly. This eliminates the need to pass props through multiple levels and improves code maintainability.

Additionally, I've placed the provider for the basket context (`BasketContextProvider`) at the root level in `layout.tsx`. This will ensure that the basket state persists across different pages, e.g. a checkout page.

### Performance

I enhanced the performance of this web application by:

- Memoising React components using `React.memo()` to prevent unnecessary re-renders when component props remain unchanged
- Memoising computationally expensive calculations using `useMemo()`. For example, in `Basket.tsx`, the results of `getTotalQuantity()` and `getBasketItems()` are cached to avoid redundant recalculations
- Converting the basket state from an array to a hashmap to enable faster lookups and updates
- Using `useCallback()` to memoise functions and prevent unnecessary re-creations on each render

### UI/UX

For this challenge, I focused on preserving the original UI as much as possible, so I didn't make any significant changes to the UI/UX beyond applying some basic styling to address clear visual issues.

### Accessibility

Accessibility is really important, especially in e-commerce. The project already utilised aria-labels, but there were still improvements that could have been made.

Previously, each product button used a fixed `aria-label` of `"Add to basket"`, which didn't provide much context for users relying on screen readers. I updated the labels to dynamically include the product name, for example, `"Add Item 1 to basket"`, to give users more meaningful feedback.

Additionally, I added an `aria-label` to the basket button that now communicates both its function and the current basket count, e.g. `"Go to checkout, 3 items in basket"`.

Lastly, I made an effort to use semantic HTML elements to enhance accessibility for users of assistive technologies. For example, the `Basket` and `BasketItem` components use `<ul>` and `<li>` elements to represent the list of items in the basket. This helps screen readers and similar tools accurately interpret and convey the content as a structured list.

### Testing

In addition to fixing the existing broken tests in the project, I added several new unit tests, following the Arrange-Act-Assert (AAA) pattern, primarily targeting reusable React components, to further improve test coverage and ensure more reliable functionality.

I also refactored the tests to eliminate hardcoded values by defining reusable constants (e.g. `name` and `count`) and generating regex patterns dynamically using template strings. For example, ``new RegExp(`Add ${name} to basket$`)``. This approach reduces duplication and makes the tests more maintainable and flexible when values change.

## Future Enhancements

Below are several areas where the project could be enhanced or refined.

### Branching

- Enforce a branching strategy (e.g. Gitflow) instead of pushing changes directly to the `main` branch

### State Management

- A limitation of using React's Context API is that components subscribed to the context will re-render whenever any part of the context value changes, even if they're only using a small portion of it. In this project, every time a product is added to the basket, the entire list of products re-renders. At scale, this isn't great at all. If you have 1,000+ products rendered on the page, this behaviour can significantly impact performance. To solve this, we can switch to a state management library like Redux or similar libraries. This will allow us to separate state from actions and allow components to subscribe to only specific slices of state they care about

### Docker

- Dockerise the project, which will help to improve environment consistency and simplify local setup

### CI/CD

- Create a CI/CD pipeline that has 3 stages:
  - Build
    - Install project dependencies
    - Run ESLint
  - Test
    - Run tests
    - Generate a test coverage report
      - Fail the pipeline on any test failure or when coverage is lower than the threshold
  - Deploy
    - Deploy the web application
- The target environment depends on the branch strategy/event trigger, e.g.:
  - Deploy the web application to a dev site (e.g. `dev.example.com`) when a pull request into `develop` is created
  - Deploy the web application to a staging site (e.g. `staging.example.com`) when a `feature` branch is merged into `develop`
  - Deploy the web application to a beta site (e.g. `beta.example.com`) when a pull request into `main` is created
  - Deploy the web application to a production site (e.g. `example.com`) when a `release` branch is merged into `main`

### Testing

- Expand and deepen unit test coverage across the codebase
- Implement E2E tests with a library like Cypress
- Add accessibility tests, e.g. with `jest-axe`
- Test the web application performance with React Profiler to identify things like bottlenecks

## Changelog

- Refactored codebase
  - Reconfigured ESLint to use Next and Prettier for more comprehensive rule coverage, which will improve code quality and consistency
  - Changed project structure (e.g. moved tests and styles into their own folder)
  - Added additional aliases for cleaner imports
  - Created reusable Product component
    - Added prop types
    - Specified HTML button type attribute
    - Improved `aria-label`
    - Memoise component so it doesn't re-render unless props change
    - Moved relevant styles from `page.module.css` to `product.module.css`
  - Created reusable Basket and BasketItem components
    - Added `aria-label` to Basket button
    - Memoised components so they don't re-render unless props change
    - Moved relevant styles from `page.module.css`
    - Used `<ul>` and `<li>` to improve accessibility and structure for assistive technologies, such as screen readers
    - Used `.map()` to iterate over items and render each basket item
    - Used basket context to grab basket state
    - Calculated total quantity from basket array and memoised result
  - Created Products component
    - Wrapped product components with a fragment to avoid extra DOM nodes and so that the parent's grid layout is applied correctly
    - Used `.map()` to iterate over products and render each product
    - Used `addToBasket()` from basket context to update basket state
  - Removed unused `.content` CSS rule
  - Created type for item and placed it in `types` for reuse
  - Created Basket context, provider and custom hook so that we can manage and inject basket state and actions throughout the application
  - Refactored `addToBasket()` (formerly `addToCart()`) and used functional updater to ensure it uses the most-up-to-date previous value
  - Defined store name as a constant in `constants` for reuse
  - Stored static product data in JSON format in `data/products/products.json`
  - Calculate basket quantity from basket state instead to reduce complexity, minimise redundancy, and the need to manage additional state
  - Converted basket state from an array to a hashmap to improve performance of state access and updates with O(1) average-case operations
- Aligned description items to the start using `flex-start`
- Used `@typings` alias instead of `@types` to prevent namespace conflicts
- Installed missing Jest types (`@types/jest`)
- Resolved TypeScript error `Property 'toHaveTextContent' does not exist on type 'JestMatchers<HTMLElement>'.ts(2339)`
- Made `home` tests pass
  - Wrapped button clicks with `act()`
  - Changed expected value to `/Basket: 1 items$/` to make test #2 pass
  - Changed `name` property to match new `aria-label` values
  - Provided basket state and actions to `Home` component with `BasketContextProvider`
- Added tests for all components in `src/components`
  - Followed AAA (Arrange-Act-Assert) pattern
  - Added `renderWithBasketContext()` utility to wrap components with `BasketContext` in tests
  - Avoided hardcoding by defining values such as `name` and `count` as constants and generating regex patterns with template strings
