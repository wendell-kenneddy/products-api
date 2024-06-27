import Router from "express-promise-router";
import { UsersController } from "../controllers/UsersController";
import { CategoriesController } from "../controllers/CategoriesController";
import { ProductsController } from "../controllers/ProductsController";

const router = Router();
const usersController = new UsersController();
const categoriesController = new CategoriesController();
const productsController = new ProductsController();

router.get("/users", usersController.getMany);
router.get("/users/:id", usersController.getOne);
router.post("/users", usersController.create);
router.delete("/users/:id", usersController.deleteOne);

router.get("/categories", categoriesController.getMany);
router.get("/categories/:id", categoriesController.getOne);
router.post("/categories", categoriesController.create);
router.delete("/categories/:id", categoriesController.deleteOne);

router.post("/products", productsController.create);

export { router };
