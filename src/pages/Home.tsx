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
  const [search, setSearch] = useState<string>("phone");
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

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <SearchComp />
    </div>
  );
};

export default Home;
