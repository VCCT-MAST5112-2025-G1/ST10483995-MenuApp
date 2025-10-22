import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, TextInput, SafeAreaView } from "react-native";
import  styles  from '../Styles/styles';
import { AppDataContext } from "../../Data";


type MenuItem = {
    name: string;
    details: string;
    price: number;
};

export default function EditMenuScreen() {
    const { dish, setDishes } = useContext(AppDataContext) as any;

    const [mealName, setMealName] = useState<string>('');
    const [mealType, setMealType] = useState<string>('');
    const [mealDetails, setMealDetails] = useState<string>('');
    const [mealPrice, setMealPrice] = useState<number>(0);

    const resetForm = () => {
        setMealName('');
        setMealType('');
        setMealDetails('');
        setMealPrice(0);
    };

    const handleEditMenu = () => {
        const name = mealName.trim();
        const type = mealType.trim();
        const details = mealDetails.trim();
        const price = mealPrice;

        if (!name || !type || !details || price <= 0) {
            alert('Please fill in all fields with valid information (price must be > 0).');
            return;
        }

        const newMeal: MenuItem = {
            name,
            details,
            price,
        };

        setDishes((prevDishes: any) => {
            const list: MenuItem[] = (prevDishes && prevDishes[type]) ? prevDishes[type] : [];

            const exists = list.some((item) => item.name === name);
            const updatedList = exists
                ? list.map((item) => (item.name === name ? newMeal : item))
                : [...list, newMeal];

            return {
                ...prevDishes,
                [type]: updatedList,
            };
        });

        resetForm();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <TextInput
                    style={styles.InputBoxes}
                    placeholder="Meal Name"
                    value={mealName}
                    onChangeText={setMealName}
                />

                <TextInput
                    style={styles.InputBoxes}
                    placeholder="Meal Type (e.g., Starter, Main, Dessert)"
                    value={mealType}
                    onChangeText={setMealType}
                />

                <TextInput
                    style={styles.InputBoxes}
                    placeholder="Meal Details"
                    value={mealDetails}
                    onChangeText={setMealDetails}
                />

                <TextInput
                    style={styles.InputBoxes}
                    placeholder="Meal Price"
                    value={mealPrice === 0 ? '' : mealPrice.toString()}
                    onChangeText={text => setMealPrice(parseFloat(text) || 0)}
                    keyboardType="numeric"
                />

                <TouchableOpacity style={styles.editButton} onPress={handleEditMenu}>
                    <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
