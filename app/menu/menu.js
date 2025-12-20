import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { getMenuItems } from "./data";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native-web";
import { colors, fonts } from './theme';

export default function Menu() {
  const [categories, setCategories] = useState([]);
  const route = useRouter();

  async function getMenu() {
    const data = await getMenuItems();
    const foodfilter = data ? data.filter((item) => item.Isdrink === null) : data;
    const uniqueCategories = [...new Set(foodfilter.map((item) => item.category))];
    setCategories(uniqueCategories);
  }

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <ImageBackground
      source={require("./images/honeyday.jpg")} // your background image
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

    
      <View style={styles.container}>
        {categories.map((item) => (
          <TouchableOpacity
            style={styles.btns}
            key={item}
            onPress={() => route.push(`menu/${item}`)}
          >
            <Text style={styles.btn_text}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // fills the whole ImageBackground
    backgroundColor: "rgba(0,0,0,0.5)", // semi-transparent black overlay
  },
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection : "row",
    alignItems: "center",
    flexWrap : "wrap",
    gap : 20
  },
  btns: {
    backgroundColor: colors.box_color, // slightly transparent buttons
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: "45%",
    alignItems: "center",
    borderColor : colors.text,
    borderWidth : 2
  },
  btn_text: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 600
    
  },
});
