import React from "react";
import EditMenuScreen from "./EditMenuScreen";
import { View, Text, FlatList, ScrollView } from "react-native";
import styles from '../Styles/styles';
import { useContext, useState, useEffect } from "react";
import { AppDataContext } from "../../Data";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = NativeStackScreenProps<RootStackParamList, 'MenuView'>;

<Text style={styles.sectionTitle}>Current Dishes</Text>

export default function MenuViewScreen (){
<SafeAreaView style={styles.container}>
    <ScrollView>
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
}