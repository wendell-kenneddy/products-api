import { getClient } from ".";
import { hash } from "bcrypt";

async function main() {
  const args = process.argv;
  const client = await getClient();

  try {
    await client.query("BEGIN");
    console.log("[database]: creating users table");
    await client.query(
      `CREATE TABLE users (
      user_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      user_name TEXT NOT NULL,
      user_email TEXT NOT NULL UNIQUE,
      user_password TEXT NOT NULL,
      user_access_level INTEGER NOT NULL
  )`,
      []
    );
    console.log("[database]: users table created");

    console.log("[database]: creating categories table");
    await client.query(
      `CREATE TABLE categories (
      category_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      category_name TEXT NOT NULL
    )`,
      []
    );
    console.log("[database]: categories table created");

    console.log("[database]: creating products table");
    await client.query(
      `CREATE TABLE products (
      product_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      product_name TEXT NOT NULL,
      product_image_url TEXT,
      product_description TEXT NOT NULL,
      product_price INTEGER NOT NULL CHECK (product_price >= 0),
      product_stock INTEGER NOT NULL CHECK (product_stock >= 0) 
  )`,
      []
    );
    console.log("[database]: products table created");

    console.log("[database]: creating product_categories table");
    await client.query(
      `CREATE TABLE product_categories (
      product_category_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      product_id UUID NOT NULL REFERENCES products (product_id) ON DELETE CASCADE,
      category_id UUID NOT NULL REFERENCES categories (category_id) ON DELETE CASCADE
    )`,
      []
    );
    console.log("[database]: product_categories table created");

    console.log("[database]: creating orders table");
    await client.query(
      `CREATE TABLE orders (
      order_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      customer_id UUID NOT NULL REFERENCES users (user_id) ON DELETE CASCADE
    )`,
      []
    );
    console.log("[database]: orders table created");

    console.log("[database]: creating order_products table");
    await client.query(
      `CREATE TABLE order_products (
      order_product_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      product_id UUID NOT NULL REFERENCES products(product_id) ON UPDATE CASCADE ON DELETE CASCADE,
      order_id UUID NOT NULL REFERENCES orders(order_id) ON UPDATE CASCADE ON DELETE CASCADE
    )`,
      []
    );

    console.log("[database]: order_products table created");

    if (args[2] == "with-superuser") {
      const encryptedPassword = await hash("12345678", 10);
      await client.query(
        `WITH u_query AS (
           INSERT INTO users 
           (user_name, user_email, user_password, user_access_level)
           VALUES ('Adam', 'adam@email.com', $1, 3) RETURNING user_id
          )
         INSERT INTO orders (customer_id)
         VALUES ((SELECT user_id FROM u_query))
        `,
        [encryptedPassword]
      );
    }

    await client.query("COMMIT");
    console.log("[database]: done");
  } catch (error) {
    await client.query("ROLLBACK");
    console.log("[database]: changes not committed");
    console.log(error);
  } finally {
    client.release();
    console.log("[database]: client released");
  }
}

main();
