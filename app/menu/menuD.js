import {View , Text, TouchableOpacity , StyleSheet} from 'react-native';
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
        <ScrollView contentContainerStyle = {styles.container}>
            {categories.map(item =>(
                <TouchableOpacity style = {styles.btns} key={item} onPress={()=>{
                    route.push(`menu/drinks/${item}`);
                }}>
                    <Text style = {styles.text} >{item}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container:{
        flexDirection : "row",
        flexWrap : "wrap",
        gap: 20,
        backgroundColor : "#000000ff",
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