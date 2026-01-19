import { View, ScrollView, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { getMenuItems } from "./data";
import { useRouter } from "expo-router";
import { colors } from "./theme";
import Footer from "./footer";
import Navbar from "./layouts/navbar";
import Lineup from "./layouts/lineup";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const [menuItems, setMenuItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const route = useRouter();

  // Fetch menu items
  useEffect(() => {
    const fetchData = async () => {
      const data = await getMenuItems();
      setMenuItems(data);
    };
    fetchData();
  }, []);

  // Load order items from AsyncStorage
  useEffect(() => {
    const loadOrderItems = async () => {
      const item = await AsyncStorage.getItem('orderItems');
      if (item) setOrderItems(JSON.parse(item));
    };
    loadOrderItems();
  }, []);

  // Save order items to AsyncStorage whenever they change
  useEffect(() => {
    const saveOrderItems = async () => {
      await AsyncStorage.setItem('orderItems', JSON.stringify(orderItems));
    };
    saveOrderItems();
  }, [orderItems]);

  // Clear order items
  const clearOrderItems = async () => {
    try {
      await AsyncStorage.removeItem('orderItems');
      setOrderItems([]);
      console.log('Order items cleared');
    } catch (error) {
      console.error('Error clearing order items', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Navbar orderItems={orderItems} />
        <Lineup setOrderItems={setOrderItems} />
      </ScrollView>
      <Footer screen={"home"} orderItems={orderItems} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.box_color,
  },
  scrollContent: {
    paddingBottom: 50,
  },
});
