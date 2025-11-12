import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  SafeAreaView,
  TextInput,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import styles from '../Styles/styles';
import { AppDataContext } from "../../Data";
import { useNavigation } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  navigation.goToEditMenu = () => {
    navigation.navigate("EditMenu");

  navigation.goToMenuView = () => {
    navigation.navigate("MenuView");
  }

type MenuOptionProps = {
  label: string;
  imageSource: ImageSourcePropType;
  onPress?: () => void;
};

const MenuOption: React.FC<MenuOptionProps> = ({ label, imageSource, onPress }) => (
  <TouchableOpacity style={styles.menuOptionContainer} onPress={onPress} activeOpacity={0.8}>
    <View style={styles.imageBorder}>
      <Image source={imageSource} style={styles.menuImage} resizeMode="cover" />
    </View>
    <Text style={styles.menuOptionLabel}>{label}</Text>
  </TouchableOpacity>
);

type Dish = {
  name: string;
  details: string;
  price: string;
  category: string;
};

const CATEGORIES = ['Starters', 'Main', 'Desserts', 'Specials'];

const HomeScreen: React.FC = () => {
  const ctx = useContext(AppDataContext) as any;
  const contextDishes: Dish[] | undefined = ctx?.dish;
  const contextSetDishes: ((d: Dish[] | ((prev: Dish[]) => Dish[])) => void) | undefined = ctx?.setDishes;

  // local copy of dishes — kept in sync with context if present
  const [dishes, setDishesLocal] = useState<Dish[]>(contextDishes ?? []);

  useEffect(() => {
    if (contextDishes) setDishesLocal(contextDishes);
  }, [contextDishes]);

  const [category, setCategory] = useState<string>('Starters');

  const [dishName, setDishName] = useState('');
  const [dishDetails, setDishDetails] = useState('');
  const [dishPrice, setDishPrice] = useState('');

  const handleAddOrUpdate = () => {
    if (!dishName.trim() || !dishDetails.trim() || !dishPrice.trim()) return;

    const updatedDish: Dish = {
      name: dishName.trim(),
      details: dishDetails.trim(),
      price: dishPrice.trim(),
      category,
    };

    const newList = [...dishes, updatedDish];
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
      }
    }

    setDishName('');
    setDishDetails('');
    setDishPrice('');
  };

  // helper: dishes by category
  const dishesByCategory = (cat: string) => dishes.filter(d => d.category === cat);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Christoffel Cuisine</Text>
        </View>

        <Text style={styles.sectionTitle}>Tonight's Menu</Text>

        <View style={styles.menuBox}>
          {CATEGORIES.map(cat => {
            const list = dishesByCategory(cat);
            return (
              <View key={cat} style={styles.menuItem}>
                <Text style={styles.menuItemTitle}>{cat} {list.length > 0 ? `(${list.length})` : ''}</Text>
                {list.length === 0 ? (
                  <Text style={styles.menuItemDetails}>No items</Text>
                ) : (
                  list.map((d, idx) => (
                    <View key={idx} style={{ marginTop: 6 }}>
                      <Text style={styles.menuItemDetails}>{d.name} — {d.price}</Text>
                      <Text style={[styles.menuItemDetails, { color: '#666' }]}>{d.details}</Text>
                    </View>
                  ))
                )}
              </View>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Menu Options</Text>

        <View style={styles.menuOptionsGrid}>
          <MenuOption label="Starters" imageSource={{ uri: 'https://picsum.photos/seed/starters/400/400' }} onPress={navigation.goToMenuView} />
          <MenuOption label="Main" imageSource={{ uri: 'https://picsum.photos/seed/main/400/400' }} onPress={navigation.goToMenuView} />
          <MenuOption label="Desserts" imageSource={{ uri: 'https://picsum.photos/seed/dessert/400/400' }} onPress={navigation.goToMenuView} />
          <MenuOption label="Specials" imageSource={{ uri: 'https://picsum.photos/seed/specials/400/400' }} onPress={navigation.goToMenuView} />
        </View>

        <TouchableOpacity style={styles.editButton}
          onPress={navigation.goToEditMenu}
          activeOpacity={0.8}
        >
          <Text style={styles.editButtonText}>Edit Menu</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Average Prices</Text>

        <View style={styles.priceBox}>
          <Text style={styles.priceText}>Starters: R90.00</Text>
          <Text style={styles.priceText}>Main: R125.00</Text>
          <Text style={styles.priceText}>Desserts: R50.00</Text>
          <Text style={styles.priceText}>Specials: R150.00</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}}}