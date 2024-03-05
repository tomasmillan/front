import Header from "@/components/Header";
import Title from "@/components/Title";
import Center from "@/components/Center";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import ProductsGrid from "@/components/ProductsGrid";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";

export default function CategoryPage({
  category, subCategories, products: originalProducts
}) {
  const defaultSorting = '_id-desc';
  const defaultFilterValues = category.properties
    .map(p => ({ name: p.name, value: 'all' }));
  const [products, setProducts] = useState(originalProducts);
  const [filtersValues, setFiltersValues] = useState(defaultFilterValues);
  const [sort, setSort] = useState(defaultSorting);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [filtersChanged, setFiltersChanged] = useState(false);

  function handleFilterChange(filterName, filterValue) {
    setFiltersValues(prev => {
      return prev.map(p => ({
        name: p.name,
        value: p.name === filterName ? filterValue : p.value,
      }));
    });
    setFiltersChanged(true);
  }

  useEffect(() => {
    if (!filtersChanged) {
      return;
    }
    setLoadingProducts(true);
    const catIds = [category._id, ...(subCategories?.map(c => c._id) || [])];
    const params = new URLSearchParams;
    params.set('categories', catIds.join(','));
    params.set('sort', sort);
    filtersValues.forEach(f => {
      if (f.value !== 'all') {
        params.set(f.name, f.value);
      }
    });
    const url = `/api/products?` + params.toString();
    axios.get(url).then(res => {
      setProducts(res.data);
      setLoadingProducts(false);
    })
  }, [filtersValues, sort, filtersChanged, subCategories, category._id]);

  return (
    <>
      <Header />
      <Center>
        <div className="flex items-center justify-between py-4">
          <h1 className="text-lg">{category.name}</h1>
          <div className="flex gap-4">
            {category.properties.map(prop => (
              <div key={prop.name} className="bg-gray-300 p-2 rounded">
                <span>{prop.name}:</span>
                <select
                  onChange={ev => handleFilterChange(prop.name, ev.target.value)}
                  value={filtersValues.find(f => f.name === prop.name).value}>
                  <option value="all">All</option>
                  {prop.values.map(val => (
                    <option key={val} value={val}>{val}</option>
                  ))}
                </select>
              </div>
            ))}
            <div className="bg-gray-300 p-2 rounded">
              <span>Buscar:</span>
              <select
              className="ml-2"
                value={sort}
                onChange={ev => {
                  setSort(ev.target.value);
                  setFiltersChanged(true);
                }}>
                <option value="price-asc">precio, descendente</option>
                <option value="price-desc">precio, ascendente</option>
                <option value="_id-desc">nuevos arrivos</option>
                <option value="_id-asc">clasicos</option>
              </select>
            </div>
          </div>
        </div>
        {loadingProducts && (
          <Spinner fullWidth />
        )}
        {!loadingProducts && (
          <div>
            {products.length > 0 && (
              <ProductsGrid products={products} />
            )}
            {products.length === 0 && (
              <div>Lo sentimos, no encontramos ese producto!</div>
            )}
          </div>
        )}
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  const category = await Category.findById(context.query.id);
  const subCategories = await Category.find({ parent: category._id });
  const catIds = [category._id, ...subCategories.map(c => c._id)];
  const products = await Product.find({ category: catIds });

  return {
    props: {
      category: JSON.parse(JSON.stringify(category)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
      products: JSON.parse(JSON.stringify(products)),
    }
  };
}
