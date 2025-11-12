import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, SafeAreaView, StatusBar } from "react-native";
import styles from "../Styles/styles";
import { AppDataContext } from "../../Data";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "EditMenu">;

type Dish = {
  name: string;
  details: string;
  price: string;
  category: string;
};

const CATEGORIES = ["Starters", "Main", "Desserts", "Specials"];

export default function EditMenuScreen() {
  const navigation = useNavigation();
  const ctx = useContext(AppDataContext) as any;
  const contextDishes: Dish[] | undefined = ctx?.dish;
  const contextSetDishes:
    | ((d: Dish[] | ((prev: Dish[]) => Dish[])) => void)
    | undefined = ctx?.setDishes;

  const [dishes, setDishesLocal] = useState<Dish[]>(contextDishes ?? []);

  useEffect(() => {
    if (contextDishes) setDishesLocal(contextDishes);
  }, [contextDishes]);

  const [dishName, setMealName] = useState("");
  const [dishDetails, setDishDetails] = useState("");
  const [dishPrice, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const handleDishEdit = () => {
    if (!category.trim() || !dishName.trim() || !dishDetails.trim() || !dishPrice.trim()) return;

    const updatedDish: Dish = {
      category,
      name: dishName,
      details: dishDetails,
      price: dishPrice,
    };

    // Update local state
    const newList = [...dishes, updatedDish];
    setDishesLocal(newList);

    // Update context if setter exists
    if (typeof contextSetDishes === "function") {
      try {
        contextSetDishes((prev: any) => {
          if (Array.isArray(prev)) return [...prev, updatedDish];
          return [...(prev ?? []), updatedDish];
        });
      } catch {
        contextSetDishes(newList as any);
      }
    }

    // Clear inputs
    setMealName("");
    setDishDetails("");
    setPrice("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Christoffel Cuisine</Text>
        </View>
    <View style={styles.container}>
      <Text style={styles.headerText}>Menu</Text>

      <View style={styles.categoryRow}>
        {CATEGORIES.map((cat) => (
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

    </ScrollView>
    </SafeAreaView>
  );
}
