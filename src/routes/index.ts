import Router from "express-promise-router";
import { UsersController } from "../controllers/UsersController";
import { CategoriesController } from "../controllers/CategoriesController";
import { ProductsController } from "../controllers/ProductsController";
import { OrdersController } from "../controllers/OrdersController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { withoutAuthMiddleware } from "../middlewares/withoutAuthMiddleware";
import { AuthController } from "../controllers/AuthController";

const router = Router();
const usersController = new UsersController();
const categoriesController = new CategoriesController();
const productsController = new ProductsController();
const ordersController = new OrdersController();
const authController = new AuthController();

router.get("/users", authMiddleware, usersController.getMany);
router.get("/users/profile", authMiddleware, usersController.getOne);
router.post("/users", authMiddleware, usersController.create);
router.delete("/users", authMiddleware, usersController.deleteOne);

router.post("/auth/login", withoutAuthMiddleware, authController.login);
router.post("/auth/signup", withoutAuthMiddleware, authController.signup);

router.get("/categories", categoriesController.getMany);
router.get("/categories/:categoryID", categoriesController.getOne);
router.post("/categories", authMiddleware, categoriesController.create);
router.post(
  "/categories/add-to-product",
  authMiddleware,
  categoriesController.addCategoryToExistingProduct
);
router.delete(
  "/categories/delete-from-product",
  authMiddleware,
  categoriesController.deleteCategoryFromExistingProduct
);
router.delete("/categories/:categoryID", authMiddleware, categoriesController.deleteOne);

router.get("/products", productsController.getMany);
router.get("/products/:productID", productsController.getOne);
router.post("/products", authMiddleware, productsController.create);
router.put("/products/:productID", authMiddleware, productsController.updateOne);
router.delete("/products/:productID", authMiddleware, productsController.deleteOne);

router.get("/orders", authMiddleware, ordersController.getOrderProducts);
router.post("/orders/product", authMiddleware, ordersController.createOrderProduct);
router.post("/orders/checkout", authMiddleware, ordersController.checkout);
router.delete("/orders/product", authMiddleware, ordersController.deleteOrderProduct);

export { router };
