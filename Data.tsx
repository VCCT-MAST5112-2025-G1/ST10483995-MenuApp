import React, { createContext, useState } from "react";

type Dish = {
  category: string;
  name: string;
  details: string;
  price: string;
};

type AppData = {
  dish: Dish[];
  setDishes: React.Dispatch<React.SetStateAction<Dish[]>>;
  clearAll: () => void;
  clearMenu: () => void;
  viewAll: boolean;
  setViewAll: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AppDataContext = createContext<AppData>({
  dish: [],
  setDishes: () => {},
  clearAll: () => {},
  clearMenu: () => {},
  viewAll: false,
  setViewAll: () => {},
});

export const AppDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [dish, setDishes] = useState<Dish[]>([]);
  const [viewAll, setViewAll] = useState(false);

  const clearAll = () => {
    setDishes([]);
  };

  const clearMenu = () => {
    setDishes([]);
  };

  return (
    <AppDataContext.Provider
      value={{
        dish,
        setDishes,
        clearAll,
        clearMenu,
        viewAll,
        setViewAll,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};
