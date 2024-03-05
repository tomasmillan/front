import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";

export default function NewProducts({ products, wishedProducts }) {
  return (
    <Center>
      <h2 className="text-2xl font-normal my-8">Nuevos Productos</h2>
      <ProductsGrid
        products={products}
        wishedProducts={
          wishedProducts ? wishedProducts.map((i) => i.toString()) : []
        }
      />
    </Center>
  );
}
