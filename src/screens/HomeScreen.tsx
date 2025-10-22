import React, { Component, use } from "react";
import { Text, View, ScrollView, Image, TouchableOpacity, ImageSourcePropType, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import styles from '../Styles/styles';
import { useNavigation } from "@react-navigation/native";

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

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Christoffel Cuisine</Text>
        </View>

        <Text style={styles.sectionTitle}>Tonight's Menu</Text>

        <View style={styles.menuBox}>
          <View style={styles.menuItem}>
            <Text style={styles.menuItemTitle}>Starters</Text>
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuItemTitle}>Main</Text>
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuItemTitle}>Desserts</Text>
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuItemTitle}>Specials</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Menu Options</Text>

        <View style={styles.menuOptionsGrid}>
          <MenuOption label="Starters" imageSource={{ uri: 'https://picsum.photos/seed/starters/400/400' }} />
          <MenuOption label="Main" imageSource={{ uri: 'https://picsum.photos/seed/main/400/400' }} />
          <MenuOption label="Desserts" imageSource={{ uri: 'https://picsum.photos/seed/dessert/400/400' }} />
          <MenuOption label="Specials" imageSource={{ uri: 'https://picsum.photos/seed/specials/400/400' }} />
        </View>

        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditMenu' as never)}>
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
};

export default HomeScreen;



