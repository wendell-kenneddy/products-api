import Router from "express-promise-router";
import { UsersController } from "../controllers/UsersController";
import { PostgresUsersRepository } from "../repositories/PostgresUsersRepository";

const router = Router();
const usersController = new UsersController(new PostgresUsersRepository());

router.get("/users", usersController.getMany);
router.get("/users/:id", usersController.getOne);
router.post("/users", usersController.create);
router.delete("/users/:id", usersController.deleteOne);
router.put("/users/:id", usersController.updateOne);

export { router };
