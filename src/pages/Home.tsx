import React, { useEffect, useState } from "react";
import SearchComp from "../components/SearchComp";
import axios from "axios";
import {
  addFavorites,
  fetchFail,
  fetchStart,
  getSuccessProduct,
} from "../features/productsSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { EventFunc, Product, Products } from "../models/models";
import Card from "../components/Card";

const Home = () => {
  const [search, setSearch] = useState<string>("");
  const dispatch = useAppDispatch();

  const { loading, error, productList, favorites } = useAppSelector(
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

  const handleAdd = (product: Product) => {
    if (favorites.filter((item) => item.id === product.id).length === 0) {
      dispatch(addFavorites(product));
    }
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
        <div className="flex gap-3 flex-wrap justify-center">
          {productList.map((item) => (
            <Card
              key={item.id}
              text="Add to Fav"
              item={item}
              handleFunc={handleAdd}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
