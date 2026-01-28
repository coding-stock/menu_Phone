import { View , Text , StyleSheet , Image, TouchableOpacity} from 'react-native';
import { colors , images } from './theme';
import {useState , useRef, useEffect} from 'react'
import {useRouter} from 'expo-router';

export default function Footer({screen , orderItems}){
    const route = useRouter();
    const selectedHome = screen === 'home' ? images.home_orange : images.home
    const selectedStore = screen === 'cart' ? images.shop_orange : images.shop
    const selectedCart = screen === 'store' ? images.cart_orange : images.cart
    const previousLength = useRef(orderItems?.length ?? 0);
   
    const [highlight , setHighlight] = useState(false)
   
    // useEffect(()=>{
    //      if(orderItems.length > previousLength.current){
    //         setHighlight(true)
    //         setInterval(()=>{
    //            setHighlight(false)
    //         }, 2000)
    //      }
    //      previousLength.current = orderItems.length
    // },[orderItems.length])
    return(
        <View style= {styles.container}>
    
              <View style={styles.footer}>
                 <TouchableOpacity onPress={()=>{ route.push('/menu/home') }}><Image style={styles.icon} source={selectedHome} /></TouchableOpacity>
                 <TouchableOpacity style={[styles.iconbg , highlight && styles.iconbgActive]}  onPress={()=>{ route.push({
                  pathname : '/menu/cart' ,
                  params: {
                    data : JSON.stringify(orderItems)
                  }
                 }) }}><Image style={styles.icon} source={selectedCart} /></TouchableOpacity>
                 <TouchableOpacity onPress={()=>{ route.push('/menu/contact') }}><Image style={styles.icon} source={selectedStore} /></TouchableOpacity>
              </View>
           
        </View>
    )
}
const styles = StyleSheet.create({
   iconbgActive: {
  backgroundColor:"red",
  transform: [{ scale: 1.2 }],
  padding: 10,
  borderRadius: 50
},
  container: {
  width: "100%",
  height: 60,
  position: "absolute",
  bottom: 0,
  left: 0,
},
  footer:{
    width: "100%",
    height: 60,
    backgroundColor: colors.box_color_light,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"  
  },
  icon:{
    width:30,
    height:30,
  },
})