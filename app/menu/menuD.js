import {View , Text, TouchableOpacity , StyleSheet, ImageBackground} from 'react-native';
import { getMenuItems } from './data';
import { useState , useEffect } from 'react';
import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native';
import {colors , fonts} from './theme'

export default function Drinks(){
    const [menuItems , setMenuItems] = useState([]);
    const [categories , setCategories] = useState([]);
    const route = useRouter()
    useEffect(()=>{
     async function fetchData(){
        const data = await getMenuItems()
        const filter = data ? data.filter(item => item.Isdrink === true ) : data ;
        const uniquecategory = [...new Set(filter.map(item => item.category ))]
        setCategories(uniquecategory);
      }
      fetchData();
    } , [])
    return(
        <ImageBackground
              source={require("./images/honeyday.jpg")} 
              style={styles.background}
              resizeMode="cover"
        >
        <View style={styles.overlay} />
        <ScrollView contentContainerStyle = {styles.container}>
            {categories.map(item =>(
                <TouchableOpacity style = {styles.btns} key={item} onPress={()=>{
                    route.push(`menu/drinks/${item}`);
                }}>
                    <Text style = {styles.text} >{item}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    background: {
    flex: 1,
  },
     overlay: {
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: "rgba(0,0,0,0.5)", 
     },
    container:{
        flexDirection : "row",
        flexWrap : "wrap",
        gap: 20,
        flex: 1,
        padding : 5
    },
    btns :{
        width : "45%" ,
        backgroundColor : colors.box_color,
        padding : 20,
        borderColor : colors.text,
        borderWidth: 2,
        borderRadius: 10
    },
    text : {
       color: colors.text,
       textAlign: "center",
       fontSize: 20,
       fontWeight: 600
    }
})