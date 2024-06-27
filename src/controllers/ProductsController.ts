import { Request, Response } from "express";
import { CreateOneProductService } from "../services/products/CreateOneProductService";

export class ProductsController {
  create = async (req: Request, res: Response) => {
    const data = req.body;
    const productID = await new CreateOneProductService().execute(data);
    return res.status(200).json({ data: productID });
  };
}
