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

  const [editing, setEditing] = useState(false);
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
    setEditing(false);
  };

  // helper: dishes by category
  const dishesByCategory = (cat: string) => dishes.filter(d => d.category === cat);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Christoffel Cuisine</Text>
          {/* removed counter from the header per request */}
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
          <MenuOption label="Starters" imageSource={{ uri: 'https://picsum.photos/seed/starters/400/400' }} onPress={() => setCategory('Starters')} />
          <MenuOption label="Main" imageSource={{ uri: 'https://picsum.photos/seed/main/400/400' }} onPress={() => setCategory('Main')} />
          <MenuOption label="Desserts" imageSource={{ uri: 'https://picsum.photos/seed/dessert/400/400' }} onPress={() => setCategory('Desserts')} />
          <MenuOption label="Specials" imageSource={{ uri: 'https://picsum.photos/seed/specials/400/400' }} onPress={() => setCategory('Specials')} />
        </View>

        <TouchableOpacity style={styles.editButton} onPress={() => setEditing(prev => !prev)}>
          <Text style={styles.editButtonText}>{editing ? 'Close Editor' : `Edit Menu (${category})`}</Text>
        </TouchableOpacity>

        {editing && (
          <View style={styles.menuBox}>
            <Text style={styles.sectionTitle}>Edit Menu</Text>

            {/* restored category buttons to use the editButton style (no new dropdown-style changes) */}
            <View style={styles.categoryRow}>
              {CATEGORIES.map(cat => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.editButton, cat === category && styles.categorySelected]}
                  onPress={() => setCategory(cat)}
                >
                  <Text style={styles.editButtonText}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              style={styles.InputBoxes}
              placeholder="Dish Name"
              value={dishName}
              onChangeText={setDishName}
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
              onChangeText={setDishPrice}
              keyboardType="numeric"
            />

            <TouchableOpacity style={styles.editButton} onPress={handleAddOrUpdate}>
              <Text style={styles.editButtonText}>Save Dish</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.sectionTitle}>Average Prices</Text>

        <View style={styles.priceBox}>
          <Text style={styles.priceText}>Starters: R90.00</Text>
          <Text style={styles.priceText}>Main: R125.00</Text>
          <Text style={styles.priceText}>Desserts: R50.00</Text>
          <Text style={styles.priceText}>Specials: R150.00</Text>
        </View>

        <Text style={styles.sectionTitle}>Current Dishes</Text>

        <FlatList
          data={dishes}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.priceBox}>
              <Text style={styles.priceText}>Name: {item.name}</Text>
              <Text style={styles.priceText}>Category: {item.category}</Text>
              <Text style={styles.priceText}>Details: {item.details}</Text>
              <Text style={styles.priceText}>Price: {item.price}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginVertical: 12 }}>No dishes yet</Text>}
        />

        {/* counter moved to bottom of the page */}
        <View style={{ marginVertical: 12, alignItems: 'center' }}>
          <Text style={styles.sectionSubText}>{dishes.length} dishes</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;



