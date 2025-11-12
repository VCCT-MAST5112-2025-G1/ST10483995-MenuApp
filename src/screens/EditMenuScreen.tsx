import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, TextInput, SafeAreaView, FlatList } from "react-native";
import  styles  from '../Styles/styles';
import { AppDataContext } from "../../Data";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, 'EditMenu'>

type Dish = {
    name: string;
    details: string;
    price: string;
    category: string;
};

const CATEGORIES = ['Starters', 'Main', 'Desserts', 'Specials']

const ctx = useContext(AppDataContext) as any;
  const contextDishes: Dish[] | undefined = ctx?.dish;
  const contextSetDishes: ((d: Dish[] | ((prev: Dish[]) => Dish[])) => void) | undefined = ctx?.setDishes;

  // local copy of dishes — kept in sync with context if present
  const [dishes, setDishesLocal] = useState<Dish[]>(contextDishes ?? []);

  useEffect(() => {
    if (contextDishes) setDishesLocal(contextDishes);
  }, [contextDishes]);


export default function EditMenuScreen() {
    const navigation = useNavigation();
    navigation.goBack();

    const { dish, setDishes } = useContext(AppDataContext) as any;

    const [dishName, setMealName] = useState('');
    const [dishDetails, setDishDetails] = useState('');
    const [dishPrice, setPrice] = useState('');
    const [category, setCategory] = useState('');

    const [editing, setEditing] = useState(false);

    const [menu, setMenu] = useState({
        Starters: [] as Dish[],
        Main: [] as Dish[],
        Desserts: [] as Dish[],
        Specials: [] as Dish[],
    });

    const handleDishEdit = () => {
        if (!category.trim() || !dishName.trim() || !dishDetails.trim() || !dishPrice.trim()) 
            return;

        const updatedDish = {
            category: category,
            name: dishName,
            details: dishDetails,
            price: dishPrice,
        };
        setDishes((prev:any) => [...prev, updatedDish]);

        const newList = [...dish, updatedDish];
    // update local state
    setDishesLocal(newList);

    // if context setter exists, update context as well
    if (typeof contextSetDishes === 'function') {
      // prefer functional update to avoid race conditions
      try {
        contextSetDishes((prev: any) => {
          if (Array.isArray(prev)) return [...prev, updatedDish];
          return [...(prev ?? []), updatedDish];
        });
      } catch {
        // fallback: call with full array
        contextSetDishes(newList as any);

        //Clear inputs
        setMealName('');
        setDishDetails('');
        setPrice('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}> Menu</Text>

            <View style={styles.categoryRow}>
                {['Starters', 'Main', 'Desserts', 'Specials'].map((cat) => (
                    <TouchableOpacity
                        key={cat}
                        style={[styles.editButton, cat === category && styles.categorySelected]}
                        onPress={() => setCategory(cat)}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.categoryButtonText}>{cat}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TextInput
                style={styles.InputBoxes}
                placeholder="Dish Name"
                value={dishName}
                onChangeText={setMealName}
            /> 
            <TextInput
                style={styles.InputBoxes}
                placeholder="Dish Details"
                value={dishDetails}
                onChangeText={setDishDetails}
            />
            <TextInput
                style={styles.InputBoxes}
                placeholder="Dish Price"
                value={dishPrice}
                onChangeText={setPrice}
                keyboardType="numeric"
            />

            <TouchableOpacity style={styles.editButton} onPress={handleDishEdit}>
                <Text style={styles.buttonText}>Update Dish</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.editButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>

            <FlatList
                data={dish}
                keyExtractor={(_, index: number) => index.toString()}
                renderItem={({ item }: { item: any }) => (
                    <View style={styles.priceBox}>
                        <Text style={styles.priceText}>Name: {item.name}</Text>
                        <Text style={styles.priceText}>Details: {item.details}</Text>
                        <Text style={styles.priceText}>Price: {item.price}</Text>
                    </View>
                )}
            />
        </View>
    );
}}}