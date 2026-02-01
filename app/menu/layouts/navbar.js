import {View , Text, StyleSheet, ImageBackground, TouchableOpacity, Image , Modal } from 'react-native';
import { colors , Fonts } from '../theme'
import { getMenuItems } from '../data';
import { createClient } from '@supabase/supabase-js';
import { useState , useEffect , useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useRouter} from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Navbar({orderItems}){
    const route = useRouter();
    const [item , setItems] = useState([])
    const [img , setImg] = useState(null)
    const [openTabs , setOpenTabs] = useState(false);
    const [storage , setStorage] = useState([]);
      const supabase = createClient(
        'https://ncdabrjqxlqyrhljppvt.supabase.co',
        'sb_publishable_EKqRqUen_SJ9bqzSrG98Uw_G0EHhVdz'
      );
    useEffect(()=>{
        const fetchData = async () => {
            const data = await getMenuItems();
                const firstItem = data.find(item => item.name === "Lemon Chicken Salad" )
                setItems(firstItem);
                const imageUrl = supabase.storage
            .from('images')
            .getPublicUrl(firstItem.image).data.publicUrl;
            setImg(imageUrl);
            

        };
        fetchData();
    }, []);
    useEffect(() => {
       const getFromStorage = async () => {
       const stored = await AsyncStorage.getItem('orderItems');
       setStorage(stored ? JSON.parse(stored) : []);
    };
    getFromStorage();
}, []);
const isDone = storage.some(
  cartItem => cartItem.id === item?.id
);

const addToCart = async () => {
  if (!item) return;

  const exists = storage.some(i => i.id === item.id);
  if (exists) return;

  const updated = [...storage, { id: item.id, name: item.name }];
  setStorage(updated);
  await AsyncStorage.setItem('orderItems', JSON.stringify(updated));
};

    return(
        <SafeAreaView>
         <View style={styles.nav}>
              <TouchableOpacity style={styles.iconbg} onPress={()=>{
                    setOpenTabs(prev => !prev)
              }}><Image resizeMode='contain' style={styles.icon} source={require('../images/menus.png')}/></TouchableOpacity> 
              <Text style={styles.logo}>HONEY RESTAURANT</Text>
              <TouchableOpacity style={styles.iconbg } onPress={()=>{ route.push({
                  pathname : '/menu/cart' ,
                  params: {
                    data : JSON.stringify(orderItems)
                  }
                 }) }}><Image resizeMode='contain' style={styles.icon} source={require('../images/shopping-bag.png')}/></TouchableOpacity>
         </View>
         {/* Tabssssss */}

        {( openTabs && 
        <View style={styles.tabs}>
           <TouchableOpacity onPress={()=>{ route.push('/') }}><Text style={styles.link}>Go back</Text></TouchableOpacity>
           <TouchableOpacity onPress={()=> route.push('/menu/cart')}><Text style={styles.link}>Cart</Text></TouchableOpacity>
           <TouchableOpacity onPress={()=>{ route.push('/menu/contact') }}><Text style={styles.link}>Contact</Text></TouchableOpacity>
         </View>
         )}
        <ImageBackground source={{uri: img}} style={styles.imageBackground}>
        <LinearGradient colors={['transparent', '#0b0e10']} style={styles.gradient} >
         <Text style={[styles.text , styles.featured]}>Featured Selection</Text>
         <Text style={[styles.text , styles.title]}>The Chef's Signature</Text>
         <Text style={[styles.text, styles.yap]}>A journey through seasonal textures and avant-garde preparation</Text>
         <TouchableOpacity style={[styles.btn , isDone && styles.addToCart]} onPress={()=>{
                 if(isDone){
                    route.push('/menu/cart')
                 }
                 else{
                    addToCart()
                 }
         }}><Text style={[ styles.btn_text , isDone && styles.addToCart_text]} >{isDone === false ? "Add to cart" : "View cart"}</Text></TouchableOpacity>
    </LinearGradient>
        </ImageBackground>
        
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
  addToCart:{
    backgroundColor: colors.orange
  }, 
  addToCart_text:{
    color: "black"
  },
  iconbgActive: {
  backgroundColor:"red",
  transform: [{ scale: 1.1 }],
},
    tabs: {
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    position: 'absolute',
    top: 96,
    backgroundColor: colors.box_color_light,
    borderRadius: 12,
    padding: 15,
    zIndex: 100,
  },
    link:{
       color: "white",
       fontFamily: Fonts.Elegant,
       fontSize: 30,
       margin : 20
    },
    nav:{
       width: "100%",
       backgroundColor: colors.box_color,
       height :60,
       alignItems: "center",
       justifyContent: "space-between",
       padding: 10,
       flexDirection: "row",
       marginTop: 10
    },
    logo:{
        fontFamily: Fonts.Jet_Brains,
        color: "white",
        fontSize: 25,
    },
    img:{
         width: "100%",
         padding: 10,
    },
    imageBackground:{
      width:"100%",
      height: 400,
      overflow: 'hidden',
      borderTopEndRadius: 20,
      borderTopStartRadius: 20,
      justifyContent: "flex-end",
    },
    iconbg:{
       padding: 10,
       backgroundColor: colors.box_color_light,
       borderRadius: 50
    },
    icon:{
        width: 30,
        height: 30,
    },
    text:{
        color: "white",
        paddingLeft:20,
        fontSize: 18,
        fontFamily: Fonts.Roboto,
    },
    featured:{
        color: colors.orange,
        fontFamily: Fonts.Fancy,
        fontSize: 35,
    },
    title:{
        fontSize:55,
    },
    yap:{
       color: colors.gray,
       width: "70%",
       marginBottom: 10
    },
    gradient:{
        width: "100%",
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 40,
    },
    btn:{
       backgroundColor: colors.box_color_light,
       alignSelf: 'flex-start',
       marginLeft: 20,
       paddingLeft: 20,
       paddingRight: 20,
       padding: 10,
       borderRadius: 30
    },
    btn_text:{
       fontSize: 16,
       fontFamily: Fonts.Google,
       padding: 5,
       color: colors.box_color_light_lighter
    }

})