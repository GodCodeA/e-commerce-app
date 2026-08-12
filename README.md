# E-Commerce App

A small e-commerce storefront built with React, TypeScript, and Vite. The app loads product data from the DummyJSON API, lets users browse items, search by product title, view product details, and manage a shopping cart with quantity controls.

## Live Demo

- Netlify: https://react-simple-shop-by-bakytnur.netlify.app

## Features

- Product catalog on the home page
- Search by product title
- Product detail page with description and price
- Add to cart functionality
- Quantity controls in cart
- Remove items from cart
- Cart persistence using localStorage
- Light/dark theme toggle
- Responsive layout

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Axios
- CSS / custom styling

## Project Structure

```bash
src/
├── api/
│   └── products.ts
├── components/
│   ├── HeaderActions/
│   ├── ProductCard/
│   └── SearchForm/
├── context/
│   └── CartContext.tsx
├── hooks/
│   └── useCart.ts
├── pages/
│   ├── Cart/
│   ├── Home/
│   └── Product/
├── types/
│   └── Types.ts
├── App.tsx
├── App.css
├── index.css
├── main.tsx
└── ...
```

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Run the app locally

```bash
npm run dev
```

Then open the local URL shown in the terminal, usually:

```bash
http://localhost:5173
```

### Production build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Available Scripts

```bash
npm run dev       # start the development server
npm run build     # compile the app for production
npm run preview   # preview the built app locally
npm run lint      # run ESLint checks
```

## Data Source

The application fetches product data from the DummyJSON API:

- https://dummyjson.com/products
- https://dummyjson.com/products/:id

## Cart Behavior

The shopping cart is managed through React context and automatically saved to browser localStorage. This allows the cart to persist across refreshes.

## Notes

This project is a frontend demo focused on shopping flow, product browsing, and cart interactions. It is designed to be simple, clean, and easy to extend.

## License

This project is for educational/demo purposes.
