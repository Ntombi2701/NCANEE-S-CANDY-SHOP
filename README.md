# NCANEE'S CANDY SHOP

A responsive candy shop demo built with React, Vite, and Tailwind CSS.

## Run the website

1. Install [Node.js](https://nodejs.org/) (the LTS version includes npm).
2. In this project folder, run:

   ```bash
   npm install
   npm run dev
   ```

3. Open the local address printed in your terminal (usually `http://localhost:5173`).

Create a production build with `npm run build`. Preview that build locally with
`npm run preview`.

## What's included

- Home, Shop, Product Details, Shopping Cart, Checkout, About, and Contact pages.
- Demo product catalogue, search, category filters, and a cart saved in browser
  local storage.
- A responsive layout with accessible labels and mobile navigation.

## Demo and launch notes

Products, prices, reviews, and order details on this site are sample/demo data.
Checkout is a demonstration form only; it does not process payments or submit
orders to a server. Connect a secure backend and a payment provider before
accepting customer orders.

Update the WhatsApp contact number in `src/App.jsx` before publishing. The
current value is a placeholder. Add your real social media profile links and
business contact details before launch.

## Deploy for free

### Vercel

1. Push this project to a GitHub repository.
2. Import the repository at [vercel.com](https://vercel.com/).
3. Vercel detects Vite automatically. Use `npm run build` as the build command
   and `dist` as the output directory, then deploy.

### Netlify

1. Push this project to a GitHub repository.
2. Import the repository at [netlify.com](https://www.netlify.com/).
3. Set the build command to `npm run build` and the publish directory to `dist`.

## GitHub setup

Install Git, then open a terminal in this folder. To connect this project to
your GitHub repository, initialize Git and add the remote:

```bash
git init
git add .
git commit -m "Build NCANEE'S CANDY SHOP website"
git branch -M main
git remote add origin https://github.com/Ntombi2701/NCANEE-S-CANDY-SHOP.git
git push -u origin main
```

Only run the push command after checking the GitHub repository. If it already
contains commits or files, first reconcile them safely rather than overwriting
the remote. Never share a GitHub password or personal access token in source
code.
