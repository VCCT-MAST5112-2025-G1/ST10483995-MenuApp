import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { enableScreens } from "react-native-screens";
import HomeScreen from "../screens/HomeScreen";
import EditMenuScreen from "../screens/EditMenuScreen";
import MenuViewScreen from "../screens/MenuViewScreen";

export type RootStackParamList = {
  Home: undefined;
  EditMenu: undefined;
    MenuView: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  enableScreens(true);
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="EditMenu" component={EditMenuScreen} />
        <Stack.Screen name="MenuView" component={MenuViewScreen} />
    </Stack.Navigator>
  );
}