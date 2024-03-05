import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import WhiteBox from "@/components/WhiteBox";
import ProductImages from "@/components/ProductImages";
import CartIcon from "@/components/icons/CartIcon";
import FlyingButton from "@/components/FlyingButton";
import ProductReviews from "@/components/ProductReviews";

export default function ProductPage({ product }) {
  return (
    <>
      <Header />
      <Center>
        <div className="grid grid-cols-1 my-2 sm:grid-cols-2 gap-8 md:gap-40 md:grid-cols-2">
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <div>
            <Title>{product.title}</Title>
            <p>{product.description}</p>
            <div className="flex items-center gap-4">
              <div>
                <span className="text-lg font-bold">${product.price}</span>
              </div>
              <div className="my-3">
                <FlyingButton main _id={product._id} src={product.images?.[0]}>
                  <CartIcon />
                  Agregar al Carrito
                </FlyingButton>
              </div>
            </div>
          </div>
        </div>
        <ProductReviews product={product} />
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
