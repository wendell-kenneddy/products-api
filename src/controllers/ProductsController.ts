import { Request, Response } from "express";
import { CreateOneProductService } from "../services/products/CreateOneProductService";
import { GetOneProductService } from "../services/products/GetOneProductService";
import { queryPageSchema } from "../utils/queryPageSchema";
import { GetManyProductsService } from "../services/products/GetManyProductsService";
import { DeleteOneProductService } from "../services/products/DeleteOneProductService";

export class ProductsController {
  create = async (req: Request, res: Response) => {
    const data = req.body;
    const productID = await new CreateOneProductService().execute(data);
    return res.status(200).json({ data: productID });
  };

  getOne = async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = await new GetOneProductService().execute(id);
    return res.status(200).json({ data });
  };

  getMany = async (req: Request, res: Response) => {
    const categoryID = req.body.categoryID || null;
    const queryPage = req.body.queryPage;
    await queryPageSchema.validate(queryPage);
    const condition = `LIMIT ${queryPage.pageSize} OFFSET ${queryPage.offset}`;
    const page = await new GetManyProductsService().execute(condition, categoryID);
    return res.status(200).json({ data: page });
  };

  deleteOne = async (req: Request, res: Response) => {
    const id = req.params.id;
    await new DeleteOneProductService().execute(id);
    return res.status(200).json({ message: "Product successfully deleted." });
  };
}
