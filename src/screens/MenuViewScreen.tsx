import React, { useContext, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import styles from "../Styles/styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { AppDataContext } from "../../Data";

type Props = NativeStackScreenProps<RootStackParamList, "MenuView">;

const CATEGORIES = ["All", "Starters", "Main", "Desserts", "Specials"];

export default function MenuViewScreen({ navigation }: Props) {
  const { dish, setDishes } = useContext(AppDataContext);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter dishes by category
  const filteredDishes =
    selectedCategory === "All"
      ? dish
      : dish.filter((d: any) => d.category === selectedCategory);

  // Confirm before deleting
  const confirmDelete = (index: number, name: string) => {
    Alert.alert(
      "Delete Dish",
      `Are you sure you want to delete "${name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setDishes((prev: any[]) => prev.filter((_, i) => i !== index));
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ paddingHorizontal: 12, paddingVertical: 8 }}
      >
        <Text style={[styles.sectionSubText, { color: "#4A90E2" }]}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Menu View</Text>

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 12,
          marginVertical: 12,
        }}
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.editButton,
              cat === selectedCategory && styles.categorySelected,
              { marginRight: 8 },
            ]}
            onPress={() => setSelectedCategory(cat)}
            activeOpacity={0.8}
          >
            <Text style={styles.categoryButtonText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Dishes List */}
      <FlatList
        data={filteredDishes}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ paddingHorizontal: 12 }}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.priceBox,
              {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              },
            ]}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.priceText}>Name: {item.name}</Text>
              <Text style={styles.priceText}>Category: {item.category}</Text>
              <Text style={styles.priceText}>Details: {item.details}</Text>
              <Text style={styles.priceText}>Price: {item.price}</Text>
            </View>

            {/* Delete Button */}
            <TouchableOpacity
              onPress={() => confirmDelete(index, item.name)}
              style={{
                padding: 8,
                backgroundColor: "#FF6B6B",
                borderRadius: 8,
                marginLeft: 8,
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginVertical: 12 }}>
            No dishes found
          </Text>
        }
      />

      {/* Dish Counter */}
      <View style={{ marginVertical: 12, alignItems: "center" }}>
        <Text style={styles.sectionSubText}>{filteredDishes.length} dishes</Text>
      </View>
    </SafeAreaView>
  );
}
