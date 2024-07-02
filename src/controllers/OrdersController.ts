import { Request, Response } from "express";
import { CreateOrderProductService } from "../services/orders/CreateOrderProductService";
import { GetOrderProductsService } from "../services/orders/GetOrderProductsService";
import { DeleteOrderProductService } from "../services/orders/DeleteOrderProductService";
import { OrderCheckoutService } from "../services/orders/OrderCheckoutService";

export class OrdersController {
  createOrderProduct = async (req: Request, res: Response) => {
    const customerID = req.params.customerID;
    const productID = req.body.productID;
    await new CreateOrderProductService().execute(customerID, productID);
    res.status(200).json({
      message: "Product successfully added to order.",
    });
  };

  getOrderProducts = async (req: Request, res: Response) => {
    const customerID = req.params.customerID;
    const orderProducts = await new GetOrderProductsService().execute(customerID);
    res.status(200).json({ data: orderProducts });
  };

  deleteOrderProduct = async (req: Request, res: Response) => {
    const orderProductID = req.body.orderProductID;
    await new DeleteOrderProductService().execute(orderProductID);
    res.status(200).json({ message: "Product successfully deleted from order." });
  };

  checkout = async (req: Request, res: Response) => {
    const customerID = req.params.customerID;
    await new OrderCheckoutService().execute(customerID);
    res.status(200).json({ message: "Order sucessfully completed." });
  };
}
