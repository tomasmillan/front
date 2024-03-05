import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";
import ThankYouPage from "./thanks";
import Modal from "@/components/Modal";
import { Fade } from "react-awesome-reveal";
import { CartContext } from "@/components/CartContext";
import Header from "@/components/Header";
import Center from "@/components/Center";
import Button from "@/components/Button";
import TrashIcon from "@/components/icons/TrashIcon";

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [shippingFee, setShippingFee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
    }
    axios.get("/api/settings?name=shippingFee").then((res) => {
      setShippingFee(res.data.value);
    });
  }, []);

  function closeModal() {
    setIsModalOpen(false);
  }

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  function handleClearCart() {
    clearCart();
  }

  async function goToPayment() {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
    clearCart();
    setIsModalOpen(true);
  }

  let productsTotal = products.reduce((total, product) => {
    const price = product.price || 0;
    const quantity = cartProducts.filter((id) => id === product._id).length;
    return total + price * quantity;
  }, 0);

  if (isSuccess) {
    return <ThankYouPage />;
  }

  return (
    <>
      <Header />
      <Center>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-40 md:grid-cols-2 py-4">
          <Fade delay={50}>
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Carrito</h2>
              <button className="float-right -mt-6 mb-4 hover:text-red-600" onClick={handleClearCart}>
                <TrashIcon />
              </button>
              {!cartProducts.length && <div>El carrito está vacío</div>}
             
              {products.length > 0 && (
                <Table
                  headers={["Producto", "Cantidad", "Precio"]}
                  rows={products.map((product) => [
                    <div key={product._id}>
                      <div className="flex items-center">{product.title}</div>
                      <Image
                        src={product.images[0]}
                        width={80}
                        height={80}
                        alt="product image"
                      />
                    </div>,
                    <div className="flex items-center" key={product._id}>
                      <button
                        className="p-1 bg-gray-300 rounded-lg"
                        onClick={() => lessOfThisProduct(product._id)}
                      >
                        -
                      </button>
                      <span className="px-2">
                        {cartProducts.filter((id) => id === product._id).length}
                      </span>
                      <button
                        className="p-1 bg-gray-300 rounded-lg"
                        onClick={() => moreOfThisProduct(product._id)}
                      >
                        +
                      </button>
                    </div>,
                    `$${parseFloat(
                      (
                        cartProducts.filter((id) => id === product._id).length *
                        product.price
                      ).toFixed(2)
                    ).toFixed(2)}`,
                  ])}
                />
              )}
              <div className="subtotal pt-2">
                <div colSpan={2}>Productos</div>
                <div>${productsTotal.toFixed(2)}</div>
              </div>

              <div className="subtotal">
                <div colSpan={2}>Envío</div>
                <div>${shippingFee}</div>
              </div>

              <div className="subtotal total">
                <div colSpan={2}>Total</div>
                <div>
                  $
                  {(
                    parseFloat(productsTotal) + parseInt(shippingFee || 0)
                  ).toFixed(2)}
                </div>
              </div>
            </div>
          </Fade>
          {!!cartProducts.length && (
            <Fade delay={100}>
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">
                  Información de la orden
                </h2>
                <form onSubmit={goToPayment}>
                  <Input
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    name="name"
                    required
                    onChange={(ev) => setName(ev.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Email"
                    value={email}
                    name="email"
                    required
                    onChange={(ev) => setEmail(ev.target.value)}
                  />
                  <div className="flex gap-4">
                    <Input
                      type="text"
                      placeholder="City"
                      value={city}
                      name="city"
                      onChange={(ev) => setCity(ev.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="Postal Code"
                      value={postalCode}
                      name="postalCode"
                      onChange={(ev) => setPostalCode(ev.target.value)}
                    />
                  </div>
                  <Input
                    type="text"
                    placeholder="Street Address"
                    value={streetAddress}
                    name="streetAddress"
                    onChange={(ev) => setStreetAddress(ev.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Country"
                    value={country}
                    name="country"
                    onChange={(ev) => setCountry(ev.target.value)}
                  />
                  <Button
                    className="bg-black text-white block w-full mt-4"
                    type="submit"
                  >
                    Confirmar Pedido
                  </Button>
                </form>
                <p className="text-red-500 text-sm mt-2">* Campos requeridos</p>
              </div>
            </Fade>
          )}
        </div>
        {isModalOpen && (
          <Modal
            onClose={closeModal}
            message="La orden está siendo confirmada. Te llegará un correo con la información de pago y detalle del envío."
          />
        )}
      </Center>
    </>
  );
}
