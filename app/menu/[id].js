import { View, Text, ScrollView, Image, ImageBackground, StyleSheet, Dimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getMenuItems } from "./data";
import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js';
import { colors } from "./theme";
import { Stack } from 'expo-router'
import { HeaderTitle } from "@react-navigation/elements";

const { width } = Dimensions.get("window"); // for responsive width

export default function MenuDetails() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useLocalSearchParams();

  const supabase = createClient(
    'https://ncdabrjqxlqyrhljppvt.supabase.co',
    'sb_publishable_EKqRqUen_SJ9bqzSrG98Uw_G0EHhVdz'
  );

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const data = await getMenuItems();
    const filtered = id
      ? data.filter(item => item.category.toString() === id)
      : data;
    setMenuItems(filtered);
    setLoading(false);
  }

  if (loading) {
    return (
      <View style={styles.loading}>
      <Stack.Screen options= {{
          title : id
       }}/>
         <Text style={styles.loadingText}>Loading...</Text>
      </View>
    )
  }

  return (
    <>
       <Stack.Screen options= {{
          title : id
       }}/>
    <ImageBackground
      source={require("./images/honeyday.jpg")} 
      style={styles.background}
      resizeMode="cover"
    >
      {/* Black overlay */}
      <View style={styles.overlay} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {menuItems.map(item => {
          const imageUrl = supabase.storage
            .from('images')
            .getPublicUrl(item.image).data.publicUrl;

          return (
            <View key={item.id} style={styles.itemContainer}>
              <Image
                source={{ uri: imageUrl }}
                style={styles.itemImage}
              />
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={[styles.itemText , styles.itemText_des]}>{item.description}</Text>
              <Text style={[styles.itemText , styles.itemText_price]}>{item.price} </Text>
            </View>
          );
        })}
      </ScrollView>
    </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  scrollContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
   itemContainer: {
    width: width / 2 - 20,
    marginBottom: 20,
    backgroundColor: colors.box_color,
    borderRadius : 5
  },
  itemText: {
    marginBottom: 8,
    color: colors.text,
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft : 5,
    paddingRight : 1,
    textTransform : "capitalize",
    flex: 1
  },
  itemText_des:{
    fontWeight : 400,
    fontSize: 11
  },
  itemText_price:{
    color: colors.price
  },
  itemImage: {
    width: "100%",
    height: 120,
    borderRadius: 5,
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  loadingText: {
    color: "#fff",
    fontSize: 20,
  },
});
