import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Card from "../components/Card";
import { Product, VoidFunc } from "../models/models";
import { removeFavorite } from "../features/productsSlice";

const FavoritesPage = () => {
  const { favorites } = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();

  const handleRemove: VoidFunc = (product) => {
    const newData: Product[] = favorites.filter(
      (item) => item.id !== product.id
    );
    dispatch(removeFavorite(newData));
  };

  return (
    <div className="flex justify-center gap-3">
      {favorites.map((item) => (
        <Card item={item} text="remove" handleFunc={handleRemove} />
      ))}
    </div>
  );
};

export default FavoritesPage;
