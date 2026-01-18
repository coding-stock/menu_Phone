import { View , Text , ImageBackground , StyleSheet, Touchable, TouchableOpacity } from "react-native";
import { colors } from "./menu/theme";
import { useRouter } from "expo-router";

export default function Index() {
  const route = useRouter();
  return (
   <ImageBackground
      source={require("./menu/images/resto2.jpg")}
      style={styles.background}
      resizeMode="cover"
    > 
    <View style= {styles.container}>
     <Text style={[styles.text , styles.est]}>EST.2026</Text>
     <Text style={styles.text}>Enjoy exquisite meals </Text>
     <Text style={[styles.text , styles.title]}>Honey restaurant</Text>
     <Text style={[styles.text, styles.filler]}>Discover modern flavors made simple. Browse the menu, place your order, and enjoy quality without the wait</Text>
     <TouchableOpacity style={[styles.button , styles.order_button]} onPress={()=>{
      route.push("/menu/home")
     }
     }><Text style={styles.btn_text}>Place an order </Text></TouchableOpacity>
     <TouchableOpacity style={[styles.visit_button , styles.button]}><Text style={[styles.visit_text , styles.btn_text]}>Visit Us ➡️</Text></TouchableOpacity>
    </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
    background:{
      flex:1,
      justifyContent: "flex-end",
      paddingBottom: 130
    },
    container:{
      justifyContent: "flex-end",
      alignItems: "center",   
     },
    text:{
       color: "white",
        fontSize: 16,
        marginVertical: 10,
        textAlign: "center",
        width: "90%",
    },
    est:{
      color: colors.orange,
      fontSize: 15,
      backgroundColor: colors.orange_opacity,
      width: "fit-content",
      paddingVertical: 2,
      paddingHorizontal: 20,
      borderRadius: 20,
      borderColor: colors.orange,
      borderWidth: 2,
    },
    title:{
      fontSize:30,
      fontWeight: "bold",
      
    },
    filler:{
      color: "#888888",
      width: "78%"
    },
    button:{
      width: "80%",
      padding: 20,
      borderRadius: 10,
      margin: 10
    },
    btn_text:{
      fontWeight: "bold",
      fontSize: 18,
      textAlign: "center"
    },
    visit_button:{
      backgroundColor: colors.tint_glass,
      borderColor : colors.box_color,
      borderWidth : 1
    },
    order_button:{
      backgroundColor: colors.orange
    },
    visit_text:{
      color: "white",
    }
    
})