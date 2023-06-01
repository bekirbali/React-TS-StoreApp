import React, { useEffect, useState } from "react";
import SearchComp from "../components/SearchComp";
import axios from "axios";
import {
  Product,
  fetchFail,
  fetchStart,
  getSuccessProduct,
} from "../features/productsSlice";
import { useAppDispatch } from "../app/hooks";

export interface Products {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const Home = () => {
  const [search, setSearch] = useState<string>("");
  const dispatch = useAppDispatch();

  const getData = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.get<Products>(
        `https://dummyjson.com/products/search/?q=${search}`
      );
      dispatch(getSuccessProduct(data.products));
      console.log(data.products);
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <SearchComp handleChange={handleChange} />
    </div>
  );
};

export default Home;
