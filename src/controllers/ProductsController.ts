import { Request, Response } from "express";
import { CreateOneProductService } from "../services/products/CreateOneProductService";
import { GetOneProductService } from "../services/products/GetOneProductService";
import { queryPageSchema } from "../utils/queryPageSchema";
import { GetManyProductsService } from "../services/products/GetManyProductsService";
import { DeleteOneProductService } from "../services/products/DeleteOneProductService";
import { UpdateProductService } from "../services/products/UpdateProductService";
import { validateAccessLevel } from "../utils/validateAccessLevel";

export class ProductsController {
  create = async (req: Request, res: Response) => {
    validateAccessLevel(2, req);
    const data = req.body;
    const productID = await new CreateOneProductService().execute(data);
    return res.status(200).json({ productID });
  };

  getOne = async (req: Request, res: Response) => {
    const productID = req.params.productID;
    const data = await new GetOneProductService().execute(productID);
    return res.status(200).json({ data });
  };

  getMany = async (req: Request, res: Response) => {
    const { categoryID, queryPage, inStock } = req.body;
    await queryPageSchema.validate(queryPage);
    let condition = `LIMIT ${queryPage.pageSize} OFFSET ${queryPage.offset}`;

    if (inStock) condition = "WHERE product_stock > 0 " + condition;

    const page = await new GetManyProductsService().execute(condition, categoryID);
    return res.status(200).json({ data: page });
  };

  updateOne = async (req: Request, res: Response) => {
    validateAccessLevel(2, req);
    const productID = req.params.productID;
    const data = req.body;
    await new UpdateProductService().execute({ productID, ...data });
    res.json({ message: "Product successfully updated." });
  };

  deleteOne = async (req: Request, res: Response) => {
    validateAccessLevel(2, req);
    const productID = req.params.productID;
    await new DeleteOneProductService().execute(productID);
    return res.status(200).json({ message: "Product successfully deleted." });
  };
}
