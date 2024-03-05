import ProductBox from "@/components/ProductBox";
import { Fade } from "react-awesome-reveal";

export default function ProductsGrid({ products, wishedProducts = [] }) {
  return (  
    <div className="grid py-2 grid-cols-1 gap-4 md:grid-cols-4 md:gap-8">
      {products?.length > 0 && products.map((product, index) => (
        <Fade key={product._id} delay={index * 50}>
          <ProductBox {...product} wished={wishedProducts.includes(product._id)} />
        </Fade>
      ))}
    </div>
  );
}
