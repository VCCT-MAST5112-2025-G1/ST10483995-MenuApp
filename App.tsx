import React from "react";
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, ImageSourcePropType, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";

type MenuOptionProps = {
    label: string;
    imageSource: ImageSourcePropType;
    onPress?: () => void;
};

const MenuOption: React.FC<MenuOptionProps> = ({ label, imageSource, onPress }) => {
  return (
    <TouchableOpacity style={styles.menuOptionContainer} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.imageBorder}>
        <Image source={imageSource} style={styles.menuImage} resizeMode="cover" />
      </View>
      <Text style={styles.menuOptionLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

// Main App
const App: React.FC = () => {
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
                {/* Using remote placeholder URIs so Expo Go works without local image files.
                    If you prefer local assets, replace with require('./Images/Starter.png') etc. */}
                <MenuOption label="Starters" imageSource={{ uri: 'https://picsum.photos/seed/starters/400/400' }} />
                <MenuOption label="Main" imageSource={{ uri: 'https://picsum.photos/seed/main/400/400' }} />
                <MenuOption label="Desserts" imageSource={{ uri: 'https://picsum.photos/seed/dessert/400/400' }} />
                <MenuOption label="Specials" imageSource={{ uri: 'https://picsum.photos/seed/specials/400/400' }} />
            </View>

            <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit Menu</Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Average Prices</Text>

            <View style={styles.priceBox}>
                <Text style={styles.priceText}>Starters: $12.00</Text>
                <Text style={styles.priceText}>Main: $25.00</Text>
                <Text style={styles.priceText}>Desserts: $10.00</Text>
                <Text style={styles.priceText}>Specials: $30.00</Text>
            </View>
        </ScrollView>
      </SafeAreaView>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingBottom: 40,
    },
    header: {
        backgroundColor: '#ACD8AC',
        paddingVertical: 20,
        paddingHorizontal: 15,
        alignItems: 'center',
        marginBottom: 10,
    },
    headerText: {
        fontSize: 30,
        fontFamily: 'Italiana',
        color: '#323131ff',
        fontWeight: '300',
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '300',
        color: '#333',
        marginLeft: 15,
        marginTop: 20,
        marginBottom: 10,
    },
    menuBox: {
        backgroundColor: '#f9f9f9',
        marginHorizontal: 15,
        padding: 25,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 8,
    },
    menuItem: {
        alignItems: 'center',
        marginBottom: 10,
    },
    menuItemTitle: {
        fontWeight: '600',
        fontSize: 20,
        marginTop: 5,
        color: '#555',
    },
    menuItemDetails: {
        fontSize: 16,
        color: '#777',
    },
    menuOptionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    menuOptionContainer: {
        width: '45%',
        margin: 10,
        alignItems: 'center',
    },
    imageBorder: {
        width: 130,
        height: 130,
        borderRadius: 65,
        padding: 3,
        backgroundColor: '#9370DB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        overflow: 'hidden',
    },
    menuImage: {
        width: '100%',
        height: '100%',
        borderRadius: 65,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: '#ccc'
    },
    menuOptionLabel: {
        fontFamily: 'Italiana',
        fontSize: 18,
        marginTop: 8,
        color: '#333',
    },
    editButton: {
        backgroundColor: '#6750A4',
        paddingVertical: 12,
        marginHorizontal: 100,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    editButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
    },
    priceBox: {
        backgroundColor: '#f9f9f9',
        marginHorizontal: 15,
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 8,
        marginBottom: 30,
    },
    priceText: {
        fontSize: 18,
        color: '#555',
        marginBottom: 8,
    },
    image: {
        width: 64,
        height: 64,
        marginBottom: 8,
    },
    label: {
        fontSize: 16,
        textAlign: 'center',
    },
});
