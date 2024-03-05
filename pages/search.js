import Header from "@/components/Header";
import Center from "@/components/Center";
import Input from "@/components/Input";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import ProductsGrid from "@/components/ProductsGrid";
import { debounce } from "lodash";
import Spinner from "@/components/Spinner";

export default function SearchPage() {
  const [phrase, setPhrase] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = useCallback(debounce(searchProducts, 500), [ ]);

  useEffect(() => {
    if (phrase.length > 0) {
      setIsLoading(true);
      debouncedSearch(phrase);
    } else {
      setProducts([]);
    }
  }, [phrase, debouncedSearch]);

  function searchProducts(phrase) {
    axios
      .get("/api/products?phrase=" + encodeURIComponent(phrase))
      .then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      });
  }

  return (
    <>
      <Header />
      <Center>
        <div className="sticky top-16 m-6 p-2 bg-gray-400 rounded-md">
          <Input
            autoFocus
            value={phrase}
            onChange={(ev) => setPhrase(ev.target.value)}
            placeholder="Buscar..."
            className="p-1 rounded w-full"
          />
        </div>
        {!isLoading && phrase !== "" && products.length === 0 && (
          <h2 className="text-center">No se encontro el producto {phrase}</h2>
        )}
        {isLoading && <Spinner fullWidth={true} />}
        {!isLoading && products.length > 0 && (
          <ProductsGrid products={products} />
        )}
      </Center>
    </>
  );
}
