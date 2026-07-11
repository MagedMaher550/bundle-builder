# Bundle Builder

A production-oriented frontend take-home assignment built with **React**, **TypeScript**, and **Vite**.

The application allows users to build a customizable smart home security system through a multi-step bundle builder with a live review panel, product variants, quantity management, and local persistence.

---

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Zustand
- Lucide React
- clsx

---

## Features

- Multi-step bundle builder
- Data-driven architecture using JSON
- Product categories
- Product variants
- Quantity management
- Live pricing updates
- Save system locally
- Responsive layout
- Modular component architecture

---

## Project Structure

```
src
├── assets
├── components
├── data
├── hooks
├── store
├── styles
├── types
└── utils

```

---

## Getting Started

### Install dependencies

```bash
yarn
```

### Generate the catalog

```bash
yarn seed
```

This generates:

```
src/data/catalog.json
```

### Start development

```bash
yarn dev
```

### Build production

```bash
yarn build
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start development server |
| `yarn build` | Build production bundle |
| `yarn preview` | Preview production build |
| `yarn lint` | Run ESLint |

---

## Architecture

The application follows a **domain-first architecture**.

The UI is built on top of a normalized data model instead of embedding business logic inside React components.

### Static Data

The catalog is generated through seeders and stored as JSON.

```
Catalog
├── Categories
└── Products
```

### Dynamic Data

User interactions are managed with Zustand.

```
Bundle
└── Bundle Items
```

The catalog remains immutable while all user selections are stored in the application state.

---

## Data Model

### Category

- id
- title
- order

### Product

- id
- categoryId
- name
- description
- image
- pricing
- variants (optional)
- badge (optional)

### Bundle Item

- productId
- variantId (optional)
- quantity

---

## Design Decisions

- Domain-driven architecture
- Data generated through seeders
- JSON used as the application data source
- Single source of truth for product/category relationships
- Derived pricing and totals
- Immutable catalog
- Component-based architecture
- Responsive-first implementation

---

## Assumptions

- Product catalog is generated locally through the seeder.
- Images are treated as static assets.
- Totals are calculated on the client.
- Local persistence uses browser localStorage.

---

## Future Improvements

- Backend integration
- Authentication
- Remote catalog API
- Inventory management
- Promotions engine
- Internationalization
- Unit and integration testing

---

## Author

Maged Maher