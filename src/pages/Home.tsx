import React, { useEffect, useState } from "react";
import SearchComp from "../components/SearchComp";
import axios from "axios";
import {
  fetchFail,
  fetchStart,
  getSuccessProduct,
} from "../features/productsSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { EventFunc, Products } from "../models/models";

const Home = () => {
  const [search, setSearch] = useState<string>("");
  const dispatch = useAppDispatch();

  const { loading, error, productList } = useAppSelector(
    (state) => state.productReducer
  );

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

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearch(e.target.value);
  // };

  const handleChange: EventFunc = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div>
      <SearchComp handleChange={handleChange} />
      {loading ? (
        error ? (
          <div>
            <p className="text-red-500">something went wrong</p>
          </div>
        ) : (
          <div>loading</div>
        )
      ) : (
        <div>
          {productList.map((item) => (
            <p key={item.id}>{item.title}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
