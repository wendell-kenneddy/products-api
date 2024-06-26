import { query } from ".";

async function main() {
  await query(
    `CREATE TABLE users (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL,
      password TEXT NOT NULL,
      access_level INTEGER NOT NULL
  )`,
    []
  );

  await query(
    `CREATE TABLE products (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      image_url TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      price INTEGER NOT NULL,
      category TEXT NOT NULL,
      stock INTEGER NOT NULL
  )`,
    []
  );

  await query(
    `CREATE TABLE shopping_carts (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      customerId UUID NOT NULL REFERENCES users (id),
      product_ids UUID[] NOT NULL
    )`,
    []
  );
}

main();
