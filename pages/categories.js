import Header from "@/components/Header";
import Center from "@/components/Center";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import ProductBox from "@/components/ProductBox";
import Link from "next/link";
import { mongooseConnect } from "@/lib/mongoose";
import { JackInTheBox } from "react-awesome-reveal";

export default function CategoriesPage({ mainCategories, categoriesProducts }) {
  return (
    <>
      <Header />
      <Center>
        {mainCategories.map((cat) => (
          <div key={cat._id} className="mb-8 py-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">{cat.name}</h2>
              <Link href={"/category/" + cat._id} className="text-gray-600">
                Mostrar todo
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              {categoriesProducts[cat._id].map((p, index) => (
                <JackInTheBox key={cat._id} delay={index * 50}>
                  <ProductBox {...p} />
                </JackInTheBox>
              ))}
              <JackInTheBox delay={categoriesProducts[cat._id].length * 50}>
                <Link
                  href={"/category/" + cat._id}
                  className="bg-gray-300 h-40 rounded-lg flex items-center justify-center text-gray-600 text-center font-bold text-xl"
                >
                  Mostrar todo &rarr;
                </Link>
              </JackInTheBox>
            </div>
          </div>
        ))}
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const categories = await Category.find();
  const mainCategories = categories.filter((c) => !c.parent);
  const categoriesProducts = {}; // catId => [products]
  for (const mainCat of mainCategories) {
    const products = await Product.find({ category: mainCat._id }, null, {
      limit: 3,
      buscar: { _id: -1 },
    });
    categoriesProducts[mainCat._id] = products;
  }

  return {
    props: {
      mainCategories: JSON.parse(JSON.stringify(mainCategories)),
      categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
    },
  };
}
