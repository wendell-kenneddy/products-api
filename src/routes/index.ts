import Router from "express-promise-router";
import { UsersController } from "../controllers/UsersController";
import { CategoriesController } from "../controllers/CategoriesController";
import { ProductsController } from "../controllers/ProductsController";
import { OrdersController } from "../controllers/OrdersController";

const router = Router();
const usersController = new UsersController();
const categoriesController = new CategoriesController();
const productsController = new ProductsController();
const ordersController = new OrdersController();

router.get("/users", usersController.getMany);
router.get("/users/:id", usersController.getOne);
router.post("/users", usersController.create);
router.delete("/users/:id", usersController.deleteOne);

router.get("/categories", categoriesController.getMany);
router.get("/categories/:id", categoriesController.getOne);
router.post("/categories", categoriesController.create);
router.post("/categories/add-to-product", categoriesController.addCategoryToExistingProduct);
router.delete("/categories/:id", categoriesController.deleteOne);

router.get("/products", productsController.getMany);
router.get("/products/:id", productsController.getOne);
router.post("/products", productsController.create);
router.put("/products/:productID", productsController.updateOne);
router.delete("/products/:id", productsController.deleteOne);

router.get("/orders/:customerID", ordersController.getOrderProducts);
router.post("/orders/:customerID", ordersController.createOrderProduct);
router.delete("/orders/delete-order-product", ordersController.deleteOrderProduct);

export { router };
