import {View , Text, StyleSheet, ImageBackground, TouchableOpacity, Image , Modal } from 'react-native';
import { colors , Fonts } from '../theme'
import { getMenuItems } from '../data';
import { createClient } from '@supabase/supabase-js';
import { useState , useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useRouter} from 'expo-router';

export default function Navbar(){
    const route = useRouter();
    const [items , setItems] = useState([])
    const [img , setImg] = useState(null)
    const [openTabs , setOpenTabs] = useState(false);
      const supabase = createClient(
        'https://ncdabrjqxlqyrhljppvt.supabase.co',
        'sb_publishable_EKqRqUen_SJ9bqzSrG98Uw_G0EHhVdz'
      );
    
    useEffect(()=>{
        const fetchData = async () => {
            const data = await getMenuItems();
            setItems(data);
            if(data.length > 0){
                const firstItem = data.find(item => item.name === "Lemon Chicken Salad" )
                const imageUrl = supabase.storage
            .from('images')
            .getPublicUrl(firstItem.image).data.publicUrl;
            setImg(imageUrl);
            }

        };
        fetchData();
    }, []);
    return(
        <SafeAreaView>
         <View style={styles.nav}>
              <TouchableOpacity style={styles.iconbg} onPress={()=>{
                    setOpenTabs(prev => !prev)
              }}><Image resizeMode='contain' style={styles.icon} source={require('../images/menus.png')}/></TouchableOpacity> 
              <Text style={styles.logo}>HONEY RESTAURANT</Text>
              <TouchableOpacity style={styles.iconbg}><Image resizeMode='contain' style={styles.icon} source={require('../images/shopping-bag.png')}/></TouchableOpacity>
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
         <TouchableOpacity style={styles.btn}><Text style={[ styles.btn_text]} >EXPLORE</Text></TouchableOpacity>
    </LinearGradient>
        </ImageBackground>
        
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
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
        fontFamily: Fonts.Elegant,
        color: "white",
        fontSize: 28,
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
       backgroundColor: colors.orange,
       alignSelf: 'flex-start',
       marginLeft: 20,
       paddingLeft: 20,
       paddingRight: 20,
       padding: 10,
       borderRadius: 30
    },
    btn_text:{
       fontSize: 16,
       fontFamily: Fonts.Roboto
    }

})