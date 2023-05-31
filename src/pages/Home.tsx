import React, { useState } from "react";
import SearchComp from "../components/SearchComp";
import axios from "axios";
import { Product, fetchStart } from "../features/productsSlice";
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
        `https://dummyjson.com/products/search/?${search}`
      );
      console.log(data.limit);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <SearchComp />
    </div>
  );
};

export default Home;
