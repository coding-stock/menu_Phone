import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { getMenuItems } from "./menu/data";
import { useRouter } from "expo-router";
import { colors } from "./menu/theme"
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
    <ImageBackground
      source={require("./menu/images/honeyday.jpg")}
      style={styles.background}
      resizeMode="cover"
    > 
      <View style= {styles.overlay}></View>
      <View style= {styles.Text_container}>
        <Text style={styles.welcome}>Welcome to Honey Restaurant menu</Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.btns}
          onPress={() => route.push("/menu/menu")}
        >
          <Text style={styles.btn_text}>Food</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btns}
          onPress={() => route.push("/menu/menuD")}
        >
          <Text style={styles.btn_text}>Drinks</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1, 
  },
  overlay : {
     ...StyleSheet.absoluteFill,
     backgroundColor : "#00000041"
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  btns: {
    backgroundColor: "#000000cd",
    padding: 20,
    borderRadius: 10,
    paddingRight : 50 ,
    paddingLeft : 50
  },
  btn_text: {
    fontSize: 30,
    color: "rgba(251, 146, 61, 1)",
    fontFamily :"monospace",
  },
  Text_container:{
    height : "30%",
    position : "absolute",
    justifyContent : "flex-end"
  },
  welcome:{
    color: colors.box_color,
    fontSize: 40,
    textAlign: "center"
  }
});
