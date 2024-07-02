import { Request, Response } from "express";
import { CreateCategoryService } from "../services/categories/CreateCategoryService";
import { DeleteOneCategoryService } from "../services/categories/DeleteOneCategoryService";
import { GetOneCategoryService } from "../services/categories/GetOneCategoryService";
import { queryPageSchema } from "../utils/queryPageSchema";
import { GetManyCategoriesService } from "../services/categories/GetManyCategoriesService";
import { CreateProductCategoryService } from "../services/categories/AddCategoryToProductService";
import { DeleteCategoryFromExistingProductService } from "../services/categories/DeleteCategoryFromExistingProductService";
import { JwtPayload } from "jsonwebtoken";

export class CategoriesController {
  create = async (req: Request, res: Response) => {
    const payload: JwtPayload = (req as any).jwtPayload;
    if (Number(payload.userAccessLevel) < 2) res.status(403).json({ message: "Forbidden access." });
    const data = req.body;
    const category = await new CreateCategoryService().execute(data);
    return res.status(200).json({
      data: category,
    });
  };

  getOne = async (req: Request, res: Response) => {
    const categoryID = req.params.categoryID;
    const category = await new GetOneCategoryService().execute(categoryID);
    return res.status(200).json({ data: category });
  };

  getMany = async (req: Request, res: Response) => {
    const queryPage: any = req.body;
    await queryPageSchema.validate(queryPage);
    const condition = `LIMIT ${queryPage.pageSize} OFFSET ${queryPage.offset}`;
    const page = await new GetManyCategoriesService().execute(condition);
    return res.status(200).json({ data: page });
  };

  deleteOne = async (req: Request, res: Response) => {
    const payload: JwtPayload = (req as any).jwtPayload;
    if (Number(payload.userAccessLevel) < 2) res.status(403).json({ message: "Forbidden access." });
    const categoryID = req.params.categoryID;
    await new DeleteOneCategoryService().execute(categoryID);
    return res.status(200).json({
      message: "Category successfully deleted.",
    });
  };

  addCategoryToExistingProduct = async (req: Request, res: Response) => {
    const payload: JwtPayload = (req as any).jwtPayload;
    if (Number(payload.userAccessLevel) < 2) res.status(403).json({ message: "Forbidden access." });
    const { productID, categoryID } = req.body;
    await new CreateProductCategoryService().execute(productID, categoryID);
    return res.json({ message: "Category successfully added to product." });
  };

  deleteCategoryFromExistingProduct = async (req: Request, res: Response) => {
    const payload: JwtPayload = (req as any).jwtPayload;
    if (Number(payload.userAccessLevel) < 2) res.status(403).json({ message: "Forbidden access." });
    const { productID, categoryID } = req.body;
    await new DeleteCategoryFromExistingProductService().execute(productID, categoryID);
    res.status(200).json({ message: "Category successfully removed." });
  };
}
