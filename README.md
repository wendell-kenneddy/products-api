# Products API

![Author](https://img.shields.io/badge/author-Wendell%20Kenneddy-brightgreen)
![Status](https://img.shields.io/badge/status-Concluded-brightgreen)
![PRs](https://img.shields.io/badge/PRs-Welcome-brightgreen)
![License](https://img.shields.io/badge/license-MIT-brightgreen)

## 📕 About

A simple API that emulates the flow of an e-commerce, at a limited scope. This project's purpose is solely
to learn and get familiarized with NodeJS's ecosystem.

## Technologies used

- Typescript
- ExpressJS
- Postgres
- Esbuild
- Docker

## ⚒️ How to use

### Database

The postgres database has 3 main entities: `users, categories and products`. Other models derive from these three.

The tables are: `users, categories, products, orders, product_categories and order_products`. The last three represent,
respectively, the order (like a shopping cart) of an user, created automatically when a new user is created;
the many-to-many relationship table between a product and it's categories, and lastly the products contained in an order.

To initialize the database, use the `npm run start:db` command. This will also create a "super user" with max access level,
capable of performing all operations on all entities of the database, execpt deleting/updating another user's data.

Be sure to populate the `.env` files before running Docker compose.

### Routes

The application has 5 main routes: `users, categories, products, orders and auth`. Below is a map of all available
operations. Routes marked with "protected" require authentication.

```
  /users
    GET /profile (protected) -> returns info about the user that made the request
    GET / (protected) (access_level: 2) -> gets many users
    POST /create (protected) (access_level: 3) -> creates a new user
    DELETE / (protected) -> deletes own account
```

```
  /categories
    GET / -> returns a page of categories
    GET /:categoryID -> returns info about a single category
    POST / (protected) (access_level: 2) -> creates a new category
    POST /add-to-product (protected) (access_level: 2) -> adds an existing category to an existing product
    DELETE /delete-from-product (protected) (access_level: 2) -> removes a category from a product
    DELETE /:categoryID (protected) (access_level: 2) -> deletes a category
```

```
  /products
    GET / -> returns a page of products without their categories
    GET /:productID -> returns data from a single product, with it's categories included
    POST / (protected) (access_level: 2) -> creates a new product, optionally adding it's categories too
    PUT /:productID (protected) (access_level: 2) -> updates data of a single product, without changing categories
    DELETE /:productID (protected) (access_level: 2) -> deletes a single product
```

```
  /orders
    GET / (protected) -> returns products of currently signed in user
    POST /product (protected) -> adds a product to order
    POST /checkout (protected) -> performs checkout (simply deletes products from order and decreases each product stock)
    DELETE /product (protected) -> deletes a single product from the order
```

```
  /auth
    POST /login -> performs login, returning an access token and a refresh token
    POST /signup -> adds a new user to the system, also returning an access token and a refresh token
```

### Authentication

To access a protected route (given the user has the required access level), he must use an access token (JWT), by appending it to the Authorization header.

`Authorization: Bearer <access_token>`.

The access token has a short lifespan, so to ensure the user doesn't need to login often, a refresh token also must be used, by appending it into the `refreshToken cookie`. Both tokens are provided when a user access the login/signup routes.

The general flow is as follows:

- User performs login -> access token + refresh token provided.
- User access protected route by passing access token.
- After the access token expires, the passed refresh token is used to generate a new access token.
- User saves the new access token, and tries to access the route again, this time successfully.
- When the refresh token expires, the user must perform login again.

## 🤝 How to contribute

Have any idea that can help boost the project, and want to share it? It's simple!

1. Fork the project
2. Modify what you want
3. Commit the changes
4. Open a Pull Request

## 🔓 License

This project is under license. Click [here](./LICENSE) for details.
