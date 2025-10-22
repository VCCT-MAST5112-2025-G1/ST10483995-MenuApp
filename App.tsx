import React from "react";
import { NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";;



import HomeScreen from "./src/screens/HomeScreen";
import EditMenuScreen from "./src/screens/EditMenuScreen";

export type RootStackParamList = {
    Home: undefined;
    EditMenu: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="EditMenu" component={EditMenuScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}