import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Order } from "@/models/Order";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).json({ message: "Method not allowed" });
    return;
  }

  try {
    await mongooseConnect();

    const {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    } = req.body;

    const productsIds = cartProducts;
    const uniqueIds = [...new Set(productsIds)];
    const productsInfos = await Product.find({ _id: { $in: uniqueIds } });

    let line_items = [];
    for (const productId of uniqueIds) {
      const productInfo = productsInfos.find(
        (p) => p._id.toString() === productId
      );
      const quantity = productsIds.filter((id) => id === productId).length || 0;
      if (quantity > 0 && productInfo) {
        line_items.push({
          quantity,
          price_data: {
            currency: "ARS",
            product_data: { name: productInfo.title },
            unit_amount: quantity * productInfo.price ,
          },
        });
      }
    }

    const orderDoc = await Order.create({
      line_items,
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      paid: false,
    });

    // Lógica para limpiar el carrito aquí

    res
      .status(201)
      .json({ message: "Order created successfully", order: orderDoc });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while creating the order",
      error: error.message,
    });
  }
}
