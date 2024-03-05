import { mongooseConnect } from "@/lib/mongoose";
import { WishedProduct } from "@/models/WishedProduct";

export default async function handle(req, res) {
  await mongooseConnect();

  if (req.method === 'POST') {
    const { product } = req.body;
    const query = { product };
    const wishedDoc = await WishedProduct.findOne(query);

    if (wishedDoc) {
      await WishedProduct.findByIdAndDelete(wishedDoc._id);
      return res.json({ wishedDoc });
    } else {
      await WishedProduct.create(query);
      return res.json('created');
    }
  }

  if (req.method === 'GET') {
    const wishedProducts = await WishedProduct.find().populate('product');
    return res.json(wishedProducts);
  }

  res.status(405).json({ message: 'Method Not Allowed' });
}
