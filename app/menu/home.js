import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { getMenuItems } from "./data";
import { useRouter } from "expo-router";
import { colors } from "./theme"
import  Footer  from "./footer";
import Navbar from "./layouts/navbar";
import Lineup from "./layouts/lineup";
import { ScrollView } from "react-native";
export default function Index() {
  const [menuItems, setMenuItems] = useState([]);
  const route = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMenuItems();
      setMenuItems(data);
    };
    fetchData();
  }, []);

  return (
      <View style={styles.container}>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Navbar />
        <Lineup />
      </ScrollView>

     

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
