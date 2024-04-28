/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [products, setProducts] = useState([]);
  const URL = import.meta.env.VITE_URL;

  const fetchAllProduct = async () => {
    try {
      const response = await axios.get(`${URL}/all-product`);
      setProducts(response?.data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <>
      {
        products?.map((product) => {
          return (
            <div key={product?._id}>
              <p>{product?.title}</p>
              <img src={product?.image} alt={product?.title} />
            </div>
          )
        })
      }
    </>
  );
};

export default App;
