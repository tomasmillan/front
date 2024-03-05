import { mongooseConnect } from "@/lib/mongoose";
import { Address } from "@/models/Address";

export default async function handle(req, res) {
  await mongooseConnect();

  if (req.method === 'PUT') {
    const address = await Address.findOne({}); // Puedes personalizar la lógica para obtener la dirección que deseas actualizar
    if (address) {
      res.json(await Address.findByIdAndUpdate(address._id, req.body));
    } else {
      res.status(404).json({ error: "Address not found" });
    }
  }
  
  if (req.method === 'GET') {
    const address = await Address.findOne({}); // Puedes personalizar la lógica para obtener la dirección que deseas mostrar
    if (address) {
      res.json(address);
    } else {
      res.status(404).json({ error: "Address not found" });
    }
  }
}
