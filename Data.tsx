import React from "react";


type AppData = {
    foodOptions: { label: string; imageSource: any }[];
    clearAll: () => void;
    clearMenu: () => void;
    viewAll: boolean;
};

export const AppDataContext = React.createContext<AppData>({
    foodOptions: [],
    clearAll: () => {},
    clearMenu: () => {},
    viewAll: false,
});

